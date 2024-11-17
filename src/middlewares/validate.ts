import httpStatus from 'http-status';
import { type NextFunction, type Request, type Response } from 'express';
import Joi from 'joi';
import ApiError from '../utils/ApiError.js';
import pick from '../utils/pick.js';

const validate =
  (schema: Record<string, unknown>) => (req: Request, res: Response, next: NextFunction) => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: 'key' }, abortEarly: false })
      .validate(object);
    if (error) {
      const errorMessage = error.details.map((details) => details.message).join(', ');
      next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
      return;
    }

    Object.assign(req, value);
    next();
  };

export default validate;
