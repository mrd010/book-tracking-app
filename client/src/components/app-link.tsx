import { cn } from '@/lib/utils';
import { Link, LinkProps } from 'react-router-dom';

export const AppLink = ({ children, className, ...props }: LinkProps) => {
  return (
    <Link className={cn('font-semibold text-primary hover:underline', className)} {...props}>
      {children}
    </Link>
  );
};
