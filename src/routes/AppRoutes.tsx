import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Product from '../pages/Product';
import Cart from '../pages/Cart';
import Login from '../pages/Login';

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    );
};

export default AppRoutes;
