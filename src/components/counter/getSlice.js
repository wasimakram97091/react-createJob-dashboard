import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: {},
  loading: false,
  error: null,
  selectJob: {},
};

export const fetchData = createAsyncThunk("fetchData", async () => {
  try {
    const response = await axios.get("https://655d82519f1e1093c599663c.mockapi.io/userData");
    return response.data;
  } catch (error) {
    throw error;
  }
});

const getSlice = createSlice({
  name: "getData",
  initialState,
  reducers: {
    setEditData: (state, action) => {
      const { ...editedValue } = action.payload;
      state.selectJob = editedValue;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default getSlice.reducer;
export const { setEditData } = getSlice.actions;
