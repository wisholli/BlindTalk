import { NavLink } from "react-router-dom";
import { UserData } from "../../types";
import { useAppSelector } from "../../store/store";

interface Props {
  conversationId: number;
  recipient: UserData;
  creator: UserData;
  setToggle?: () => void;
}

export const ConversationsSideBar = ({
  conversationId,
  recipient,
  creator,
  setToggle,
}: Props) => {
  const authData = useAppSelector((state) => state.auth);

  const userList = (
    <div className="px-4 py-2 bg-green-100 bg-opacity-70 border-b-2 border-white shadow-sm lg:border-b-gray-400 lg:border-l-[15px] lg:border-r-2 lg:border-r-gray-400 lg:bg-white lg:shadow-none">
      <button onClick={setToggle}>
        <NavLink
          to={"/conversation/" + conversationId}
          className="text-xl font-maven font-normal text-white md:text-2xl lg:text-2xl lg:text-black-100"
        >
          {authData.id === recipient.id ? (
            <div>
              {creator.firstName} {creator.lastName}
            </div>
          ) : (
            <div>
              {recipient.firstName} {recipient.lastName}
            </div>
          )}
        </NavLink>
      </button>
    </div>
  );

  return <div>{userList}</div>;
};
