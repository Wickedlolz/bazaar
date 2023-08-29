import { useAppDispatch } from '../store';
import {
    decrementQuantity,
    deleteItem,
    incrementQuantity,
} from '../store/reducers/cartSlice';
import { toast } from 'react-toastify';

import { IProduct } from '../interfaces/product';

import { MdOutlineClose } from 'react-icons/md';

interface IProps {
    item: IProduct;
}

const CartItem = ({ item }: IProps) => {
    const dispatch = useAppDispatch();

    const handleDeleteItem = () => {
        dispatch(deleteItem(item));
        toast.error(`${item.title} is removed.`);
    };

    return (
        <div className="flex items-center justify-between gap-6 mt-6">
            <div className="flex items-center gap-2">
                <MdOutlineClose
                    onClick={handleDeleteItem}
                    className="text-xl text-gray-600 hover:text-red-600 cursor-pointer duration-300"
                />
                <img
                    className="w-32 h-32 object-cover"
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                />
            </div>
            <h2 className="w-52">{item.title}</h2>
            <p className="w-10">${item.price}</p>
            <p className="text-sm">Quantity</p>
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
            <p className="w-14">${item.quantity * item.price}</p>
        </div>
    );
};

export default CartItem;
