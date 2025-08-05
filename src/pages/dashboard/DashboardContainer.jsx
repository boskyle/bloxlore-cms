import React from "react";
import DashboardView from "./DashboardView";
import { useSelector } from "react-redux";

export const DashboardContainer = () => {
  const { user } = useSelector((state) => state.auth);

  return <DashboardView user={user} />;
};
