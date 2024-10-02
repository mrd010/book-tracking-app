import { Book, BookReadStatus, Prisma } from '@prisma/client';
import db from '../database/db';
import { BookInfo, BooksListFilter, BookSortMethods, BookStatus } from '../types';

const bookStatusMap: Record<BookStatus, BookReadStatus> = {
  'not-started': 'NOT_STARTED',
  finished: 'FINISHED',
  reading: 'READING',
};

const Book = {
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
