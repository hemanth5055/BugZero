import React, { useContext } from "react";
import { UserContext } from "../Context/user.context";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div className="w-full flex h-[50px] px-4 justify-between items-center">
      <div>
        <h1 className="font-mont text-white font-semibold text-[30px]">
          BugZero
        </h1>
      </div>
      {user ? (
        <div
          className="w-[40px] h-[40px] flex justify-center items-center cursor-pointer"
          onClick={() => {
            logout(navigate);
          }}
        >
          <IoLogOut size={25} className="text-white" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
