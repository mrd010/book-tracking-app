import { z } from 'zod';

const passwordLengthError = 'Password must be between 8 and 32 characters long.';

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .max(30, { message: 'Email length should be at most 30 characters.' })
    .email({ message: 'Please provide a correct email address.' }),
  password: z
    .string()
    .min(8, { message: passwordLengthError })
    .max(32, { message: passwordLengthError }),
});

export const signupFormSchema = loginFormSchema
  .extend({
    passwordConfirm: z.string(),
  })
  //   check passwords match
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Password confirm does not match password.',
    path: ['passwordConfirm'],
  });
