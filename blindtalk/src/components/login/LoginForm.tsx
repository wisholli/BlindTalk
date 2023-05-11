import { Formik, Form, Field } from "formik";
import { AuthData } from "../../types";
import { NavLink } from "react-router-dom";

type Props = {
  onLogin: ({ email, password }: AuthData) => void;
};

interface MyFormValues {
  email: string;
  password: string;
}

export const LoginForm = ({ onLogin }: Props) => {
  const initialValues: MyFormValues = { email: "", password: "" };
  return (
    <div className=" mt-24 mx-4 md:mx-36 lg:mt-32 lg:mx-96">
      <Formik
        initialValues={initialValues}
        onSubmit={({ email, password }) => {
          onLogin({ email, password });
        }}
      >
        <Form>
          <h1 className="font-pacifico font-normal text-5xl mb-10 text-black-200 text-center lg:mb-14 lg:text-6xl">
            Welcome back!
          </h1>
          <Field
            id="email"
            name="email"
            placeholder="Email"
            className="w-full font-maven font-normal text-2xl text-gray-100 border-b border-black-200 mb-8 placeholder:font-maven placeholder:font-normal placeholder:text-2xl placeholder:text-gray-100 focus:outline-none md:placeholder:text-3xl md:text-3xl lg:mb-16 "
          />
          <Field
            id="password"
            name="password"
            placeholder="Password"
            className="w-full font-maven font-normal text-2xl text-gray-100 border-b border-black-200 mb-8 placeholder:font-maven placeholder:font-normal placeholder:text-2xl placeholder:text-gray-100 focus:outline-none md:placeholder:text-3xl md:text-3xl lg:mb-16"
          />
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
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
