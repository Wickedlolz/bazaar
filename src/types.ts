import { Dispatch, ReactNode, SetStateAction } from 'react';
import { IProduct } from './interfaces/product';

export type FirebaseProviderProps = {
    children: ReactNode;
};

export type PaginationProps = {
    itemsPerPage: number;
    products: IProduct[];
    girdViewActive: boolean;
};

export type ImageProps = {
    src: string;
    alt: string;
    classes?: string;
    width?: number;
    height?: number;
    lazy?: boolean;
};

export type BannerTextProps = {
    title: string;
};

export type CardItemProps = {
    item: IProduct;
};

export type CategoryItemProps = {
    item: {
        id: number;
        img: string;
        title: string;
    };
};

export type FormattedPriceProps = {
    amount: number;
    className?: string;
};

export type NavTitleProps = {
    title: string;
    icons: boolean;
};

export type ProductBannerProps = {
    itemsPerPageFromBanner: (page: number) => void;
    girdViewActive: boolean;
    listViewActive: boolean;
    setGridViewActive: Dispatch<SetStateAction<boolean>>;
    setListViewActive: Dispatch<SetStateAction<boolean>>;
};

export type ProductCardProps = {
    product: IProduct;
};

export type ShopCardProps = {
    product: IProduct;
};
