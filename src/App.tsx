import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store';
import { fetchProducts } from './store/reducers/productsSlice';
import { HelmetProvider } from 'react-helmet-async';

import MainLayout from './layouts/MainLayout';
import AppRoutes from './routes/AppRoutes';
import { FirebaseProvider } from './contexts/FirebaseContext';
import Locales from './components/Locales';

const App = () => {
    const isDarkTheme = useAppSelector((state) => state.theme.isDarkTheme);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        if (isDarkTheme) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkTheme]);

    return (
        <FirebaseProvider>
            <HelmetProvider>
                <Locales>
                    <MainLayout>
                        <AppRoutes />
                    </MainLayout>
                </Locales>
            </HelmetProvider>
        </FirebaseProvider>
    );
};

export default App;
