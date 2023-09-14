import { useEffect } from 'react';
import { useAppDispatch } from './store';
import { fetchProducts } from './store/reducers/productsSlice';
import { HelmetProvider } from 'react-helmet-async';
import { FirebaseProvider } from './contexts/FirebaseContext';

import Locales from './components/Locales';
import AppRoutes from './routes/AppRoutes';

const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <FirebaseProvider>
            <HelmetProvider>
                <Locales>
                    <AppRoutes />
                </Locales>
            </HelmetProvider>
        </FirebaseProvider>
    );
};

export default App;
