import Category from './Category';
import Price from './Price';

const ShopSideNav = () => {
    return (
        <div className="w-full flex flex-col gap-6">
            <Category />
            <Price />
        </div>
    );
};

export default ShopSideNav;
