import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const TOKEN_KEY = "creator_token";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

// 🔐 Initial state pulls token from localStorage on load
const initialState = {
  token: localStorage.getItem(TOKEN_KEY) || null,
  user: null,
};

// 🧾 Register new user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE}/creator/register`, {
        email,
        password,
      });

      return res.data.message; // "Registration successful"
    } catch (err) {
      console.error("Registration error:", err);
      const { errors } = err?.response?.data || {};
      return rejectWithValue(errors || { general: ["Unknown error."] });
    }
  }
);

// 🚪 Login user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE}/creator/login`, {
        email,
        password,
      });

      const token = res.data.access_token;
      localStorage.setItem(TOKEN_KEY, token);
      return token;
    } catch (err) {
      console.error("Login error:", err);
      return rejectWithValue(
        err.response?.data?.error || "Login failed. Try again."
      );
    }
  }
);

// 🛡️ Validate token + refresh fallback
export const validateToken = createAsyncThunk(
  "auth/validateToken",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue("No token found");

    try {
      const res = await axios.get(`${API_BASE}/creator/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      if (err.response?.status === 401) {
        try {
          const refreshRes = await axios.post(
            `${API_BASE}/creator/refresh`,
            null,
            {
              withCredentials: true, // Send HttpOnly refresh_token cookie
            }
          );

          const newAccessToken = refreshRes.data.access_token;

          dispatch(setToken(newAccessToken));
          localStorage.setItem(TOKEN_KEY, newAccessToken);

          const retryRes = await axios.get(`${API_BASE}/creator/me`, {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
            },
          });

          return retryRes.data;
        } catch (refreshErr) {
          console.error("Token refresh failed:", refreshErr);
          return rejectWithValue("Session expired. Please login again.");
        }
      }

      console.error("Token validation failed:", err);
      return rejectWithValue("Invalid or expired token");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem(TOKEN_KEY);
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (_, action) => {
        toast.success(action.payload, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          closeButton: false,
          theme: "light",
        });
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(validateToken.rejected, (state) => {
        state.token = null;
        state.user = null;
        localStorage.removeItem(TOKEN_KEY);
      });
  },
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;
