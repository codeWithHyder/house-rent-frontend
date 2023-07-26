import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('auth/login', async ({ name, password }) => {
  const response = await axios.post('https://house-rent-api.onrender.com/sign_in', {
    user: { name, password },
  });
  if (response.status === 200) {
    // eslint-disable-next-line dot-notation
    // const authorizationHeader = response.headers.authorization;
    // console.log('Response Headers:', response.headers);
    // console.log('Authorization Header:', authorizationHeader);
    // const token = authorizationHeader ? authorizationHeader.split(' ')[1] : null;
    // localStorage.setItem('token', token);
    return response.data;
  }
  return { error: response.data };
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await axios.delete('https://house-rent-api.onrender.com/sign_out');

    if (response.status === 200) {
      // Successfully logged out
      return { success: true };
    }
    // If the status code is not 200, it means the logout request was not successful.
    // You may choose to return thunkAPI.rejectWithValue with an appropriate error message.
    return thunkAPI.rejectWithValue('Logout failed');
  } catch (error) {
    // If an error occurs, you can return thunkAPI.rejectWithValue with the error message
    // returned from the server, or a generic error message.
    return thunkAPI.rejectWithValue('Logout failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    // token: null,
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
      .addCase(login.fulfilled, (state) => {
        // state.token = action.payload;
        state.isLoading = false;
        state.error = null;
        state.loggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        // Successfully logged out
        state.isLoading = false;
        state.error = null;
        state.loggedIn = false; // Set loggedIn to false after successful logout
      })
      .addCase(logoutUser.rejected, (state) => {
        // Set loggedIn to false after a failed logout
        state.isLoading = false;
        state.error = 'Logout failed';
        state.loggedIn = false;
      });
  },
});

export default authSlice.reducer;
