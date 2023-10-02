import { IProduct } from '../interfaces/product';
import * as categoryData from './categoryData';
import * as constants from './constants';
import * as priceData from './priceData';

const calculateTotalAmount = (products: IProduct[]) => {
    return products.reduce((acc, value) => {
        return (acc += value.price * value.quantity);
    }, 0);
};

export { categoryData, constants, priceData, calculateTotalAmount };
