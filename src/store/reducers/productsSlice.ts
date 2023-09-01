import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FETCH_PRODUCTS } from '../actions/products';
import { IProduct } from '../../interfaces/product';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { PAGE_SIZE } from '../../utils/constants';
import { IPrice } from '../../interfaces/priceList';

export const fetchProducts = createAsyncThunk(FETCH_PRODUCTS, async () => {
    const paginationQuery = query(
        collection(db, 'allProducts'),
        limit(PAGE_SIZE)
    );
    const data = await getDocs(paginationQuery);

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
    selectedPriceRange: IPrice | string;
}

const initialState: ProductsState = {
    products: [],
    selectedCategory: 'all',
    selectedPriceRange: 'all',
};

export const productsSlice = createSlice({
    name: 'bazaar',
    initialState,
    reducers: {
        changeCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        changePriceRange: (state, action) => {
            state.selectedPriceRange = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        });
    },
});

export const { changeCategory, changePriceRange } = productsSlice.actions;

export default productsSlice.reducer;
