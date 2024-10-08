import { BookInfo, BooksQuerySchemaType } from '@/lib/types/general-types';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context-hooks/useAuth';
import { serverApiGet } from '@/lib/helpers/data';
import { toastError } from '@/lib/helpers/renderers';

export const useBooks = (queries: BooksQuerySchemaType) => {
  const { authToken } = useAuth();
  const booksQuery = useQuery({
    queryKey: ['books', queries, authToken],
    queryFn: async () => {
      //   get books info
      const response = await serverApiGet<{ userId: number; count: number; books: BookInfo[] }>(
        '/api/books',
        { queries, authToken },
      );
      if (response.status === 'success') return response.data;
      throw new Error(response.message);
    },
    retry(failureCount, error) {
      toastError(error.message || "Sorry! can't load books.");
      return failureCount < 5;
    },
  });

  return booksQuery;
};
