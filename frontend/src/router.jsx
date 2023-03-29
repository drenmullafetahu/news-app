import {Navigate,createBrowserRouter} from "react-router-dom";
import Login from "./views/Login.jsx";
import Register from "./views/Register";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Home from "./views/Home";
import SearchPage from "./views/SearchPage";
import SingleArticle from "./views/SingleArticle.jsx";
const router = createBrowserRouter([
    {
      path: "/",
      element: <DefaultLayout />,
      children: [
          {
              path: '/',
              element: <Navigate to="/home" />
          },
          {
              path: '/home',
              element: <Home />
          },
          {
              path: '/search',
              element: <SearchPage />
          },
          {
              path: '/singleArticle',
              element: <SingleArticle />
          }
      ]
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
])


export default router
