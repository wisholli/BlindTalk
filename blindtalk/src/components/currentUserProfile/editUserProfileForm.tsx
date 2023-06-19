import { useState } from "react";
import { useFormik } from "formik";
import {
  ActiveCheckBox,
  Sex,
  UserData,
  UserProfileInfoForUpdate,
} from "../../types";
import { useAppSelector } from "../../app/hooks";
import { CheckBox } from "../../utils/CheckBox/CheckBox";

type Props = {
  setIsEditMode: () => void;
  onEditMode: (data: UserProfileInfoForUpdate) => void;
};

export const EditUserProfileForm = ({ setIsEditMode, onEditMode }: Props) => {
  //user profile data
  const currentUserProfile = useAppSelector(
    (state) => state.profiles.currentUserProfile
  );

  const allUsers = useAppSelector((state) => state.profiles.data);

  let currentUser = allUsers.filter(
    (u) => u.user?.profileId === currentUserProfile?.id
  );

  //formik
  const formik = useFormik<UserProfileInfoForUpdate>({
    initialValues: {
      id: currentUser[0].user!.profileId,
      birthDay: currentUserProfile!.birthDay,
      city: currentUserProfile!.city,
      country: currentUserProfile!.country,
      sex: Sex.none,
      status: currentUserProfile!.status,
      firstName: currentUser[0].user!.firstName,
      lastName: currentUser[0].user!.lastName,
      avatarUrl: currentUser[0].avatarUrl,
    },
    onSubmit: (values) => {
      setIsEditMode();
      onEditMode(values);
    },
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

  return (
    <form onSubmit={formik.handleSubmit} className="w-[600px]">
      <div className="flex flex-col gap-9">
        <div className="flex justify-center gap-14 items-center ">
          <div className="w-1/2">
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              className="w-full border-b-2 border-black-100 bg-white outline-none font-maven font-normal text-6xl text-gray-100"
            />
          </div>
          <div className="w-1/2">
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              className="w-full border-b-2 border-black-100 bg-white outline-none text-6xl font-maven font-normal text-gray-100"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-5">
          <div className="w-[calc(100%/2-10px)]">
            <input
              id="birthDay"
              name="birthDay"
              type="text"
              value={formik.values.birthDay!}
              onChange={formik.handleChange}
              className="w-full bg-white outline-none border-b-2 border-black-100 font-maven font-normal text-4xl text-gray-100"
            />
          </div>

          <div className="w-[calc(100%/2-10px)]">
            <div className=" flex flex-row justify-center items-center border-b-2 border-black-100 ">
              <label
                htmlFor="sex"
                className="font-maven font-normal text-gray-100 text-2xl mr-5 md:text-4xl md:mr-10"
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

          <div className="w-[calc(100%/2-10px)]">
            <input
              id="country"
              name="country"
              type="text"
              value={formik.values.country!}
              onChange={formik.handleChange}
              className="w-full bg-white outline-none border-b-2 border-black-100 font-maven font-normal text-4xl text-gray-100"
            />
          </div>

          <div className="w-[calc(100%/2-10px)]">
            <input
              id="city"
              name="city"
              type="text"
              value={formik.values.city!}
              onChange={formik.handleChange}
              className="w-full bg-white outline-none border-b-2 border-black-100 font-maven font-normal text-4xl text-gray-100"
            />
          </div>
        </div>

        <div className="w-full border-2 border-green-100 rounded-3xl py-5 px-10">
          <textarea
            id="status"
            name="status"
            value={formik.values.status!}
            onChange={formik.handleChange}
            className="w-full resize-none bg-white outline-none font-maven font-normal text-3xl text-center text-gray-100"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className=" bg-green-100 rounded-3xl font-maven font-medium text-3xl text-white py-2 px-24"
          >
            Done
          </button>
        </div>
      </div>
    </form>
  );
};
