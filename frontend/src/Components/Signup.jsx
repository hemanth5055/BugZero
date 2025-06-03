import React, { useState } from "react";

export default function Signup({ changeMode }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex flex-col gap-5  rounded-[10px] p-4">
      <div className="flex flex-col gap-1">
        <h1 className="font-mont font-medium text-[18px]">Name</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-[350px] h-[45px] outline-none bg-[#D9D9D9] rounded-[5px] px-2 font-mont font-medium"
        />
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="font-mont font-medium text-[18px]">Email</h1>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-[350px] h-[45px] outline-none bg-[#D9D9D9] rounded-[5px] px-2 font-mont font-medium"
        />
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="font-mont font-medium  text-[18px]">Password</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-[350px] h-[45px] outline-none bg-[#D9D9D9] rounded-[5px] px-2 font-mont font-medium"
        />
      </div>

      <div className="flex justify-center bg-black font-mont font-medium h-[40px] text-white rounded-[10px] items-center cursor-pointer mt-2">
        Sigup
      </div>

      <h4 className="font-mont font-semibold text-center ">
        Already have an account ,{" "}
        <span
          className="text-violet-400 cursor-pointer"
          onClick={() => changeMode((prev) => !prev)}
        >
          Login here .
        </span>
      </h4>
    </div>
  );
}
