export interface IProduct {
    _id: number | string;
    title: string;
    isNew: boolean;
    oldPrice: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: IRating;
    quantity: number;
    brand?: string;
}

export interface IRating {
    rate: number;
    count: number;
}
