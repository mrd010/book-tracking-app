import { Response } from 'express';
import { APIResponse, FieldError, SanitizedUser, UserEssentials } from '../types';
import { Result, ValidationError } from 'express-validator';
import bcrypt from 'bcryptjs';
import { jwtSecret, salt } from '../env-globals';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

export const sendResponse = <T>(res: Response, data: APIResponse<T>) => {
  res.status(data.statusCode).json(data);
};

// parse field errors from validation result
export const extractFieldErrors = (vResult: Result<ValidationError>): FieldError[] => {
  return vResult
    .array()
    .filter((err) => err.type === 'field')
    .map((err): FieldError => ({ path: err.path, message: err.msg }));
};

// hash passwords
export const generatePassword = async (password: string) => {
  return await bcrypt.hash(password, salt);
};

// compare passwords with hashed one
export const checkPassword = async (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};

// create jwt token with expiration of 10 day
export const generateJWT = (payload: UserEssentials) => {
  if (!jwtSecret) {
    throw new Error('JWT secret not provided.');
  }
  return jwt.sign(payload, jwtSecret, { expiresIn: '10d' });
};

// purge sensitive user info from user object
export const sanitizeUser = (user: User): SanitizedUser => {
  const { id, email, createdAt } = user;
  return { id, email, createdAt };
};

// check if string is open library id
export const isOLID = (str: string) => {
  // check if id starts with OL (open library) and ends with M (book edition)
  if (str.startsWith('OL') && str.endsWith('M')) {
    // check if string contains number id
    const id = Number(str.slice(2, -1));
    if (!isNaN(id)) {
      return true;
    }
  }
  return false;
};
