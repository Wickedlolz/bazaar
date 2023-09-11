import { Dispatch, SetStateAction, memo } from 'react';
import { FormattedMessage } from 'react-intl';

import { BsGridFill } from 'react-icons/bs';
import { ImList } from 'react-icons/im';
import { GoTriangleDown } from 'react-icons/go';

type ProductBannerProps = {
    itemsPerPageFromBanner: (page: number) => void;
    girdViewActive: boolean;
    listViewActive: boolean;
    setGridViewActive: Dispatch<SetStateAction<boolean>>;
    setListViewActive: Dispatch<SetStateAction<boolean>>;
};

const ProductBanner = ({
    itemsPerPageFromBanner,
    girdViewActive,
    setGridViewActive,
    listViewActive,
    setListViewActive,
}: ProductBannerProps) => {
    /**
     * Switches the view mode to grid view and updates the state accordingly.
     *
     * @returns {void}
     */
    const changeToGridView = (): void => {
        setListViewActive(false);
        setGridViewActive(true);
    };

    /**
     * Switches the view mode to list view and updates the state accordingly.
     *
     * @returns {void}
     */
    const changeToListView = (): void => {
        setGridViewActive(false);
        setListViewActive(true);
    };

    return (
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center gap-4">
                <span
                    onClick={changeToGridView}
                    className={`${
                        girdViewActive
                            ? 'bg-primeColor text-white'
                            : 'border-[1px] border-gray-300 text-[#737373]'
                    } w-8 h-8 text-lg flex items-center justify-center cursor-pointer gridView`}
                >
                    <BsGridFill />
                </span>
                <span
                    onClick={changeToListView}
                    className={`${
                        listViewActive
                            ? 'bg-primarColor text-white'
                            : 'border-[1px] border-gray-300 text-[#737373]'
                    } w-8 h-8 text-base flex items-center justify-center cursor-pointer listView`}
                >
                    <ImList />
                </span>
            </div>

            <div className="flex items-center gap-2 md:gap-6 mt-4 md:mt-0">
                <div className="flex items-center gap-2 text-base text-[#767676] relative">
                    <label className="block">
                        <FormattedMessage id="shop_product_banner_sort_by" />
                    </label>
                    <select
                        // onChange={(e) => setSelected(e.target.value)}
                        id="countries"
                        className="w-32 md:w-52 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-primeColor text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-primeColor"
                    >
                        <option value="Best Sellers">
                            <FormattedMessage id="shop_product_banner_best_sellers" />
                        </option>
                        <option value="New Arrival">
                            <FormattedMessage id="shop_product_banner_new_arrival" />
                        </option>
                        <option value="Featured">
                            <FormattedMessage id="shop_product_banner_featured" />
                        </option>
                        <option value="Final Offer">
                            <FormattedMessage id="shop_product_banner_final_offer" />
                        </option>
                    </select>
                    <span className="absolute text-sm right-2 md:right-4 top-2.5">
                        <GoTriangleDown />
                    </span>
                </div>
                <div className="flex items-center gap-2 text-[#767676] relative">
                    <label className="block">
                        <FormattedMessage id="shop_product_banner_show" />
                    </label>
                    <select
                        onChange={(e) =>
                            itemsPerPageFromBanner(+e.target.value)
                        }
                        id="countries"
                        className="w-16 md:w-20 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-primeColor text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-primeColor"
                    >
                        <option value="12">12</option>
                        <option value="24">24</option>
                        <option value="36">36</option>
                        <option value="48">48</option>
                    </select>
                    <span className="absolute text-sm right-3 top-2.5">
                        <GoTriangleDown />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default memo(ProductBanner);
