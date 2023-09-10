import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    PersistConfig,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import productReducer from './reducers/productsSlice';
import cartReducer, { CartState } from './reducers/cartSlice';
import themeReducer, { IThemeState } from './reducers/themeSlice';

const persistConfig: PersistConfig<CartState> = {
    key: 'root',
    version: 1,
    storage,
};

const themePersistConfig: PersistConfig<IThemeState> = {
    key: 'theme',
    version: 2,
    storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);
const themePersistedReducer = persistReducer(themePersistConfig, themeReducer);

export const store = configureStore({
    reducer: {
        bazaar: productReducer,
        cart: persistedReducer,
        theme: themePersistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
