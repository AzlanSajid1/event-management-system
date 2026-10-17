import { createSlice } from '@reduxjs/toolkit';

// Read saved data from the browser when the app first loads
const loadUsers = () => JSON.parse(localStorage.getItem('users')) || [];
const loadCurrentUser = () => JSON.parse(localStorage.getItem('currentUser')) || null;

const initialState = {
  users: loadUsers(),
  currentUser: loadCurrentUser(),
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register(state, action) {
      const { name, email, password } = action.payload;
      const exists = state.users.some(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      if (exists) {
        state.error = 'An account with this email already exists';
        return;
      }
      const newUser = { id: Date.now().toString(), name, email, password };
      state.users.push(newUser);
      state.currentUser = { id: newUser.id, name, email };
      state.error = null;
      localStorage.setItem('users', JSON.stringify(state.users));
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
    },

    login(state, action) {
      const { email, password } = action.payload;
      const user = state.users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      if (!user) {
        state.error = 'Invalid email or password';
        return;
      }
      state.currentUser = { id: user.id, name: user.name, email: user.email };
      state.error = null;
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
    },

    logout(state) {
      state.currentUser = null;
      state.error = null;
      localStorage.removeItem('currentUser');
    },

    clearError(state) {
      state.error = null;
    },
  },
});

export const { register, login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;