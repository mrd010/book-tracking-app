import { Router } from 'express';
import { userBooksGetValidator } from '../middlewares/validators/query-validators/booksValidator';
import { getUserBooks } from '../controllers/booksController';

const booksRouter = Router();

booksRouter.get('/', userBooksGetValidator, getUserBooks);

export default booksRouter;
