import { Navigate } from "react-router-dom";
import { RegisterData } from "../../types";
import { register } from "../../store/slices/login/authSlice";
import RegisterForm from "../../components/registerForm/RegisterForm";
import { useAppDispatch, useAppSelector } from "../../store/store";

const Register = () => {
  const dispatch = useAppDispatch();

  const { userId, profileId, isLoading } = useAppSelector(
    (state) => state.auth
  );

  const onRegister = (registerData: RegisterData) => {
    dispatch(register(registerData));
  };

  if (userId) {
    return <Navigate to={`/profile/${profileId}`} />;
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

  return <RegisterForm onRegister={onRegister} />;
};

export default Register;
