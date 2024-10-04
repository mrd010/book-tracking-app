import { z } from 'zod';
import { loginFormSchema, signupFormSchema } from '../form-schemas';

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;
export type SignupFormSchemaType = z.infer<typeof signupFormSchema>;
