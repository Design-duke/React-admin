import { Navigate } from "react-router-dom";

const AuthRouter = (props: { children: JSX.Element }) => {
  const token = localStorage.getItem("Mm");
  if (!token) return <Navigate to={"/login"} />;
  return props.children;
};
export default AuthRouter;
