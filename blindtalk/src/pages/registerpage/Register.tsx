import { Navigate } from "react-router-dom";
import { RegisterData } from "../../types";
import { register } from "../../store/slices/login/authSlice";
import RegisterForm from "../../components/registerForm/RegisterForm";
import { useAppDispatch, useAppSelector } from "../../store/store";

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
