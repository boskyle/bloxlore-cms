// src/store/slices/regionSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serviceClient from "@services/clients/serviceClient";
import { createCreatorClient } from "@services/clients/createCreatorClient";
import { toast } from "react-toastify";

/* 🚀 Fetch all regions (public/service-level access) */
export const fetchRegions = createAsyncThunk(
  "regions/fetchRegions",
  async (_, thunkAPI) => {
    try {
      const response = await serviceClient.get("/regions");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

/* 🆕 Create a new region (creator-level access) */
export const createRegion = createAsyncThunk(
  "regions/createRegion",
  async (formData, { dispatch, getState, rejectWithValue }) => {
    try {
      const client = createCreatorClient({ getState, dispatch });
      const response = await client.post("/creator/regions", formData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/* ✏️ Update a region (creator-level access) */
export const updateRegion = createAsyncThunk(
  "regions/updateRegion",
  async ({ id, data }, { dispatch, getState, rejectWithValue }) => {
    try {
      const client = createCreatorClient({ getState, dispatch });

      // Laravel expects method spoofing for PATCH via POST
      data.append("_method", "PATCH");

      const response = await client.post(`/creator/regions/${id}`, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/* 🗑️ Delete a region (creator-level access) */
export const deleteRegion = createAsyncThunk(
  "regions/deleteRegion",
  async (id, { dispatch, getState, rejectWithValue }) => {
    try {
      const client = createCreatorClient({ getState, dispatch });
      await client.delete(`/creator/regions/${id}`);
      return id;
    } catch (error) {
      console.error("❌ deleteRegion error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/* 🧼 Region Slice */
const regionsSlice = createSlice({
  name: "regions",
  initialState: {
    regions: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ⏳ Fetch
      .addCase(fetchRegions.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRegions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.regions = action.payload;
      })
      .addCase(fetchRegions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // 🆕 Create
      .addCase(createRegion.fulfilled, (state, action) => {
        state.regions.push(action.payload);
        toast.success("Region created");
      })
      .addCase(createRegion.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(state.error.message || "Failed to create region");
      })

      // ✏️ Update
      .addCase(updateRegion.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.regions.findIndex((r) => r.id === updated.id);
        if (index !== -1) {
          state.regions[index] = updated;
          toast.success("Region updated");
        }
      })
      .addCase(updateRegion.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(state.error.message || "Failed to update region");
      })

      // 🗑️ Delete
      .addCase(deleteRegion.fulfilled, (state, action) => {
        state.regions = state.regions.filter((r) => r.id !== action.payload);
        toast.success("Region deleted");
      })
      .addCase(deleteRegion.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(state.error.message || "Failed to delete region");
      });
  },
});

export default regionsSlice.reducer;
