import { AuthData } from "../../types";
import LoginForm from "./LoginForm";
import { login } from "./authSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Navigate } from "react-router-dom";

type Props = {};

const Login = (props: Props) => {
  const dispatch = useAppDispatch();
  const onLogin = ({ email, password }: AuthData) => {
    dispatch(login({ email, password }));
  };

  const authData = useAppSelector((state) => state.auth);
  console.log(authData);

  if (authData.statusText === "OK") {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <LoginForm onLogin={onLogin} />
    </div>
  );
};

export default Login;
