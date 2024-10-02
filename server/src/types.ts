import { Book, Prisma, User, UserBook } from '@prisma/client';

export type SignupFormSchema = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export type LoginFormSchema = {
  email: string;
  password: string;
};

export type NewBookFormSchema = {
  id: string;
  title: string;
  author: string;
  isFinished: boolean;
  rate?: number;
};

export type BookStatus = 'reading' | 'finished' | 'not-started';
export type BookSortMethods = 'id' | 'title' | 'finished-date' | 'added-date';
export type BooksOrderType = {
  method: BookSortMethods;
  order: Prisma.SortOrder;
};
export type BooksListFilter = {
  status?: BookStatus;
};

export type BooksReqQueries = {
  status?: BookStatus;
  sort?: BookSortMethods;
  order?: Prisma.SortOrder;
};

export type UserEssentials = Pick<User, 'id' | 'email'>;
export type SanitizedUser = Omit<User, 'password'>;
export type BookInfo = Omit<UserBook, 'userId'> & { book: Omit<Book, 'olid'> };

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
