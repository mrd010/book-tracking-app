import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../lib/classes/CustomError';

// guard which protects routes from non users
export const userGuard = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated() && req.user) return next();
  throw new HttpError(404, 'Unauthorized');
};

// guard which protects routes from users
export const guestGuard = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated() || !req.user) return next();
  throw new HttpError(403, 'Forbidden');
};
