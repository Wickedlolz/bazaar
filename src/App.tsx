import { useEffect } from 'react';

import { useAppDispatch } from './store';
import { fetchProducts } from './store/reducers/productsSlice';

import MainLayout from './layouts/MainLayout';
import AppRoutes from './routes/AppRoutes';

const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <MainLayout>
            <AppRoutes />
        </MainLayout>
    );
};

export default App;
