// src/views/register/RegisterView.jsx

import React from "react";

/**
 * Presentational component that renders the registration form.
 */
const RegisterView = ({ form, onChange, onSubmit, loading, error }) => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      {error && <div className="mb-4 text-red-500">{error}</div>}

      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={onChange}
          className="w-full px-4 py-2 border rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          className="w-full px-4 py-2 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
          className="w-full px-4 py-2 border rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterView;
