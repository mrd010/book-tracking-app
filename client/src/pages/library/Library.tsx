import { CircleLoader1 } from '@/components/loaders';
import { useAuth } from '@/hooks/context-hooks/useAuth';
import { Navigate } from 'react-router-dom';

const Library = () => {
  const { status, user } = useAuth();
  if (status !== 'authenticated') {
    return <Navigate to="login" />;
  }

  if (!user) {
    return (
      <div className="grid size-full min-h-screen place-items-center">
        <CircleLoader1 />
      </div>
    );
  }

  return <div>Library</div>;
};
export default Library;
