import { useEffect, useState } from "react";
import { EditUserProfileForm } from "../../components/userProfile/editUserProfileForm";
import { CurrentUserProfile } from "../../components/userProfile/currentUserProfile";
import { UserProfile, UserProfileInfoForUpdate } from "../../types";
import {
  getUserProfile,
  updateUserProfile,
} from "../../store/slices/users/profilesSlice";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Headline } from "../../utils/Headline/Headline";

export const ProfilePage = () => {
  let authData = useAppSelector((state) => state.auth);
  let { currentUserProfile, error, isLoading } = useAppSelector(
    (state) => state.profiles
  );

  //actions
  const dispatch = useAppDispatch();

  //information for loading current user profile or selected user profile
  let { id } = useParams();

  //get data for server
  useEffect(() => {
    if (id) {
      dispatch(getUserProfile(Number(id)));
    }
  }, [id, dispatch]);

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
        profileId: currentUserProfile!.user.profileId,
      },
    };
    dispatch(updateUserProfile(updatedUserData));
  };

  //headline
  let headlineForSelectedUser = `${currentUserProfile?.user.firstName} 
    ${currentUserProfile?.user.lastName}
    profile`;

  if (error) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-100px)] lg:h-[calc(100vh-200px)]">
        <p className="font-pacifico text-black-100 text-2xl text-center">
          {error}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-100px)] lg:h-[calc(100vh-200px)]">
        <p className="font-pacifico text-black-100 text-2xl text-center">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto xl:w-3/4">
      <div className="flex justify-center mt-5 lg:mt-0">
        {Number(id) === authData.userId ? (
          <Headline text="My profile" />
        ) : (
          <Headline text={headlineForSelectedUser} />
        )}
      </div>

      <div className="flex justify-center lg:gap-10 flex-col lg:flex-row w-full items-center">
        <div>
          {currentUserProfile?.avatarUrl != null && (
            <img
              src={currentUserProfile?.avatarUrl}
              alt="userphoto"
              className="rounded-full h-52 w-52 md:h-72 md:w-72 lg:h-96 lg:w-96"
            />
          )}
        </div>

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
