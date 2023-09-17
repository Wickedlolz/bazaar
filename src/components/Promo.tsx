import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import HeroImage1 from '../assets/hero-image-tile-01.jpeg';
import HeroImage2 from '../assets/hero-image-tile-02.jpeg';
import HeroImage3 from '../assets/hero-image-tile-03.jpeg';
import HeroImage4 from '../assets/hero-image-tile-04.jpeg';
import HeroImage5 from '../assets/hero-image-tile-05.jpeg';
import HeroImage6 from '../assets/hero-image-tile-06.jpeg';
import HeroImage7 from '../assets/hero-image-tile-07.jpeg';

import Image from './common/Image';

const Promo = () => {
    return (
        <div className="relative overflow-hidden bg-white mt-10 dark-theme">
            <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
                <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                    <div className="sm:max-w-lg">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark-theme">
                            <FormattedMessage id="promo_title" />
                        </h1>
                        <p className="mt-4 text-xl text-gray-500 dark-theme">
                            <FormattedMessage id="promo_desc" />
                        </p>
                    </div>
                    <div>
                        <div className="mt-10">
                            {/* Decorative image grid */}
                            <div
                                aria-hidden="true"
                                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                            >
                                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                                    <div className="flex items-center space-x-6 lg:space-x-8">
                                        <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                            <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                                                <Image
                                                    src={HeroImage1}
                                                    alt=""
                                                    classes="h-full w-full object-cover object-center"
                                                    lazy
                                                />
                                            </div>
                                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                <Image
                                                    src={HeroImage2}
                                                    alt=""
                                                    classes="h-full w-full object-cover object-center"
                                                    lazy
                                                />
                                            </div>
                                        </div>
                                        <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                <Image
                                                    src={HeroImage3}
                                                    alt=""
                                                    classes="h-full w-full object-cover object-center"
                                                    lazy
                                                />
                                            </div>
                                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                <Image
                                                    src={HeroImage4}
                                                    alt=""
                                                    classes="h-full w-full object-cover object-center"
                                                    lazy
                                                />
                                            </div>
                                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                <Image
                                                    src={HeroImage5}
                                                    alt=""
                                                    classes="h-full w-full object-cover object-center"
                                                    lazy
                                                />
                                            </div>
                                        </div>
                                        <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                <Image
                                                    src={HeroImage6}
                                                    alt=""
                                                    classes="h-full w-full object-cover object-center"
                                                    lazy
                                                />
                                            </div>
                                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                <Image
                                                    src={HeroImage7}
                                                    alt=""
                                                    classes="h-full w-full object-cover object-center"
                                                    lazy
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Link
                                to="/shop"
                                className="inline-block border-[1px] border-black p-2 bg-white text-gray-600 font-bold"
                            >
                                <FormattedMessage id="shop_collection" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Promo;
