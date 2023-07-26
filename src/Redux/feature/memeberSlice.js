import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const memberData = createAsyncThunk('member/memberData', async () => {
  const response = await axios.get('http:/localhost:3000/member-data');
  return response.data.user;
});

const memberSlice = createSlice({
  name: 'member',
  initialState: {
    member: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(memberData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(memberData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(memberData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default memberSlice.reducer;
