import { useFormik } from "formik";
import { Sex, UserProfileInfoForUpdate } from "../../types";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useAppSelector } from "../../store/store";

type Props = {
  setIsEditMode: () => void;
  onEditMode: (data: UserProfileInfoForUpdate) => void;
};

export const EditUserProfileForm = ({ setIsEditMode, onEditMode }: Props) => {
  //user profile data
  const currentUserProfile = useAppSelector(
    (state) => state.profiles.currentUserProfile
  );

  //formik
  const formik = useFormik<UserProfileInfoForUpdate>({
    initialValues: {
      id: currentUserProfile!.user.profileId,
      birthDay: currentUserProfile!.birthDay,
      city: currentUserProfile!.city,
      country: currentUserProfile!.country,
      sex: currentUserProfile!.sex,
      status: currentUserProfile!.status,
      firstName: currentUserProfile!.user!.firstName,
      lastName: currentUserProfile!.user!.lastName,
      avatarUrl: currentUserProfile!.avatarUrl,
    },
    onSubmit: (values) => {
      setIsEditMode();
      onEditMode(values);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-11/12 mx-auto lg:w-[600px]"
    >
      <div className="flex flex-col gap-9">
        <div className="flex justify-center gap-5 items-center ">
          <div className="w-1/2">
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              className="w-full border-b-2 border-black-100 bg-white outline-none font-maven font-normal text-4xl md:text-6xl text-gray-100"
            />
          </div>
          <div className="w-1/2">
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              className="w-full border-b-2 border-black-100 bg-white outline-none text-4xl md:text-6xl font-maven font-normal text-gray-100"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-5">
          <div className="w-[calc(100%/2-10px)]">
            <input
              id="birthDay"
              name="birthDay"
              type="date"
              value={formik.values.birthDay!}
              placeholder="Birthday"
              onChange={formik.handleChange}
              className="w-full bg-white outline-none border-b-2 border-black-100 font-maven font-normal text-2xl md:text-4xl text-gray-100"
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

              <input
                type="radio"
                id="male"
                name="male"
                value={Sex.male}
                checked={formik.values.sex === Sex.male}
                onChange={() => formik.setFieldValue("sex", Sex.male)}
                className={`form-radio cursor-pointer flex items-center justify-center border h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 ${
                  formik.values.sex === Sex.male
                    ? "text-green-100"
                    : " text-white"
                }`}
              />

              <label
                htmlFor="sex-male"
                className="font-maven font-normal text-2xl text-black-200 ml-1 mr-5 md:text-3xl md:mr-11 md:ml-2"
              >
                M
              </label>

              <input
                type="radio"
                id="female"
                name="female"
                value={Sex.female}
                checked={formik.values.sex === Sex.female}
                onChange={() => formik.setFieldValue("sex", Sex.female)}
                className={`form-radio cursor-pointer flex items-center justify-center border h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 ${
                  formik.values.sex === Sex.female
                    ? "text-green-100"
                    : " text-white"
                }`}
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
            <CountryDropdown
              value={formik.values.country || ""}
              onChange={(val: string) => formik.setFieldValue("country", val)}
              priorityOptions={["CA", "US", "GB"]}
              classes="w-full outline-none border-b-2 border-black-100 font-maven font-normal text-2xl md:text-4xl text-gray-100"
            />
          </div>

          <div className="w-[calc(100%/2-10px)]">
            <RegionDropdown
              country={formik.values.country || ""}
              value={formik.values.city || ""}
              onChange={(val: string) => {
                formik.setFieldValue("city", val);
              }}
              classes="w-full outline-none border-b-2 border-black-100 font-maven font-normal text-2xl md:text-4xl text-gray-100"
            />
          </div>
        </div>

        <div className="w-full border-2 border-green-100 rounded-3xl py-5 px-10">
          <textarea
            id="status"
            name="status"
            value={formik.values.status!}
            placeholder="Please enter your status"
            onChange={formik.handleChange}
            className="w-full resize-none bg-white outline-none font-maven font-normal text-xl md:text-3xl text-center text-gray-100"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className=" bg-green-100 rounded-3xl font-maven mb-10 lg:mb-0 font-medium text-3xl text-white py-2 px-24"
          >
            Done
          </button>
        </div>
      </div>
    </form>
  );
};
