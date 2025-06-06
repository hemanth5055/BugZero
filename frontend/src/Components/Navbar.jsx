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
        <div className="flex gap-6 items-center">
          <div className="inline-block cursor-pointer items-center justify-center rounded-xl border-[1.58px] border-zinc-600 bg-zinc-950 px-4 py-2 font-medium text-slate-200 shadow-md transition-all duration-300 hover:[transform:translateY(-.335rem)] hover:shadow-xl">
            <h3 className="text-white font-mont">Credits : {user.credits}</h3>
          </div>
          <div
            className="w-[40px] h-[40px] flex justify-center items-center cursor-pointer"
            onClick={() => {
              logout(navigate);
            }}
          >
            <IoLogOut size={25} className="text-white" />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
