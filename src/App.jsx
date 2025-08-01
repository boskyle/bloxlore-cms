import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingContainer from "@pages/landing/LandingContainer";
import RegisterContainer from "@pages/register/RegisterContainer";
import LoginContainer from "@pages/login/LoginContainer";
import { DashboardContainer } from "@pages/dashboard/DashboardContainer";

import AuthLayout from "@layouts/AuthLayout"; // your layout component

const App = () => {
  return (
    <Routes>
      {/* Public routes for unauthenticated users only */}
      <Route
        path="/"
        element={
          <AuthLayout requireAuth={false}>
            <LandingContainer />
          </AuthLayout>
        }
      />
      <Route
        path="/register"
        element={
          <AuthLayout requireAuth={false}>
            <RegisterContainer />
          </AuthLayout>
        }
      />
      <Route
        path="/login"
        element={
          <AuthLayout requireAuth={false}>
            <LoginContainer />
          </AuthLayout>
        }
      />

      {/* Private route for authenticated users only */}
      <Route
        path="/dashboard"
        element={
          <AuthLayout requireAuth={true}>
            <DashboardContainer />
          </AuthLayout>
        }
      />
    </Routes>
  );
};

export default App;
