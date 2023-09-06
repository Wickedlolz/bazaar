import { Link } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { addToCart } from '../store/reducers/cartSlice';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';

import { IProduct } from '../interfaces/product';

import { BsArrowRight } from 'react-icons/bs';

type ProductCardProps = {
    product: IProduct;
};

const ProductCard = ({ product }: ProductCardProps) => {
    const dispatch = useAppDispatch();

    /**
     * Adds the specified product to the cart.
     *
     * @returns {void}
     */
    const handleAddToCart = (): void => {
        dispatch(addToCart({ ...product, quantity: 1 }));
        toast.success(`${product?.title} is added to your cart.`);
    };

    return (
        <article className="group relative">
            <Link to={`/product/${product._id}`}>
                <div key={product._id} className="w-full h-96 overflow-hidden">
                    <img
                        className="w-full h-full object-cover group-hover:scale-110 duration-500"
                        src={product.image}
                        alt={product.title}
                        width={250}
                        height={250}
                        loading="lazy"
                    />
                </div>
            </Link>
            <div className="w-full border-[1px] px-2 py-4">
                <div className="flex justify-between gap-4 items-center">
                    <div>
                        <h2 className="font-base font-bold truncate">
                            {product.title.substring(0, 15)}
                        </h2>
                    </div>
                    <div className="flex justify-end gap-2 relative overflow-hidden w-28 text-sm">
                        <div className="flex gap-2 transform group-hover:translate-x-24 transition-transform duration-500">
                            {product.oldPrice && (
                                <p className="line-through text-gray-500">
                                    ${product.oldPrice}
                                </p>
                            )}
                            <p
                                className={`font-semibold ${
                                    product.oldPrice ? 'text-red-600' : ''
                                }`}
                            >
                                ${product.price}
                            </p>
                        </div>
                        <p
                            onClick={handleAddToCart}
                            className="absolute z-20 w-[100px] text-gray-500 hover:text-gray-900 dark:hover:text-white flex items-center gap-1 top-0 transform -translate-x-32 group-hover:translate-x-0 transition-transform cursor-pointer duration-500"
                        >
                            <FormattedMessage id="product_add_to_cart_hover_lbl" />{' '}
                            <span>
                                <BsArrowRight />
                            </span>
                        </p>
                    </div>
                </div>
                <div>
                    <p>{product.category}</p>
                </div>
                <div className="absolute top-4 right-0">
                    {product.isNew && (
                        <p className="bg-black text-white font-semibold px-6 py-1">
                            <FormattedMessage id="product_sale_lbl" />
                        </p>
                    )}
                </div>
            </div>
        </article>
    );
};

export default ProductCard;
