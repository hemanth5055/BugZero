import React, { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";

export default function Home() {
  const [code, setCode] = useState(`function Test () { return "hello"}`);
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex-grow flex gap-2 px-2">
        <div className="w-[50%] bg-[#D9D9D9] rounded-2xl p-2 overflow-auto"></div>
        <div className="w-[50%] bg-[#D9D9D9] rounded-2xl p-2 overflow-y-hidden"></div>
      </div>
      <div className="h-[60px] w-full flex p-2">
        <div className="bg-black px-4 py-2 text-[15px] font-mont text-white flex justify-center items-center rounded-[10px] cursor-pointer font-medium">
          Review
        </div>
      </div>
    </div>
  );
}
