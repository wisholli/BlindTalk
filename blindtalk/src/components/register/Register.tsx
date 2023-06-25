import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RegisterData } from "../../types";
import { register } from "../../features/login/authSlice";
import RegisterForm from "./RegisterForm";

const Register = () => {
  const dispatch = useAppDispatch();

  const authData = useAppSelector((state) => state.auth);

  const onRegister = (data: RegisterData) => {
    console.log(data);

    dispatch(register(data));
  };

  if (authData.id) {
    return <Navigate to={`/profile/${authData.id}`} />;
  }

  return <RegisterForm onRegister={onRegister} />;
};

export default Register;
