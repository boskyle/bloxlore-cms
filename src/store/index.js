import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import regionReducer from "./slices/regionSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    region: regionReducer,
  },
});

export default store;
