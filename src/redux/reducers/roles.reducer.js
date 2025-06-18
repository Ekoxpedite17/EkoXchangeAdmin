import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { EkoServices_Roles } from '../../services';

export const fetchRoles = createAsyncThunk('roles/fetchRoles', async ({ skip, limit }, { rejectWithValue }) => {
  try {
    const response = await EkoServices_Roles.getRoles({ skip: skip, limit: limit });
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const initialState = {
  roles: [],
  loading: false,
  error: null
};

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default rolesSlice.reducer;
