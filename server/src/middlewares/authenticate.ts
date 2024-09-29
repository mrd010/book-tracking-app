import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { UserEssentials } from '../types';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', (err: unknown, user: UserEssentials) => {
    if (err) return next(err);
    if (user) req.user = user;
    next();
  })(req, res, next);
};
