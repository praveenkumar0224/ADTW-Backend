import httpStatus from "http-status";
import * as tokenService from "../services/token.service.js";
import { userService } from "../services/user.service.js";
import * as authService from "../services/auth.service.js";
import { type userfromcache } from "../types/Auth/controller.js";
import catchAsync from "../utils/catchAsync.js";
import responseHandler from "../utils/response.js";
import ApiError from "../utils/ApiError.js";
import { createOtp } from "../services/otp.service.js";

export const register = catchAsync(async (req, res) => {
  const { email_address, mobile_number, name, password } = req.body;
  await userService.create({
    email_address,
    name,
    password: password,
    mobile_number,
    roles: "USER",
  });
  responseHandler(
    res,
    { message: "User Created Successfully" },
    httpStatus.CREATED
  );
});

export const login = catchAsync(async (req, res) => {
  const { mobile_number, otp } = req.body;
  const user = await authService.loginUserWithMobile(mobile_number, otp);
  const token = await tokenService.generateAuthTokens({
    user_id: user.user_id,
  });
  return responseHandler(res, { user, token }, httpStatus.OK);
});

export const getUserData = catchAsync(async (req, res) => {
  const { user_id } = req.user as userfromcache;
  const user = await userService.get({ user_id });
  responseHandler(res, user, httpStatus.OK);
});

export const forgotPassword = catchAsync(async (request, res) => {
  const user = await userService.get({ mobile_number: request.body.mobile_no });
  if (!user) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "No users found with this Mobile number"
    );
  }
  const resetPasswordToken = await tokenService.generateResetPasswordToken(
    request.body.mobile_number
  );
  // await emailService.sendResetPasswordEmail(request.body.mobile_no, resetPasswordToken);
  await createOtp(request.body.mobile_number);
  responseHandler(res, { resetPasswordToken, user_id: user.user_id });
});

export const resetPassword = catchAsync(async (request, res) => {
  await authService.resetPassword(
    request.query.token as string,
    request.body.password
  );
  responseHandler(res, null, httpStatus.NO_CONTENT);
});

export const sendOTP = catchAsync(async (req, res) => {
  const { mobile_number } = req.body;
  await userService.get({ mobile_number });
  await createOtp(mobile_number);
  responseHandler(res, null, httpStatus.OK);
});

export const loginwithEmail = catchAsync(async (req, res) => {
  const { email_address, password } = req.body;
  const user = await authService.loginUserWithEmail(email_address, password);
  const token = await tokenService.generateAuthTokens({
    user_id: user.user_id,
  });
  return responseHandler(res, { user, token }, httpStatus.OK);
});

export const logout = catchAsync(async (request, res) => {
	await authService.logout(request.body.refreshToken);
	responseHandler(res, null, httpStatus.NO_CONTENT);
});