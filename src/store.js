import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './assets/CartSlice';

 const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});
export default store
