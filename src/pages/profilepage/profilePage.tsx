import { useEffect, useState } from "react";
import { EditUserProfileForm } from "../../components/userProfile/editUserProfileForm";
import { CurrentUserProfile } from "../../components/userProfile/currentUserProfile";
import { UserProfile, UserProfileInfoForUpdate } from "../../types";
import {
  getUserProfile,
  updateUserLastNameFirstName,
  updateUserProfile,
} from "../../store/slices/users/profilesSlice";
import { getUsers } from "../../store/slices/users/usersSlice";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Headline } from "../../utils/Headline/Headline";

export const ProfilePage = () => {
  let authData = useAppSelector((state) => state.auth);
  let currentUserProfileData = useAppSelector(
    (state) => state.profiles.currentUserProfile
  );

  //actions
  const dispatch = useAppDispatch();

  //information for loading current user profile or selected user profile
  let { id } = useParams();

  //get data for server
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (authData.profileId) {
      dispatch(getUserProfile(authData.profileId));
    }
  }, [authData.profileId, dispatch]);

  //toggler for enabling edit profile form
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const onEditMode = ({
    id,
    avatarUrl,
    birthDay,
    city,
    country,
    sex,
    status,
    firstName,
    lastName,
  }: UserProfileInfoForUpdate) => {
    const updatedUserData: UserProfile = {
      id: id,
      avatarUrl: avatarUrl,
      birthDay: birthDay,
      city: city,
      country: country,
      sex: sex,
      status: status,
      user: {
        firstName: firstName,
        lastName: lastName,
        profileId: currentUserProfileData!.user.profileId,
      },
    };
    dispatch(updateUserProfile(updatedUserData));
    if (firstName && lastName && id)
      dispatch(updateUserLastNameFirstName({ firstName, lastName, id }));
  };

  //headline
  let headlineForSelectedUser = `${currentUserProfileData?.user.firstName} 
    ${currentUserProfileData?.user.lastName}
    profile`;

  return (
    <div className="w-11/12 mx-auto xl:w-3/4">
      <div className="flex justify-center mt-5 lg:mt-0">
        {Number(id) === authData.id ? (
          <Headline text="My profile" />
        ) : (
          <Headline text={headlineForSelectedUser} />
        )}
      </div>

      <div className="flex justify-center lg:gap-10 flex-col lg:flex-row w-full items-center">
        {currentUserProfileData?.id && (
          <div>
            {currentUserProfileData?.avatarUrl != null && (
              <img
                src={currentUserProfileData?.avatarUrl}
                alt="userphoto"
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
