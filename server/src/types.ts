import { User } from '@prisma/client';

export type SignupFormSchema = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export type LoginFormSchema = {
  email: string;
  password: string;
};

export type UserEssentials = Pick<User, 'id' | 'email'>;
export type SanitizedUser = Omit<User, 'password'>;

export type AuthResult = {
  id: number;
  token: string;
};

export type FieldError = {
  path: string;
  message: string;
};

export type APIResponse<T> = {
  statusCode: number;
  status: 'success' | 'error';
  message: string;
  data?: T;
  errors?: FieldError[];
};
