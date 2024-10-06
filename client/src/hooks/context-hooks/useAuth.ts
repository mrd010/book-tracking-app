import { AuthContext } from '@/contexts/auth-context';
import { useContext } from 'react';

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('Auth context should be used inside auth provider.');
  }
  return authContext;
};
