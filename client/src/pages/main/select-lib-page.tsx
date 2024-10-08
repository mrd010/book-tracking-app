import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { bookReadStatuses, libPages } from '@/data/library';
import { BookReadStatus } from '@/lib/types/general-types';
import { BookCheckIcon, BookIcon, BookOpenIcon } from 'lucide-react';
import { useState } from 'react';

export const SelectLibPage = () => {
  const [selectedPage, setSelectedPage] = useState<BookReadStatus>('READING');

  return (
    <div className="grid grid-cols-[auto,1fr] items-center gap-3">
      {/* selected page icon */}
      <PageIcon page={selectedPage} />
      {/* select page */}
      <Select
        value={selectedPage}
        onValueChange={(value: BookReadStatus) => setSelectedPage(value)}
      >
        <SelectTrigger className="bg-primary text-lg font-semibold text-primary-foreground">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {/* page list */}
          {bookReadStatuses.map((status) => (
            <SelectItem value={status} key={status}>
              {libPages[status]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

const PageIcon = ({ page }: { page: BookReadStatus }) => {
  let icon = null;
  switch (page) {
    case 'READING':
      icon = <BookOpenIcon />;
      break;
    case 'NOT_STARTED':
      icon = <BookIcon />;
      break;
    case 'FINISHED':
      icon = <BookCheckIcon />;
      break;
    default:
      break;
  }
  return (
    <div className="grid h-10 w-10 place-items-center rounded-full bg-background text-primary ring-2 ring-primary">
      {icon}
    </div>
  );
};
