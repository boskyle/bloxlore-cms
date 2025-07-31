import React from "react";
import { Routes, Route } from "react-router-dom";
// import MainLayout from "@layouts/MainLayout";
import LandingContainer from "@views/landing/LandingContainer";
import RegisterContainer from "@views/register/RegisterContainer";
import LoginContainer from "@views/login/LoginContainer";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingContainer />} />
      <Route path="/register" element={<RegisterContainer />} />
      <Route path="/login" element={<LoginContainer />} />
    </Routes>
  );
};

export default App;
