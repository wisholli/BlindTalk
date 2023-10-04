import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import { ActiveCheckBox, RegisterData, Sex } from "../../types";
import { CheckBox } from "../checkBox/CheckBox";
import eyeIcon from "../../assets/images/eye-icon.svg";
import eyeOffIcon from "../../assets/images/eye-off-icon.svg";

type Props = {
  onRegister: (data: RegisterData) => void;
};

export const RegisterForm = ({ onRegister }: Props) => {
  //validation
  const shema = Yup.object().shape({
    email: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters"),
    firstName: Yup.string().required("First name is a required field"),
    lastName: Yup.string().required("Last name is a required field"),
  });

  //formik
  const formik = useFormik<RegisterData>({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      sex: Sex.none,
    },
    onSubmit: (values) => {
      onRegister(values);
    },
    validationSchema: shema,
  });

  //checkboxes functions
  const [activeCheckBoxes, setActiveIndex] = useState<ActiveCheckBox>({
    female: false,
    male: false,
  });

  const toggleIndex = (index: string) => {
    setActiveIndex((prev: any) => ({ ...prev, [index]: !prev[index] }));
    if (index === "male") {
      formik.values.sex = Sex.male;
    } else {
      formik.values.sex = Sex.female;
    }
  };

  //show and hide password
  const [isPassword, setIsPassword] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full mx-4 sm:w-[calc(100%-(69px*2))]  md:w-[calc(100%-(139px*2))]  xl:w-[calc(100%-(278px*2))] "
      >
        <h1 className="text-center font-pacifico font-normal text-4xl mb-10 mt-7 text-black-200 md:mt-0 md:text-5xl lg:text-6xl lg:mb-12">
          Register and join us!
        </h1>
        <div className="flex flex-wrap justify-between">
          <div className="w-[calc(100%/2-20px/2)] mb-10 lg:w-[calc(100%/2-63px/2)] ">
            <input
              id="firstName"
              name="firstName"
              placeholder="Fist name"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              className={`w-full font-maven font-normal text-2xl text-black-200 border-b ${
                formik.errors.firstName ? "border-red-500" : "border-black-200 "
              } placeholder:font-maven placeholder:font-normal placeholder:text-2xl placeholder:text-gray-100  md:text-3xl md:placeholder:text-3xl focus:outline-none`}
            />
            <p className="text-sm text-red-500 font-maven">
              {formik.errors.firstName}
            </p>
          </div>
          <div className="w-[calc(100%/2-20px/2)] mb-10 lg:w-[calc(100%/2-63px/2)] ">
            <input
              id="lastName"
              name="lastName"
              placeholder="Last name"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              className={`w-full font-maven font-normal text-2xl text-black-200 border-b ${
                formik.errors.lastName ? "border-red-500" : "border-black-200 "
              }  placeholder:font-maven placeholder:font-normal placeholder:text-2xl placeholder:text-gray-100  md:text-3xl md:placeholder:text-3xl focus:outline-none`}
            />
            <p className="text-sm text-red-500 font-maven">
              {formik.errors.lastName}
            </p>
          </div>
          <div className="w-full mb-10 lg:w-[calc(100%/2-63px/2)]">
            <input
              id="email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className={`w-full font-maven font-normal text-2xl text-black-200 border-b ${
                formik.errors.email ? "border-red-500" : "border-black-200 "
              }  placeholder:font-maven placeholder:font-normal placeholder:text-2xl placeholder:text-gray-100  md:text-3xl md:placeholder:text-3xl focus:outline-none`}
            />
            <p className="text-sm text-red-500 font-maven">
              {formik.errors.email}
            </p>
          </div>
          <div className=" w-full mb-10  lg:w-[calc(100%/2-63px/2)]">
            <div
              className={`flex justify-between items-center border-b ${
                formik.errors.password ? "border-red-500" : "border-black-200 "
              }`}
            >
              <input
                id="password"
                name="password"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
                type={isPassword ? "text" : "password"}
                className="w-full font-maven font-normal text-2xl text-black-200   placeholder:font-maven placeholder:font-normal placeholder:text-2xl placeholder:text-gray-100  md:text-3xl md:placeholder:text-3xl focus:outline-none"
              />
              <button onClick={() => setIsPassword(!isPassword)}>
                <img
                  src={isPassword ? eyeOffIcon : eyeIcon}
                  alt="eyeIcon"
                  className="h-10 w-10"
                />
              </button>
            </div>

            <p className="text-sm text-red-500 font-maven">
              {formik.errors.password}
            </p>
          </div>

          <div className="flex justify-center w-full">
            <div className="w-full lg:w-[calc(100%/2-300px/2)] mb-5  md:mb-10 flex flex-row justify-center items-center border-b border-black-200 ">
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
      </form>
    </div>
  );
};

export default RegisterForm;
