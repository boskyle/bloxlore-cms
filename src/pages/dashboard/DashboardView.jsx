import React from "react";
import { Link } from "react-router-dom";

const DashboardView = ({ onLogout, user }) => {
  return (
    <div className="min-h-screen bg-gradient-to-t from-green-900 to-gray-800 p-6  text-offwhite">
      <div className="max-w-7xl mx-auto">
        {/* Page Header + Logout Button */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600">
              {/* Welcome back {JSON.stringify(user?.email || "unkown")} */}
            </p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/regions"
            className="text-2xl
             
            font-semibold 

            block px-4 
            py-3 
          bg-[#333d55] 
            rounded 
            shadow 
            transition"
          >
            Regions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
