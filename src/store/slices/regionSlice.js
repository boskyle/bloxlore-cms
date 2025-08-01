// regionSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serviceClient from "@services/clients/serviceClient";
import creatorClient from "@services/clients/creatorClient";

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

/* ✏️ Update a specific region (creator-level access) */
export const updateRegion = createAsyncThunk(
  "regions/updateRegion",
  async ({ id, data }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await creatorClient.patch(`/regions/${id}`, data, {
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

/* 🧼 Region Slice */
const regionsSlice = createSlice({
  name: "regions",
  initialState: {
    regions: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ⏳ Fetch Regions
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

      // ✏️ Update Region
      .addCase(updateRegion.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.regions.findIndex((r) => r.id === updated.id);
        if (index !== -1) {
          state.regions[index] = updated;
        }
      })
      .addCase(updateRegion.rejected, (state, action) => {
        state.error = action.payload;
        alert(state.error.message);
      });
  },
});

export default regionsSlice.reducer;
