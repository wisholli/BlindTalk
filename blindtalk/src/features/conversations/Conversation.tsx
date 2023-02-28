import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getConversationMessages,
  sendMessage,
} from "../messages/messagesSlice";
import { getConversationData } from "./conversationsSlice";
import moment from "moment";
import Messages from "../messages";
import SideBar from "../messages/SideBar";
import SendMessageForm from "./SendMessageForm";

const Conversation = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      dispatch(getConversationData(id));
      dispatch(getConversationMessages(id));
    }
  }, [id]);

  const conversationData = useAppSelector((state) => state.conversations);
  const messagesData = useAppSelector((state) => state.messages);

  let conversationId = conversationData.currentDialog?.id;

  const sendNewMessage = (content: string) => {
    if (conversationId) {
      dispatch(sendMessage({ conversationId, content }));
    }
  };
  const messages = messagesData.messages
    .map((message) => (
      <Messages
        author={message.author}
        content={message.content}
        createdAt={message.createdAt}
      />
    ))
    .reverse();

  return (
    <div className="mx-auto w-full flex">
      <div className="w-1/6">
        <div className="border-b-2 py-4 px-2">
          <input
            type="text"
            placeholder="search chatting"
            className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
          />
        </div>
        {conversationData.data.map((dialog) => (
          <SideBar conversationId={dialog.id} recipient={dialog.recipient} />
        ))}
      </div>
      <div className="w-5/6">
        <div className="flex items-center justify-center">
          <div className="text-center text-xs box-border h-5 w-24 border-2 rounded-xl border-slate-200 bg-slate-200">
            {moment(conversationData.currentDialog?.createdAt)
              .utc()
              .format("DD MMM YYYY")}
          </div>
        </div>
        <div className="h-100 overflow-auto">{messages}</div>
        <SendMessageForm sendNewMessage={sendNewMessage} />
      </div>
    </div>
  );
};

export default Conversation;
