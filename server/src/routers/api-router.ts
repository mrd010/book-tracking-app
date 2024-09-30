import { Router } from 'express';
import authRouter from './authRouter';
import { guestGuard, userGuard } from '../middlewares/authGuards';
import { getUser } from '../controllers/userController';

const apiRouter = Router();

// auth route for login and signup
apiRouter.use('/auth', guestGuard, authRouter);

// user route
apiRouter.use('/user', userGuard, getUser);

export default apiRouter;
