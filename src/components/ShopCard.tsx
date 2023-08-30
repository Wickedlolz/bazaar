import { Link } from 'react-router-dom';
import { IProduct } from '../interfaces/product';

interface IProps {
    product: IProduct;
}

const ShopCard = ({ product }: IProps) => {
    return (
        <div className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    loading="lazy"
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
        </div>
    );
};

export default ShopCard;
