/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const getHousesurl = 'http://127.0.0.1:3000/api/v1/houses';
const addHouseUrl = 'http://localhost:3000/api/v1/houses';

export const getHouses = createAsyncThunk('houses/getHouses', () => fetch(getHousesurl)
  .then((res) => res.json())
  .catch((err) => console.log(err))
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
    builder.addCase(addHouseApi.rejected , (state) => ({
      ...state,
      error: true,
    }));
  },
});

export const { addHouse, setHouses } = houseSlice.actions;
export default houseSlice.reducer;
