import { useAppDispatch } from '../store';
import {
    decrementQuantity,
    deleteItem,
    incrementQuantity,
} from '../store/reducers/cartSlice';
import { toast } from 'react-toastify';
import { FormattedMessage, useIntl } from 'react-intl';
import { CardItemProps } from '../types';

import { MdOutlineClose } from 'react-icons/md';
import Image from './common/Image';
import FormattedPrice from './FormattedPrice';

const CartItem = ({ item }: CardItemProps) => {
    const dispatch = useAppDispatch();
    const intl = useIntl();

    const handleDeleteItem = () => {
        dispatch(deleteItem(item));
        toast.error(
            `${item.title} ${intl.formatMessage({
                id: 'cart_product_removed',
            })}`
        );
    };

    return (
        <div className="flex items-center justify-between gap-6 mt-6">
            <div className="flex items-center gap-2">
                <MdOutlineClose
                    onClick={handleDeleteItem}
                    className="text-xl text-gray-600 hover:text-red-600 cursor-pointer duration-300"
                />
                <Image
                    classes="w-32 h-32 object-cover"
                    src={item.image}
                    alt={item.title}
                    lazy
                />
            </div>
            <h2 className="w-52">{item.title}</h2>
            <p className="w-10">
                <FormattedPrice amount={item.price} />
            </p>
            <p className="text-sm">
                <FormattedMessage id="product_quantity" />
            </p>
            <div className="flex items-center gap-4 text-sm font-semibold">
                <button
                    disabled={item.quantity === 0}
                    onClick={() => dispatch(decrementQuantity(item))}
                    className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black disabled:cursor-not-allowed"
                >
                    -
                </button>
                <span>{item.quantity}</span>
                <button
                    onClick={() => dispatch(incrementQuantity(item))}
                    className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black"
                >
                    +
                </button>
            </div>
            <p className="w-14">
                <FormattedPrice amount={item.quantity * item.price} />
            </p>
        </div>
    );
};

export default CartItem;
