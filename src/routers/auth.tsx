import React from "react";
import { routers } from "./index";
import { searchRoute } from "@/utils/utils";
import { Navigate, useLocation } from "react-router-dom";
interface AuthRouterProps {
  children: React.ReactNode;
}
const AuthRouter: React.FC<AuthRouterProps> = ({ children }) => {
  const { pathname } = useLocation();
  const route = searchRoute(pathname, routers);
  if (!route.auth) return children;

  const token = localStorage.getItem("Mm");
  if (!token) return <Navigate to={"/login"} replace />;

  return children;
};
export default AuthRouter;
