import { Router } from 'express';
import { userBooksGetValidator } from '../middlewares/validators/query-validators/booksValidator';
import { addBookToLibrary, getUserBooks } from '../controllers/booksController';
import { newBookFormValidator } from '../middlewares/validators/form-validators/newBookValidator';
import { validationParser } from '../middlewares/validationParser';

const booksRouter = Router();

booksRouter.get('/', userBooksGetValidator, getUserBooks);
booksRouter.post('/', newBookFormValidator, validationParser, addBookToLibrary);

export default booksRouter;
