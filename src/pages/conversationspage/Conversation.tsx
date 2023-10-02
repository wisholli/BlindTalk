import { useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  editMessage,
  getConversationMessages,
  receiveMessage,
  sendMessage,
  setNewEditMessageId,
} from "../../store/slices/messages/messagesSlice";
import {
  getConversationData,
  setIsChatSelected,
} from "../../store/slices/conversations/conversationsSlice";
import moment from "moment";
import { Messages } from "../../components/conversations/Messages";
import { ConversationsSideBar } from "../../components/conversations/ConversationsSideBar";
import SendMessageForm from "../../components/conversations/SendMessageForm";
import { EditMessageData } from "../../types";
import { SocketContext } from "../../utils/SocketContext/SocketContext";
import { useAppDispatch, useAppSelector } from "../../store/store";

const Conversation = () => {
  const dispatch = useAppDispatch();
  const conversationData = useAppSelector((state) => state.conversations);
  const messagesData = useAppSelector((state) => state.messages);
  const authData = useAppSelector((state) => state.auth);

  const setSelectedStatus = () => dispatch(setIsChatSelected());

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

  //Edit message text
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = (content: string) => {
    inputRef.current!.value = content;
  };

  const handleEditMessage = (newData: EditMessageData) => {
    dispatch(editMessage(newData));
    inputRef.current!.value = "";
    dispatch(setNewEditMessageId(0));
  };

  //Send message action
  let conversationId = conversationData.currentDialog?.id;

  const sendNewMessage = (content: string) => {
    if (conversationId) {
      dispatch(sendMessage({ content, conversationId }));
      inputRef.current!.value = "";
    }
  };

  //Messages
  const messages = messagesData.messages
    .map((message) => (
      <Messages
        key={message.id}
        {...message}
        lastMessageRef={lastMessageRef}
        handleClick={handleClick}
      />
    ))
    .reverse();

  return (
    <div>
      <div className="hidden w-full lg:flex">
        <div className=" w-1/4 pr-2 overflow-y-scroll h-[calc(100vh-124px)] scrollbar scrollbar-w-1 scrollbar-thumb-gray-200 scrollbar-thumb-rounded-lg">
          <div className="border-t-2 border-gray-400">
            {conversationData.data.map((dialog) => (
              <ConversationsSideBar
                key={dialog.id}
                conversationId={dialog.id}
                recipient={dialog.recipient}
                creator={dialog.creator}
              />
            ))}
          </div>
        </div>
        <div className="w-5/6 flex flex-col justify-between gap-5">
          {messages[0] ? (
            <div className="mx-16 pr-5 h-[calc(100vh-308px)] overflow-y-scroll scrollbar scrollbar-w-1 scrollbar-thumb-gray-200 scrollbar-thumb-rounded-lg">
              <div className="flex items-center justify-center">
                <div className="font-maven font-normal text-xl text-black-100 border-b-2 border-black-200 border-opacity-60">
                  {moment(conversationData.currentDialog?.createdAt)
                    .utc()
                    .format("DD MMM YYYY")}
                </div>
              </div>
              {messages}
            </div>
          ) : (
            <div className="flex justify-center mt-56">
              <p className="font-pacifico text-black-100 text-4xl">
                Send your first message
              </p>
            </div>
          )}
          <SendMessageForm
            sendNewMessage={sendNewMessage}
            handleEditMessage={handleEditMessage}
            inputRef={inputRef}
          />
        </div>
      </div>
      <div className="lg:hidden">
        <div
          className={` ${
            conversationData.isChatSelected && "hidden"
          } overflow-y-scroll h-[calc(100vh-130px)]`}
        >
          {conversationData.data.map((dialog) => (
            <ConversationsSideBar
              key={dialog.id}
              conversationId={dialog.id}
              recipient={dialog.recipient}
              creator={dialog.creator}
              setToggle={setSelectedStatus}
            />
          ))}
        </div>
        {conversationData.isChatSelected && (
          <div>
            <div className="border-none bg-green-100 px-3 py-4">
              <div className="flex justify-center items-center">
                {authData.email ===
                conversationData.currentDialog?.creator.email ? (
                  <button onClick={setSelectedStatus} className="flex gap-1">
                    <div className="font-maven font-normal text-xl text-white">
                      {conversationData.currentDialog.recipient.firstName}
                    </div>
                    <div className="font-maven font-normal text-xl text-white">
                      {conversationData.currentDialog.recipient.lastName}
                    </div>
                  </button>
                ) : (
                  <button onClick={setSelectedStatus} className="flex gap-1">
                    <div className="font-maven font-normal text-xl text-white">
                      {conversationData.currentDialog?.creator.firstName}
                    </div>
                    <div className="font-maven font-normal text-xl text-white">
                      {conversationData.currentDialog?.creator.lastName}
                    </div>
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-between items-center h-[calc(100vh-160px)] mt-3">
              {messages[0] ? (
                <div className="mx-2 px-2 h-[calc(100vh-260px)] overflow-y-scroll scrollbar scrollbar-w-1 scrollbar-thumb-gray-200 scrollbar-thumb-rounded-lg w-full">
                  <div className="flex items-center justify-center mb-3">
                    <div className="font-maven font-normal text-sm text-black-100 border-b-2 border-black-200 border-opacity-60">
                      {moment(conversationData.currentDialog?.createdAt)
                        .utc()
                        .format("DD MMM YYYY")}
                    </div>
                  </div>
                  {messages}
                </div>
              ) : (
                <div className="flex justify-center mt-56">
                  <p className="font-pacifico text-black-100 text-2xl">
                    Send your first message
                  </p>
                </div>
              )}

              <SendMessageForm
                sendNewMessage={sendNewMessage}
                handleEditMessage={handleEditMessage}
                inputRef={inputRef}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Conversation;
