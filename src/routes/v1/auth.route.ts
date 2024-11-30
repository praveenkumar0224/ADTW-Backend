import express from "express";
import * as authController from "../../controllers/auth.controller.js";
import validate from "../../middlewares/validate.js";
import * as authValidation from "../../validations/auth.validation.js";
import auth from "../../middlewares/auth.js";

const router = express.Router();

router.get("/me", auth("get"), authController.getUserData);
// router.post('/register', validate(authValidation.register), authController.register);
router.post("/login", validate(authValidation.login), authController.login);
router.post(
  "/send-otp",
  validate(authValidation.sendotp),
  authController.sendOTP
);
router.post(
  "/loginWithEmail",
  validate(authValidation.loginwithEmail),
  authController.loginwithEmail
);
router.post(
  "/forgot-password",
  validate(authValidation.forgotPassword),
  authController.forgotPassword
);
router.post(
  "/reset-password",
  validate(authValidation.resetPassword),
  authController.resetPassword
);
export default router;
