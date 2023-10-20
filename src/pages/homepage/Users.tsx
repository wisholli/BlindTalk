import { useEffect } from "react";
import { getUsers } from "../../store/slices/users/usersSlice";
import { UserCard } from "../../components/cards/UserCard";
import { createANewConversation } from "../../store/slices/conversations/conversationsSlice";
import { getUserProfile } from "../../store/slices/users/profilesSlice";
import { useNavigate } from "react-router-dom";
import { ConversationData } from "../../types";
import { useAppDispatch, useAppSelector } from "../../store/store";

export const Users = () => {
  const dispatch = useAppDispatch();
  const authData = useAppSelector((state) => state.auth);
  const usersWithoutConversationWithCurrentUser = useAppSelector(
    (state) => state.users.data
  );

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (authData.profileId) {
      dispatch(getUserProfile(authData.profileId));
    }
  }, [dispatch, authData.profileId]);

  const message = "hi";

  //action and redirect to conversation page after creating conversation
  const navigate = useNavigate();
  const createConversation = (recipientId: number) => {
    dispatch(createANewConversation({ message, recipientId })).then((value) => {
      if (value.payload) {
        let { id } = value.payload as ConversationData;
        navigate(`/conversation/${id}`);
      }
    });
  };

  return (
    <div className="mx-2 md:mx-10 lg:mx-32 xl:mx-52">
      <div className="flex flex-col justify-center ">
        <h1 className="font-pacifico font-normal text-center text-4xl text-black-100  mt-5 md:text-6xl md:mb-5 lg:mb-14 lg:mt-0">
          Find your new friend!
        </h1>
        <div className="mt-10 h-[calc(100vh-180px)] overflow-y-scroll scrollbar scrollbar-w-1 scrollbar-thumb-gray-200 scrollbar-thumb-rounded-lg px-2 md:h-[calc(100vh-210px)] md:mt-5 lg:h-[calc(100vh-250px)] lg:mt-0">
          {usersWithoutConversationWithCurrentUser.map((u) => {
            return (
              <UserCard
                key={u.id}
                {...u}
                createConversation={createConversation}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
