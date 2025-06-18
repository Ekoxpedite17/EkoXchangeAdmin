import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveUserData(state, action) {
      state.token = action.payload.token;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    }
  }
});

export const { saveUserData } = authSlice.actions;
export default authSlice.reducer;
