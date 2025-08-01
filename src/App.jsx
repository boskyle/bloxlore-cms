import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingContainer from "@views/landing/LandingContainer";
import RegisterContainer from "@views/register/RegisterContainer";
import LoginContainer from "@views/login/LoginContainer";
import { DashboardContainer } from "@views/dashboard/DashboardContainer";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingContainer />} />
      <Route path="/register" element={<RegisterContainer />} />
      <Route path="/login" element={<LoginContainer />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardContainer />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
