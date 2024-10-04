import { loginFormSchema } from '@/lib/form-schemas';
import { LoginFormSchemaType } from '@/lib/types/general-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const useLoginForm = () => {
  const loginForm = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function submit(values: LoginFormSchemaType) {
    console.log(values);
  }

  return { loginForm, submit };
};
