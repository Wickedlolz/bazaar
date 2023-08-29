import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../interfaces/product";

interface CartState {
  productData: IProduct[];
  userInfo: any;
}

const initialState: CartState = {
  productData: [],
  userInfo: null,
};

export const cartSlice = createSlice({
  name: "cart",
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
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
