import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEvents, fetchCategories } from '../services/ticketmaster';

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

export const loadCategories = createAsyncThunk(
  'events/loadCategories',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchCategories();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    items: [],
    page: null,
    categories: [],
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
        state.items = action.payload.events;
        state.page = action.payload.page;
      })
      .addCase(loadEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export default eventsSlice.reducer;