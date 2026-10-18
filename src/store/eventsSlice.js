import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEvents, fetchCategories, fetchEventById } from '../services/ticketmaster';

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

export const loadEventById = createAsyncThunk(
  'events/loadEventById',
  async (id, { rejectWithValue }) => {
    try {
      return await fetchEventById(id);
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
    selected: null,
    selectedLoading: false,
    selectedError: null,
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
      })
      .addCase(loadEventById.pending, (state) => {
        state.selectedLoading = true;
        state.selectedError = null;
        state.selected = null;
      })
      .addCase(loadEventById.fulfilled, (state, action) => {
        state.selectedLoading = false;
        state.selected = action.payload;
      })
      .addCase(loadEventById.rejected, (state, action) => {
        state.selectedLoading = false;
        state.selectedError = action.payload || 'Something went wrong';
      });
  },
});

export default eventsSlice.reducer;