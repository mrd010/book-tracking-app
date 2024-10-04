import { createRoutesFromElements, RouterProvider } from 'react-router';
import { createBrowserRouter, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import AppLayout from './layouts/app-layout';

const ReactRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppLayout />}>
        <Route path="login" element={<Login />} />
      </Route>
    )
  );
  return <RouterProvider router={router}></RouterProvider>;
};
export default ReactRouter;
