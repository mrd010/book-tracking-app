import { signupFormSchema } from '@/lib/form-schemas';
import { SignupFormSchemaType } from '@/lib/types/general-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const useSignupForm = () => {
  const signupForm = useForm<SignupFormSchemaType>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  function submit(values: SignupFormSchemaType) {
    console.log(values);
  }

  return { signupForm, submit };
};
