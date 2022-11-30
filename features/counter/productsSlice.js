import { createSlice } from '@reduxjs/toolkit'

const initialState = [];

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    add: (state, action) => {
      const product = action.payload;

      state.push(product);
    },
    update: (state, action) => {
      const product = action.payload;
      const index   = state.findIndex(item => item.id == product.id);

      state[index] = {...state[index], ...product};
    },
    remove: (state, action) => {
      const id = action.payload;
      const index   = state.findIndex(item => item.id == id);

      state.splice(index, 1);
    },
    populate: (state, action) => {
      const products = action.payload;

      return products;
    },
  },
})

export const { add, update, remove, populate } = productsSlice.actions

export default productsSlice.reducer