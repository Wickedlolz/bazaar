import { useEffect } from 'react';
import { useAppDispatch } from './store';
import { fetchProducts } from './store/reducers/productsSlice';

import MainLayout from './layouts/MainLayout';
import AppRoutes from './routes/AppRoutes';
import { FirebaseProvider } from './contexts/FirebaseContext';

const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <FirebaseProvider>
            <MainLayout>
                <AppRoutes />
            </MainLayout>
        </FirebaseProvider>
    );
};

export default App;
