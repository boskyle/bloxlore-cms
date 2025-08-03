import React from "react";
import { Link } from "react-router-dom";

const RegisterView = ({
  form,
  touched,
  errors,
  onChange,
  onBlur,
  onSubmit,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-t from-green-900 to-gray-800 text-white flex flex-col items-center px-4">
      <main className="w-full max-w-sm bg-[#333d55] rounded-2xl p-8 shadow-lg my-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create an Account
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* 📧 Email Field */}
          {errors.server &&
            errors.server.map((msg, i) => (
              <div key={i} className="text-red-500 text-sm mb-2 text-center">
                {msg}
              </div>
            ))}

          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={onChange}
              onBlur={onBlur}
              className={`w-full px-4 py-2 rounded-md bg-gray-700 border ${
                touched.email && errors?.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-600 focus:ring-teal-500"
              } placeholder-gray-400 text-white focus:outline-none focus:ring-2`}
              required
            />
            {touched.email && errors?.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email[0]}</p>
            )}
          </div>

          {/* 🔒 Password Field */}
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={onChange}
              onBlur={onBlur}
              className={`w-full px-4 py-2 rounded-md bg-gray-700 border ${
                touched.password && errors?.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-600 focus:ring-teal-500"
              } placeholder-gray-400 text-white focus:outline-none focus:ring-2`}
              required
            />
            {touched.password && errors?.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password[0]}</p>
            )}
          </div>

          {/* ✅ Submit Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-md bg-teal-600 hover:bg-teal-700 transition text-white font-semibold"
          >
            Register
          </button>
        </form>

        {/* 🔗 Link to Login */}
        <div className="text-sm text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-400 hover:underline">
            Log in
          </Link>
        </div>
      </main>

      {/* 📅 Footer */}
      <footer className="mt-auto py-6 text-sm text-offwhite text-center">
        © {new Date().getFullYear()} Anima CMS. Built with ❤️ by Froggie.
      </footer>
    </div>
  );
};

export default RegisterView;
