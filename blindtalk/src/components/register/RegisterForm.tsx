import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { NavLink } from "react-router-dom";
import { ActiveCheckBox, RegisterData } from "../../types";
import { CheckBox } from "../../utils/CheckBox/CheckBox";

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

  const [activeCheckBoxes, setActiveIndex] = useState<ActiveCheckBox>({
    female: false,
    male: false,
  });

  const toggleIndex = (index: string) => {
    setActiveIndex((prev: any) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="flex items-center justify-center">
      <Formik
        initialValues={initialValues}
        onSubmit={(data) => {
          onRegister(data);
        }}
      >
        <Form className="w-full mx-4 sm:w-[calc(100%-(69px*2))]  md:w-[calc(100%-(139px*2))]  xl:w-[calc(100%-(278px*2))] ">
          <h1 className="text-center font-pacifico font-normal text-4xl mb-10 text-black-200 md:text-5xl lg:text-6xl lg:mb-12">
            Register and join us!
          </h1>
          <div className="flex flex-wrap justify-between">
            <div className="w-[calc(100%/2-20px/2)] mb-10 lg:w-[calc(100%/2-63px/2)] ">
              <Field
                id="firstName"
                name="firstName"
                placeholder="Fist name"
                className="w-full font-maven font-normal text-2xl text-black-200 border-b border-black-200  placeholder:font-maven placeholder:font-normal placeholder:text-2xl placeholder:text-gray-100  md:text-3xl md:placeholder:text-3xl focus:outline-none"
              />
            </div>
            <div className="w-[calc(100%/2-20px/2)] mb-10 lg:w-[calc(100%/2-63px/2)] ">
              <Field
                id="lastName"
                name="lastName"
                placeholder="Last name"
                className="w-full font-maven font-normal text-2xl text-black-200 border-b border-black-200  placeholder:font-maven placeholder:font-normal placeholder:text-2xl placeholder:text-gray-100  md:text-3xl md:placeholder:text-3xl focus:outline-none"
              />
            </div>
            <div className="w-[calc(100%/2-20px/2)] mb-10 lg:w-[calc(100%/2-63px/2)] ">
              <Field
                id="country"
                name="country"
                placeholder="Country"
                className="w-full font-maven font-normal text-2xl text-black-200 border-b border-black-200  placeholder:font-maven placeholder:font-normal placeholder:text-2xl placeholder:text-gray-100  md:text-3xl md:placeholder:text-3xl focus:outline-none"
              />
            </div>
            <div className="w-[calc(100%/2-20px/2)] mb-10 lg:w-[calc(100%/2-63px/2)]">
              <Field
                id="city"
                name="city"
                placeholder="City"
                className="w-full font-maven font-normal text-2xl text-black-200 border-b border-black-200  placeholder:font-maven placeholder:font-normal placeholder:text-2xl placeholder:text-gray-100  md:text-3xl md:placeholder:text-3xl focus:outline-none"
              />
            </div>
            <div className="w-full mb-10">
              <Field
                id="email"
                name="email"
                placeholder="Email"
                className="w-full font-maven font-normal text-2xl text-black-200 border-b border-black-200  placeholder:font-maven placeholder:font-normal placeholder:text-2xl placeholder:text-gray-100  md:text-3xl md:placeholder:text-3xl focus:outline-none"
              />
            </div>
            <div className="w-full mb-10">
              <Field
                id="password"
                name="password"
                placeholder="Password"
                className="w-full font-maven font-normal text-2xl text-black-200 border-b border-black-200  placeholder:font-maven placeholder:font-normal placeholder:text-2xl placeholder:text-gray-100  md:text-3xl md:placeholder:text-3xl focus:outline-none"
              />
            </div>
            <div className="w-[calc(100%/2-20px/2)] mb-5 lg:w-[calc(100%/2-63px/2)] md:mb-10 flex flex-row items-center border-b border-black-200 ">
              <label
                htmlFor="sex"
                className="font-maven font-normal text-gray-100 text-2xl mr-5 md:text-3xl md:mr-10"
              >
                Sex
              </label>
              <CheckBox
                activeCheckBoxes={activeCheckBoxes}
                checkBoxNumber="male"
                toggleIndex={toggleIndex}
              />
              <label
                htmlFor="sex-male"
                className="font-maven font-normal text-2xl text-black-200 ml-1 mr-5 md:text-3xl md:mr-11 md:ml-2"
              >
                M
              </label>
              <CheckBox
                activeCheckBoxes={activeCheckBoxes}
                checkBoxNumber="female"
                toggleIndex={toggleIndex}
              />
              <label
                htmlFor="sex-female"
                className="font-maven font-normal text-2xl text-black-200 ml-1 md:text-3xl md:ml-2"
              >
                F
              </label>
            </div>
            <div className="w-[calc(100%/2-20px/2)] mb-5 lg:w-[calc(100%/2-63px/2)] md:mb-10 ">
              <Field
                id="bDay"
                name="bDay"
                type="date"
                className="w-full font-maven font-normal text-2xl text-black-200 border-b border-black-200  placeholder:font-maven placeholder:font-normal placeholder:text-2xl placeholder:text-gray-100  md:text-3xl md:placeholder:text-3xl focus:outline-none"
              />
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="border rounded-[48px] bg-green-100 font-maven w-full text-2xl  text-white font-medium py-3 px-28  mb-2 lg:w-auto lg:text-4xl "
            >
              Sing up
            </button>
            <div className="flex justify-center items-center">
              <p className="mr-3 font-maven font-normal text-black-100 text-xl md:text-2xl">
                Have an account?
              </p>
              <NavLink
                to={"/login"}
                className="font-maven font-normal text-black-100 text-xl md:text-2xl underline underline-offset-4"
              >
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
