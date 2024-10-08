import { BookReadStatus, BookSortMethods, SortOrder } from '@/lib/types/general-types';

export const bookReadStatuses: BookReadStatus[] = [
  BookReadStatus.NotStarted,
  BookReadStatus.Reading,
  BookReadStatus.Finished,
];

export const libPages: Record<BookReadStatus, string> = {
  NOT_STARTED: 'Not Started Books',
  READING: 'Currently Reading Books',
  FINISHED: 'Finished Books',
};
export const bookSortMethods: BookSortMethods[] = [
  BookSortMethods.ID,
  BookSortMethods.Title,
  BookSortMethods.AddedDate,
  BookSortMethods.FinishedDate,
] as const;

export const booksSortOrders: SortOrder[] = [SortOrder.Asc, SortOrder.Desc] as const;
