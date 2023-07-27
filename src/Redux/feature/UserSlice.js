import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Function to check if the token exists in local storage and set the logged-in state accordingly
const checkLoggedInStatus = () => {
  const token = localStorage.getItem('token');
  return token !== null;
};

// Define an initial logged-in state based on the token in local storage
const initialLoggedInState = checkLoggedInStatus();

export const login = createAsyncThunk('auth/login', async ({ name, password }) => {
  const response = await axios.post('https://house-rent-api.onrender.com/sign_in', {
    user: { name, password },
  });
  if (response.status === 200) {
    const authorizationHeader = response.headers.authorization;
    const token = authorizationHeader ? authorizationHeader.split(' ')[1] : null;
    localStorage.setItem('token', token); // Store the token in local storage
    return response.data;
  }
  return { error: response.data };
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await axios.delete('https://house-rent-api.onrender.com/sign_out');

    if (response.status === 200) {
      localStorage.removeItem('token'); // Remove the token from local storage on successful logout
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
    isLoading: false,
    error: null,
    loggedIn: initialLoggedInState,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.loggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
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
