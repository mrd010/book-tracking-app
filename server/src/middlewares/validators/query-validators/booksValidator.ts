import { query } from 'express-validator';
import { BookSortMethods } from '../../../types';
import { Prisma } from '@prisma/client';
const bookReadStatuses = ['stopped', 'reading', 'finished', 'not-started'];
const bookSortMethods: BookSortMethods[] = ['id', 'title', 'finished-date', 'added-date'];
const booksSortOrders: Prisma.SortOrder[] = ['asc', 'desc'];

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
