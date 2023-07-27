/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const getHousesurl = 'http://127.0.0.1:3000/api/v1/houses';
const addHouseUrl = 'http://localhost:3000/api/v1/houses';
const deleteHouseUrl = 'http://localhost:3000/api/v1/houses/';

export const getHouses = createAsyncThunk('houses/getHouses', () =>
  fetch(getHousesurl)
    .then((res) => res.json())
    .catch((err) => console.log(err)),
);

export const addHouseApi = createAsyncThunk('houses/addHouse', async (newHouseData) => {
  try {
    const response = await fetch(addHouseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newHouseData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const deleteHouse = createAsyncThunk(
  'house/deleteHouse',
  async (id, { rejectWithValue }) => {
    try {
      await fetch(`${deleteHouseUrl}/${id}`, { method: 'DELETE' });
      return id;
    } catch (error) {
      return rejectWithValue(error.message); 
    }
  }
);

const initialState = {
  houseData: [],
  isLoading: false,
  error: null,
};

const houseSlice = createSlice({
  name: 'house',
  initialState,
  reducers: {
    addHouse: (state, { payload }) => {
      state.houseData.push({
        name: payload.name,
        location: payload.location,
        rental_fee: payload.rental_fee,
        date_built: payload.date_built,
        category: payload.category,
        image_url: payload.image_url,
        description: payload.description,
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHouses.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(getHouses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.houseData = action.payload;
      }),
      builder.addCase(getHouses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder.addCase(addHouseApi.pending, (state) => ({
      ...state,
      error: false,
    }));
    builder.addCase(addHouseApi.fulfilled, (state) => ({
      ...state,
      error: false,
    }));
    builder.addCase(addHouseApi.rejected, (state) => ({
      ...state,
      error: true,
    }));
    builder.addCase(deleteHouse.pending, (state) => ({
      ...state,
      success: false,
    }));
    builder.addCase(deleteHouse.fulfilled, (state, action) => {
      const deletedHouseId = action.payload;
      const filteredHouses = state.houseData.filter((item) => item.id !== deletedHouseId);
      return {
        ...state,
        houseData: filteredHouses,
        success: true,
      };
    });
    builder.addCase(deleteHouse.rejected, (state, action) => {
      state.success = false;
      state.error = action.payload;
    });
  },
});

export const { addHouse, setHouses } = houseSlice.actions;
export default houseSlice.reducer;
