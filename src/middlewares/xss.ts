import { type NextFunction, type Request, type Response } from 'express';
import { inHTMLData } from 'xss-filters';

/**
 * Clean for xss.
 * @param {string/object} data - The value to sanitize
 * @return {string/object} The sanitized value
 */
export const clean = <T>(data: T | string = ''): T => {
  let isObject = false;
  if (typeof data === 'object') {
    data = JSON.stringify(data);
    isObject = true;
  }

  data = inHTMLData(data as string).trim();
  if (isObject) {
    data = JSON.parse(data);
  }

  return data as T;
};

const middleware = () => (req: Request, res: Response, next: NextFunction) => {
  req.body &&= clean(req.body);
  req.query &&= clean(req.query);
  req.params &&= clean(req.params);
  next();
};

export default middleware;
