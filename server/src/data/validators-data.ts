import { BookReadStatus, Prisma } from '@prisma/client';
import { BookSortMethods } from '../types';

export const bookReadStatuses: BookReadStatus[] = ['NOT_STARTED', 'READING', 'FINISHED'];
export const bookSortMethods: BookSortMethods[] = ['id', 'title', 'finished-date', 'added-date'];
export const booksSortOrders: Prisma.SortOrder[] = ['asc', 'desc'];
