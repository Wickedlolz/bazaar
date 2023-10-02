import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Product from '../pages/Product';
import Cart from '../pages/Cart';
import Shop from '../pages/Shop';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import AuthGuard from '../components/AuthGuard';
import GuestGuard from '../components/GuestGuard';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/login" element={<GuestGuard />}>
                <Route index element={<Login />} />
            </Route>
            <Route path="/profile" element={<AuthGuard />}>
                <Route index element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Route>
    )
);

const AppRoutes = () => {
    return <RouterProvider router={router} />;
};

export default AppRoutes;
