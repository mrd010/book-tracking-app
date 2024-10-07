import { useLogin } from '@/hooks/query-hooks/useLogin';
import { useSignup } from '@/hooks/query-hooks/useSignup';
import { useUser } from '@/hooks/query-hooks/useUser';
import APIError from '@/lib/classes/APIError';
import { toastError, toastSuccess } from '@/lib/helpers/renderers';
import {
  APIResponse,
  AuthResult,
  LoginFormSchemaType,
  SignupFormSchemaType,
  UserEssentials,
} from '@/lib/types/general-types';
import { useQueryClient } from '@tanstack/react-query';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';

type AuthStatus = 'not-authenticated' | 'loading' | 'authenticated';

type AuthContextType = {
  authToken: string | undefined;
  user: UserEssentials | undefined;
  status: AuthStatus;
  error: APIError | null;
  clearError: (field?: string) => void;
  login: (loginCredentials: LoginFormSchemaType) => void;
  signup: (signupCredentials: SignupFormSchemaType) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  // auth token in local storage
  const [authToken, setAuthToken, removeAuthToken] = useLocalStorage<string>('token');
  // error object when auth error or form error happens
  const [error, setError] = useState<APIError | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const queryClient = useQueryClient();

  // get user info on token set
  const { data: user, error: userError, status: userStatus, isError } = useUser(authToken);

  // on fetch user error set auth error
  useEffect(() => {
    if (userStatus === 'error') {
      setError(new APIError(userError.message));
    }
  }, [userStatus, userError, isError]);

  // auth result parser
  const parseAuthResult = (authResult: APIResponse<AuthResult>) => {
    if (authResult.status === 'success') {
      // on successful authentication set token
      if (authResult.data) {
        setAuthToken(authResult.data.token);
        toastSuccess('Logged in.');
      } else throw Error('No auth data received'); // never
    } else {
      if (authResult.statusCode > 400) {
        // on fatal error go to error page
        throw new Response(authResult.message, { status: authResult.statusCode });
      }
      // on failed authentication set error message and field errors
      toastError(authResult.message);
      setError(new APIError(authResult.message, authResult.errors));
    }
  };

  // create login mutation query
  const loginMutation = useLogin(parseAuthResult);
  // create signup mutation query
  const signupMutation = useSignup(parseAuthResult);

  // auth status
  const status: AuthStatus = authToken
    ? 'authenticated'
    : loginMutation.isPending || signupMutation.isPending || isLoggingOut
      ? 'loading'
      : 'not-authenticated';

  const clearError = (field?: string) => {
    setError((err) => {
      if (!field || !err || !err.validationErrors) return null;
      return new APIError(
        err.message,
        err.validationErrors.filter((e) => e.path !== field),
      );
    });
  };

  const login = (loginCredentials: LoginFormSchemaType) => {
    loginMutation.mutate(loginCredentials);
  };

  const signup = (signupCredentials: SignupFormSchemaType) => {
    signupMutation.mutate(signupCredentials);
  };

  const logout = async () => {
    setIsLoggingOut(true);
    clearError();
    await queryClient.invalidateQueries({ queryKey: [authToken] });
    setIsLoggingOut(false);
    removeAuthToken();
  };

  const value: AuthContextType = {
    authToken,
    user, // user info with id and email
    status, // auth status
    error, // auth error and field validation errors
    clearError,
    login,
    signup,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
