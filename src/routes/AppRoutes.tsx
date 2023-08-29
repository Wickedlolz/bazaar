import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Product from '../pages/Product';
import Spinner from '../components/Spinner';
const Cart = lazy(() => import('../pages/Cart'));

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<Product />} />
                <Route
                    path="/cart"
                    element={
                        <Suspense fallback={<Spinner />}>
                            <Cart />
                        </Suspense>
                    }
                />
            </Routes>
        </>
    );
};

export default AppRoutes;
