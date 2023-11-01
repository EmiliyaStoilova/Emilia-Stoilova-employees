import React, { FunctionComponent, MouseEventHandler } from "react";

interface ButtonProps {
  title: string;
  onClick?: MouseEventHandler;
}

export const Button: FunctionComponent<ButtonProps> = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="appearance-none text-center font-semibold text-white rounded-md py-2 px-6 w-full bg-teal-500 duration-200 "
    >
      {title}
    </button>
  );
};
