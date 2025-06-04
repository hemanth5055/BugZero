import React from "react";
import { IoReloadOutline } from "react-icons/io5";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="h-[50px] w-[50px] flex justify-center items-center bg-white rounded-[5px]">
        <IoReloadOutline className="animate-spin text-black" size={24} />
      </div>
    </div>
  );
}
