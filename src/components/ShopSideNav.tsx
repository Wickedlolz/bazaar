import AsideCategory from './AsideCategory';
import Price from './Price';

const ShopSideNav = () => {
    return (
        <div className="w-full flex flex-col gap-6">
            <AsideCategory />
            <Price />
        </div>
    );
};

export default ShopSideNav;
