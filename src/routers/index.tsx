import Layout from "../layout/index";
import Home from "../pages/Home/index";
import Table from "../pages/table/index";
import Count from "../pages/reduxCount/index";
import Result from "../pages/404";
import Login from "../pages/Login/index";
import lazyLoad from "./lazyLoad";
import GitHub from "@/pages/github/index";
import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
// const modules: any = import.meta.glob("../pages/*/*.tsx");
// for (const path in modules) {
//   modules[path]().then((mod: any) => {
//     console.log(path);
//     console.log(mod);
//   });
// }
// console.log(modules);

export const routers: any = [
  {
    path: "/",
    element: <Navigate to={"login"} replace />,
  },
  { path: "login", element: <Login /> },
  {
    element: <Layout />,
    children: [
      {
        path: "Home",
        auth: true,
        element: <Home />,
      },
      {
        path: "subOne/count",
        auth: true,
        element: <Count />,
      },
      {
        path: "subOne/table",
        auth: true,
        element: <Table />,
      },
      {
        path: "subOne/communication",
        auth: true,
        element: lazyLoad(lazy(() => import("../pages/count/index"))),
      },
      {
        path: "subTwo/link",
        auth: true,
        element: <GitHub />,
      },
      { path: "*", element: <Result /> },
    ],
  },
  { path: "*", element: <Result /> },
];

const Router = () => {
  const routes = useRoutes(routers);
  return routes;
};

export default Router;
