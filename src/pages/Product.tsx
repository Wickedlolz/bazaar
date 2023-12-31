import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { addToCart } from '../store/reducers/cartSlice';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage, useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { productService } from '../services';

import { IProduct } from '../interfaces/product';

import { MdOutlineStar } from 'react-icons/md';
import { updateProduct } from '../store/reducers/productsSlice';
import Image from '../components/common/Image';

const Product = () => {
    const intl = useIntl();
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
        toast.success(
            `${product?.title} ${intl.formatMessage({
                id: 'product_added_to_cart_success',
            })}`
        );
    };

    /**
     * Rates a product by updating its rating in the Firestore database and dispatching the updated product.
     *
     * @param {number} rating - The rating to be given to the product.
     *
     * @returns {Promise<void>}
     * @throws {Error} Throws an error if there's an issue with updating the product in the database.
     */
    const rateProduct = async (rating: number) => {
        const updatedProduct: IProduct = {
            ...product!,
            rating: {
                rate: (product?.rating.count! + 1) / rating,
                count: product?.rating.count! + 1,
            },
        };

        try {
            await productService.updateProductById(id!, updatedProduct);

            dispatch(updateProduct(updatedProduct));
            toast.success(
                `${intl.formatMessage({ id: 'rate_product_success' })} ${
                    product?.title
                }`
            );
        } catch (error) {
            toast.error(intl.formatMessage({ id: 'rate_product_error' }));
        }
    };

    return (
        <section className="dark-theme">
            <div className="max-w-screen-xl mx-auto py-10 flex gap-10">
                <Helmet>
                    <title>
                        {product?.title || 'Product'}{' '}
                        {intl.formatMessage({ id: 'page_title' }) || ''}
                    </title>
                </Helmet>
                <div className="w-2/5 relative">
                    <Image
                        classes="w-full h-[550px] object-cover"
                        src={product?.image || ''}
                        alt={product?.title || ''}
                        width={550}
                        height={550}
                        lazy
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
                        <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => rateProduct(index + 1)}
                                    className={`text-2xl ${
                                        index < product?.rating?.rate!
                                            ? 'text-yellow-500'
                                            : 'text-gray-300'
                                    } hover:text-yellow-500`}
                                >
                                    <MdOutlineStar />
                                </button>
                            ))}
                        </div>
                        <p className="text-xs text-gray-500">
                            ({product?.rating?.count}{' '}
                            <FormattedMessage id="product_customer_review" />)
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
        </section>
    );
};

export default Product;
