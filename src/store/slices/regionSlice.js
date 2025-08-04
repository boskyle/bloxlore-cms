import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serviceClient from "@services/clients/serviceClient";
import creatorClient from "@services/clients/creatorClient";
import { toast } from "react-toastify";
import { ensureValidToken } from "./authSlice";

/* 🚀 Fetch all regions (service-level access) */
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
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const token = await dispatch(ensureValidToken()).unwrap();

      const response = await creatorClient.post("/creator/regions", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/* ✏️ Update a specific region (creator-level access) */
export const updateRegion = createAsyncThunk(
  "regions/updateRegion",
  async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
      const token = await dispatch(ensureValidToken()).unwrap();

      data.append("_method", "PATCH");

      const response = await creatorClient.post(
        `/creator/regions/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/* 🗑️ Delete a specific region (creator-level access) */
export const deleteRegion = createAsyncThunk(
  "regions/deleteRegion",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = await dispatch(ensureValidToken()).unwrap();

      await creatorClient.delete(`/creator/regions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return id;
    } catch (error) {
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

      // 🆕 Create
      .addCase(createRegion.fulfilled, (state, action) => {
        state.regions.push(action.payload);
        toast.success("Region created");
      })
      .addCase(createRegion.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(state.error.message || "Failed to create region");
      })

      // 🗑️ Delete
      .addCase(deleteRegion.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.regions = state.regions.filter(
          (region) => region.id !== deletedId
        );
        toast.success("Region deleted");
      })
      .addCase(deleteRegion.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(state.error.message || "Failed to delete region");
      });
  },
});

export default regionsSlice.reducer;
