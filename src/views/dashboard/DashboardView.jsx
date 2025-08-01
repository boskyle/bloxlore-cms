import React from "react";

const DashboardView = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Welcome back, creator!</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">Total Posts</p>
            <p className="text-2xl font-semibold text-gray-800">42</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">Pending Reviews</p>
            <p className="text-2xl font-semibold text-gray-800">5</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">Views Today</p>
            <p className="text-2xl font-semibold text-gray-800">1,230</p>
          </div>
        </div>

        {/* Placeholder Table */}
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <table className="min-w-full text-sm">
            <thead className="text-left text-gray-600 border-b">
              <tr>
                <th className="py-2">Title</th>
                <th className="py-2">Status</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Lore Update #12</td>
                <td className="py-2 text-green-600">Published</td>
                <td className="py-2">July 30, 2025</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">New Region: Azura Fields</td>
                <td className="py-2 text-yellow-600">Pending</td>
                <td className="py-2">July 29, 2025</td>
              </tr>
              <tr>
                <td className="py-2">Boss Entry: Void Lich</td>
                <td className="py-2 text-red-600">Draft</td>
                <td className="py-2">July 28, 2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
