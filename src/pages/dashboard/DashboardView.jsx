import React from "react";

const DashboardView = ({ user }) => {
  return (
    <div className="min-h-screen bg-gradient-to-t from-green-900 to-gray-800 p-6 text-offwhite">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Welcome, {user?.email || "Admin"} 👋
          </h1>
          <p className="text-lg text-gray-300">
            Here’s an overview of the anima cms...
          </p>
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#333d55] rounded p-4 shadow">
            <h3 className="text-lg font-semibold mb-1">Total Regions</h3>
          </div>

          <div className="bg-[#333d55] rounded p-4 shadow">
            <h3 className="text-lg font-semibold mb-1">Last Updated</h3>
          </div>

          <div className="bg-[#333d55] rounded p-4 shadow">
            <h3 className="text-lg font-semibold mb-1">Latest Patch</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
