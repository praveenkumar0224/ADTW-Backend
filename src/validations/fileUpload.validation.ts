import Joi from 'joi';

export const fileUpload = {
  file: Joi.any().required()
};
