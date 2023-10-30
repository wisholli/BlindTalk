import { NavLink } from "react-router-dom";
import closeIcon from "../../../assets/images/close-icon.svg";
import { useAppSelector } from "../../../store/store";

interface IMobileNavBarProps {
  handleClick: (v: boolean) => void;
  isToggled: boolean;
  id: number | null;
}

export const MobileNavBar = ({
  isToggled,
  handleClick,
}: IMobileNavBarProps) => {
  const authorizedUserProfileId = useAppSelector(
    (state) => state.auth.profileId
  );
  return (
    <div className="fixed z-20 shadow-xl right-0 top-0 h-full w-2/3 bg-white px-4 py-2 ">
      <div className="flex justify-end mb-10 my-5">
        <button
          className="cursor-pointer"
          onClick={() => handleClick(!isToggled)}
        >
          <img src={closeIcon} alt="mobile-cross-icon" className="h-8" />
        </button>
      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        <button onClick={() => handleClick(false)}>
          <NavLink
            to={"/"}
            className="font-maven font-normal text-2xl text-black-100"
          >
            Find new friends
          </NavLink>
        </button>
        <button onClick={() => handleClick(false)}>
          <NavLink
            to="/conversation"
            className="font-maven font-normal text-2xl text-black-100"
          >
            Conversations
          </NavLink>
        </button>
        <button onClick={() => handleClick(false)}>
          <NavLink
            to={`/profile/${authorizedUserProfileId}`}
            className="font-maven font-normal text-2xl text-black-100"
          >
            Profile
          </NavLink>
        </button>
      </div>
    </div>
  );
};
