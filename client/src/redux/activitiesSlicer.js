import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchActivityNames = createAsyncThunk('fetchActivityNames', async () => {
  const data = (await axios('http://localhost:3001/activities')).data
  return data
})

const activitySlice = createSlice({
  name: 'activities',
  initialState: {
    names: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchActivityNames.fulfilled, (state, action) => {
      state.names = action.payload.map(activity => activity.name).sort();
    })
  }
})


export default activitySlice.reducer;