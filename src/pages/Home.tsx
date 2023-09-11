import { useAppSelector } from '../store';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage, useIntl } from 'react-intl';

import Banner from '../components/Banner';
import ProductCard from '../components/ProductCard';
import Categories from '../components/Categories';

const Home = () => {
    const intl = useIntl();
    const { products } = useAppSelector((state) => state.bazaar);

    return (
        <>
            <Helmet>
                <title>
                    Home {intl.formatMessage({ id: 'page_title' }) || ''}
                </title>
            </Helmet>
            <Banner />
            <Categories />
            <section className="py-10 dark-theme">
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-2xl bg-black text-white dark:bg-white dark:text-black py-2 w-80 text-center">
                        <FormattedMessage id="shop_everyday_title" />
                    </h1>
                    <span className="w-20 h-[3px] bg-black"></span>
                    <p className="max-w-[700px] text-gray-600 dark:text-white text-center">
                        <FormattedMessage id="shop_everyday_desc" />
                    </p>
                </div>
                <div className="max-w-screen-xl mx-auto py-10 grid grid-cols-2 gap-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products
                        .filter(
                            (x) =>
                                x.oldPrice &&
                                (x.category === 'women' || x.category === 'men')
                        )
                        .slice(0, 12)
                        .map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                </div>
            </section>
        </>
    );
};

export default Home;
