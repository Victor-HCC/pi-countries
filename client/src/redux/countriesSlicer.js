import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCountries = createAsyncThunk('fetchCountries', async () => {
  const data = (await axios('http://localhost:3001/countries')).data
  return data
})

export const getCountryById = createAsyncThunk('getCountryById', async (id) => {
  const country = (await axios(`http://localhost:3001/countries/${id}`)).data
  return country;
})

const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    data: [],
    names: [],
    countryById: '',
    currentPage: 1
  },
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.data = action.payload;
      state.names = action.payload.map(country => country.name).sort();
    }),
    builder.addCase(getCountryById.fulfilled, (state, action) => {
      state.countryById = action.payload;
    })
  }
})

export const { setCurrentPage } = countriesSlice.actions;

export default countriesSlice.reducer;