import { routers } from "./index";
import { searchRoute } from "@/utils/utils";
import { Navigate, useLocation } from "react-router-dom";

const AuthRouter = (props: { children: JSX.Element }) => {
  const { pathname } = useLocation();
  const route = searchRoute(pathname, routers);
  if (!route.auth) return props.children;

  const token = localStorage.getItem("Mm");
  if (!token) return <Navigate to={"/login"} replace />;

  return props.children;
};
export default AuthRouter;
