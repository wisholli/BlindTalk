import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { EditUserProfileForm } from "./editUserProfileForm";
import { CurrentUserProfile } from "./currentUserProfile";
import { UserProfileInfoForUpdate } from "../../types";
import {
  getUserProfile,
  getUsersProfiles,
  updateUserLastNameFirstName,
  updateUserProfile,
} from "../../features/users/profilesSlice";
import { getUsers } from "../../features/users/usersSlice";

export const ProfilePage = () => {
  //get dete abiut current user
  const currentUserProfile = useAppSelector(
    (state) => state.profiles.currentUserProfile
  );

  //toggler for enabling edit profile form
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  //get data for server
  const authData = useAppSelector((state) => state.auth);
  const userData = useAppSelector((state) => state.users.data);

  let currentUser = userData.filter((u) => u.id === authData.id);

  useEffect(() => {
    dispatch(getUsersProfiles());
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (currentUser[0]) {
      dispatch(getUserProfile(currentUser[0].profileId));
    }
  }, [currentUser[0]?.profileId]);

  //actions
  const dispatch = useAppDispatch();

  const onEditMode = (data: UserProfileInfoForUpdate) => {
    let { firstName, lastName, id } = data;
    dispatch(updateUserProfile(data));
    if (firstName && lastName && id)
      dispatch(updateUserLastNameFirstName({ firstName, lastName, id }));
  };

  return (
    <div className="xl:mx-60">
      <h1 className="font-pacifico font-normal text-6xl text-black-100 text-center mb-10">
        My profile
      </h1>
      <div className="flex w-full items-center">
        {currentUserProfile?.id && (
          <div className="flex justify-start w-1/2">
            <div className="flex flex-col gap-9 items-center ">
              {currentUserProfile?.avatarUrl != null && (
                <img
                  src={currentUserProfile.avatarUrl}
                  alt="user-photo"
                  className="rounded-full h-96 w-96"
                />
              )}

              <button className="bg-green-100 py-2 px-28 rounded-3xl font-maven font-medium text-3xl text-white">
                Edit photo
              </button>
            </div>
          </div>
        )}

        <div className="w-1/2">
          {isEditMode ? (
            <EditUserProfileForm
              setIsEditMode={() => setIsEditMode(!isEditMode)}
              onEditMode={onEditMode}
            />
          ) : (
            <CurrentUserProfile
              setIsEditMode={() => setIsEditMode(!isEditMode)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
