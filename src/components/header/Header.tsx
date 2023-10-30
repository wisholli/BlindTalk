import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "./../../assets/images/logo.svg";
import menuIcon from "./../../assets/images/menu-icon.svg";
import { useAppSelector } from "../../store/store";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { DesktopNavBar } from "./screensNavBars/DesktopNavBar";
import { MobileNavBar } from "./screensNavBars/MobileNavBar";

export const Header = () => {
  const [isToggled, setToggle] = useState<boolean>(false);
  const [isProfile, setIsProfile] = useState<boolean>(false);

  const conversationData = useAppSelector((state) => state.conversations);

  const handleProfile = () => {
    setIsProfile(!isProfile);
  };

  let conversationId = conversationData.conversations.length
    ? conversationData.conversations[conversationData.conversations.length - 1]
        .id
    : null;

  let isAboveMediumScreens = useMediaQuery("(min-width:1060px)");

  return (
    <div className="sticky top-0 z-10 bg-white shadow-md w-full">
      <div
        className={`w-11/12 mx-auto py-3 ${
          isAboveMediumScreens ? "mb-10" : "mb-0"
        }`}
      >
        <div className="flex justify-between items-center">
          <NavLink to="/">
            <img src={logo} alt="logo" className="w-52" />
          </NavLink>
          {isAboveMediumScreens ? (
            <DesktopNavBar
              id={conversationId}
              isProfile={isProfile}
              handleProfile={handleProfile}
            />
          ) : (
            <button
              className="cursor-pointer"
              onClick={() => setToggle(!isToggled)}
            >
              <img src={menuIcon} alt="mobile-menu-icon" className="mt-3 h-8" />
            </button>
          )}
          {!isAboveMediumScreens && isToggled && (
            <MobileNavBar
              id={conversationId}
              isToggled={isToggled}
              handleClick={setToggle}
            />
          )}
        </div>
      </div>
    </div>
  );
};
