import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FETCH_PRODUCTS } from '../actions/products';
import { IProduct, IRating } from '../../interfaces/product';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { PAGE_SIZE } from '../../utils/constants';
import { IPrice } from '../../interfaces/price';

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
        rating: doc.data().rating as IRating,
        quantity: (doc.data().quantity as number) || 1,
        brand: (doc.data().brand as string) || '',
    }));

    return products;
});

export interface ProductsState {
    products: IProduct[];
    selectedCategory: string;
    selectedPriceRange: IPrice | string;
    lang: string;
}

const initialState: ProductsState = {
    products: [],
    selectedCategory: 'all',
    selectedPriceRange: 'all',
    lang: navigator.language,
};

export const productsSlice = createSlice({
    name: 'bazaar',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = state.products.concat(action.payload);
        },
        updateProduct: (state, action) => {
            const productIndex = state.products.findIndex(
                (product) => product._id === action.payload._id
            );
            state.products[productIndex] = action.payload;
        },
        changeCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        changePriceRange: (state, action) => {
            state.selectedPriceRange = action.payload;
        },
        changeLanguage: (state, action) => {
            state.lang = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        });
    },
});

export const {
    changeCategory,
    changePriceRange,
    setProducts,
    changeLanguage,
    updateProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
