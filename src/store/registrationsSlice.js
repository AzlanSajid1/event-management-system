import { createSlice } from '@reduxjs/toolkit';

const load = () => JSON.parse(localStorage.getItem('registrations')) || [];
const save = (items) => localStorage.setItem('registrations', JSON.stringify(items));

const registrationsSlice = createSlice({
  name: 'registrations',
  initialState: { items: load() },
  reducers: {
    registerForEvent(state, action) {
      const { userId, event } = action.payload;
      const exists = state.items.some(
        (r) => r.userId === userId && r.event.id === event.id
      );
      if (exists) return;
      state.items.push({ userId, event, registeredAt: new Date().toISOString() });
      save(state.items);
    },
    cancelRegistration(state, action) {
      const { userId, eventId } = action.payload;
      state.items = state.items.filter(
        (r) => !(r.userId === userId && r.event.id === eventId)
      );
      save(state.items);
    },
  },
});

export const { registerForEvent, cancelRegistration } = registrationsSlice.actions;
export default registrationsSlice.reducer;