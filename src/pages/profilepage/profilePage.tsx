import { useEffect, useState } from "react";
import { EditUserProfileForm } from "../../components/userProfile/editUserProfileForm";
import { CurrentUserProfile } from "../../components/userProfile/currentUserProfile";
import { UserProfile, UserProfileInfoForUpdate } from "../../types";
import {
  getUserProfile,
  getUsersProfiles,
  updateUserLastNameFirstName,
  updateUserProfile,
} from "../../store/slices/users/profilesSlice";
import { getUsers } from "../../store/slices/users/usersSlice";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Headline } from "../../utils/Headline/Headline";

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
    let updatedUserData: UserProfile = {
      id: data.id ? data.id : selectedUser[0].id,
      avatarUrl: data.avatarUrl ? data.avatarUrl : selectedUser[0].avatarUrl,
      birthDay: data.birthDay ? data.birthDay : selectedUser[0].birthDay,
      city: data.city ? data.city : selectedUser[0].city,
      country: data.country ? data.country : selectedUser[0].country,
      sex: data.sex ? data.sex : selectedUser[0].sex,
      status: data.status ? data.status : selectedUser[0].status,
      user: {
        firstName: data.firstName
          ? data.firstName
          : currentUserData[0].firstName,
        lastName: data.lastName ? data.lastName : currentUserData[0].lastName,
        profileId: currentUserData[0].profileId,
      },
    };
    dispatch(updateUserProfile(updatedUserData));
    let { firstName, lastName, id } = data;
    if (firstName && lastName && id)
      dispatch(updateUserLastNameFirstName({ firstName, lastName, id }));
  };

  //headline
  let headlineForSelectedUser = `${selectedUser[0]?.user.firstName} 
    ${selectedUser[0]?.user.lastName}
    profile`;

  return (
    <div className="w-11/12 mx-auto xl:w-3/4">
      <div className="flex justify-center mt-5 lg:mt-0">
        {Number(id) === athorizedUserId ? (
          <Headline text="My profile" />
        ) : (
          <Headline text={headlineForSelectedUser} />
        )}
      </div>

      <div className="flex justify-center lg:gap-10 flex-col lg:flex-row w-full items-center">
        {selectedUser[0]?.id && (
          <div>
            {selectedUser[0]?.avatarUrl != null && (
              <img
                src={selectedUser[0]?.avatarUrl}
                alt="user-photo"
                className="rounded-full h-52 w-52 md:h-72 md:w-72 lg:h-96 lg:w-96"
              />
            )}
          </div>
        )}

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
  );
};
