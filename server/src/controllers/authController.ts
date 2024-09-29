/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { matchedData } from 'express-validator';
import { HttpError } from '../lib/classes/CustomError';
import { generateJWT, generatePassword, sendResponse } from '../lib/utils';
import { AuthResult, LoginFormSchema, SignupFormSchema } from '../types';
import User from '../models/User';

export const signup = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = matchedData(req) as SignupFormSchema;
  //   check if email and password both has passed validation
  if (!email || !password) {
    throw new HttpError(400, 'Bad Request.');
  }
  // encrypt password before save
  const hashedPassword = await generatePassword(password);

  // register new user
  const newUser = await User.create(email, hashedPassword);

  // create token
  const token = generateJWT({ id: newUser.id, email });

  sendResponse<AuthResult>(res, {
    statusCode: 201,
    status: 'success',
    message: 'User created.',
    data: { id: newUser.id, token },
  });
});

export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { email } = matchedData(req) as LoginFormSchema;
  //   check if email and password both has passed validation
  if (!email) {
    throw new HttpError(400, 'Bad Request.');
  }

  // get user
  const user = await User.get({ email });
  if (!user) {
    throw new HttpError(401, 'Unauthorized');
  }

  // create token
  const token = generateJWT({ id: user.id, email: user.email });

  sendResponse<AuthResult>(res, {
    statusCode: 201,
    status: 'success',
    message: 'Authenticated.',
    data: {
      id: user.id,
      token,
    },
  });
});
