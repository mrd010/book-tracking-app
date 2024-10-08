import { z } from 'zod';
import { BookReadStatus, BookSortMethods, SortOrder } from './types/general-types';

export const booksQueriesSchema = z.object({
  status: z.nativeEnum(BookReadStatus).optional(),
  sort: z.nativeEnum(BookSortMethods).optional(),
  order: z.nativeEnum(SortOrder).optional(),
});
