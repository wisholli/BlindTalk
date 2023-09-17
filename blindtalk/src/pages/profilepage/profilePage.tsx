import { useEffect, useState } from "react";
import { EditUserProfileForm } from "../../components/userProfile/editUserProfileForm";
import { UserProfile } from "../../components/userProfile/currentUserProfile";
import { UserProfileInfoForUpdate } from "../../types";
import {
  getUserProfile,
  getUsersProfiles,
  updateUserLastNameFirstName,
  updateUserProfile,
} from "../../store/slices/users/profilesSlice";
import { getUsers } from "../../store/slices/users/usersSlice";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";

export const ProfilePage = () => {
  const allUsers = useAppSelector((state) => state.profiles.data);
  const userData = useAppSelector((state) => state.users.data);
  let athorizedUserId = useAppSelector((state) => state.auth.id);

  //toggler for enabling edit profile form
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  //information for loading current user profile or selected user profile
  let { id } = useParams();

  let selectedUser = allUsers.filter((u) => u.id === Number(id));
  let currentUserData = userData.filter((u) => u.id === Number(id));

  //get data for server
  useEffect(() => {
    dispatch(getUsersProfiles());
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (currentUserData[0] && currentUserData[0].id === athorizedUserId) {
      dispatch(getUserProfile(currentUserData[0].profileId));
    }
  }, [currentUserData[0]?.profileId]);

  //actions
  const dispatch = useAppDispatch();

  const onEditMode = (data: UserProfileInfoForUpdate) => {
    let { firstName, lastName, id } = data;
    dispatch(updateUserProfile(data));
    if (firstName && lastName && id)
      dispatch(updateUserLastNameFirstName({ firstName, lastName, id }));
  };

  //headline component
  interface Props {
    text: string;
  }

  let headlineForSelectedUser = [
    selectedUser[0]?.user.firstName,
    selectedUser[0]?.user.lastName,
    "profile",
  ];

  const Headline = ({ text }: Props) => (
    <h1 className="font-pacifico font-normal text-6xl text-black-100 text-center mb-10">
      {text}
    </h1>
  );

  return (
    <div className="xl:mx-60">
      <div className="flex justify-center">
        {Number(id) === athorizedUserId ? (
          <Headline text={"My profile"} />
        ) : (
          <div className="flex gap-2">
            {headlineForSelectedUser.map((text) => (
              <Headline text={text} />
            ))}
          </div>
        )}
      </div>

      <div className="flex w-full items-center">
        {selectedUser[0]?.id && (
          <div className="flex justify-start w-1/2">
            <div className="flex flex-col gap-9 items-center ">
              {selectedUser[0]?.avatarUrl != null && (
                <img
                  src={selectedUser[0]?.avatarUrl}
                  alt="user-photo"
                  className="rounded-full h-96 w-96"
                />
              )}
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
            <UserProfile setIsEditMode={() => setIsEditMode(!isEditMode)} />
          )}
        </div>
      </div>
    </div>
  );
};
