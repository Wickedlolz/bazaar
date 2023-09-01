import { priceList } from '../utils/priceData';

import NavTitle from './NavTitle';

const Price = () => {
    return (
        <div className="cursor-pointer">
            <NavTitle title="Shop by Price" icons={false} />
            <div className="font-titleFont">
                <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
                    {priceList.map((item) => (
                        <li
                            key={item._id}
                            className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
                        >
                            ${item.priceOne.toFixed(2)} - $
                            {item.priceTwo.toFixed(2)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Price;
