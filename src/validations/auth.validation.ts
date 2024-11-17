import Joi from "joi";
import { password } from "./custom.validation.js";

export const register = {
  body: Joi.object().keys({
    email_address: Joi.string().required().email(),
    name: Joi.string().required(),
    mobile_number: Joi.string()
      .regex(/^[1-9][0-9]{9}$/)
      .messages({ "string.pattern.base": "Phone number must have 10 digits." })
      .required(),
  }),
};

export const login = {
  body: Joi.object().keys({
    mobile_number: Joi.string()
      .regex(/^[1-9][0-9]{9}$/)
      .messages({
        "string.pattern.base": "Phone number must have 10 digits.",
      })
      .required(),
    otp: Joi.string().required(),
  }),
};

export const logout = {
  body: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

export const sendotp = {
  body: Joi.object().keys({
    mobile_number: Joi.string()
      .regex(/^[1-9][0-9]{9}$/)
      .messages({
        "string.pattern.base": "Phone number must have 10 digits.",
      })
      .required(),
  }),
};

export const forgotPassword = {
	body: Joi.object().keys({
		mobile_number: Joi.string().regex(/^[1-9][0-9]{9}$/)
			.messages({ 'string.pattern.base': 'Phone number must have 10 digits.' })
			.required(),
	}),
};

export const resetPassword = {
	query: Joi.object().keys({
		token: Joi.string().required(),
	}),
	body: Joi.object().keys({
		password: Joi.string().required().custom(password),
	}),
};
