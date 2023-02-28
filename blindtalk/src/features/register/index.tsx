import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RegisterData } from "../../types";
import { register } from "../login/authSlice";
import RegisterForm from "./RegisterForm";

const Register = () => {
  const dispatch = useAppDispatch();

  const authData = useAppSelector((state) => state.auth);

  const onRegister = (data: RegisterData) => {
    dispatch(register(data));
  };

  if (authData.statusText === "OK") {
    return <Navigate to={"/"} />;
  }

  return <RegisterForm onRegister={onRegister} />;
};

export default Register;
