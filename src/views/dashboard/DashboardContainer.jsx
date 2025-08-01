import React from "react";
import DashboardView from "./DashboardView";
import { useDispatch } from "react-redux";
import { logout } from "@store/slices/authSlice";
import { useNavigate } from "react-router-dom";

export const DashboardContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());          // clear token from Redux + localStorage
    navigate("/login");          // redirect to login page
  };

  return <DashboardView onLogout={handleLogout} />;
};