import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { IProduct } from '../interfaces/product';

import Image from './common/Image';

type ShopCardProps = {
    product: IProduct;
};

const ShopCard = ({ product }: ShopCardProps) => {
    return (
        <article className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                <Image
                    classes="h-full w-full object-cover object-center group-hover:scale-110 duration-500 lg:h-full lg:w-full"
                    src={product.image}
                    alt={product.title}
                    lazy
                />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <Link to={'/product/' + product._id}>
                            <span
                                aria-hidden="true"
                                className="absolute inset-0"
                            ></span>
                            {product.title.substring(0, 15)}
                        </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {product.category}
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    {product.oldPrice && (
                        <p className="line-through text-gray-500 text-xs">
                            ${product.oldPrice}
                        </p>
                    )}
                    <p
                        className={`text-xs ${
                            product.oldPrice ? 'text-red-600' : ''
                        }`}
                    >
                        ${product.price}
                    </p>
                </div>
            </div>
            <div className="absolute top-4 right-0">
                {product.isNew && (
                    <p className="bg-black text-white font-semibold px-6 py-1">
                        <FormattedMessage id="product_sale_lbl" />
                    </p>
                )}
            </div>
        </article>
    );
};

export default ShopCard;
