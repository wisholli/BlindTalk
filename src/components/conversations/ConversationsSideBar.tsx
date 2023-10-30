import { NavLink, useParams } from "react-router-dom";
import { UserData } from "../../types";
import { useAppSelector } from "../../store/store";
import { useMediaQuery } from "../../hooks/useMediaQuery";

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

  let isAboveMediumScreens = useMediaQuery("(min-width:1060px)");

  let { id } = useParams();

  const userList = (
    <div
      className={`px-4 py-2 border-b-2 ${
        isAboveMediumScreens
          ? `border-l-[40px] border-r-2 bg-white shadow-none${
              isAboveMediumScreens && Number(id) === conversationId
                ? "border-b-green-100 border-l-green-100 border-r-green-100 "
                : "border-b-gray-400 border-l-gray-400 border-r-gray-400 "
            } `
          : "bg-green-100 bg-opacity-70 border-white shadow-sm"
      }  `}
    >
      <NavLink
        to={"/conversation/" + conversationId}
        className={`${
          isAboveMediumScreens
            ? "text-2xl text-black-100"
            : "text-xl font-maven font-normal text-white md:text-2xl"
        } `}
        onClick={setToggle}
      >
        {authData.userId === recipient.id ? (
          <div className="">
            {creator.firstName} {creator.lastName}
          </div>
        ) : (
          <div>
            {recipient.firstName} {recipient.lastName}
          </div>
        )}
      </NavLink>
    </div>
  );

  return <div>{userList}</div>;
};
