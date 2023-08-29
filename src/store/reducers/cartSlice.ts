import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../../interfaces/product';

interface CartState {
    productData: IProduct[];
    userInfo: any;
}

const initialState: CartState = {
    productData: [],
    userInfo: null,
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
                item.quantity! += 1;
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
