import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="px-2">
      <Outlet />
    </div>
  );
};
export default AppLayout;
