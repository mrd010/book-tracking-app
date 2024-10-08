import { useState } from 'react';
import { useDebounce } from 'use-debounce';

export const useSearch = (): [string, string, (value: string) => void] => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery] = useDebounce(searchQuery, 1000);

  const handleChangeQuery = (value: string) => {
    setSearchQuery(value);
  };

  return [searchQuery, debouncedQuery, handleChangeQuery];
};
