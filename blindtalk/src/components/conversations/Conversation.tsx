import { useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  editMessage,
  getConversationMessages,
  receiveMessage,
  sendMessage,
} from "../../features/messages/messagesSlice";
import { getConversationData } from "../../features/conversations/conversationsSlice";
import moment from "moment";
import { ConversationMessages } from "./ConversationMessages";
import SideBar from "./SideBar";
import SendMessageForm from "./SendMessageForm";
import { EditMessageData } from "../../types";
import { SocketContext } from "../../utils/SocketContext/SocketContext";

const Conversation = () => {
  const dispatch = useAppDispatch();
  const conversationData = useAppSelector((state) => state.conversations);
  const messagesData = useAppSelector((state) => state.messages);

  //WebSocket
  const socket = useContext(SocketContext);
  useEffect(() => {
    socket.on("connected", () => {
      console.log("Socket connected");
    });
    socket.on("onMessage", (payload) => {
      dispatch(receiveMessage(payload));
    });
    return () => {
      socket.off("conneted");
      socket.off("onMessage");
    };
  }, []);

  //Get server data
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      dispatch(getConversationData(id));
      dispatch(getConversationMessages(id));
    }
  }, [id]);

  //Messages scroll
  const lastMessageRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesData.messages[0]]);

  //Actions
  let conversationId = conversationData.currentDialog?.id;

  const sendNewMessage = (content: string) => {
    if (conversationId) {
      dispatch(sendMessage({ content, conversationId }));
    }
  };

  const onEditMessage = (data: EditMessageData) => {
    dispatch(editMessage(data));
  };

  const messages = messagesData.messages
    .map((message) => (
      <ConversationMessages
        key={message.id}
        {...message}
        onEditMessage={onEditMessage}
        lastMessageRef={lastMessageRef}
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
          <SideBar
            key={dialog.id}
            conversationId={dialog.id}
            recipient={dialog.recipient}
          />
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
