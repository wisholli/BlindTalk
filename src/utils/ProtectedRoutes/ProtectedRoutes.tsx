import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/store";

export const ProtectedRoutes = () => {
  const authData = useAppSelector((state) => state.auth);
  if (!authData.id) {
    return <Navigate to={"/register"} />;
  }
  return <Outlet />;
};
