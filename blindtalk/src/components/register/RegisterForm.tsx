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
    <div className="flex items-center justify-center">
      <Formik
        initialValues={initialValues}
        onSubmit={(data) => {
          onRegister(data);
        }}
      >
        <Form className="w-[807px]">
          <h1 className="text-center font-pacifico font-normal text-6xl text-black-200 mb-16">
            Register and join us!
          </h1>
          <div className="flex flex-wrap justify-between">
            <div className="w-[calc(100%/2-63px/2)] mb-16">
              <Field
                id="firstName"
                name="firstName"
                placeholder="Fist name"
                className="w-full font-maven font-normal text-3xl text-gray-100 border-b border-black-200  placeholder:font-maven placeholder:font-normal placeholder:text-3xl placeholder:text-gray-100 placeholder:pl-4 focus:pl-4 focus:placeholder:pl-0 focus:outline-none"
              />
            </div>
            <div className="w-[calc(100%/2-63px/2)] mb-16">
              <Field
                id="lastName"
                name="lastName"
                placeholder="Last name"
                className="w-full font-maven font-normal text-3xl text-gray-100 border-b border-black-200  placeholder:font-maven placeholder:font-normal placeholder:text-3xl placeholder:text-gray-100 placeholder:pl-4 focus:pl-4 focus:placeholder:pl-0 focus:outline-none"
              />
            </div>
            <div className="w-[calc(100%/2-63px/2)] mb-16">
              <Field
                id="country"
                name="country"
                placeholder="Country"
                className=" w-full font-maven font-normal text-3xl text-gray-100 border-b border-black-200  placeholder:font-maven placeholder:font-normal placeholder:text-3xl placeholder:text-gray-100 placeholder:pl-4 focus:pl-4 focus:placeholder:pl-0 focus:outline-none"
              />
            </div>
            <div className="w-[calc(100%/2-63px/2)] mb-16">
              <Field
                id="city"
                name="city"
                placeholder="City"
                className=" w-full font-maven font-normal text-3xl text-gray-100 border-b border-black-200  placeholder:font-maven placeholder:font-normal placeholder:text-3xl placeholder:text-gray-100 placeholder:pl-4 focus:pl-4 focus:placeholder:pl-0 focus:outline-none"
              />
            </div>
            <div className="w-full mb-16">
              <Field
                id="email"
                name="email"
                placeholder="Email"
                className="w-full font-maven font-normal text-3xl text-gray-100 border-b border-black-200  placeholder:font-maven placeholder:font-normal placeholder:text-3xl placeholder:text-gray-100 placeholder:pl-4 focus:pl-4 focus:placeholder:pl-0 focus:outline-none"
              />
            </div>
            <div className="w-full mb-16">
              <Field
                id="password"
                name="password"
                placeholder="Password"
                className="w-full font-maven font-normal text-3xl text-gray-100 border-b border-black-200  placeholder:font-maven placeholder:font-normal placeholder:text-3xl placeholder:text-gray-100 placeholder:pl-4 focus:pl-4 focus:placeholder:pl-0 focus:outline-none"
              />
            </div>
            <div className="w-[calc(100%/2-63px/2)] mb-16 flex">
              <label htmlFor="sex" className="mr-11">
                Sex
              </label>
              <Field
                id="sex-male"
                name="sex-male"
                type="checkbox"
                className="mr-2 font-maven font-normal text-3xl text-gray-100"
              />
              <label htmlFor="sex-male" className="mr-11">
                M
              </label>
              <Field
                id="sex-female"
                name="sex-female"
                type="checkbox"
                className="mr-2 font-maven font-normal text-3xl text-gray-100 border-b border-black-200 focus:pl-4 focus:placeholder:pl-0 focus:outline-none"
              />
              <label htmlFor="sex-female">F</label>
            </div>
            <div className="w-[calc(100%/2-63px/2)] mb-16">
              <Field
                id="city"
                name="city"
                placeholder="City"
                className=" w-full font-maven font-normal text-3xl text-gray-100 border-b border-black-200  placeholder:font-maven placeholder:font-normal placeholder:text-3xl placeholder:text-gray-100 placeholder:pl-4 focus:pl-4 focus:placeholder:pl-0 focus:outline-none"
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
  );
};

export default RegisterForm;
