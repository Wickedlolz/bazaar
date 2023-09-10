import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFirebaseContext } from '../contexts/FirebaseContext';
import { useAppDispatch, useAppSelector } from '../store';
import { resetCart } from '../store/reducers/cartSlice';
import StripeCheckout, { Token } from 'react-stripe-checkout';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage, useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import { PAYMENT_URL } from '../utils/constants';

import { HiOutlineArrowLeft } from 'react-icons/hi';

import CartItem from '../components/CartItem';
import CartHeader from '../assets/cart-header.jpeg';
import EmptyCard from '../components/EmptyCard';
import { addUserOrder, makePayment } from '../services/productService';

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

    /**
     * Resets the shopping cart and displays an error toast message to notify the user
     * that the cart has been emptied.
     *
     * @returns {void}
     */
    const handleResetCart = (): void => {
        dispatch(resetCart(null));
        toast.error(intl.formatMessage({ id: 'cart_empty_lbl' }));
    };

    /**
     * Handles the checkout process, determining whether to proceed with payment or prompt
     * the user to sign in if they are not already authenticated.
     *
     * @returns {void}
     */
    const handleCheckout = (): void => {
        if (user) {
            setPayNow(true);
        } else {
            setPayNow(false);
            toast.error(intl.formatMessage({ id: 'cart_sign_in' }));
        }
    };

    /**
     * Initiates a payment request with the provided payment token
     * and adding user products and info to firestore
     *
     * @param {Token} token - The payment token to be used for the transaction.
     *
     * @returns {Promise<void>} A Promise that resolves when the payment and order processing are completed.
     */
    const payment = async (token: Token): Promise<void> => {
        await makePayment(totalAmount, token);

        const userData = {
            user: {
                displayName: user?.displayName!,
                email: user?.email!,
            },
            products: productData,
        };

        await addUserOrder(userData);

        dispatch(resetCart(null));
    };

    if (productData.length === 0) {
        return <EmptyCard />;
    }

    return (
        <div className="dark-theme">
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
                <div className="w-1/3 bg-[#fafafa] dark-theme py-6 px-4">
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
