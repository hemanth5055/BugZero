import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./Components/Register";
import Home from "./Components/home";
import Navbar from "./Components/Navbar";
export default function App() {
  return (
    <div className="w-full h-screen p-5 flex flex-col">
      <div className="h-[50px]">
        <Navbar></Navbar>
      </div>
      <Routes>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/" element={<Home></Home>}></Route>
      </Routes>
    </div>
  );
}
