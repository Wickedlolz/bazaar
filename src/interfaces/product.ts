export interface IProduct {
    _id: number | string;
    title: string;
    isNew: boolean;
    oldPrice: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: number;
    quantity: number;
    brand?: string;
}
