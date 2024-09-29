import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { extractFieldErrors, sendResponse } from '../lib/utils';

export const validationParser = (req: Request, res: Response, next: NextFunction) => {
  const vResult = validationResult(req);
  // pass to controller if no validation errors
  if (vResult.isEmpty()) {
    return next();
  }

  // send field errors
  sendResponse(res, {
    status: 'error',
    statusCode: 400,
    message: 'Validation Error',
    errors: extractFieldErrors(vResult),
  });
};
