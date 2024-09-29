import { Response } from 'express';
import { APIResponse, FieldError, UserEssentials } from '../types';
import { Result, ValidationError } from 'express-validator';
import bcrypt from 'bcryptjs';
import { jwtSecret, salt } from '../env-globals';
import jwt from 'jsonwebtoken';

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

export const generateJWT = (payload: UserEssentials) => {
  if (!jwtSecret) {
    throw new Error('JWT secret not provided.');
  }
  return jwt.sign(payload, jwtSecret, { expiresIn: '10d' });
};
