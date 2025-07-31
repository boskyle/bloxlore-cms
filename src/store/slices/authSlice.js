import { createSlice } from "@reduxjs/toolkit";

const TOKEN_KEY = "creator_token";

const initialToken = localStorage.getItem(TOKEN_KEY);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: initialToken || "",
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem(TOKEN_KEY, action.payload);
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    logout(state) {
      state.token = "";
      state.user = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem(TOKEN_KEY);
    },
  },
});

export const { setToken, setUser, setLoading, setError, logout } =
  authSlice.actions;
export default authSlice.reducer;
