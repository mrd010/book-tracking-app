import { createRoutesFromElements, RouterProvider } from 'react-router';
import { createBrowserRouter, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import AppLayout from './layouts/app-layout';
import Signup from './pages/signup/Signup';
import Library from './pages/library/Library';

const ReactRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Library />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>,
    ),
  );
  return <RouterProvider router={router}></RouterProvider>;
};
export default ReactRouter;
