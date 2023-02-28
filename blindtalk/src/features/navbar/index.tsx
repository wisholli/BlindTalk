import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="flex justify-between w-full py-5 bg-basic-gray-5 mb-5 text-3xl">
      <h1 className="ml-4">BlindTalk</h1>
      <div className="text-xl">
        <NavLink to={"/"} className="mr-3">
          Find new friend
        </NavLink>
        <NavLink to={"/conversation"} className="mr-3">
          Conversations
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
