import { useEffect } from 'react';
import { useAppDispatch } from './store';
import { fetchProducts } from './store/reducers/productsSlice';

import MainLayout from './layouts/MainLayout';
import AppRoutes from './routes/AppRoutes';
import { FirebaseProvider } from './contexts/FirebaseContext';
import Locales from './components/Locales';

const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <FirebaseProvider>
            <Locales>
                <MainLayout>
                    <AppRoutes />
                </MainLayout>
            </Locales>
        </FirebaseProvider>
    );
};

export default App;
