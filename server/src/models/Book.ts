import { Book, BookReadStatus, Prisma } from '@prisma/client';
import db from '../database/db';
import {
  BookInfo,
  BooksListFilter,
  BookSortMethods,
  BookStatus,
  EditBookFormSchema,
  NewBookFormSchema,
} from '../types';

const bookStatusMap: Record<BookStatus, BookReadStatus> = {
  'not-started': 'NOT_STARTED',
  finished: 'FINISHED',
  reading: 'READING',
};

const Book = {
  // check if user have a book
  async exists(userId: number, bookId: string) {
    const book = await db.userBook.findUnique({
      where: {
        userId_bookId: {
          bookId,
          userId,
        },
      },
    });
    return !!book;
  },
  // create a new book entry for user
  async create(userId: number, values: NewBookFormSchema) {
    const { id: bookId, title, author, status, rate } = values;
    const bookStatus: BookReadStatus = bookStatusMap[status];
    // create book if info if not exist
    const newBook = await db.book.upsert({
      where: {
        olid: bookId,
      },
      create: {
        olid: bookId,
        title: title,
        author: author,
      },
      update: {},
      select: {
        olid: true,
      },
    });
    // create user book entry
    const newAddedBook = await db.userBook.create({
      data: {
        bookId: newBook.olid,
        userId,
        status: bookStatus,
        finishedAt: bookStatus === 'FINISHED' ? new Date() : null, // add finish date if status is finished
        rate: bookStatus === 'FINISHED' ? rate : null, // only add rate if book is finished
      },
      include: {
        book: true,
      },
    });

    return newAddedBook;
  },

  // update book status
  async update(userId: number, newValues: EditBookFormSchema) {
    const { id: bookId, status, rate } = newValues;
    const newStatus = bookStatusMap[status];

    const editedBook = await db.userBook.update({
      where: {
        userId_bookId: { bookId, userId },
      },
      data: {
        status: newStatus,
        rate: status === 'finished' ? rate : null,
        finishedAt: status === 'finished' ? new Date() : null,
      },
      select: {
        bookId: true,
        status: true,
        finishedAt: status === 'finished',
        rate: status === 'finished',
      },
    });

    return editedBook;
  },
  async delete(userId: number, bookId: string) {
    await db.userBook.delete({
      where: { userId_bookId: { bookId, userId } },
    });
  },
  // get all user added books
  async getAll(
    userId: number,
    filters: BooksListFilter = {}, // filters for books list. eg. status=finished
    sortBy: BookSortMethods = 'added-date',
    order: Prisma.SortOrder = 'desc'
  ): Promise<BookInfo[]> {
    // define order options object
    let orderOpt: Prisma.UserBookOrderByWithRelationInput;

    // assign order option object with sortBy argument
    switch (sortBy) {
      case 'title':
        orderOpt = {
          book: {
            title: order,
          },
        };
        break;
      case 'id':
        orderOpt = {
          bookId: order,
        };
        break;
      case 'finished-date':
        orderOpt = {
          finishedAt: order,
        };
        break;
      // sort by added date by default
      default:
        orderOpt = {
          addedAt: order,
        };
        break;
    }

    // fetch user books from db with provided filter and order
    const userBooks = await db.userBook.findMany({
      where: {
        userId,
        status: filters.status ? bookStatusMap[filters.status] : undefined, // use status in filters obj
      },
      select: {
        bookId: true,
        status: true,
        rate: true,
        finishedAt: true,
        addedAt: true,
        book: {
          select: {
            title: true,
            author: true,
          },
        },
      },
      orderBy: orderOpt, // use order object
    });
    return userBooks;
  },
};

export default Book;
