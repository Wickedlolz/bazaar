import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Image from './common/Image';
import { CategoryItemProps } from '../types';

const CategoryItem = ({ item }: CategoryItemProps) => {
    return (
        <Link
            to="/shop"
            className="flex-1 m-1 h-[80vh] relative group overflow-hidden"
        >
            <Image
                classes="w-full h-full object-cover group-hover:scale-110 duration-500"
                src={item.img}
                alt={item.title}
                lazy
            />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                <h1 className="text-white mb-5 text-3xl">{item.title}</h1>
                <button className="border-none p-2 bg-white text-gray-600 font-bold">
                    <FormattedMessage id="categories_shop_now_lbl" />
                </button>
            </div>
        </Link>
    );
};

export default CategoryItem;
