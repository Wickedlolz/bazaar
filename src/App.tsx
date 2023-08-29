import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { useAppDispatch } from "./store";
import { fetchProducts } from "./store/reducers/productsSlice";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Product from "./pages/Product";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
