import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="px-2">
      <Outlet />
      <Toaster />
    </div>
  );
};
export default Layout;
