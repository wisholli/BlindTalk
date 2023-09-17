import { NavLink } from "react-router-dom";
import { UserProfile } from "../../../types";
import closeIcon from "../../../assets/images/close-icon.svg";

interface IMobileNavBarProps {
  handleClick: (v: boolean) => void;
  isToggled: boolean;
  currentUserProfile: UserProfile | null;
  id: number;
}

export const MobileNavBar = ({
  id,
  isToggled,
  currentUserProfile,
  handleClick,
}: IMobileNavBarProps) => {
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
            Find new friend
          </NavLink>
        </button>
        <button onClick={() => handleClick(false)}>
          <NavLink
            to={id ? `/conversation/${id}` : "/conversation/0"}
            className="font-maven font-normal text-2xl text-black-100"
          >
            Conversations
          </NavLink>
        </button>
        <button onClick={() => handleClick(false)}>
          <NavLink
            to={`/profile/${currentUserProfile?.id}`}
            className="font-maven font-normal text-2xl text-black-100"
          >
            Profile
          </NavLink>
        </button>
      </div>
    </div>
  );
};
