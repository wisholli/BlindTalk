import { FC } from "react";

interface ButtonProps {
  text: number;
}

export const Button: FC<ButtonProps> = ({ text }) => {
  return (
    <button
      className="inline-block font-normal text-header-logo text-center align-middle cursor-pointer select-none border py-1 px-2 text-sm rounded-0.2 
      hover:text-white hover:bg-header-logo hover:border-header-logo focus:bg-mainPage-userName"
    >
      <i className="mr-0.5 ion-heart"></i>
      {text}
    </button>
  );
};
