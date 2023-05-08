import { NavLink } from "react-router-dom";
import logo from "./../../assets/images/logo.svg";

const NavBar = () => {
  return (
    <div className="bg-white flex justify-between items-center mx-16 mb-20">
      <img src={logo} alt="logo" />
      <div>
        <NavLink
          to={"/"}
          className="font-maven font-normal text-2xl text-black-100 mr-8"
        >
          Find new friend
        </NavLink>
        <NavLink
          to={"/conversation"}
          className="font-maven font-normal text-2xl text-black-100"
        >
          Conversations
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
