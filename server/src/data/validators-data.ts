import { Prisma } from '@prisma/client';
import { BookSortMethods } from '../types';

export const bookReadStatuses = ['reading', 'finished', 'not-started'];
export const bookSortMethods: BookSortMethods[] = ['id', 'title', 'finished-date', 'added-date'];
export const booksSortOrders: Prisma.SortOrder[] = ['asc', 'desc'];
