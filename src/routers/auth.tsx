import { Navigate, useLocation } from "react-router-dom";
const AuthRouter = (props: { children: JSX.Element }) => {
  //这里我用了首页或者登录页，并没有用到路由表中的auth，来做权限，这个后期可以考虑用路由表中的auth做权限验证。
  const { pathname } = useLocation();
  if (pathname == "/" || pathname == "/login") return props.children;

  const token = localStorage.getItem("Mm");
  if (!token) return <Navigate to={"/login"} replace />;

  return props.children;
};
export default AuthRouter;
