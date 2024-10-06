import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createHttpHeaders = (authToken: string | undefined) => {
  // init headers with json
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // attach auth token if available
  if (authToken) headers['Authorization'] = `Bearer ${authToken}`;

  return headers;
};
