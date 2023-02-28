import { useAppSelector } from "../../app/hooks";
import { MessageData } from "../../types";
import moment from "moment";

const Messages = ({ author, content, createdAt }: MessageData) => {
  const authData = useAppSelector((state) => state.auth);

  if (author?.id) {
    if (authData.id === author.id) {
      return (
        <div className="w-full px-5 flex flex-col justify-between">
          <div className="flex flex-col mt-5">
            <div className="flex justify-end mb-4">
              <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-black">
                <div>{content}</div>
                <div className="text-xs">
                  {moment(createdAt).utc().format("DD MM YYYY")}
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
