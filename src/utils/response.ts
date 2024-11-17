import { type Response } from 'express-serve-static-core';
import httpStatus from 'http-status';
import { type ResponseObject } from '../types/response.js';

const responseHandler = (response: Response, object?: any, status?: number) => {
  const finalStatus = status ?? httpStatus.OK;
  const responseObject: ResponseObject = {
    status: finalStatus >= 200 && finalStatus < 300 // Status is true for 2xx codes.
  };

  if (object) {
    responseObject.data = object; // eslint-disable-line @typescript-eslint/no-unsafe-assignment
  }

  return response.status(finalStatus).send(responseObject);
};

export default responseHandler;
