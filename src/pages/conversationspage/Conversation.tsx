import { useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  editMessage,
  getConversationMessages,
  receiveMessage,
  resetEdaitMessageId,
  sendMessage,
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
import { useMediaQuery } from "../../hooks/useMediaQuery";

const Conversation = () => {
  const dispatch = useAppDispatch();
  const { conversations, currentDialog, isChatSelected, error, isLoading } =
    useAppSelector((state) => state.conversations);
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
  }, [socket, dispatch]);

  //Get server data
  const { id } = useParams();
  useEffect(() => {
    if (conversations.length && id) {
      dispatch(getConversationData(id));
      dispatch(getConversationMessages(id));
    }
  }, [id, dispatch, conversations.length]);

  //Messages scroll
  const lastMessageRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messagesData.messages[0]]);

  //Edit message text
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = (content: string) => {
    inputRef.current!.value = content;
  };

  const handleEditMessage = (EditMessageData: EditMessageData) => {
    dispatch(editMessage(EditMessageData));
    inputRef.current!.value = "";
    dispatch(resetEdaitMessageId());
  };

  //Send message action
  let conversationId = currentDialog?.id;

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

  let isAboveMediumScreens = useMediaQuery("(min-width:1060px)");

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
    <div>
      <div className={`${isAboveMediumScreens ? "flex" : "hidden w-full"}`}>
        <div className="w-2/5 xl:w-1/4 pr-2 overflow-y-scroll h-[calc(100vh-130px)] scrollbar scrollbar-w-1 scrollbar-thumb-gray-200 scrollbar-thumb-rounded-lg">
          <div className="border-t-2 border-gray-400">
            {conversations.length ? (
              <>
                {conversations.map((dialog) => (
                  <ConversationsSideBar
                    key={dialog.id}
                    conversationId={dialog.id}
                    recipient={dialog.recipient}
                    creator={dialog.creator}
                  />
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="w-5/6 flex flex-col justify-between gap-5">
          {messages.length && conversations.length ? (
            <div className="mx-16 pr-5 h-[calc(100vh-308px)] overflow-y-scroll scrollbar scrollbar-w-1 scrollbar-thumb-gray-200 scrollbar-thumb-rounded-lg">
              <div className="flex items-center justify-center">
                <div className="font-maven font-normal text-xl text-black-100 border-b-2 border-black-200 border-opacity-60">
                  {moment(currentDialog?.createdAt).utc().format("DD MMM YYYY")}
                </div>
              </div>
              {messages}
            </div>
          ) : (
            <div className="flex justify-center mt-56">
              {conversations.length ? (
                <p className="font-pacifico text-black-100 text-4xl">
                  Send your first message
                </p>
              ) : (
                <p className="font-pacifico text-black-100 text-2xl">
                  Please go to the "Find new friends" page and send your first
                  message
                </p>
              )}
            </div>
          )}
          <SendMessageForm
            sendNewMessage={sendNewMessage}
            handleEditMessage={handleEditMessage}
            inputRef={inputRef}
          />
        </div>
      </div>
      <div className={`${isAboveMediumScreens && "hidden"}`}>
        <div
          className={` ${isChatSelected && "hidden"} ${
            conversations.length && "overflow-y-scroll"
          } h-[calc(100vh-130px)]`}
        >
          {conversations.length ? (
            <>
              {conversations.map((dialog) => (
                <ConversationsSideBar
                  key={dialog.id}
                  conversationId={dialog.id}
                  recipient={dialog.recipient}
                  creator={dialog.creator}
                  setToggle={setSelectedStatus}
                />
              ))}
            </>
          ) : (
            <div className="flex items-center justify-center h-[calc(100vh-100px)]">
              <p className="font-pacifico text-black-100 text-2xl text-center mx-10">
                Please go to the "Find new friends" page and send your first
                message
              </p>
            </div>
          )}
        </div>
        {isChatSelected && (
          <div>
            <div className="border-none bg-green-100 px-3 py-4">
              <div className="flex justify-center items-center">
                {authData.email === currentDialog?.creator.email ? (
                  <button onClick={setSelectedStatus} className="flex gap-1">
                    <div className="font-maven font-normal text-xl text-white">
                      {currentDialog.recipient.firstName}
                    </div>
                    <div className="font-maven font-normal text-xl text-white">
                      {currentDialog.recipient.lastName}
                    </div>
                  </button>
                ) : (
                  <button onClick={setSelectedStatus} className="flex gap-1">
                    <div className="font-maven font-normal text-xl text-white">
                      {currentDialog?.creator.firstName}
                    </div>
                    <div className="font-maven font-normal text-xl text-white">
                      {currentDialog?.creator.lastName}
                    </div>
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-between items-center h-[calc(100vh-160px)] mt-3 mx-2">
              {messages.length && conversations.length ? (
                <div className="px-2 h-[calc(100vh-260px)] overflow-y-scroll scrollbar scrollbar-w-1 scrollbar-thumb-gray-200 scrollbar-thumb-rounded-lg w-full">
                  <div className="flex items-center justify-center mb-3">
                    <div className="font-maven font-normal text-sm text-black-100 border-b-2 border-black-200 border-opacity-60">
                      {moment(currentDialog?.createdAt)
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
              <div className="w-full">
                <SendMessageForm
                  sendNewMessage={sendNewMessage}
                  handleEditMessage={handleEditMessage}
                  inputRef={inputRef}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Conversation;
