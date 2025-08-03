// Pure HTML & styling for the login form

import React from "react";

const LoginView = ({ form, error, onChange, onSubmit }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center px-4">
      {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}

      <div className="px-5 py-10 bg-[#333d55] rounded-md max-w-[400px]">
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
            className="w-full px-3 py-2 border rounded border-muted"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
            className="w-full px-3 py-2 border border-muted"
            required
          />

          <button
            type="submit"
            className="w-full py-2 rounded bg-green-700 text-white font-bold"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
