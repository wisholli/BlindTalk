import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUsers } from "../../features/users/usersSlice";
import { UserInfo } from "./UserInfo";
import {
  createANewConversation,
  getConversations,
} from "../../features/conversations/conversationsSlice";

export const Users = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.users);
  const conversationsData = useAppSelector((state) => state.conversations.data);
  let users = [...userData.data];
  let reverseUsers = users.reverse();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getConversations());
  }, [reverseUsers[0]]);

  const message = "hi";

  const createConversation = (recipientId: number) => {
    dispatch(createANewConversation({ message, recipientId }));
  };

  const userForNewConversation = userData.data.filter(
    (user) =>
      !conversationsData.some(
        (c) => c.creator.id === user.id || c.recipient.id === user.id
      )
  );

  return (
    <div className="mx-auto w-5/6">
      <div className=" box-content p-4 border-2 rounded-md mx-40">
        <h1 className="text-center mt-5 mb-5 text-2xl">
          Find your new friend!
        </h1>
        <div className="overflow-y-scroll">
          {userForNewConversation.map((user) => (
            <UserInfo
              key={user.id}
              {...user}
              createConversation={createConversation}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
