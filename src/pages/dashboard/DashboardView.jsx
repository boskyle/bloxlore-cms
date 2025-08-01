import React from "react";
import { Link } from "react-router-dom";

const DashboardView = ({ onLogout, user }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header + Logout Button */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user}</p>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Quick Stats */}
        <h2 className="mb-10 text-4xl font-bold">Manage Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Link
            to="/regions"
            className="text-2xl 
            font-semibold 
            text-gray-800 
            block px-4 
            py-3 
            bg-white 
            rounded 
            shadow 
            hover:bg-gray-50 
            transition"
          >
            🌍 Regions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
