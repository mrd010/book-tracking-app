import { AuthFormContainer } from '@/components/auth-form-container';
import { useSignupForm } from '@/hooks/use-forms/useSignupForm';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Password } from '@/components/ui/password';
import { useAuth } from '@/hooks/context-hooks/useAuth';
import { AppLink } from '@/components/app-link';
import { Navigate } from 'react-router-dom';

const Signup = () => {
  const { signupForm } = useSignupForm();
  const { signup, error, status } = useAuth();

  if (status === 'authenticated') {
    return <Navigate to="/" />;
  }

  return (
    <AuthFormContainer title="Signup">
      {/* signup form */}
      <Form {...signupForm}>
        <form onSubmit={signupForm.handleSubmit(signup)} className="flex flex-col gap-3">
          {/* email field */}
          <FormField
            control={signupForm.control}
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
            control={signupForm.control}
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
          {/* password confirm field */}
          <FormField
            control={signupForm.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Password placeholder="Confirm Password" className="h-auto text-lg" {...field} />
                </FormControl>
                <FormMessage>{error?.getFieldError('passwordConfirm')}</FormMessage>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="mt-4 text-base font-semibold"
            disabled={status === 'loading'}
          >
            Signup
          </Button>
        </form>
        {/* form footer link to login */}
        <p className="p-2 text-center">
          <span>Have an account? </span>
          <AppLink to="/login">Login</AppLink>
        </p>
      </Form>
    </AuthFormContainer>
  );
};
export default Signup;
