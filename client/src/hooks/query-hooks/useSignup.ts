import { httpPost } from '@/lib/helpers/data';
import { APIResponse, AuthResult, SignupFormSchemaType } from '@/lib/types/general-types';
import { useMutation } from '@tanstack/react-query';

export const useSignup = (onResponse: (authResult: APIResponse<AuthResult>) => void) => {
  const signupMutation = useMutation({
    mutationFn: async (signupCredentials: SignupFormSchemaType) => {
      return await httpPost<AuthResult>('/api/auth/signup', signupCredentials);
    },
    onSuccess(data) {
      onResponse(data);
    },
    throwOnError: true,
  });

  return signupMutation;
};
