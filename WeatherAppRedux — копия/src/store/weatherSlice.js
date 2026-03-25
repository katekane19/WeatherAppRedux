import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWeather } from '../services/weatherApi';

// async thunk вместо search()
export const searchWeather = createAsyncThunk(
  'weather/searchWeather',
  async (city) => {
    const data = await fetchWeather(city);
    return data;
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    currentCity: 'London',
    weather: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentCity(state, action) {
      state.currentCity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.weather = action.payload;
      })
      .addCase(searchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Failed to load weather';
      });
  },
});

export const { setCurrentCity } = weatherSlice.actions;
export default weatherSlice.reducer;