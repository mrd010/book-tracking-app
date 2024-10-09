import { Skeleton } from '@/components/ui/skeleton';
import { useSearchBooks } from '@/hooks/query-hooks/useSearchBooks';
import { OPLBookSearchWork } from '@/lib/types/general-types';
import { bookCoverURL, getIdFromBookKey } from '@/lib/utils';
import { Link } from 'react-router-dom';

export const SearchPage = ({ query }: { query: string }) => {
  const { data: foundBooks } = useSearchBooks(query, 8);

  return (
    <div className="rounded-md bg-foreground px-3 py-1 text-background">
      {foundBooks ? (
        // found books list
        <div className="divide-y divide-muted-foreground">
          {foundBooks.docs.map((work) => (
            <SearchItem work={work} key={work.key} />
          ))}
        </div>
      ) : (
        // loading skeleton
        <div className="my-2 flex flex-col gap-2">
          {[...Array(8)].map((_, i) => (
            <SearchItemSkeleton key={i} />
          ))}
        </div>
      )}
    </div>
  );
};

// search item in search page showing book cover,title,author
const SearchItem = ({ work }: { work: OPLBookSearchWork }) => {
  const { key, title } = work.editions.docs[0];
  const bookId = getIdFromBookKey(key); // eg. bookId : OL7440033M
  const author = work.author_name[0];
  const coverURL = bookCoverURL(bookId, 'S'); // eg. https://covers.openlibrary.org/b/olid/OL7440033M-S.jpg
  return (
    <div className="mt-1 grid grid-cols-[50px,1fr] items-center gap-x-2 pt-1">
      <img
        src={coverURL}
        alt={title}
        height={'58px'}
        className="row-span-2 max-w-12 overflow-hidden rounded-sm border border-primary text-sm text-muted-foreground"
      />
      <Link
        to={`/books/${bookId}`}
        className="line-clamp-1 self-end drop-shadow-sm hover:text-primary"
      >
        <span>{title}</span>
      </Link>
      <span className="self-start text-sm text-muted-foreground">{author}</span>
    </div>
  );
};

const SearchItemSkeleton = () => {
  return (
    <div className="grid h-16 grid-cols-[50px,1fr] gap-x-2">
      <Skeleton className="row-span-2 size-full" />
      <Skeleton className="my-1" />
      <Skeleton className="my-1" />
    </div>
  );
};
