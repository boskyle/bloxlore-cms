// src/hooks/useAuth.js

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setToken,
  setUser,
  setLoading,
  setError,
  logout,
} from "@store/slices/authSlice";

// 🔧 Base API URL from Vite environment variables
const API_BASE = import.meta.env.VITE_API_BASE_URL;

/**
 * Custom hook for managing creator auth (JWT-based).
 * Provides login, logout, and "me" endpoint handling.
 */
export const useAuth = () => {
  const dispatch = useDispatch();

  // 🔄 Grab auth state from Redux
  const { token, user, loading, error } = useSelector((state) => state.auth);

  /**
   * 🔐 Login user with email & password
   * - Sends POST /creator/login
   * - Stores token & user in Redux
   * - Sets default Authorization header for future requests
   */
  const login = async (email, password) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const res = await axios.post(`${API_BASE}/creator/login`, {
        email,
        password,
      });

      const accessToken = res.data.access_token;

      // 📌 Persist token in default axios headers
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      // ✅ Save token and user in Redux
      dispatch(setToken(accessToken));
      dispatch(setUser(res.data.user));
    } catch (err) {
      // ❌ Handle login errors
      dispatch(setError(err.response?.data?.message || "Login failed"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  /**
   * 🧠 Fetch current user details from /me endpoint
   * - Assumes Authorization header is already set
   */
  const fetchMe = async () => {
    try {
      const res = await axios.get(`${API_BASE}/creator/me`);
      dispatch(setUser(res.data));
    } catch {
      // 🔒 Token may be invalid or expired
      dispatch(logout());
    }
  };

  /**
   * 🚪 Logout user
   * - Clears Redux state
   * - Removes default Authorization header
   */
  const logoutUser = () => {
    dispatch(logout());
    delete axios.defaults.headers.common["Authorization"];
  };

  // 🌐 Return all values + actions to consuming components
  return {
    token,
    user,
    loading,
    error,
    login,
    logout: logoutUser,
    fetchMe,
  };
};
