import { oplApiGet } from '@/lib/helpers/data';
import { toastError } from '@/lib/helpers/renderers';
import { OPLBookSearchResult } from '@/lib/types/general-types';
import { useQuery } from '@tanstack/react-query';

export const useSearchBooks = (query: string, limit: number = 6) => {
  const searchQuery = useQuery({
    queryKey: ['search-books', query, limit],
    queryFn: async () => {
      const data = await oplApiGet<OPLBookSearchResult>('/search.json', {
        title: query,
        fields: 'key,title,author_key,author_name,editions',
        limit: limit.toString(),
      });
      return data;
    },
    retry(failureCount, error) {
      toastError(error.message || "Can't get search results.");
      return failureCount < 2;
    },
  });

  return searchQuery;
};
