import { Navigate, useRoutes } from "react-router-dom";
import Home from "../layout/index";
import About from "../pages/about/index";
import Task from "../pages/task/index";
import Count from "../pages/count/index";
import Result from "../pages/404";
import Login from "../pages/Login/index";
import Communication from "../pages/测试/index";
import { useState, lazy } from "react";
const modules: any = import.meta.glob("../pages/*/*.tsx");
for (const path in modules) {
  modules[path]().then((mod: any) => {
    console.log(path);
    console.log(mod);
  });
}

console.log(modules);

const routes: any = [
  {
    path: "/",
    auth: false,
    element: <Navigate to={"/login"} />,
  },
  {
    element: <Home />,
    auth: true,
    children: [
      {
        path: "about",
        auth: true,
        element: <About />,
      },
      {
        path: "table",
        auth: true,
        element: <Task />,
      },
      {
        path: "count",
        auth: true,
        element: <Count />,
      },
      {
        path: "communication",
        auth: true,
        element: <Communication />,
      },
    ],
  },
  { path: "*", element: <Result /> },
  { path: "/login", element: <Login /> },
];

const Router = () => {
  const r = useRoutes(routes);
  return r;
};

export default Router;
