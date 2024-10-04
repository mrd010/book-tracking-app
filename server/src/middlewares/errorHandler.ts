import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../lib/classes/CustomError';
import { sendResponse } from '../lib/utils';

export const errorHandler = (
  err: Error | HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    console.error(err);
    return sendResponse(res, {
      statusCode: err instanceof HttpError ? err.statusCode : 500,
      status: 'error',
      message: err.message,
    });
  }
  next();
};
