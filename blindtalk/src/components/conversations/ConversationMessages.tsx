import { useAppSelector } from "../../app/hooks";
import { MessagesProps } from "../../types";
import moment from "moment";

export const ConversationMessages = ({
  author,
  content,
  createdAt,
  lastMessageRef,
}: MessagesProps) => {
  const authData = useAppSelector((state) => state.auth);

  if (author?.id) {
    if (authData.id === author?.id) {
      return (
        <div className="w-full">
          <div className="flex justify-end">
            <div className="bg-green-100 rounded-bl-md rounded-tl-md rounded-tr-xl py-2 pr-2 mb-2">
              <div className="font-maven font-normal text-lg text-white ml-4 mr-12 lg:text-xl">
                {content}
              </div>
              <div className="flex justify-end font-maven font-normal text-xs text-black-100 text-opacity-70">
                {moment(createdAt).utc().format("LT")}
              </div>
              <div ref={lastMessageRef} />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex justify-start">
          <div className="bg-gray-400 rounded-br-md rounded-tr-md rounded-tl-lg py-2 pr-2 mb-2">
            <div className="font-maven font-normal text-lg text-black-100 ml-4 mr-12 lg:text-xl">
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
