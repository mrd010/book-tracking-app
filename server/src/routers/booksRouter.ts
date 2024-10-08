import { Router } from 'express';
import { userBooksGetValidator } from '../middlewares/validators/query-validators/booksValidator';
import {
  addBookToLibrary,
  deleteBook,
  editBookStatus,
  getUserBooks,
} from '../controllers/booksController';
import {
  deleteBookValidator,
  editBookValidator,
  newBookFormValidator,
} from '../middlewares/validators/form-validators/newBookValidator';
import { validationParser } from '../middlewares/validationParser';

const booksRouter = Router();

// books?status=reading&sort=id&order=asc
booksRouter.get('/', userBooksGetValidator, getUserBooks);
booksRouter.post('/', newBookFormValidator, validationParser, addBookToLibrary);
booksRouter.put('/', editBookValidator, validationParser, editBookStatus);
booksRouter.delete('/', deleteBookValidator, validationParser, deleteBook);

export default booksRouter;
