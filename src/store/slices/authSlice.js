import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const TOKEN_KEY = "creator_token";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

// 🔐 Initial state pulls token from localStorage on load
const initialState = {
  token: localStorage.getItem(TOKEN_KEY) || null,
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

      const token = res.data.access_token; // note: different key name than login!
      localStorage.setItem(TOKEN_KEY, token);
      return token;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed. Try again."
      );
    }
  }
);

// 🚪 Login user via email + password
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
      return rejectWithValue(
        err.response?.data?.message || "Login failed. Try again."
      );
    }
  }
);

// 🛡️ Validate existing token by hitting protected endpoint
export const validateToken = createAsyncThunk(
  "auth/validateToken",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;

    if (!token) return rejectWithValue("No token found");

    try {
      const res = await axios.get(`${API_BASE}/creator/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data; // optional: return user info
    } catch (err) {
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
      localStorage.removeItem(TOKEN_KEY);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(validateToken.rejected, (state) => {
        state.token = null;
        localStorage.removeItem(TOKEN_KEY);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
