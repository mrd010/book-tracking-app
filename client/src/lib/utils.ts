import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createHttpHeaders = (authToken?: string | undefined) => {
  // init headers with json
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // attach auth token if available
  if (authToken) headers['Authorization'] = `Bearer ${authToken}`;

  return headers;
};

export const bookCoverURL = (bookOLID: string, size: 'S' | 'M' | 'L') => {
  return `https://covers.openlibrary.org/b/olid/${bookOLID}-${size}.jpg`;
};

export const getIdFromBookKey = (key: string) => {
  const splitted = key.split('/');
  return splitted[splitted.length - 1];
};
