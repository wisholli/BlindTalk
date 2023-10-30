import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthData, EntityError } from "../../types";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import eyeIcon from "../../assets/images/eye-icon.svg";
import eyeOffIcon from "../../assets/images/eye-off-icon.svg";

type Props = {
  onLogin: ({ email, password }: AuthData) => void;
  error: EntityError;
};

interface MyFormValues {
  email: string;
  password: string;
}

export const LoginForm = ({ onLogin, error }: Props) => {
  //show and hide password
  let [isPassword, setIsPassword] = useState<boolean>(false);

  //validation
  const shema = Yup.object().shape({
    email: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format"),
    password: Yup.string().required("Password is a required field"),
  });

  //formik
  const formik = useFormik<MyFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (loginData: MyFormValues) => {
      onLogin(loginData);
    },
    validationSchema: shema,
  });

  return (
    <div className="flex justify-center items-center h-[calc(100vh-100px)] lg:h-[calc(100vh-150px)]">
      <form
        onSubmit={formik.handleSubmit}
        className="w-11/12 mx-auto md:w-3/4 lg:w-2/5"
      >
        <h1 className="font-pacifico font-normal text-5xl mb-10 text-black-200 text-center lg:mb-14 lg:text-6xl">
          Welcome back!
        </h1>
        <div className="mb-8 lg:mb-16">
          <input
            id="email"
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className={`w-full font-maven font-normal text-2xl text-black-200 border-b ${
              formik.errors.email ? "border-red-500" : "border-black-200 "
            }  placeholder:font-maven placeholder:font-normal placeholder:text-2xl placeholder:text-gray-100 focus:outline-none md:placeholder:text-3xl md:text-3xl `}
          />
          <p className="text-sm text-red-500 font-maven">
            {formik.errors.email}
          </p>
        </div>

        <div className=" mb-8 lg:mb-16">
          <div
            className={`flex justify-between items-center border-b ${
              formik.errors.password ? "border-red-500" : "border-black-200 "
            }`}
          >
            <input
              id="password"
              name="password"
              type={isPassword ? "text" : "password"}
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="w-full font-maven font-normal text-2xl text-black-200 placeholder:font-maven placeholder:font-normal placeholder:text-2xl placeholder:text-gray-100 focus:outline-none md:placeholder:text-3xl md:text-3xl "
            />
            <button type="button" onClick={() => setIsPassword(!isPassword)}>
              <img
                src={isPassword ? eyeOffIcon : eyeIcon}
                alt="eye-icon"
                className="h-10 w-10"
              />
            </button>
          </div>
          <p className="text-sm text-red-500 font-maven">
            {formik.errors.password}
            {error && `${error}: The email or password is entered incorrectly`}
          </p>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className=" border rounded-[48px] bg-green-100 font-maven w-full text-2xl  text-white font-medium py-3 px-28  mb-2 lg:w-auto lg:text-4xl "
          >
            Sing in
          </button>
        </div>

        <div className="flex justify-center items-center">
          <p className="mr-2 font-maven font-normal text-black-100 text-xl md:text-2xl">
            Don’t have an account?
          </p>
          <NavLink
            to={"/register"}
            className="font-maven font-normal text-black-100 text-xl md:text-2xl underline underline-offset-4"
          >
            Sing up
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
