import { Formik, Form, Field } from "formik";
import { NavLink } from "react-router-dom";
import { RegisterData } from "../../types";

type Props = {
  onRegister: (data: RegisterData) => void;
};

export const RegisterForm = ({ onRegister }: Props) => {
  const initialValues: RegisterData = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="">
        <Formik
          initialValues={initialValues}
          onSubmit={(data) => {
            onRegister(data);
          }}
        >
          <Form className="flex flex-col items-center justify-center mb-12 box-border h-60 w-50 p-4 border-2 rounded-md bg-basic-gray-5">
            <h1 className="text-center mb-2">Register and join us!</h1>
            <div className="mb-2">
              <div>
                <label htmlFor="firstName" className="mr-1">
                  First name
                </label>
                <Field
                  id="firstName"
                  name="firstName"
                  placeholder="Fist name"
                  className="bg-gray-5"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="mr-1">
                  Last name
                </label>
                <Field
                  id="lastName"
                  name="lastName"
                  placeholder="Last name"
                  className="bg-gray-5"
                />
              </div>
              <div className="mb-1">
                <label htmlFor="email" className="mr-1">
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="bg-gray-5"
                />
              </div>
              <div>
                <label htmlFor="password" className="mr-1">
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="bg-gray-5"
                />
              </div>
            </div>

            <div className="text-center">
              <button type="submit" className="text-red-500">
                Sing up
              </button>
              <div className="flex">
                <p className="mr-2">Have an account?</p>
                <NavLink to={"/login"} className="text-blue-500">
                  Sing in
                </NavLink>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
