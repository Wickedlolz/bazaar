import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Product from '../pages/Product';
import Cart from '../pages/Cart';
import Login from '../pages/Login';
import Shop from '../pages/Shop';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default AppRoutes;
