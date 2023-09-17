import { AuthData } from "../../types";
import LoginForm from "../../components/loginForm/LoginForm";
import { login } from "../../store/slices/login/authSlice";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";

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
