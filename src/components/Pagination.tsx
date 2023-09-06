import { useEffect, useState } from 'react';
import { useAppDispatch } from '../store';
import { setProducts } from '../store/reducers/productsSlice';
import { fetchNextProducts, getItemsCount } from '../services/productService';
import ReactPaginate from 'react-paginate';
import { IProduct } from '../interfaces/product';

import ShopCard from './ShopCard';

type PaginationProps = {
    itemsPerPage: number;
    products: IProduct[];
    girdViewActive: boolean;
};

const Pagination = ({
    itemsPerPage,
    products,
    girdViewActive,
}: PaginationProps) => {
    const dispatch = useAppDispatch();
    const [itemOffset, setItemOffset] = useState<number>(0);
    const [itemStart, setItemStart] = useState<number>(1);
    const [itemsCount, setItemsCount] = useState<number>(0);

    useEffect(() => {
        getItemsCount().then((snapshot) => {
            setItemsCount(snapshot.data().count);
        });
    }, []);

    const endOffset = itemOffset + itemsPerPage;
    const currentProducts = products.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(itemsCount / itemsPerPage);

    /**
     * Handles a page click event, updating the item offset and loading additional products if needed.
     *
     * @param {object} event - The page click event object with a 'selected' property indicating the new page index.
     * @returns {void}
     */
    const handlePageClick = (event: { selected: number }): void => {
        const newOffset = (event.selected * itemsPerPage) % itemsCount;

        if (newOffset + itemsPerPage > products.length) {
            fetchNextProducts().then((nextProducts) => {
                const mappedProducts = nextProducts.docs.map((doc) => ({
                    _id: doc.id,
                    ...doc.data(),
                }));

                dispatch(setProducts(mappedProducts));
            });
        }

        setItemOffset(newOffset);
        setItemStart(newOffset);
    };

    return (
        <>
            <div
                className={
                    girdViewActive
                        ? 'mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'
                        : 'mt-6 flex flex-col gap-x-6 gap-y-10'
                }
            >
                {currentProducts?.map((product) => (
                    <ShopCard key={product._id} product={product} />
                ))}
            </div>
            <div className="flex flex-col md:flex-row justify-center md:justify-between items-center">
                <ReactPaginate
                    nextLabel=""
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel=""
                    pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
                    pageClassName="mr-6"
                    containerClassName="flex text-base font-semibold py-10"
                    activeClassName="bg-black text-white"
                />

                <p className="text-base font-normal">
                    Products from {itemStart === 0 ? 1 : itemStart} to{' '}
                    {endOffset} of {itemsCount}
                </p>
            </div>
        </>
    );
};

export default Pagination;
