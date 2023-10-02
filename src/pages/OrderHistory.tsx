import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useIntl, FormattedMessage } from 'react-intl';
import { useFirebaseContext } from '../contexts/FirebaseContext';
import { Helmet } from 'react-helmet-async';
import { productService } from '../services';
import { IProduct } from '../interfaces/product';

import Image from '../components/common/Image';
import Spinner from '../components/common/Spinner';
import { calculateTotalAmount } from '../utils';

const OrderHistory = () => {
    const intl = useIntl();
    const { user } = useFirebaseContext();
    const [orderData, setOrderData] = useState<IProduct[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const totalAmount = calculateTotalAmount(orderData || []);

    useEffect(() => {
        setIsLoading(true);
        if (user?.email) {
            productService.getOrders(user.email).then((products) => {
                setOrderData(products);
                setIsLoading(false);
            });
        }
    }, [user?.email]);

    if (isLoading) {
        return (
            <section className="h-96 flex justify-center items-center">
                <Spinner />
            </section>
        );
    }

    return (
        <section className="px-2">
            <Helmet>
                <title>
                    {intl.formatMessage({ id: 'profile-your-orders' })}{' '}
                    {intl.formatMessage({ id: 'page_title' }) || ''}
                </title>
            </Helmet>
            {orderData?.length! > 0 ? (
                <div>
                    <div className="grid grid-cols-7 uppercase text-sm font-medium py-2 border-b-[1px] border-b-gray-300">
                        <p className="col-span-4">
                            <FormattedMessage id="shop_title" />
                        </p>
                        <p className="flex items-center justify-center">
                            <FormattedMessage id="product_quantity" />
                        </p>
                        <p className="flex items-center justify-center">
                            <FormattedMessage id="unit_price" />
                        </p>
                        <p className="flex items-center justify-center">
                            <FormattedMessage id="amount" />
                        </p>
                    </div>
                    <div className="py-2 flex flex-col justify-center gap-2 overflow-y-auto h-96">
                        {orderData?.map((item: IProduct) => (
                            <div
                                key={item?._id}
                                className="py-2 border-b-[1px] border-gray-300 grid grid-cols-7 items-center"
                            >
                                <div className="col-span-4 flex items-start gap-2 text-sm">
                                    <Image
                                        src={item?.image}
                                        alt="product image"
                                        width={500}
                                        height={500}
                                        classes="w-12 h-12 object-cover"
                                        lazy
                                    />
                                    <div>
                                        <h3 className="text-base font-semibold mb-.5">
                                            {item?.title}
                                        </h3>
                                        <p>{item?.description}</p>
                                    </div>
                                </div>
                                <p className="flex items-center justify-center">
                                    {item?.quantity}
                                </p>
                                <p className="flex items-center justify-center">
                                    {item?.price}
                                </p>
                                <p className="flex items-center justify-center">
                                    {item?.price * item.quantity}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="text-lg font-medium py-2 border-b-[1px] border-b-gray-300">
                        <p>
                            <FormattedMessage id="payment_details" />
                        </p>
                    </div>
                    <p className="py-2">
                        <FormattedMessage id="total_paid" />{' '}
                        <span className="text-xl font-semibold">
                            {totalAmount}
                        </span>
                    </p>
                </div>
            ) : (
                <div className="py-10 bg-white text-black text-2xl text-center">
                    <p>
                        <FormattedMessage id="nothing_to_show" />
                    </p>
                    <Link to={'/'}>
                        <button className="bg-black text-slate-100 w-44 h-12 text-base font-semibold mt-2 hover:bg-orange-600 duration-300">
                            <FormattedMessage id="continue_shopping" />
                        </button>
                    </Link>
                </div>
            )}
        </section>
    );
};

export default OrderHistory;
