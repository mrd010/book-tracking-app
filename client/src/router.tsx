import { createRoutesFromElements, RouterProvider } from 'react-router';
import { createBrowserRouter, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Layout from './layouts/layout';
import MainLayout from './pages/main/MainLayout';
import ErrorBoundary from './pages/error-boundary/Error';

const ReactRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<ErrorBoundary />}>
        <Route index element={<MainLayout />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>,
    ),
  );
  return <RouterProvider router={router}></RouterProvider>;
};
export default ReactRouter;
