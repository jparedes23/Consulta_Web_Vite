import { Navigate } from "react-router-dom";
import { isAuth } from "../services";

const PrivateRoute = ({ canActivate, redirectPath = '/login', children }) => {
  if (!canActivate) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

export default PrivateRoute;