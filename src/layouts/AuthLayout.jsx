// src/layouts/AuthLayout.jsx

import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthLayout = ({ children, requireAuth }) => {
  const token = useSelector((state) => state.auth.token);

  const isAuthenticated = Boolean(token);

  // 🚫 Redirect if trying to access a private route without a token
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // 🔁 Redirect if logged in and trying to visit login/register
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ Allowed access
  return <>{children}</>;
};

export default AuthLayout;
