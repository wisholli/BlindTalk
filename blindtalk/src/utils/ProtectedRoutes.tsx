import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export const ProtectedRoutes = () => {
  const authData = useAppSelector((state) => state.auth);
  if (!authData.id) {
    return <Navigate to={"/register"} />;
  }
  return <Outlet />;
};
