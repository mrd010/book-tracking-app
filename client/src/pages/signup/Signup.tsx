import { AuthFormContainer } from '@/components/auth-form-container';
import { useSignupForm } from '@/hooks/use-forms/useSignupForm';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Password } from '@/components/ui/password';

const Signup = () => {
  const { signupForm, submit } = useSignupForm();

  return (
    <AuthFormContainer title="Signup">
      {/* signup form */}
      <Form {...signupForm}>
        <form onSubmit={signupForm.handleSubmit(submit)} className="flex flex-col gap-3">
          {/* email field */}
          <FormField
            control={signupForm.control}
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
            control={signupForm.control}
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
          {/* password confirm field */}
          <FormField
            control={signupForm.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Password placeholder="Confirm Password" className="h-auto text-lg" {...field} />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-4 text-base font-semibold">
            Signup
          </Button>
        </form>
      </Form>
    </AuthFormContainer>
  );
};
export default Signup;
