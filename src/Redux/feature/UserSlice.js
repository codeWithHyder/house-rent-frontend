import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('auth/login', async ({ name, password }) => {
  const response = await axios.post('http://localhost:3000/sign_in', { user: { name, password } });
  if (response.status === 200) {
    const authorizationHeader = response.headers.authorization;
    const token = authorizationHeader ? authorizationHeader.split(' ')[1] : null;
    localStorage.setItem('token', token);
    return token;
  }
  return { error: response.data };
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      // If the token is not present, the user is already considered logged out.
      // You may choose to return { success: true } or thunkAPI.fulfillWithValue({ success: true })
      return { success: true };
    }

    const response = await axios.delete('http://localhost:3000/sign_out', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      localStorage.removeItem('token');
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
    token: null,
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
        state.token = action.payload;
        state.isLoading = false;
        state.error = null;
        state.loggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loggedIn = false;
      });
  },
});

export default authSlice.reducer;
