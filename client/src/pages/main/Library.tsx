import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { SelectLibPage } from './select-lib-page';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { BookReadStatus } from '@/lib/types/general-types';
import { LibBooks } from './LibBooks';
import { useSearch } from '@/hooks/useSearch';

const Library = () => {
  // search books query state with debouncing
  const [searchQuery, debouncedQuery, changeQuery] = useSearch();
  // current page state
  const [selectedPage, setSelectedPage] = useState<BookReadStatus>(BookReadStatus.Reading);

  // checker for opening search page overlay
  const isSearchOpen = searchQuery.length > 2;

  const handleChangePage = (value: BookReadStatus) => {
    setSelectedPage(value);
  };

  return (
    <div className="flex flex-col gap-4 p-2">
      {/* search part */}
      <SearchBox query={searchQuery} onChange={changeQuery} />
      {/* select */}
      <div>
        {isSearchOpen ? (
          // show search page
          <div></div>
        ) : (
          // show books
          <>
            <SelectLibPage onSelect={handleChangePage} selectedPage={selectedPage} />
            {/* list */}
            <LibBooks page={selectedPage} />
          </>
        )}
      </div>
    </div>
  );
};

export const SearchBox = ({
  query,
  onChange,
}: {
  query: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="relative">
      {/* search input */}
      <Input
        placeholder="Search for Books"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        className="peer bg-secondary pr-10 focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-primary/40"
      />
      {/* search icon */}
      <Button
        variant="static"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 cursor-default text-muted-foreground peer-focus-visible:text-secondary-foreground"
        tabIndex={-1}
      >
        <SearchIcon className="size-6" />
      </Button>
    </div>
  );
};

export default Library;
