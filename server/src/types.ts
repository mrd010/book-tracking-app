import { Book, BookReadStatus, Prisma, User, UserBook } from '@prisma/client';

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
  status: BookReadStatus;
  rate?: number;
};
export type EditBookFormSchema = {
  id: string;
  status: BookReadStatus;
  rate?: number;
};
export type DeleteBookFormSchema = {
  id: string;
};

export type BookSortMethods = 'id' | 'title' | 'finished-date' | 'added-date';
export type BooksOrderType = {
  method: BookSortMethods;
  order: Prisma.SortOrder;
};
export type BooksListFilter = {
  status?: BookReadStatus;
};

export type BooksReqQueries = {
  status?: BookReadStatus;
  sort?: BookSortMethods;
  order?: Prisma.SortOrder;
};

export type UserEssentials = Pick<User, 'id' | 'email'>;
export type SanitizedUser = Omit<User, 'password'>;
export type BookInfo = Omit<UserBook, 'userId'> & { book: Omit<Book, 'olid'> };
export type EditedBookInfo = Omit<UserBook, 'userId' | 'addedAt'>;

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
