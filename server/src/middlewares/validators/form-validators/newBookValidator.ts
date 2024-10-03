import { body } from 'express-validator';
import { isOLID } from '../../../lib/utils';
import { bookReadStatuses } from '../../../data/validators-data';

const bookIdValidator = body('id')
  .notEmpty()
  .withMessage('Book ID must not be empty.')
  .bail()
  .custom((value) => {
    if (isOLID(value)) return true; // check if id is open library id
    throw new Error('Provided book ID is not a valid open library ID.');
  })
  .escape();

const bookTitleValidator = body('title')
  .notEmpty()
  .withMessage('Title must not be empty.')
  .escape();

const bookAuthorValidator = body('author')
  .notEmpty()
  .withMessage('Author must not be empty.')
  .escape();

const bookStatusValidator = body('status').custom((value) => bookReadStatuses.includes(value));

const bookRateValidator = body('rate')
  .if(body('status').equals('finished')) // only validate rate if book is finished
  .optional({ values: 'falsy' })
  .isInt({ min: 1, max: 5 })
  .withMessage('Rate should be between 1 and 5.')
  .toInt();

export const newBookFormValidator = [
  bookIdValidator,
  bookTitleValidator,
  bookAuthorValidator,
  bookStatusValidator,
  bookRateValidator,
];

export const editBookValidator = [bookIdValidator, bookStatusValidator, bookRateValidator];
export const deleteBookValidator = [bookIdValidator];
