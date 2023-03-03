import { useAppSelector } from "../../app/hooks";
import { EditMessageData, MessagesProps } from "../../types";
import moment from "moment";
import editMessage from "../../assets/edit-message.png";
import { useEffect, useState } from "react";

// interface Props {number, (data: EditMessageData) => void}

// const NewMessageForm = ({
//   id,
//   onEditMessage,
// }: {
//   id: number;
//   onEditMessage: (data: EditMessageData) => void;
// }) => {
//   const [newMessage, setNewMessage] = useState("");
//   useEffect(() => {
//     onEditMessage({ messageId: id, content: newMessage });
//   }, [newMessage]);
//   return (
//     <input
//       type="text"
//       value={newMessage}
//       onChange={(e) => setNewMessage(e.target.value)}
//     />
//   );
// };

const Messages = ({
  author,
  content,
  createdAt,
  id,
  onEditMessage,
}: MessagesProps) => {
  const authData = useAppSelector((state) => state.auth);
  const [newMessageText, setNewMessageText] = useState(content);

  if (author?.id) {
    if (authData.id === author.id) {
      return (
        <div className="w-full px-5 flex flex-col justify-between">
          <div className="flex flex-col mt-5">
            <div className="flex justify-end mb-4">
              <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-black">
                <input
                  value={newMessageText}
                  onChange={(e) => setNewMessageText(e.target.value)}
                  className="bg-blue-400 outline-none"
                />
                <div className="flex justify-between text-xs">
                  {moment(createdAt).utc().format("LT")}
                  {id && (
                    <button
                      onClick={() =>
                        onEditMessage({
                          messageId: id,
                          content: newMessageText,
                        })
                      }
                    >
                      <img
                        src={editMessage}
                        alt="editMessage"
                        className="h-5 w-5"
                      />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-full px-5 flex flex-col justify-between">
          <div className="flex flex-col mt-5">
            <div className="flex justify-start mb-4">
              <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                <div>{content}</div>
                <div className="text-xs">
                  {moment(createdAt).utc().format("DD MM YYYY")}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  return <div>No author</div>;
};

export default Messages;
