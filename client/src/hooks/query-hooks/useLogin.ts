import { httpPost } from '@/lib/helpers/data';
import { APIResponse, AuthResult, LoginFormSchemaType } from '@/lib/types/general-types';
import { useMutation } from '@tanstack/react-query';

export const useLogin = (onResponse: (authResult: APIResponse<AuthResult>) => void) => {
  const loginMutation = useMutation({
    mutationFn: async (loginCredentials: LoginFormSchemaType) => {
      return await httpPost<AuthResult>('/api/auth/login', loginCredentials);
    },
    onSuccess(data) {
      onResponse(data);
    },
    throwOnError: true,
  });

  return loginMutation;
};
