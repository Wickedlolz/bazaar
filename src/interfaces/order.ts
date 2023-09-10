import { IProduct } from './product';

export interface IOrder {
    user: {
        displayName: string;
        email: string;
    };
    products: IProduct[];
}
