import { BookReadStatus } from '@/lib/types/general-types';

export const bookReadStatuses: BookReadStatus[] = ['NOT_STARTED', 'READING', 'FINISHED'] as const;
export const libPages: Record<BookReadStatus, string> = {
  NOT_STARTED: 'Not Started Books',
  READING: 'Currently Reading Books',
  FINISHED: 'Finished Books',
};
