import { AuthData } from "../../types";
import LoginForm from "../../components/loginForm/LoginForm";
import { login } from "../../store/slices/login/authSlice";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";

const Login = () => {
  const dispatch = useAppDispatch();
  const { error, isLoading, userId } = useAppSelector((state) => state.auth);

  const onLogin = (authenticationdata: AuthData) => {
    dispatch(login(authenticationdata));
  };

  if (userId) {
    return <Navigate to={"/"} />;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-100px)] lg:h-[calc(100vh-200px)]">
        <p className="font-pacifico text-black-100 text-2xl text-center">
          Loading...
        </p>
      </div>
    );
  }

  return <LoginForm onLogin={onLogin} error={error} />;
};

export default Login;
