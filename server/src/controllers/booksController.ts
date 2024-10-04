/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import {
  BookInfo,
  BooksReqQueries,
  DeleteBookFormSchema,
  EditBookFormSchema,
  EditedBookInfo,
  NewBookFormSchema,
  UserEssentials,
} from '../types';
import Book from '../models/Book';
import { sendResponse } from '../lib/utils';
import { matchedData } from 'express-validator';

// get all books user added with different filters
export const getUserBooks = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user as UserEssentials; // get current user id
    const { status, sort, order } = matchedData<BooksReqQueries>(req); // get url queries

    // get user added books
    const userBooks = await Book.getAll(id, { status }, sort, order);

    sendResponse<{ userId: number; count: number; books: BookInfo[] }>(res, {
      statusCode: 200,
      status: 'success',
      message: `Found ${userBooks.length} books.`,
      data: { userId: id, count: userBooks.length, books: userBooks },
    });
  }
);

// create a new book entry
export const addBookToLibrary = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: userId } = req.user as UserEssentials; // get current user id

    const newBookFormValues = matchedData<NewBookFormSchema>(req);
    console.log(newBookFormValues);

    // add book to user library with provided infos
    const newBookAdded = await Book.create(userId, newBookFormValues);

    sendResponse<BookInfo>(res, {
      statusCode: 201,
      status: 'success',
      message: 'Book Added',
      data: {
        bookId: newBookAdded.bookId,
        status: newBookAdded.status,
        rate: newBookAdded.rate,
        addedAt: newBookAdded.addedAt,
        finishedAt: newBookAdded.finishedAt,
        book: { title: newBookAdded.book.title, author: newBookAdded.book.author },
      },
    });
  }
);

// edit book status
export const editBookStatus = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: userId } = req.user as UserEssentials; // get current user id
    const editValues = matchedData<EditBookFormSchema>(req);

    const editedBook = await Book.update(userId, editValues);

    sendResponse<EditedBookInfo>(res, {
      statusCode: 200,
      status: 'success',
      message: 'Book Edited.',
      data: {
        bookId: editedBook.bookId,
        status: editedBook.status,
        finishedAt: editedBook.finishedAt,
        rate: editedBook.rate,
      },
    });
  }
);

// delete a book from library
export const deleteBook = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id: userId } = req.user as UserEssentials; // get current user id
  const { id: bookId } = matchedData<DeleteBookFormSchema>(req);

  await Book.delete(userId, bookId);

  sendResponse<DeleteBookFormSchema>(res, {
    statusCode: 200,
    status: 'success',
    message: 'Book Deleted.',
    data: { id: bookId },
  });
});
