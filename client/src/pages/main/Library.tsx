import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { SelectLibPage } from './select-lib-page';
import { Button } from '@/components/ui/button';

const Library = () => {
  return (
    <div className="flex flex-col gap-4 p-2">
      {/* search part */}
      <SearchBox />
      <SelectLibPage />
      {/* select */}
      {/* list */}
    </div>
  );
};

export const SearchBox = () => {
  return (
    <div className="relative">
      <Input
        placeholder="Search for Books"
        className="peer bg-secondary pr-10 focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-primary/40"
      />
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
