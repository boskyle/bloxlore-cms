import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const LandingView = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center px-4">
      <header className="w-full max-w-4xl flex justify-between items-center py-6">
        <h1 className="text-3xl font-bold tracking-wide">Anima CMS</h1>
        <nav className="space-x-6">
          <Link to="/login" className="text-sm hover:text-teal-400 transition">
            Login
          </Link>
          <Link
            to="/register"
            className="text-sm hover:text-teal-400 transition"
          >
            Register
          </Link>
        </nav>
      </header>

      <main className="text-center mt-20">
        <h2 className="text-4xl font-extrabold mb-4">
          Manage Your World, Effortlessly
        </h2>
        <p className="text-lg text-gray-300 max-w-xl mx-auto mb-8">
          Anima CMS empowers creators to manage in-game content like lore,
          quests, NPCs, and balance updates — all in one place.
        </p>
      </main>

      <footer className="mt-auto py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Anima. Built with ❤️ by Froggie.
      </footer>
    </div>
  );
};

export default LandingView;
