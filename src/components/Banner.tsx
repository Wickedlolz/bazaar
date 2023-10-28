import Slider from 'react-slick';
import { PiCaretLeftLight, PiCaretRightLight } from 'react-icons/pi';
import { ArrowProps } from '../types';

import BannerImg1 from '../assets/img1.jpeg';
import BannerImg2 from '../assets/img2.jpg';
import BannerImg3 from '../assets/img3.jpg';
import BannerImg4 from '../assets/img4.jpg';

const Banner = () => {
    const PrevArrow = (props: ArrowProps) => {
        const { onClick } = props;

        return (
            <div
                onClick={onClick}
                className="p-3 bg-slate-100 hover:text-orange-600 hover:bg-white cursor-pointer duration-200 rounded-full text-2xl flex items-center justify-center z-20 absolute left-2 top-1/2"
            >
                <PiCaretLeftLight />
            </div>
        );
    };

    const NextArrow = (props: ArrowProps) => {
        const { onClick } = props;

        return (
            <div
                className="p-3 bg-slate-100 hover:text-orange-600 hover:bg-white cursor-pointer duration-200 rounded-full text-2xl flex items-center justify-center z-20 absolute right-2 top-1/2"
                onClick={onClick}
            >
                <PiCaretRightLight />
            </div>
        );
    };

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <div className="relative">
            <Slider {...settings}>
                <img
                    src={BannerImg1}
                    alt="Banner 1"
                    className="w-screen h-full object-cover"
                    width={1000}
                    height={500}
                />
                <img
                    src={BannerImg2}
                    alt="Banner 2"
                    className="w-screen h-full object-cover"
                    width={1000}
                    height={500}
                />
                <img
                    src={BannerImg3}
                    alt="Banner 3"
                    className="w-screen h-full object-cover"
                    width={1000}
                    height={500}
                />
                <img
                    src={BannerImg4}
                    alt="Banner 4"
                    className="w-screen h-full object-cover"
                    width={1000}
                    height={500}
                />
            </Slider>
        </div>
    );
};

export default Banner;
