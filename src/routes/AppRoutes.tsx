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

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    )
);

const AppRoutes = () => {
    return <RouterProvider router={router} />;
};

export default AppRoutes;

// import { Routes, Route } from 'react-router-dom';

// import Home from '../pages/Home';
// import Product from '../pages/Product';
// import Cart from '../pages/Cart';
// import Login from '../pages/Login';
// import Shop from '../pages/Shop';
// import NotFound from '../pages/NotFound';

// const AppRoutes = () => {
//     return (
//         <>
//             <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/product/:id" element={<Product />} />
//                 <Route path="/cart" element={<Cart />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/shop" element={<Shop />} />
//                 <Route path="*" element={<NotFound />} />
//             </Routes>
//         </>
//     );
// };

// export default AppRoutes;
