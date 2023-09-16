import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';

import BannerImg1 from '../assets/img1.jpeg';
import BannerImg2 from '../assets/img2.jpg';
import BannerImg3 from '../assets/img3.jpg';
import BannerImg4 from '../assets/img4.jpg';
import BannerOne from '../assets/bannerone.jpeg';
import BannerText from './BannerText';

const Banner = () => {
    const intl = useIntl();
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentSlide((prev) => (prev === 4 ? 0 : prev + 1));
        }, 14000);

        return () => clearInterval(intervalId);
    }, []);

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? 4 : (prev) => prev - 1);
    };

    const nextSlide = () => {
        setCurrentSlide(currentSlide === 4 ? 0 : (prev) => prev + 1);
    };

    return (
        <div className="w-full h-auto overflow-x-hidden">
            <div className="w-full h-[650px] relative">
                <div
                    style={{
                        transform: `translateX(-${currentSlide * 100}vw)`,
                    }}
                    className="w-[400vw] h-full flex transition-transform duration-1000"
                >
                    <img
                        src={BannerOne}
                        alt="Banner One"
                        className="w-screen h-full object-cover"
                    />
                    <BannerText
                        title={intl.formatMessage({ id: 'outwear_picks' })}
                    />
                    <img
                        src={BannerImg1}
                        alt="Banner  1"
                        className="w-screen h-full object-cover"
                        width={1000}
                        height={500}
                    />
                    <img
                        src={BannerImg2}
                        alt="Banner  2"
                        className="w-screen h-full object-cover"
                        width={1000}
                        height={500}
                    />
                    <img
                        src={BannerImg3}
                        alt="Banner img 3"
                        className="w-screen h-full object-cover"
                        width={1000}
                        height={500}
                    />
                    <img
                        src={BannerImg4}
                        alt="Banner img 4"
                        className="w-screen h-full object-cover"
                        width={1000}
                        height={500}
                    />
                </div>
                <div className="absolute w-fit left-0 right-0 mx-auto flex gap-8 bottom-44">
                    <div
                        onClick={prevSlide}
                        className="w-14 h-12 border-[1px] border-gray-700 flex items-center justify-center hover:cursor-pointer hover:bg-gray-700 hover:text-white active:bg-gray-900 duration-300"
                    >
                        <HiArrowLeft />
                    </div>
                    <div
                        onClick={nextSlide}
                        className="w-14 h-12 border-[1px] border-gray-700 flex items-center justify-center hover:cursor-pointer hover:bg-gray-700 hover:text-white active:bg-gray-900 duration-300"
                    >
                        <HiArrowRight />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
