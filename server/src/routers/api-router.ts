import { Router } from 'express';
import authRouter from './authRouter';
import { guestGuard, userGuard } from '../middlewares/authGuards';
import userRouter from './userRouter';
import booksRouter from './booksRouter';

const apiRouter = Router();

// auth route for login and signup
apiRouter.use('/auth', guestGuard, authRouter);

// user route
apiRouter.use('/user', userGuard, userRouter);

// books route
apiRouter.use('/books', userGuard, booksRouter);

export default apiRouter;
