/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { BookInfo, BooksReqQueries, UserEssentials } from '../types';
import Book from '../models/Book';
import { sendResponse } from '../lib/utils';
import { matchedData } from 'express-validator';

export const getUserBooks = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user as UserEssentials; // get current user id
    const { status, sort, order } = matchedData<BooksReqQueries>(req); // get url queries

    // get user added books
    const userBooks = await Book.getAll(id, { status }, sort, order);

    sendResponse<{ userId: number; books: BookInfo[] }>(res, {
      statusCode: 200,
      status: 'success',
      message: `Found ${userBooks.length} books.`,
      data: { userId: id, books: userBooks },
    });
  }
);
