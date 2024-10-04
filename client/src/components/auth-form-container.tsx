import { ReactNode } from 'react';

type AuthFormContainerProps = {
  title: string;
  children: ReactNode;
};
export const AuthFormContainer = ({ title, children }: AuthFormContainerProps) => {
  return (
    <div className="mx-auto grid min-h-screen max-w-xs content-center gap-2">
      <h1 className="mx-3 mb-6 select-none text-4xl font-bold">{title}</h1>
      {children}
    </div>
  );
};
