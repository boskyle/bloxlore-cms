// src/layouts/AuthLayout.jsx

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { validateToken } from "@store/slices/authSlice";

const AuthLayout = ({ children, requireAuth }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = Boolean(token);

  // 🔄 Attempt to validate token on mount (if auth is required and token exists)
  useEffect(() => {
    if (requireAuth && token) {
      dispatch(validateToken());
    }
  }, [requireAuth, token, dispatch]);

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
