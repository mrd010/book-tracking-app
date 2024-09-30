import { Router } from 'express';
import authRouter from './authRouter';
import { guestGuard, userGuard } from '../middlewares/authGuards';
import { getUser } from '../controllers/userController';
import { getUserBooks } from '../controllers/booksController';
import { userBooksGetValidator } from '../middlewares/validators/query-validators/booksValidator';

const apiRouter = Router();

// auth route for login and signup
apiRouter.use('/auth', guestGuard, authRouter);

// user route
apiRouter.use('/user', userGuard, getUser);

// books route
apiRouter.use('/books', userGuard, userBooksGetValidator, getUserBooks);

export default apiRouter;
