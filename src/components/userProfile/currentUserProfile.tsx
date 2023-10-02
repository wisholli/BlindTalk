import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store/store";

type Props = {
  setIsEditMode: () => void;
};

export const CurrentUserProfile = ({ setIsEditMode }: Props) => {
  let { id } = useParams();
  const authData = useAppSelector((state) => state.auth);

  //user profile data
  const currentUserProfile = useAppSelector(
    (state) => state.profiles.currentUserProfile
  );

  let birthdayDate = currentUserProfile?.birthDay
    ?.split("-")
    .reverse()
    .join(".");

  if (currentUserProfile) {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex gap-2 justify-center items-center mt-7 ">
          <p className="m-0 font-maven font-normal text-4xl text-black-100  lg:text-6xl">
            {currentUserProfile.user?.firstName}
          </p>
          <p className="m-0 font-maven font-normal text-4xl text-black-100  lg:text-6xl">
            {currentUserProfile.user?.lastName}
          </p>
        </div>
        <div className="flex justify-center items-center gap-6">
          {currentUserProfile.sex ? (
            <p className="m-0 font-maven font-normal text-3xl text-black-100 text-center">
              {currentUserProfile.sex}
            </p>
          ) : (
            <p className="m-0 font-maven font-normal text-sm text-black-100 text-center ">
              Gender not specified
            </p>
          )}
          {currentUserProfile.birthDay ? (
            <p className="m-0 font-maven font-normal text-3xl text-black-100 text-center">
              {birthdayDate}
            </p>
          ) : (
            <p className="m-0 font-maven font-normal text-sm text-black-100 text-center ">
              Birthday not specified
            </p>
          )}
          {currentUserProfile.country && currentUserProfile.city ? (
            <p className="m-0 font-maven font-normal text-2xl text-black-100 text-center">
              {currentUserProfile.country}, {currentUserProfile.city}
            </p>
          ) : (
            <p className="m-0 font-maven font-normal text-sm text-black-100 text-center lg:text-base">
              Country and city not specified
            </p>
          )}
        </div>
        <div className="flex justify-center border-2 border-green-100 rounded-3xl py-16">
          {currentUserProfile.status ? (
            <p className="m-0 font-maven font-normal text-4xl text-black-100 ">
              {currentUserProfile.status}
            </p>
          ) : (
            <p className="m-0 font-maven font-normal text-xl text-black-100  lg:text-2xl">
              Status not specified
            </p>
          )}
        </div>
        {authData.id === Number(id) && (
          <div className="flex justify-center gap-5">
            <button
              onClick={setIsEditMode}
              className="bg-green-100 py-2 px-11 rounded-3xl w-1/2"
            >
              <p className="m-0 font-maven font-medium text-xl text-white">
                Edit information
              </p>
            </button>
            <button className="bg-gray-400 py-2 px-11 rounded-3xl w-1/2">
              <p className="m-0 font-maven font-medium text-xl text-white">
                Delete profile
              </p>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <p className="m-0 font-maven font-medium text-3xl text-black-100 text-center">
        Loading...
      </p>
    </div>
  );
};
