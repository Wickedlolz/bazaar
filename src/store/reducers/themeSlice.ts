import { createSlice } from '@reduxjs/toolkit';

export interface IThemeState {
    isDarkTheme: boolean;
}

const initialState: IThemeState = {
    isDarkTheme: false,
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state, action) => {
            state.isDarkTheme = !state.isDarkTheme;
        },
    },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
