import { useAppSelector } from '../store';

import Banner from '../components/Banner';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const { products } = useAppSelector((state) => state.bazaar);

    return (
        <div>
            <Banner />
            <div className="py-10">
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-2xl bg-black text-white py-2 w-80 text-center">
                        Shopping everyday
                    </h1>
                    <span className="w-20 h-[3px] bg-black"></span>
                    <p className="max-w-[700px] text-gray-600 text-center">
                        Keep an eye out for our daily deals and exclusive offers
                        that make shopping even more exciting. Enjoy incredible
                        savings on products that matter to you, turning your
                        routine purchases into delightful experiences.
                    </p>
                </div>
                <div className="max-w-screen-xl mx-auto py-10 grid grid-cols-4 gap-10">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
