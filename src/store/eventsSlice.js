import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEvents } from '../services/ticketmaster';

export const loadEvents = createAsyncThunk(
  'events/loadEvents',
  async (params, { rejectWithValue }) => {
    try {
      return await fetchEvents(params);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default eventsSlice.reducer;