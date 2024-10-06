import { AuthFormContainer } from '@/components/auth-form-container';
import { useLoginForm } from '@/hooks/use-forms/useLoginForm';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Password } from '@/components/ui/password';
import { useAuth } from '@/hooks/context-hooks/useAuth';
import { AppLink } from '@/components/app-link';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const { loginForm } = useLoginForm();
  const { login, error, status } = useAuth();

  if (status === 'authenticated') {
    return <Navigate to="/" />;
  }

  return (
    <AuthFormContainer title="Login">
      {/* login form */}
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(login)} className="flex flex-col gap-3">
          {/* email field */}
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email" className="h-auto font-mono text-lg" {...field} />
                </FormControl>
                <FormMessage>{error?.getFieldError('email')}</FormMessage>
              </FormItem>
            )}
          />
          {/* password field */}
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Password placeholder="Password" className="h-auto text-lg" {...field} />
                </FormControl>
                <FormMessage>{error?.getFieldError('password')}</FormMessage>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="mt-4 text-base font-semibold"
            disabled={status === 'loading'}
          >
            Login
          </Button>
        </form>
        {/* form footer link to login */}
        <p className="p-2 text-center">
          <span>Don't have an account yet? </span>
          <AppLink to="/signup">Signup</AppLink>
        </p>
      </Form>
    </AuthFormContainer>
  );
};
export default Login;
