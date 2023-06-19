import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUsers } from "../../features/users/usersSlice";
import { UserInfo } from "./UserInfo";
import {
  createANewConversation,
  getConversations,
} from "../../features/conversations/conversationsSlice";
import {
  getUserProfile,
  getUsersProfiles,
} from "../../features/users/profilesSlice";

export const Users = () => {
  const dispatch = useAppDispatch();
  const usersProfiles = useAppSelector((state) => state.profiles.data);
  const authData = useAppSelector((state) => state.auth);
  const userData = useAppSelector((state) => state.users.data);

  let currentUser = userData.filter((u) => u.id === authData.id);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getConversations());
    dispatch(getUsersProfiles());
  }, []);

  useEffect(() => {
    if (currentUser[0]) {
      dispatch(getUserProfile(currentUser[0].profileId));
    }
  }, [currentUser[0]?.profileId]);

  const message = "hi";

  const createConversation = (recipientId: number) => {
    dispatch(createANewConversation({ message, recipientId }));
  };

  return (
    <div className="mx-2 md:mx-10 lg:mx-32 xl:mx-52">
      <div className="flex flex-col justify-center ">
        <h1 className="font-pacifico font-normal text-center text-4xl text-black-100  mt-5 md:text-6xl md:mb-5 lg:mb-14 lg:mt-0">
          Find your new friend!
        </h1>
        <div className="mt-10 h-[calc(100vh-180px)] overflow-y-scroll scrollbar scrollbar-w-1 scrollbar-thumb-gray-200 scrollbar-thumb-rounded-lg px-2 md:h-[calc(100vh-204px)] md:mt-5 lg:h-[calc(100vh-240px)] lg:mt-0">
          {usersProfiles.map((p) => {
            return (
              <UserInfo
                key={p.id}
                {...p}
                createConversation={createConversation}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
