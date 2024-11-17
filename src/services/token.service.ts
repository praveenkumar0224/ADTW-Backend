import { type tokens } from "@prisma/client";
import jwt from "jsonwebtoken";
import moment, { type Moment } from "moment";
import prisma from "../client.js";
import config from "../config/config.js";
import { type AuthTokensResponse } from "../types/response.js";
import { userService } from "./user.service.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";

export const generateToken = (
  user_id: string,
  expires: Moment,
  type: string,
  secret: string = config.jwt.secret
): string => {
  const payload = {
    sub: user_id,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

export const saveToken = async (
  token: string,
  user_id: string,
  expires: Moment,
  type: string
): Promise<tokens> => {
  const createdToken = prisma.tokens.create({
    data: {
      token,
      user_id,
      expires: expires.toDate(),
      type,
    },
  });
  return createdToken;
};

export const verifyToken = async (
  token: string,
  type: string
): Promise<tokens> => {
  const payload = jwt.verify(token, config.jwt.secret);
  const user_id = payload.sub?.toString();
  const tokenData = await prisma.tokens.findFirst({
    where: { token, type, user_id },
  });
  if (!tokenData) {
    throw new Error("Token not found");
  }

  return tokenData;
};

export const generateAuthTokens = async (user: {
  user_id: string;
}): Promise<AuthTokensResponse> => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    "days"
  );
  const accessToken = generateToken(user.user_id, accessTokenExpires, "ACCESS");
  await saveToken(accessToken, user.user_id, accessTokenExpires, "ACCESS");

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
  };
};

export const generateResetPasswordToken = async (
  mobile_no: string
): Promise<string> => {
  const user = await userService.get({ mobile_number: mobile_no });
  if (!user) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "No users found with this Mobile number"
    );
  }

  const expires = moment().add(
    config.jwt.resetPasswordExpirationMinutes,
    "minutes"
  );
  const resetPasswordToken = generateToken(user.user_id, expires, "RESET");
  await saveToken(resetPasswordToken, user.user_id, expires, "RESET");
  return resetPasswordToken;
};
