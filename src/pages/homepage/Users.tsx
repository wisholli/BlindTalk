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
  const { profileId } = useAppSelector((state) => state.auth);
  const { error, isLoading, users } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (profileId) {
      dispatch(getUserProfile(profileId));
    }
  }, [dispatch, profileId]);

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
    <div className="mx-2 md:mx-10 lg:mx-32 xl:mx-52">
      <div className="flex flex-col justify-center ">
        <h1 className="font-pacifico font-normal text-center text-4xl text-black-100  mt-5 md:text-6xl md:mb-5 lg:mb-14 lg:mt-0">
          Find your new friend!
        </h1>
        <div className="mt-10 h-[calc(100vh-180px)] overflow-y-scroll scrollbar scrollbar-w-1 scrollbar-thumb-gray-200 scrollbar-thumb-rounded-lg px-2 md:h-[calc(100vh-210px)] md:mt-5 lg:h-[calc(100vh-250px)] lg:mt-0">
          {users.map((u) => {
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
