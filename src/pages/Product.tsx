import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { addToCart } from '../store/reducers/cartSlice';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';

import { IProduct } from '../interfaces/product';

import { MdOutlineStar } from 'react-icons/md';

const Product = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { products } = useAppSelector((state) => state.bazaar);
    const { productData } = useAppSelector((state) => state.cart);
    const [product, setProduct] = useState<IProduct | undefined>(undefined);
    const [productQuantity, setProductQuantity] = useState<number>(0);

    useEffect(() => {
        const selectedProduct = products.find((p) => p._id.toString() === id);
        const cartProduct = productData.find(
            (item) => item._id === product?._id
        );

        setProduct(selectedProduct);
        setProductQuantity(cartProduct?.quantity || 0);

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }, [id, products, product, productData]);

    /**
     * Handles the action of adding a product to the cart.
     *
     * This function dispatches an 'addToCart' action with the product information and quantity,
     * and displays a success toast message indicating that the product has been added to the cart.
     *
     * @returns {void}
     */
    const handleAddToCart = (): void => {
        dispatch(addToCart({ ...product, quantity: productQuantity }));
        toast.success(`${product?.title} is added to your cart.`);
    };

    return (
        <div className="dark:bg-black dark:text-white">
            <div className="max-w-screen-xl mx-auto py-10 flex gap-10">
                <Helmet>
                    <title>
                        {product?.title || 'Product'} | Bazaar - A Modern
                        Shopping App
                    </title>
                </Helmet>
                <div className="w-2/5 relative">
                    <img
                        className="w-full h-[550px] object-cover"
                        src={product?.image}
                        alt={product?.title}
                        width={550}
                        height={550}
                    />
                    <div className="absolute top-4 right-0">
                        {product?.isNew && (
                            <p className="bg-black text-white font-semibold px-8 py-1">
                                <FormattedMessage id="product_sale_lbl" />
                            </p>
                        )}
                    </div>
                </div>
                <div className="w-3/5 flex flex-col justify-center gap-4">
                    <div>
                        <h2 className="text-4xl font-semibold">
                            {product?.title}
                        </h2>
                        <div className="flex items-center gap-4 mt-3">
                            {product?.oldPrice && (
                                <p className="line-through text-gray-500">
                                    ${product.oldPrice}
                                </p>
                            )}
                            <p
                                className={`font-semibold ${
                                    product?.oldPrice ? 'text-red-600' : ''
                                }`}
                            >
                                ${product?.price}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-base">
                        <div className="flex flex-row-reverse">
                            <MdOutlineStar className="peer peer-hover:text-yellow-500 hover:text-yellow-500 cursor-pointer" />
                            <MdOutlineStar className="peer peer-hover:text-yellow-500 hover:text-yellow-500 cursor-pointer" />
                            <MdOutlineStar className="peer peer-hover:text-yellow-500 hover:text-yellow-500 cursor-pointer" />
                            <MdOutlineStar className="peer peer-hover:text-yellow-500 hover:text-yellow-500 cursor-pointer" />
                            <MdOutlineStar className="peer peer-hover:text-yellow-500 hover:text-yellow-500 cursor-pointer" />
                        </div>
                        <p className="text-xs text-gray-500">
                            (1 <FormattedMessage id="product_customer_review" />
                            )
                        </p>
                    </div>
                    <p className="text-base text-gray-500 mt-3">
                        {product?.description}
                    </p>
                    <div className="flex gap-4">
                        <div className="w-56 flex items-center justify-between text-gray-500 gap-4 border p-3">
                            <p className="text-sm">
                                <FormattedMessage id="product_quantity" />
                            </p>
                            <div className="flex items-center gap-4 text-sm font-semibold">
                                <button
                                    onClick={() =>
                                        setProductQuantity((prev) =>
                                            prev === 0 ? 0 : prev - 1
                                        )
                                    }
                                    className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black"
                                >
                                    -
                                </button>
                                <span>{productQuantity}</span>
                                <button
                                    onClick={() =>
                                        setProductQuantity((prev) => prev + 1)
                                    }
                                    className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <button
                            disabled={productQuantity === 0}
                            className="bg-black text-white py-3 px-6 active:bg-gray-800 disabled:bg-gray-500 disabled:cursor-not-allowed"
                            onClick={handleAddToCart}
                        >
                            <FormattedMessage id="product_add_to_cart_lbl" />
                        </button>
                    </div>
                    <p className="text-base text-gray-500">
                        <FormattedMessage id="product_category_lbl" />:{' '}
                        <span className="font-medium capitalize">
                            {product?.category}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Product;
