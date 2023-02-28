import { NavLink, useParams } from "react-router-dom";
import { UserData } from "../../types";

interface Props {
  conversationId: number;
  recipient: UserData;
}

const SideBar = ({ conversationId, recipient }: Props) => {
  const { id } = useParams();
  const userList =
    Number(id) === conversationId ? (
      <div className="flex flex-row py-4 px-2 items-center border-b-2 border-l-4 border-blue-400">
        <div className="w-full">
          <NavLink to={"/conversation/" + conversationId} className="text-lg">
            {recipient.firstName} {recipient.lastName}
          </NavLink>
        </div>
      </div>
    ) : (
      <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
        <div className="w-full">
          <NavLink to={"/conversation/" + conversationId} className="text-lg">
            {recipient.firstName} {recipient.lastName}
          </NavLink>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col w-full border-r-2 overflow-y-auto">
      {userList}
    </div>
  );
};

export default SideBar;
