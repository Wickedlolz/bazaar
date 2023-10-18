import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { changeCategory } from '../store/reducers/productsSlice';
import { useIntl } from 'react-intl';

import { items } from '../utils/categoryData';

import NavTitle from './NavTitle';
import { ImPlus } from 'react-icons/im';

const AsideCategory = () => {
    const dispatch = useAppDispatch();
    const { selectedCategory } = useAppSelector((state) => state.bazaar);
    const intl = useIntl();
    const [showSubCatOne, setShowSubCatOne] = useState(false);

    return (
        <div className="w-full">
            <NavTitle
                title={intl.formatMessage({
                    id: 'shop_aside_shop_by_category',
                })}
                icons={false}
            />
            <div>
                <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
                    {items.map(({ _id, title, category, icons }) => (
                        <li
                            key={_id}
                            onClick={() => dispatch(changeCategory(category))}
                            className={`border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center justify-between cursor-pointer ${
                                selectedCategory === category &&
                                'text-orange-900'
                            }`}
                        >
                            {title}
                            {icons && (
                                <span
                                    onClick={() =>
                                        setShowSubCatOne(!showSubCatOne)
                                    }
                                    className="text-[10px] lg:text-xs cursor-pointer text-gray-400 hover:text-primeColor duration-300"
                                >
                                    <ImPlus />
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AsideCategory;
