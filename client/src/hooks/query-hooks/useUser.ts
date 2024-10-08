import { serverApiGet } from '@/lib/helpers/data';
import { toastError } from '@/lib/helpers/renderers';
import { UserEssentials } from '@/lib/types/general-types';
import { useQuery } from '@tanstack/react-query';

export const useUser = (authToken: string | undefined) => {
  const userQuery = useQuery({
    queryKey: [authToken],
    queryFn: async () => {
      const response = await serverApiGet<UserEssentials>('/api/user', { authToken });
      if (response.status === 'success') return response.data;
      //   on error go to error page
      throw new Error(response.message);
    },
    enabled: !!authToken,
    retry(failureCount, error) {
      toastError(error.message || 'Error while loading user info.');
      return failureCount < 5;
    },
  });

  return userQuery;
};
