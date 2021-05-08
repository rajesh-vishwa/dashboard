import React from "react";
import { useApp } from "../../context/app-context";

const Nav = () => {
  const { logout } = useApp();
  return (
    <div className="flex justify-between items-center h-12 relative bg-white ">
      <div className="ml-8 text-gray-400 text-sm font-normal">
        Search for something...
      </div>
      <button
        className="mr-8 text-gray-400 text-sm font-semibold"
        onClick={() => logout()}
      >
        Log out
      </button>
    </div>
  );
};

export default Nav;
