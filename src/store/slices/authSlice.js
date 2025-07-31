import { createSlice } from "@reduxjs/toolkit";

const TOKEN_KEY = "creator_token";

console.log(TOKEN_KEY);

const authSlice = createSlice({
  name: "auth",
  initialState: {},

  reducers: {},
});

export default authSlice.reducer;
