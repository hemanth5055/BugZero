import React, { useContext, useEffect, useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { UserContext } from "../Context/user.context";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

export default function Register() {
  const [loginPage, setLoginPage] = useState(true);
  const { user, loading, checkAuth } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth(navigate); // runs only once
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full h-full flex">
      <div className="quote flex justify-center items-center w-[45%] bg-black">
        <h3 className="font-mont text-[25px] text-white text-center font-medium px-4">
          AI-powered code reviews with Gemini. Catch bugs, improve code, and
          build better & faster.
        </h3>
      </div>
      <div className="flex justify-center items-center w-[55%]">
        {loginPage ? (
          <Login changeMode={setLoginPage} />
        ) : (
          <Signup changeMode={setLoginPage} />
        )}
      </div>
    </div>
  );
}
