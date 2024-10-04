import { AuthFormContainer } from '@/components/auth-form-container';
import { useLoginForm } from '@/hooks/use-forms/useLoginForm';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Password } from '@/components/ui/password';

const Login = () => {
  const { loginForm, submit } = useLoginForm();

  return (
    <AuthFormContainer title="Login">
      {/* login form */}
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(submit)} className="flex flex-col gap-3">
          {/* email field */}
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email" className="h-auto font-mono text-lg" {...field} />
                </FormControl>
                <FormMessage></FormMessage>
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
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-4 text-base font-semibold">
            Login
          </Button>
        </form>
      </Form>
    </AuthFormContainer>
  );
};
export default Login;
