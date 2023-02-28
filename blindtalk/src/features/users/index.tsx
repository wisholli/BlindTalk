import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUsers } from "./usersSlice";
import UserInfo from "./userInfo";
import { createANewConversation } from "../conversations/conversationsSlice";

const Users = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const userData = useAppSelector((state) => state.users);

  const message = "hi";

  const createConversation = (recipientId: number) => {
    dispatch(createANewConversation({ message, recipientId }));
  };

  return (
    <div className="mx-auto w-5/6">
      <div className=" box-content p-4 border-2 rounded-md mx-40">
        <h1 className="text-center mt-5 mb-5 text-2xl">
          Find your new friend!
        </h1>
        <div className="overflow-y-scroll">
          {userData.data.map((user) => (
            <UserInfo {...user} createConversation={createConversation} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
