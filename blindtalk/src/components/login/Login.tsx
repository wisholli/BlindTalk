import { AuthData } from "../../types";
import LoginForm from "./LoginForm";
import { login } from "../../features/login/authSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Navigate } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const authData = useAppSelector((state) => state.auth);

  const onLogin = ({ email, password }: AuthData) => {
    dispatch(login({ email, password }));
  };

  if (authData.id) {
    return <Navigate to={"/"} />;
  }

  return <LoginForm onLogin={onLogin} />;
};

export default Login;
