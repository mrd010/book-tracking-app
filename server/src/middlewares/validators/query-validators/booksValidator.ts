import { query } from 'express-validator';
import { bookReadStatuses, bookSortMethods, booksSortOrders } from '../../../data/validators-data';

// ?status=reading
const booksStatusValidator = query('status')
  .optional()
  .custom((value) => bookReadStatuses.includes(value));

// ?sort=id
const booksSortByValidator = query('sort')
  .optional()
  .custom((value) => bookSortMethods.includes(value));

//   ?order=asc
const booksOrderValidator = query('order')
  .optional()
  .custom((value) => booksSortOrders.includes(value));

export const userBooksGetValidator = [
  booksStatusValidator,
  booksSortByValidator,
  booksOrderValidator,
];
