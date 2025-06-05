import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./Components/Register";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import { UserContext } from "./Context/user.context";

export default function App() {
  const [isMobile, setIsMobile] = useState(false);
  const { ToastContainer } = useContext(UserContext);
  useEffect(() => {
    // Check initial window width
    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white p-5 text-center">
        <h1 className="text-xl font-semibold font-mont">
          This website is not supported on mobile devices.
        </h1>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen p-5 flex flex-col bg-black">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="h-[50px]">
        <Navbar />
      </div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
