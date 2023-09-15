import { useState, useMemo } from 'react';
import { useAppSelector } from '../store';
import { Helmet } from 'react-helmet-async';
import { useIntl, FormattedMessage } from 'react-intl';

import ProductBanner from '../components/ProductBanner';
import ShopSideNav from '../components/ShopSideNav';
import { IPrice } from '../interfaces/price';
import Pagination from '../components/Pagination';

const Shop = () => {
    const intl = useIntl();
    const { products, selectedCategory, selectedPriceRange } = useAppSelector(
        (state) => state.bazaar
    );
    const [itemsPerPage, setItemsPerPage] = useState<number>(12);
    const [girdViewActive, setGridViewActive] = useState<boolean>(true);
    const [listViewActive, setListViewActive] = useState<boolean>(false);

    /**
     * Sets the number of items per page based on the value selected in the banner.
     *
     * @param {number} itemsPerPage The number of items per page.
     *
     * @returns {void}
     */
    const itemsPerPageFromBanner = (itemsPerPage: number): void => {
        setItemsPerPage(itemsPerPage);
    };

    const filteredProducts = useMemo(() => {
        const filteredProductsByCategory =
            selectedCategory === 'all'
                ? products
                : products.filter(
                      (product) => product.category === selectedCategory
                  );

        const finalFilteredProducts =
            (selectedPriceRange as string) === 'all'
                ? filteredProductsByCategory
                : filteredProductsByCategory.filter(
                      (product) =>
                          product.price >=
                              (selectedPriceRange as IPrice)?.priceOne &&
                          product.price <=
                              (selectedPriceRange as IPrice)?.priceTwo
                  );

        return finalFilteredProducts;
    }, [products, selectedCategory, selectedPriceRange]);

    return (
        <section className="max-w-container mx-auto px-4 dark-theme">
            <Helmet>
                <title>
                    Shop {intl.formatMessage({ id: 'page_title' }) || ''}
                </title>
            </Helmet>
            <div className="w-full py-10 xl:py-10 flex flex-col gap-3">
                <h1 className="text-5xl text-primeColor font-titleFont font-bold">
                    <FormattedMessage id="shop_title" />
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
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        girdViewActive={girdViewActive}
                        products={filteredProducts}
                    />
                </div>
            </div>
        </section>
    );
};

export default Shop;
