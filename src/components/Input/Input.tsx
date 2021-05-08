import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;

  name: string;

  onChange?: (...args: any[]) => any;
}
const Input: React.FC<InputProps> = (props) => {
  const { id, label, type, name, placeholder, onChange, ...rest } = props;

  const handleOnChange = (e: any) => {
    if (onChange) {
      onChange(e.target.value);
    }
    return null;
  };

  return (
    <>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required
        className="appearance-none rounded relative block w-full mt-2 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        placeholder={placeholder}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        onChange={handleOnChange}
        {...rest}
      />
    </>
  );
};

export default Input;
