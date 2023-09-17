import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "./../../assets/images/logo.svg";
import menuIcon from "./../../assets/images/menu-icon.svg";
import closeIcon from "../../assets/images/close-icon.svg";
import { useAppSelector } from "../../store/store";

export const Header = () => {
  const [isToggled, setToggle] = useState<boolean>(false);
  const [isProfile, setIsProfile] = useState<boolean>(false);

  const conversationData = useAppSelector((state) => state.conversations);
  const currentUserProfile = useAppSelector(
    (state) => state.profiles.currentUserProfile
  );

  let id = conversationData.data[0]?.id;

  return (
    <div
      className={`sticky top-0 z-10 px-4 pb-2 bg-white shadow-md md:mb-7 lg:mb-10 lg:px-16 ${
        conversationData.isChatSelected && "hidden"
      }`}
    >
      <div className="flex justify-between items-center">
        <NavLink to="/">
          <img src={logo} alt="logo" className="w-1/3 md:w-52" />
        </NavLink>
        <div>
          <button
            className="md:hidden cursor-pointer"
            onClick={() => setToggle(!isToggled)}
          >
            <img src={menuIcon} alt="mobile-menu-icon" className="mt-3 h-8" />
          </button>
          <div className="hidden space-x-5 md:flex md:gap-5 md:items-center">
            <NavLink
              to={"/"}
              className="font-maven font-normal text-2xl text-black-100"
            >
              Find new friend
            </NavLink>
            <NavLink
              to={id ? `/conversation/${id}` : "/conversation/0"}
              className="font-maven font-normal text-2xl text-black-100 "
            >
              Conversations
            </NavLink>
            <div className="relative">
              <button onClick={() => setIsProfile(!isProfile)}>
                {currentUserProfile?.avatarUrl !== null && (
                  <img
                    src={currentUserProfile?.avatarUrl}
                    alt="profile-icon"
                    className="h-10 w-10 rounded-full"
                  />
                )}
              </button>
              {isProfile && (
                <div className="absolute right-5 top-10 bg-green-100 shadow-md shadow-black/30 rounded-b-md rounded-tl-md py-1 px-5">
                  <button onClick={() => setIsProfile(!isProfile)}>
                    <NavLink to={`/profile/${currentUserProfile?.id}`}>
                      <p className="m-0 font-maven font-normal text-lg text-white">
                        Profile
                      </p>
                    </NavLink>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {isToggled && (
          <div className="fixed z-10 left-0 top-0 h-screen w-screen bg-white px-4 py-2 ">
            <div className="flex justify-between items-center mb-10">
              <img src={logo} alt="logo" className="w-1/3 md:w-auto" />
              <button
                className="md:hidden cursor-pointer"
                onClick={() => setToggle(!isToggled)}
              >
                <img src={closeIcon} alt="mobile-cross-icon" className="h-8" />
              </button>
            </div>
            <div className="flex flex-col justify-center items-center gap-5">
              <button onClick={() => setToggle(false)}>
                <NavLink
                  to={"/"}
                  className="font-maven font-normal text-2xl text-black-100"
                >
                  Find new friend
                </NavLink>
              </button>
              <button onClick={() => setToggle(false)}>
                <NavLink
                  to={id ? `/conversation/${id}` : "/conversation/0"}
                  className="font-maven font-normal text-2xl text-black-100"
                >
                  Conversations
                </NavLink>
              </button>
              <button onClick={() => setToggle(false)}>
                <NavLink
                  to={`/profile/${currentUserProfile?.id}`}
                  className="font-maven font-normal text-2xl text-black-100"
                >
                  Profile
                </NavLink>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
