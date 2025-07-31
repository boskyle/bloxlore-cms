import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "@layouts/MainLayout";
import RegisterContainer from "@views/register/RegisterContainer";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route path="/register" element={<RegisterContainer />} />
    </Routes>
  );
};

export default App;
