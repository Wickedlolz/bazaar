import { useState } from 'react';
import { useAppSelector } from '../store';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';

import ProductBanner from '../components/ProductBanner';
import ShopSideNav from '../components/ShopSideNav';
import ShopCard from '../components/ShopCard';

const Shop = () => {
    const intl = useIntl();
    const products = useAppSelector((state) => state.bazaar.products);
    const [itemsPerPage, setItemsPerPage] = useState<number>(12);
    const [girdViewActive, setGridViewActive] = useState<boolean>(true);
    const [listViewActive, setListViewActive] = useState<boolean>(false);

    const itemsPerPageFromBanner = (itemsPerPage: number) => {
        setItemsPerPage(itemsPerPage);
    };

    return (
        <div className="max-w-container mx-auto px-4">
            <Helmet>
                <title>
                    Shop {intl.formatMessage({ id: 'page_title' }) || ''}
                </title>
            </Helmet>
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
                        girdViewActive={girdViewActive}
                        listViewActive={listViewActive}
                        setGridViewActive={setGridViewActive}
                        setListViewActive={setListViewActive}
                    />
                    <div
                        className={
                            girdViewActive
                                ? 'mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'
                                : 'mt-6 flex flex-col gap-x-6 gap-y-10'
                        }
                    >
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
