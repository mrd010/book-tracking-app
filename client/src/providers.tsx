import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from './contexts/auth-context';
import ReactRouter from './router';

const Providers = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ReactRouter />
      </AuthProvider>
    </QueryClientProvider>
  );
};
export default Providers;
