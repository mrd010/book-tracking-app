import { useBooks } from '@/hooks/query-hooks/useBooks';
import { toastError } from '@/lib/helpers/renderers';
import { BookReadStatus, BookSortMethods, SortOrder } from '@/lib/types/general-types';

import { useEffect, useState } from 'react';

type SortType = {
  method: BookSortMethods;
  order: SortOrder;
};
type LibBooksListProps = {
  page: BookReadStatus;
};
export const LibBooks = ({ page }: LibBooksListProps) => {
  // sort options : method , order
  const [sortOptions, setSortOptions] = useState<SortType>({
    method: BookSortMethods.AddedDate,
    order: SortOrder.Desc,
  });

  const handleChangeSort = (newSortOptions: SortType) => {
    setSortOptions({ ...newSortOptions });
  };

  //   get user books
  const {
    data,
    isPending: isLoadingBooks,
    error: BooksFetchError,
  } = useBooks({ status: page, ...sortOptions });

  useEffect(() => {
    if (BooksFetchError) {
      toastError(BooksFetchError.message);
    }
  }, [BooksFetchError]);

  if (isLoadingBooks || !data) {
    return <div>Loading</div>;
  }

  const { books, count } = data;
  if (count === 0 || books.length === 0) {
    return <div>No Books</div>;
  }

  return (
    <div>
      {books.map((book) => (
        <div key={book.bookId}>
          <p>{book.book.title}</p>
        </div>
      ))}
    </div>
  );
};
