import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../store/store";

interface IDesktopNavBarProps {
  handleProfile: () => void;
  isProfile: boolean;
  id: number | null;
}

export const DesktopNavBar = ({
  isProfile,
  handleProfile,
}: IDesktopNavBarProps) => {
  const currentUserProfileAvatar = useAppSelector(
    (state) => state.profiles.authorizedUserAvatar
  );

  const authorizedUserProfileId = useAppSelector(
    (state) => state.auth.profileId
  );

  const conversations = useAppSelector((state) => state.conversations);
  console.log(conversations.conversations.length);
  return (
    <div className="flex items-center gap-10">
      <NavLink
        to={"/"}
        className="font-maven font-normal text-2xl text-black-100"
      >
        Find new friends
      </NavLink>
      <NavLink
        to={
          conversations.conversations.length
            ? `/conversation/${
                conversations.currentDialog
                  ? conversations.currentDialog.id
                  : conversations.conversations[
                      conversations.conversations.length - 1
                    ].id
              }`
            : "/conversation"
        }
        className="font-maven font-normal text-2xl text-black-100 "
      >
        Conversations
      </NavLink>
      {currentUserProfileAvatar && (
        <div className="relative">
          <button onClick={handleProfile}>
            <img
              src={currentUserProfileAvatar}
              alt="profile-icon"
              className="h-10 w-10 rounded-full"
            />
          </button>
          {isProfile && (
            <div className="absolute right-5 top-10 bg-green-100 shadow-md shadow-black/30 rounded-b-md rounded-tl-md py-1 px-5">
              <button onClick={handleProfile}>
                <NavLink to={`/profile/${authorizedUserProfileId}`}>
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
