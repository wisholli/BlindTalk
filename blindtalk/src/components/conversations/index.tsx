import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { getConversations } from "../../features/conversations/conversationsSlice";
import { NavLink } from "react-router-dom";

const Conversations = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getConversations());
  }, []);

  const authData = useAppSelector((state) => state.auth);
  const conversationData = useAppSelector((state) => state.conversations);

  const conversations = conversationData.data.map((conversation) => {
    if (conversation.creator.id === authData.id) {
      return (
        <div key={conversation.id} className="mx-auto w-5/6">
          <NavLink
            to={"/conversation/" + conversation.id}
            className="flex gap-1"
          >
            <div>{conversation.recipient.firstName}</div>
            <div>{conversation.recipient.lastName}</div>
          </NavLink>
        </div>
      );
    } else if (conversation.recipient.id === authData.id) {
      return (
        <div key={conversation.id} className="mx-auto w-5/6">
          <NavLink
            to={"/conversation/" + conversation.id}
            className="flex gap-1"
          >
            <div>{conversation.creator.firstName}</div>
            <div>{conversation.creator.lastName}</div>
          </NavLink>
        </div>
      );
    } else {
      <div key={conversation.id}>No dilogs</div>;
    }
  });
  return <div>{conversations}</div>;
};

export default Conversations;
