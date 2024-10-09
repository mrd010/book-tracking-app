import { CircleLoader1 } from '@/components/loaders';
import { useAuth } from '@/hooks/context-hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LibraryBigIcon, UserIcon } from 'lucide-react';
import Library from './Library';
import Profile from './Profile';

const MainLayout = () => {
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

  return (
    <>
      <Tabs defaultValue="library">
        <TabsList className="fixed bottom-0 left-0 z-10 w-full rounded-none border-t border-primary">
          <TabsTrigger value="library">
            <LibraryBigIcon className="size-5" />
            Library
          </TabsTrigger>
          <TabsTrigger value="profile">
            <UserIcon className="size-5" />
            Profile
          </TabsTrigger>
        </TabsList>
        {/* library page */}
        <TabsContent value="library">
          <Library />
        </TabsContent>
        {/* profile page */}
        <TabsContent value="profile">
          <Profile />
        </TabsContent>
      </Tabs>
    </>
  );
};
export default MainLayout;
