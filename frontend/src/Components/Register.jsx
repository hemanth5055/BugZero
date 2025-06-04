import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

export default function Register() {
  const [loginPage, setloginPage] = useState(true);
  return (
    <div className="w-full h-full flex">
      <div className="quote flex justify-center items-center w-[45%]">
        <h3 className="font-mont text-[25px] text-white text-center font-medium">
          AI-powered code reviews with Gemini. Catch bugs, improve code, and
          build better&faster.
        </h3>
      </div>
      <div className="flex justify-center items-center w-[55%]">
        {loginPage ? (
          <Login changeMode={setloginPage}></Login>
        ) : (
          <Signup changeMode={setloginPage}></Signup>
        )}
      </div>
    </div>
  );
}
