import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { resetCart } from '../store/reducers/cartSlice';
import StripeCheckout, { Token } from 'react-stripe-checkout';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage, useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import { HiOutlineArrowLeft } from 'react-icons/hi';
import CartItem from '../components/CartItem';
import CartHeader from '../assets/cart-header.jpeg';
import { useFirebaseContext } from '../contexts/FirebaseContext';

const Cart = () => {
    const { productData } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();
    const { user } = useFirebaseContext();
    const intl = useIntl();
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [payNow, setPayNow] = useState<boolean>(false);

    useEffect(() => {
        const price = productData.reduce(
            (accumulator, currentValue) =>
                accumulator + currentValue.price * currentValue.quantity,
            0
        );

        setTotalAmount(Number(price.toFixed(2)));
    }, [productData]);

    const handleResetCart = () => {
        dispatch(resetCart(null));
        toast.error(intl.formatMessage({ id: 'cart_empty_lbl' }));
    };

    const handleCheckout = () => {
        if (user) {
            setPayNow(true);
        } else {
            setPayNow(false);
            toast.error(intl.formatMessage({ id: 'cart_sign_in' }));
        }
    };

    const payment = async (token: Token) => {
        await fetch('https://iwindy-server.vercel.app/api/payment/pay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: totalAmount * 100,
                token,
            }),
        });
    };

    if (productData.length === 0) {
        return (
            <div className="dark:bg-black dark:text-white">
                <div className="max-w-screen-xl mx-auto py-32 flex flex-col items-center justify-center">
                    <Helmet>
                        <title>
                            Cart{' '}
                            {intl.formatMessage({ id: 'page_title' }) || ''}
                        </title>
                    </Helmet>
                    <h2 className="text-base font-semibold text-orange-900">
                        <FormattedMessage id="cart_is_empty_lbl" />
                    </h2>
                    <Link to="/">
                        <button className="mt-8 ml-7 flex items-center gap-1 text-gray-400 hover:text-black dark:hover:text-white duration-300">
                            <span>
                                <HiOutlineArrowLeft />
                            </span>
                            <FormattedMessage id="cart_go_shopping_btn" />
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="dark:bg-black dark:text-white">
            <Helmet>
                <title>
                    Cart {intl.formatMessage({ id: 'page_title' }) || ''}
                </title>
            </Helmet>
            <img
                className="w-full h-60 object-cover"
                src={CartHeader}
                alt="cart cover"
                loading="lazy"
            />
            <div className="max-w-screen-xl mx-auto py-20 flex">
                <div className="w-2/3 pr-10">
                    <div className="w-full">
                        <h2 className="text-2xl">
                            <FormattedMessage id="cart_title_lbl" />
                        </h2>
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
                            <FormattedMessage id="cart_reset_cart_lbl" />
                        </button>
                    )}
                    <Link to="/">
                        <button className="mt-8 ml-7 flex items-center gap-1 text-gray-400 hover:text-black duration-300">
                            <span>
                                <HiOutlineArrowLeft />
                            </span>
                            <FormattedMessage id="cart_go_shopping_btn" />
                        </button>
                    </Link>
                </div>
                <div className="w-1/3 bg-[#fafafa] dark:bg-black dark:text-white py-6 px-4">
                    <div className="flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6">
                        <h2 className="text-2xl font-medium">
                            <FormattedMessage id="cart_totals" />
                        </h2>
                        <p className="flex items-center gap-4 text-base">
                            <FormattedMessage id="cart_subtotal" />{' '}
                            <span className="font-bold text-lg">
                                $ {totalAmount}
                            </span>
                        </p>
                        <p className="flex items-start gap-4 text-base">
                            <FormattedMessage id="cart_shipping" />{' '}
                            <span>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Veniam, quia.
                            </span>
                        </p>
                    </div>
                    <p className="font-semibold flex justify-between mt-6">
                        <FormattedMessage id="cart_total" />{' '}
                        <span className="text-xl font-bold">
                            $ {totalAmount}
                        </span>
                    </p>
                    <button
                        onClick={handleCheckout}
                        className="text-base bg-black text-white dark:border-white dark:border w-full py-3 mt-6 hover:bg-gray-800 duration-300"
                    >
                        <FormattedMessage id="cart_proceed_to_checkout" />
                    </button>
                    {payNow && (
                        <div className="w-full mt-6 flex items-center justify-center">
                            <StripeCheckout
                                stripeKey={
                                    process.env.REACT_APP_STRIPE_API_KEY!
                                }
                                name="Bazaar Online Shopping"
                                amount={totalAmount * 100}
                                label="Pay to bazaar"
                                description={`Your Payment amount is $${totalAmount}`}
                                token={payment}
                                email={user?.email!}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
