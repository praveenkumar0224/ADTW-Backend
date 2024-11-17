import { type RequestHandler } from 'express';
import { type Request, type Response, type NextFunction } from 'express-serve-static-core';

export type CustomParamsDictionary = Record<string, any>;

const catchAsync =
  (function_: RequestHandler<CustomParamsDictionary>) =>
  (req: Request<CustomParamsDictionary, any, any, any>, res: Response, next: NextFunction) => {
    Promise.resolve(function_(req, res, next)).catch((error) => {
      next(error);
    });
  };

export default catchAsync;
