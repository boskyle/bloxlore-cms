// Pure HTML & styling for the login form

import React from "react";

const LoginView = ({ form, error, onChange, onSubmit }) => {
  return (
    <div className="max-w-sm mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}

      <form onSubmit={onSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginView;
