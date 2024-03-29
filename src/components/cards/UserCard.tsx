import { NavLink } from "react-router-dom";
import { UserData } from "../../types";

interface Props extends UserData {
  createConversation: (recipientId: number) => void;
}

export const UserCard = ({
  firstName,
  lastName,
  profileId,
  profile: { avatarUrl, birthDay, city, country, sex, status },
  createConversation,
}: Props) => {
  const handleClick = () => {
    if (profileId) {
      createConversation(profileId);
    }
  };

  let birthdayDate = birthDay?.split("-").reverse().join(".");

  return (
    <div className="flex justify-center mb-10">
      <div className="flex flex-col items-center gap-4 md:gap-14 lg:gap-20 md:flex-row md:justify-between">
        <img
          src={
            avatarUrl
              ? avatarUrl
              : "https://cdn-icons-png.flaticon.com/512/666/666201.png"
          }
          alt="user-avatar"
          className="rounded-full h-32 w-32 sm:h-56 sm:w-56 lg:h-64 lg:w-64 xl:h-80 xl:w-80"
        />
        <div className="flex flex-col md:w-[calc(100vw-(40px*2+56px+224px))] lg:w-[calc(100vw-(128px*2+80px+256px))] xl:w-[calc(100vw-(208px*2+80px+320px))]">
          <NavLink to={`/profile/${profileId}`}>
            <div className="flex gap-2 justify-center items-center mb-4 md:mb-4">
              <p className="m-0 font-maven font-normal text-4xl text-black-100  lg:text-5xl">
                {firstName}
              </p>
              <p className="m-0 font-maven font-normal text-4xl text-black-100  lg:text-5xl">
                {lastName}
              </p>
            </div>
          </NavLink>
          <div className="flex justify-center items-center gap-6 mb-4 md:mb-9 lg:gap-8">
            {sex ? (
              <p className="m-0 font-maven font-normal text-lg text-black-100 text-center md:text-xl lg:text-2xl">
                {sex}
              </p>
            ) : (
              <p className="m-0 font-maven font-normal text-sm text-black-100 text-center lg:text-base">
                Gender not specified
              </p>
            )}
            {birthDay ? (
              <p className="m-0 font-maven font-normal text-2xl text-black-100 text-center">
                {birthdayDate}
              </p>
            ) : (
              <p className="m-0 font-maven font-normal text-sm text-black-100 text-center lg:text-base">
                Birthday not specified
              </p>
            )}
            {country && city ? (
              <p className="m-0 font-maven font-normal text-2xl text-black-100 text-center">
                {country}, {city}
              </p>
            ) : (
              <p className="m-0 font-maven font-normal text-sm text-black-100 text-center lg:text-base">
                Country and city not specified
              </p>
            )}
          </div>
          <div className="mb-6 flex justify-center md:mb-16">
            {status ? (
              <p className="m-0 font-maven font-normal text-2xl text-black-100 ">
                {status}
              </p>
            ) : (
              <p className="m-0 font-maven font-normal text-xl text-black-100  lg:text-2xl">
                Status not specified
              </p>
            )}
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleClick}
              className="bg-green-100 py-2 px-11 rounded-3xl w-1/2"
            >
              <p className="m-0 font-maven font-medium text-base text-white">
                Let's chat
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
