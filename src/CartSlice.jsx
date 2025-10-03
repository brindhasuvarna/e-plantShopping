import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const plant = action.payload;
    const existingItem = state.items.find(item => item.name === plant.name);

    if (existingItem) {
        existingItem.quantity += 1; // if already in cart, increase quantity
    } else {
        state.items.push({ ...plant, quantity: 1 }); // else add new item
    }
    
    },
    removeItem: (state, action) => {
      const nameToRemove = action.payload;
    state.items = state.items.filter(item => item.name !== nameToRemove);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
    const item = state.items.find(item => item.name === name);

    if (item) {
        item.quantity = quantity;
    }

    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;


