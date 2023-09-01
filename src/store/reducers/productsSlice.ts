import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FETCH_PRODUCTS } from '../actions/products';
import { IProduct } from '../../interfaces/product';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';

export const fetchProducts = createAsyncThunk(FETCH_PRODUCTS, async () => {
    const data = await getDocs(collection(db, 'allProducts'));

    const products = data.docs.map((doc) => ({
        _id: doc.id as string,
        title: doc.data().title as string,
        isNew: doc.data().isNew as boolean,
        oldPrice: doc.data().oldPrice as string,
        price: doc.data().price as number,
        description: doc.data().description as string,
        category: doc.data().category as string,
        image: doc.data().image as string,
        rating: doc.data().rating as number,
        quantity: doc.data().quantity as number,
        brand: doc.data().brand as string,
    }));

    return products;
});

export interface ProductsState {
    products: IProduct[];
    selectedCategory: string;
}

const initialState: ProductsState = {
    products: [],
    selectedCategory: 'all',
};

export const productsSlice = createSlice({
    name: 'bazaar',
    initialState,
    reducers: {
        changeCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        });
    },
});

export const { changeCategory } = productsSlice.actions;

export default productsSlice.reducer;
