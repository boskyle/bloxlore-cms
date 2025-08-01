import React from "react";
import DashboardView from "./DashboardView";
import { useDispatch } from "react-redux";
import { logout } from "@store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const DashboardContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logout()); // clear token from Redux + localStorage
    navigate("/login"); // redirect to login page
  };

  return <DashboardView onLogout={handleLogout} user={user} />;
};
