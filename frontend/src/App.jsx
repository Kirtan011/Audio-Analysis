import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AudioModel from "./pages/AudioModel";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import "./index.css";
import { Toaster } from "sonner";

const App = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className={`${isHome ? "background" : "transcribe"} min-h-screen`}>
      <Toaster position="top-right" richColors />
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/AudioModel" element={<AudioModel />} />
      </Routes>
    </div>
  );
};

export default App;
