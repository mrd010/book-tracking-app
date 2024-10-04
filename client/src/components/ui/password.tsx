import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from './button';
import { useToggle } from 'react-use';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Password = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  const [show, toggle] = useToggle(false);
  return (
    <div className="relative">
      <input
        type={show ? 'text' : 'password'}
        className={cn(
          'flex h-10 w-full rounded-md border border-primary/15 bg-background px-3 py-2 font-mono text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
      <Button
        type="button"
        variant="static"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full"
        onClick={toggle}
      >
        {show ? <EyeOffIcon /> : <EyeIcon />}
      </Button>
    </div>
  );
});
Password.displayName = 'Password';

export { Password };
