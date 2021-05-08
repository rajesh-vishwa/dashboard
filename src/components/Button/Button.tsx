import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "submit" | "reset" | "button";
  width?: string | number;

  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    width,

    disabled = false,
    style = {},
    ...rest
  } = props;
  return (
    <button
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      disabled={disabled}
      style={{
        width,
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
