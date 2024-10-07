import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRouteError();
  return (
    <div>
      <h1>{isRouteErrorResponse(error) ? error.status : '404'} Error</h1>
      <p>{error instanceof Error ? error.message : 'Something went wrong.'}</p>
    </div>
  );
};
export default ErrorBoundary;
