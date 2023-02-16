import clsx from "clsx";
import { FC } from "react";
import { NavLink, Link } from "react-router-dom";
import { Container } from "../container/container";

interface HeaderProps {}

export const Header: FC<HeaderProps> = ({}) => {
  const activeStyle = ({ isActive }: { isActive: boolean }) =>
    clsx("py-navItem hover:text-black/80 hover:no-underline", {
      "text-black/30": !isActive,
      "text-black/80": isActive,
    });
  return (
    <header>
      <nav className="py-2 px-4">
        <Container>
          <div className=" flex justify-between items-center">
            <Link
              to="/"
              className="font-titillium text-2xl mr-8 text-header-logo"
            >
              conduit
            </Link>
            <ul className="flex">
              <li>
                <NavLink to="/" className={activeStyle}>
                  Home
                </NavLink>
              </li>
              <li className="ml-4">
                <NavLink to="/sing-in" className={activeStyle}>
                  Sing in
                </NavLink>
              </li>
              <li className="ml-4">
                <NavLink to="/sing-up" className={activeStyle}>
                  Sing up
                </NavLink>
              </li>
            </ul>
          </div>
        </Container>
      </nav>
    </header>
  );
};
