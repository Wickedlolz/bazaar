import { useEffect, useState } from 'react';

import { IProduct } from '../interfaces/product';

import ProductBanner from '../components/ProductBanner';
import ShopSideNav from '../components/ShopSideNav';
import ShopCard from '../components/ShopCard';

const Shop = () => {
    const [products, setProducts] = useState<IProduct[] | null>(null);
    const [itemsPerPage, setItemsPerPage] = useState<number>(12);

    const itemsPerPageFromBanner = (itemsPerPage: number) => {
        setItemsPerPage(itemsPerPage);
    };

    useEffect(() => {
        fetch('https://fakestoreapiserver.reactbd.com/nextamazon')
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="max-w-container mx-auto px-4">
            <div className="w-full py-10 xl:py-10 flex flex-col gap-3">
                <h1 className="text-5xl text-primeColor font-titleFont font-bold">
                    Products
                </h1>
            </div>
            <div className="w-full h-full flex pb-20 gap-10">
                <div className="w-[20%] lg:w-[25%] hidden md:inline-flex h-full">
                    <ShopSideNav />
                </div>
                <div className="w-full md:w-[80%] lg:w-[75%] h-full flex flex-col gap-10">
                    <ProductBanner
                        itemsPerPageFromBanner={itemsPerPageFromBanner}
                    />
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products?.map((product) => (
                            <ShopCard key={product._id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
