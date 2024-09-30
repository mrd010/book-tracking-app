/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { SanitizedUser, UserEssentials } from '../types';
import User from '../models/User';
import { HttpError } from '../lib/classes/CustomError';
import { sanitizeUser, sendResponse } from '../lib/utils';

// get current logged in user
export const getUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id: userId } = req.user as UserEssentials;
  const user = await User.get({ userId });

  if (!user) throw new HttpError(404, 'Not Found');

  //   send sanitized user info
  sendResponse<SanitizedUser>(res, {
    statusCode: 200,
    status: 'success',
    message: 'User found!',
    data: sanitizeUser(user),
  });
});
