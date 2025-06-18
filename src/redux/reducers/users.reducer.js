import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { EkoServices_Admin } from '../../services';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async ({ limit, skip }) => {
  const response = await EkoServices_Admin.getUsers({ limit: limit, skip: skip });
  return response;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  await EkoServices_Admin.deleteUser();
  return id;
});

const initialState = {
  users: [],
  loading: false,
  error: null
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })

      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete user';
      });
  }
});

export default usersSlice.reducer;
