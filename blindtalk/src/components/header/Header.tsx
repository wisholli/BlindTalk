import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "./../../assets/images/logo.svg";
import menuIcon from "./../../assets/images/menu-icon.svg";
import closeIcon from "../../assets/images/close-icon.svg";
import { useAppSelector } from "../../app/hooks";

export const Header = () => {
  const [isToggled, setToggle] = useState<boolean>(false);
  const conversationData = useAppSelector((state) => state.conversations);
  let id = conversationData.data[0]?.id;

  console.log(conversationData.isChatSelected);

  return (
    <div
      className={`sticky top-0 z-10 px-4 pb-2 bg-white shadow-md lg:mb-10 lg:px-16 ${
        conversationData.isChatSelected && "hidden"
      }`}
    >
      <div className="flex justify-between items-center">
        <img src={logo} alt="logo" className="w-1/3 md:w-auto" />
        <div>
          <button
            className="md:hidden cursor-pointer"
            onClick={() => setToggle(!isToggled)}
          >
            <img src={menuIcon} alt="mobile-menu-icon" className="mt-3 h-8" />
          </button>
          <div className="hidden md:block space-x-5">
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
