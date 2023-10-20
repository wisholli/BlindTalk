import { NavLink } from "react-router-dom";
import { UserProfile } from "../../../types";

interface IDesktopNavBarProps {
  handleProfile: () => void;
  isProfile: boolean;
  currentUserProfile: UserProfile | null;
  id: number;
}

export const DesktopNavBar = ({
  isProfile,
  handleProfile,
  currentUserProfile,
  id,
}: IDesktopNavBarProps) => {
  return (
    <div className="flex items-center gap-10">
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
      {currentUserProfile?.avatarUrl && (
        <div className="relative">
          <button onClick={handleProfile}>
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
              <button onClick={handleProfile}>
                <NavLink to={`/profile/${currentUserProfile?.id}`}>
                  <p className="m-0 font-maven font-normal text-lg text-white">
                    Profile
                  </p>
                </NavLink>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
