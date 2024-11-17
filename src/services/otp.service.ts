import * as prismaClient from "@prisma/client";
import otp_generator from "otp-generator";
import httpStatus from "http-status";
import prisma from "../client.js";
import logger from "../config/logger.js";
import config from "../config/config.js";
import dateutils from "../utils/date.js";
import ApiError from "../utils/ApiError.js";
import RawQuery from "../lib/Query/rawquery.js";
import utils from "../utils/utils.js";
import { sendSms } from "../utils/sendSMS.js";

export const createOtp = async (
  mobile_number: string
): Promise<prismaClient.otp> => {
  const old_otp = await getOtpBymobileNo(mobile_number);
  if (old_otp) {
    deleteOtpById(old_otp.otp_id);
  }

  const otp = otp_generator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
  console.log(otp);
  
  // Want to send the otp to the sms
  if (config.env !== "local" && process.env.NODE_ENV !== "development") {
    if (process.env.NODE_ENV === "production") {
      await sendSms(otp, mobile_number);
    }
  }
  return prisma.otp.create({
    data: {
      mobile_number,
      expires_in: config.otp.expires_time,
      otp,
    },
  });
};

/**
 * Get otp by mobile_number
 * @param {string} mobile_number
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<otp, Key> | null>}
 */
export const getOtpBymobileNo = async <Key extends keyof prismaClient.otp>(
  mobile_number: string,
  keys: Key[] = Object.keys(prisma.otp.fields) as Key[]
) =>
  (await prisma.otp.findFirst({
    where: { mobile_number },
    select: utils.fieldSelector(keys),
  })) as prismaClient.otp;

/**
 * Verify OTP
 * @param {string} mobile_number
 * @param {string} otp
 * @returns {Promise<boolean>}
 */
export const verifyOtp = async (
  mobile_number: string,
  otp: string
): Promise<boolean> => {
  const database_otp = await getOtpBymobileNo(mobile_number);
  if (!database_otp) {
    throw new ApiError(httpStatus.BAD_REQUEST, "OTP not available");
  }

  if (
    dateutils.isRecordExpired(database_otp?.createdAt, database_otp?.expires_in)
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "OTP Expired");
  }

  if (database_otp?.otp !== otp) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid OTP");
  }

  if (database_otp?.otp === otp) {
    await prisma.otp.update({
      where: {
        otp_id: database_otp.otp_id,
      },
      data: {
        expires_in: "0",
      },
    });
  }

  return database_otp?.otp === otp;
};

/**
 * Delete otp by id
 * @param {UUID} otp_id
 * @returns {Promise<otp>}
 */
export const deleteOtpById = async (otp_id: string): Promise<boolean> => {
  try {
    await prisma.otp.delete({
      where: {
        otp_id,
      },
    });
    return true;
  } catch (error) {
    logger.info(error);
    return false;
  }
};

/**
 * Delete all the expired Otps
 * @returns query excutions
 */
export const cleanExpiredOtp = async (): Promise<void> => {
  await prisma.$executeRaw(RawQuery.otp.deleteExpiredOtps);
};
