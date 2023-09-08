import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../../interfaces/product';

export interface CartState {
    productData: IProduct[];
}

const initialState: CartState = {
    productData: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = state.productData.find(
                (item) => item._id === action.payload._id
            );

            if (item) {
                item.quantity! = action.payload.quantity;
            } else {
                state.productData.push(action.payload);
            }
        },
        incrementQuantity: (state, action) => {
            const item = state.productData.find(
                (item) => item._id === action.payload._id
            );

            if (item) {
                item.quantity++;
            } else {
                state.productData.push({ ...action.payload, quantity: 1 });
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.productData.find(
                (item) => item._id === action.payload._id
            );

            if (item?.quantity === 0) {
                item.quantity = 0;
            } else {
                item!.quantity--;
            }
        },
        deleteItem: (state, action) => {
            state.productData = state.productData.filter(
                (item) => item._id !== action.payload._id
            );
        },
        resetCart: (state, action) => {
            state.productData = [];
        },
    },
});

export const {
    addToCart,
    incrementQuantity,
    decrementQuantity,
    deleteItem,
    resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
