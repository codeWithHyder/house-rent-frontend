import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('auth/login', async ({ name, password }) => {
  const response = await axios.post('https://house-rent-api.onrender.com/sign_in', {
    user: { name, password },
  });
  if (response.status === 200) {
    const authorizationHeader = response.headers.authorization;
    const token = authorizationHeader ? authorizationHeader.split(' ')[1] : null;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(response.data.data.user));
    return response.headers.authorization;
  }
  return { error: response.data };
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { success: true };
    }

    const response = await axios.delete('https://house-rent-api.onrender.com/sign_out', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return { success: true };
    }
    return thunkAPI.rejectWithValue('Logout failed');
  } catch (error) {
    return thunkAPI.rejectWithValue('Logout failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoading: false,
    error: null,
    loggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
        state.loggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
        state.error = null;
        state.loggedIn = false; // Set loggedIn to false after successful logout
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Logout failed';
        state.loggedIn = false;
      });
  },
});

export default authSlice.reducer;
