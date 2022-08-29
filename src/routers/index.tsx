import { Navigate, useRoutes } from "react-router-dom";
import Layout from "../layout/index";
import Home from "../pages/Home/index";
import Table from "../pages/table/index";
import Count from "../pages/count/index";
import Result from "../pages/404";
import Login from "../pages/Login/index";
import Auth from "./auth";
import lazyLoad from "./lazyLoad";
import { lazy } from "react";
// const modules: any = import.meta.glob("../pages/*/*.tsx");
// for (const path in modules) {
//   modules[path]().then((mod: any) => {
//     console.log(path);
//     console.log(mod);
//   });
// }
// console.log(modules);

const routers: any = [
  {
    path: "/",
    auth: false,
    element: <Navigate to={"/login"} />,
  },
  {
    auth: true,
    element: (
      <Auth>
        <Layout />
      </Auth>
    ),
    children: [
      {
        path: "Home",
        auth: true,
        element: (
          <Auth>
            <Home />
          </Auth>
        ),
      },
      {
        path: "table",
        auth: true,
        element: (
          <Auth>
            <Table />
          </Auth>
        ),
      },
      {
        path: "count",
        auth: true,
        element: (
          <Auth>
            <Count />
          </Auth>
        ),
      },
      {
        path: "communication",
        auth: true,
        element: (
          <Auth>
            {lazyLoad(lazy(() => import("../pages/reduxCount/index")))}
          </Auth>
        ),
      },
      { path: "*", element: <Result /> },
    ],
  },
  { path: "*", element: <Result /> },
  { path: "/login", element: <Login /> },
];

const Router = () => {
  const routes = useRoutes(routers);
  return routes;
};

export default Router;
