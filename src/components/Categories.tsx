import CategoryItem from './CategoryItem';

import ShirtStyle from '../assets/shirt-style.jpeg';
import LoungewearLove from '../assets/loungewear-love.jpeg';
import LightJackets from '../assets/light-jackets.jpeg';

const categories = [
    {
        id: 1,
        img: ShirtStyle,
        title: 'SHIRT STYLE!',
    },
    {
        id: 2,
        img: LoungewearLove,
        title: 'LOUNGEWEAR LOVE',
    },
    {
        id: 3,
        img: LightJackets,
        title: 'LIGHT JACKETS',
    },
];

const Categories = () => {
    return (
        <section className="py-9 dark-theme flex flex-col lg:flex-row justify-between p-5">
            {categories.map((item) => (
                <CategoryItem key={item.id} item={item} />
            ))}
        </section>
    );
};

export default Categories;
