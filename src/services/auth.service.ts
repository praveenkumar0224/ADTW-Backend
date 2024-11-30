import httpStatus from "http-status";
import * as prismaClient from "@prisma/client";
import * as tokenService from "./token.service.js";
import ApiError from "../utils/ApiError.js";
import prisma from "../client.js";
import { userService } from "./user.service.js";
import * as otpService from "./otp.service.js";
import { isPasswordMatch } from "../utils/encryption.js";
import exclude from "../utils/exclude.js";

export const loginUserWithMobile = async (
  mobile_number: string,
  otp: string
) => {
  const verifyotp = await otpService.verifyOtp(mobile_number, otp);
  if (!verifyotp) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid OTP");
  }
  const user = await userService.get({ mobile_number });
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "User Not Found");
  }
  return user;
};

export const resetPassword = async (
  resetPasswordToken: string,
  newPassword: string
): Promise<void> => {
  try {
    const resetPasswordTokenData = await tokenService.verifyToken(
      resetPasswordToken,
      "RESET"
    );
    const user = await userService.get({
      user_id: resetPasswordTokenData.user_id,
    });
    if (!user) {
      throw new Error();
    }

    await userService.update(
      { user_id: user.user_id },
      { password: newPassword }
    );
    await prisma.tokens.deleteMany({
      where: { user_id: user.user_id, type: "RESET" },
    });
  } catch {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password reset failed");
  }
};

export const loginUserWithEmail = async (
  email_address: string,
  password: string
) => {
  const user = await prisma.user.findUnique({
    where: { email_address },
  });
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "User not found");
  }
  const isPasswordValid = isPasswordMatch(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }
  const safeUser = exclude(user, ["password"]);
  return safeUser;
};

export const logout = async (refreshToken: string): Promise<void> => {
  const refreshTokenData = await prisma.tokens.findFirst({
    where: {
      token: refreshToken,
      type: "ACCESS",
    },
  });
  if (!refreshTokenData) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not found");
  }

  await prisma.tokens.delete({
    where: { token_id: refreshTokenData.token_id },
  });
};
