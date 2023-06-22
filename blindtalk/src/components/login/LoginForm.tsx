import { useFormik } from "formik";
import { AuthData } from "../../types";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import eyeIcon from "../../assets/images/eye-icon.svg";
import eyeOffIcon from "../../assets/images/eye-off-icon.svg";

type Props = {
  onLogin: ({ email, password }: AuthData) => void;
};

const validate = (values: AuthData) => {
  const errors = {
    email: "",
    password: "",
  };

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  }

  return errors;
};

export const LoginForm = ({ onLogin }: Props) => {
  //show and hide password
  let [isPassword, setIsPassword] = useState<boolean>(false);

  const formik = useFormik<AuthData>({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      onLogin(values);
    },
  });

  return (
    <div className=" mt-24 mx-4 md:mx-36 lg:mt-32 lg:mx-96">
      <form onSubmit={formik.handleSubmit}>
        <h1 className="font-pacifico font-normal text-5xl mb-10 text-black-200 text-center lg:mb-14 lg:text-6xl">
          Welcome back!
        </h1>
        <input
          id="email"
          name="email"
          placeholder="Email"
          className={`w-full font-maven font-normal text-2xl text-black-200 border-b border-black-200  placeholder:font-maven placeholder:font-normal placeholder:text-2xl placeholder:text-gray-100 focus:outline-none md:placeholder:text-3xl md:text-3xl mb-8 lg:mb-16 ${
            formik.touched.password && formik.errors.password && "mb-0 lg:mb-0"
          }`}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="font-maven font-normal text-lg text-red-500 mb-8 lg:mb-10">
            {formik.errors.email}
          </div>
        ) : null}
        <div
          className={`flex justify-between items-center border-b border-black-200 mb-8 lg:mb-16 ${
            formik.touched.password && formik.errors.password && "mb-0 lg:mb-0"
          }`}
        >
          <input
            id="password"
            name="password"
            type={isPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full font-maven font-normal text-2xl text-black-200   placeholder:font-maven placeholder:font-normal placeholder:text-2xl placeholder:text-gray-100 focus:outline-none md:placeholder:text-3xl md:text-3xl "
          />
          <button type="button" onClick={() => setIsPassword(!isPassword)}>
            <img
              src={isPassword ? eyeOffIcon : eyeIcon}
              alt="eye-icon"
              className="h-10 w-10"
            />
          </button>
        </div>
        {formik.touched.password && formik.errors.password ? (
          <div className="font-maven font-normal text-lg text-red-500 mb-8 lg:mb-16">
            {formik.errors.password}
          </div>
        ) : null}

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
