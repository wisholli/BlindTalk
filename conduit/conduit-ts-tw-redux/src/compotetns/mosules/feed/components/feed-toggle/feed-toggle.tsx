import { FC } from "react";
import { NavLink } from "react-router-dom";

interface FeedToggleProps {}

export const FeedToggle: FC<FeedToggleProps> = ({}) => {
  return (
    <div>
      <ul>
        <li className="ml-0.2 mb-0.4">
          <NavLink
            to={"/"}
            className="bg-white border-b-2 border-header-logo text-header-logo  py-0.5 px-1 hover:no-underline cursor-default"
          >
            Global Feed
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
