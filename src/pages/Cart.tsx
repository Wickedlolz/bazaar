import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { resetCart } from '../store/reducers/cartSlice';
import { toast } from 'react-toastify';

import { HiOutlineArrowLeft } from 'react-icons/hi';
import CartItem from '../components/CartItem';
import CartHeader from '../assets/cart-header.jpeg';
import { useFirebaseContext } from '../contexts/FirebaseContext';

const Cart = () => {
    const { productData } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();
    const { user } = useFirebaseContext();
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [payNow, setPayNow] = useState<boolean>(false);

    useEffect(() => {
        let price = 0;
        productData.forEach((item) => {
            price += item.price * item.quantity;
        });

        setTotalAmount(Number(price.toFixed(2)));
    }, [productData]);

    const handleResetCart = () => {
        dispatch(resetCart(null));
        toast.error('Your Cart is empty!');
    };

    const handleCheckout = () => {
        if (user) {
            setPayNow(true);
        } else {
            setPayNow(false);
            toast.error('Please sign in to Checkout!');
        }
    };

    if (productData.length === 0) {
        return (
            <div className="max-w-screen-xl mx-auto py-32 flex flex-col items-center justify-center">
                <h2 className="text-base font-semibold text-orange-900">
                    Your Cart is Empty. Please go back to Shopping and add
                    productsto Cart.
                </h2>
                <Link to="/">
                    <button className="mt-8 ml-7 flex items-center gap-1 text-gray-400 hover:text-black duration-300">
                        <span>
                            <HiOutlineArrowLeft />
                        </span>
                        go shopping
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div>
            <img
                className="w-full h-60 object-cover"
                src={CartHeader}
                alt="cart cover"
                loading="lazy"
            />
            <div className="max-w-screen-xl mx-auto py-20 flex">
                <div className="w-2/3 pr-10">
                    <div className="w-full">
                        <h2 className="text-2xl">shopping cart</h2>
                    </div>
                    <div>
                        {productData.map((item) => (
                            <CartItem key={item._id} item={item} />
                        ))}
                    </div>
                    {productData.length > 0 && (
                        <button
                            onClick={handleResetCart}
                            className="bg-red-500 text-white mt-8 ml-7 py-1 px-6 hover:bg-red-800 duration-300"
                        >
                            Reset Cart
                        </button>
                    )}
                    <Link to="/">
                        <button className="mt-8 ml-7 flex items-center gap-1 text-gray-400 hover:text-black duration-300">
                            <span>
                                <HiOutlineArrowLeft />
                            </span>
                            go shopping
                        </button>
                    </Link>
                </div>
                <div className="w-1/3 bg-[#fafafa] py-6 px-4">
                    <div className="flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6">
                        <h2 className="text-2xl font-medium">cart totals</h2>
                        <p className="flex items-center gap-4 text-base">
                            Subtotal{' '}
                            <span className="font-bold text-lg">
                                $ {totalAmount}
                            </span>
                        </p>
                        <p className="flex items-start gap-4 text-base">
                            Shipping{' '}
                            <span>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Veniam, quia.
                            </span>
                        </p>
                    </div>
                    <p className="font-semibold flex justify-between mt-6">
                        Total{' '}
                        <span className="text-xl font-bold">
                            $ {totalAmount}
                        </span>
                    </p>
                    <button
                        onClick={handleCheckout}
                        className="text-base bg-black text-white w-full py-3 mt-6 hover:bg-gray-800 duration-300"
                    >
                        proceed to checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
