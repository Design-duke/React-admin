import lazyLoad from "./lazyLoad";
import Layout from "@/layout/index";
import Login from "@/pages/Login/index";
import { lazy } from "react";
import { Navigate, useRoutes } from "react-router";

export const routers: any = [
  {
    path: "/",
    element: <Navigate to={"login"} replace />,
  },
  { path: "login", element: <Login /> },
  {
    path: "Three",
    auth: true,
    element: lazyLoad(lazy(() => import("@/pages/Three/chinaMap/index"))),
  },
  {
    element: <Layout />,
    children: [
      {
        path: "Home",
        auth: true,
        element: lazyLoad(lazy(() => import("@/pages/Home/index"))),
      },
      {
        path: "subOne/count",
        auth: true,
        element: lazyLoad(lazy(() => import("@/pages/reduxCount/index"))),
      },
      {
        path: "subOne/table",
        auth: true,
        element: lazyLoad(lazy(() => import("@/pages/table/index"))),
      },
      {
        path: "subOne/communication",
        auth: true,
        element: lazyLoad(lazy(() => import("@/pages/count/index"))),
      },
      {
        path: "subTwo/link",
        auth: true,
        element: lazyLoad(lazy(() => import("@/pages/github/index"))),
      },
      { path: "*", element: lazyLoad(lazy(() => import("@/pages/404"))) },
    ],
  },
  { path: "*", element: lazyLoad(lazy(() => import("@/pages/404"))) },
];

const Router = () => {
  const routes = useRoutes(routers);
  return routes;
};

export default Router;
