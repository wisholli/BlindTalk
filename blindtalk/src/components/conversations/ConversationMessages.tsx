import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setNewEditMessageId } from "../../features/messages/messagesSlice";
import { MessagesProps } from "../../types";
import moment from "moment";

export const ConversationMessages = ({
  author,
  content,
  createdAt,
  id,
  lastMessageRef,
  handleClick,
}: MessagesProps) => {
  const authData = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isEditMode, setEditModeStatus] = useState<boolean>(false);

  const editMessage = (content: string, id: number) => {
    dispatch(setNewEditMessageId(id));
    handleClick(content);
    setEditModeStatus(!isEditMode);
  };

  if (author?.id) {
    if (authData.id === author?.id) {
      return (
        <div className="w-full">
          <div className="flex justify-end relative">
            <button onClick={() => setEditModeStatus(!isEditMode)}>
              <div className="bg-green-100 rounded-bl-md rounded-tl-md rounded-tr-xl py-2 pr-2 mb-2 ">
                <div className="font-maven font-normal text-lg text-white ml-4 mr-14 lg:text-xl">
                  {content}
                </div>
                <div className="flex justify-end font-maven font-normal text-xs text-black-100 text-opacity-70">
                  {moment(createdAt).utc().format("LT")}
                </div>
                <div ref={lastMessageRef} />
              </div>
            </button>
            <div
              className={`${
                isEditMode ? "block" : "hidden"
              } bg-white rounded-md shadow-md shadow-black/30 py-1 px-3 absolute top-7 right-1 `}
            >
              <button
                onClick={() => editMessage(content, id)}
                className="flex items-center gap-2"
              >
                <p className="m-0 font-maven font-medium text-black-200 text-sm">
                  Edit
                </p>
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex justify-start">
          <div className="bg-gray-400 rounded-br-md rounded-tr-md rounded-tl-lg py-2 pr-2 mb-2">
            <div className="font-maven font-normal text-lg text-black-100 ml-4 mr-14 lg:text-xl">
              {content}
            </div>
            <div className="flex justify-end font-maven font-normal text-xs text-black-100">
              {moment(createdAt).utc().format("LT")}
            </div>
          </div>
          <div ref={lastMessageRef} />
        </div>
      );
    }
  }
  return <div>No author</div>;
};
