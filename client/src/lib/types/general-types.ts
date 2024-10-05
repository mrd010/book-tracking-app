import { z } from 'zod';
import { loginFormSchema, signupFormSchema } from '../form-schemas';

// server types
type User = {
  id: number;
  email: string;
  password: string;
  createdAt: Date;
};

type UserBook = {
  userId: number;
  bookId: string;
  status: BookReadStatus;
  rate: number | null;
  addedAt: Date;
  finishedAt: Date | null;
};

type Book = {
  title: string;
  olid: string;
  author: string;
};

// form schemas
export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;
export type SignupFormSchemaType = z.infer<typeof signupFormSchema>;

// data types
export type BookSortMethods = 'id' | 'title' | 'finished-date' | 'added-date';
export type BookReadStatus = 'NOT_STARTED' | 'READING' | 'FINISHED';
export type SortOrder = 'asc' | 'desc';

export type UserEssentials = Pick<User, 'id' | 'email'>;
export type SanitizedUser = Omit<User, 'password'>;
export type BookInfo = Omit<UserBook, 'userId'> & { book: Omit<Book, 'olid'> };
export type EditedBookInfo = Omit<UserBook, 'userId' | 'addedAt'>;

// helper types
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
