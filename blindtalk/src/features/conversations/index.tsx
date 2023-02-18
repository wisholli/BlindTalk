import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Conversation from "./Conversation";
import { useEffect } from "react";
import { getConversations } from "./conversationsSlice";
import { Navigate, NavLink } from "react-router-dom";

type Props = {};

const Conversations = (props: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getConversations());
  }, []);

  const authData = useAppSelector((state) => state.auth);
  const conversationData = useAppSelector((state) => state.conversations);

  const conversations = conversationData.data.map((conversation) => {
    if (
      String(conversation.creator.id) ||
      String(conversation.recipient.id) === authData.id
    ) {
      return (
        <div className="mx-auto w-5/6">
          <NavLink
            to={"/conversation/" + conversation.id}
            className="flex gap-1"
          >
            <div>{conversation.recipient.firstName}</div>
            <div>{conversation.recipient.lastName}</div>
          </NavLink>
        </div>
      );
    } else {
      <div>No dilogs</div>;
    }
  });
  return <div>{conversations}</div>;
};

export default Conversations;
