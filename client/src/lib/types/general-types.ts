import { z } from 'zod';
import { loginFormSchema, signupFormSchema } from '../form-schemas';
import { booksQueriesSchema } from '../query-schemas';

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

// schemas
export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;
export type SignupFormSchemaType = z.infer<typeof signupFormSchema>;
export type BooksQuerySchemaType = z.infer<typeof booksQueriesSchema>;

// enums
export enum BookSortMethods {
  ID = 'id',
  Title = 'title',
  FinishedDate = 'finished-date',
  AddedDate = 'added-date',
}

export enum BookReadStatus {
  NotStarted = 'NOT_STARTED',
  Reading = 'READING',
  Finished = 'FINISHED',
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

// data types
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

export type APIRoute = '/api/auth/login' | '/api/auth/signup' | '/api/user' | '/api/books';

// open library types
export type OPLBookSearchEdition = {
  key: string;
  title: string;
};

export type OPLBookSearchWork = {
  key: string;
  title: string;
  author_key: string[];
  author_name: string[];
  first_publish_year: number;
  number_of_pages_median: number;
  editions: OPLBookSearchBase<OPLBookSearchEdition>;
};

export type OPLBookSearchBase<DocType> = {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: DocType[];
};

export type OPLBookSearchResult = OPLBookSearchBase<OPLBookSearchWork>;
