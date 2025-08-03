import React from "react";
import { Link } from "react-router-dom";

const LoginView = ({ form, error, onChange, onSubmit }) => {
  return (
    <div className="min-h-screen bg-gradient-to-t from-green-900 to-gray-800 text-white flex flex-col items-center px-4">
      <main className="w-full max-w-sm bg-[#333d55] rounded-2xl p-8 shadow-lg my-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome</h2>

        {error && (
          <div className="text-red-500 mb-4 text-sm text-center">
            {typeof error === "string" ? error : "Login failed. Try again."}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />

          <button
            type="submit"
            className="w-full py-2 rounded-md bg-teal-600 hover:bg-teal-700 transition text-white font-semibold"
          >
            Log In
          </button>
        </form>

        <div className="text-sm text-gray-400 text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-teal-400 hover:underline">
            Register
          </Link>
        </div>
      </main>

      <footer className="mt-auto py-6 text-sm text-offwhite">
        © {new Date().getFullYear()} Anima CMS. Built with ❤️ by Froggie.
      </footer>
    </div>
  );
};

export default LoginView;
