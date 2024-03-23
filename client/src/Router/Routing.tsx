import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import AdminLogIn from "../components/auth/AdminLogIn";
import LogIn from "../components/auth/LogIn";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import NotFound from "../components/layout/NotFound";
import AdminDashboard from "../components/view/adminView/AdminDashboard";
import UserDashboard from "../components/view/userView/UserDashboard";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <UserDashboard />,
      },
      {
        path: "/tm-admin",
        element: <AdminDashboard />,
      },
    ],
  },
  {
    path: "/tm-admin/login",
    element: (
      <>
        <AdminLogIn />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <LogIn />
      </>
    ),
  },
  {
    path: "*",
    element: (
      <>
        <NotFound />
      </>
    ),
  },
]);

const Routing = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Routing;
