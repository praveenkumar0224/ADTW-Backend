import type Joi from 'joi';

export const password: Joi.CustomValidator<string> = (value, helpers) => {
  if (value.length < 8) {
    return helpers.error('any.invalid');
  }

  if (!/\d/.test(value) || !/[a-zA-Z]/.test(value)) {
    return helpers.error('any.invalid');
  }

  return value;
};
