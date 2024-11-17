import { type ErrorRequestHandler } from 'express';
import { Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import config from '../config/config.js';
import logger from '../config/logger.js';
import ApiError from '../utils/ApiError.js';

const handlePrismaError = (error: any): string => {
  switch (error.code) {
    case 'P2002':
      // handling duplicate key errors
      return `Duplicate field value: ${error.meta.target}`;
    case 'P2014':
      // handling invalid id error
      return `Invalid ID: ${error.meta.target}`;
    case 'P2003':
      // handling invalid data error
      return `Invalid input data: ${error.meta.target}`;
    case 'P2025':
      return `Record Not found`;
    default:
      // handling all other error
      return `Something went wrong: ${error.message}`;
  }
};

export const errorConverter: ErrorRequestHandler = (error_, req, res, next) => {
  let error = error_;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof Prisma.PrismaClientKnownRequestError
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    let message;
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      message = handlePrismaError(error) || httpStatus[statusCode];
    } else {
      message = error.message || httpStatus[statusCode];
    }
    error = new ApiError(statusCode, message, false, error_.stack);
  }
  // next(error);
  errorHandler(error, req, res, next);
};

export const errorHandler: ErrorRequestHandler = (error, req, res) => {
  let { statusCode, message } = error;
  if (config.env === 'production' && !error.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = error.message;

  const response = {
    code: statusCode,
    message,
    ...(config.env === 'development' && { stack: error.stack })
  };
  console.log(response);

  if (config.env === 'development') {
    logger.error(error);
  }

  res.status(statusCode).send(response);
};
