import { useState, useEffect } from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

const Baner = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const data = [
    "https://amazonproone.vercel.app/static/media/img2.bc1bdb910ead16c65197.jpg",
    "https://amazonproone.vercel.app/static/media/img5.aa945e25375bfdee385f.jpg",
    "https://amazonproone.vercel.app/static/media/img3.c80809bb40bee5c34372.jpg",
    "https://amazonproone.vercel.app/static/media/img1.efb3d39101f7ef77d616.jpg",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev === 3 ? 0 : prev + 1));
    }, 15000);

    return () => clearInterval(intervalId);
  }, []);

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 3 : (prev) => prev - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === 3 ? 0 : (prev) => prev + 1);
  };

  return (
    <div className="w-full h-auto overflow-x-hidden">
      <div className="w-full h-[650px] relative">
        <div
          style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
          className="w-[400vw] h-full flex transition-transform duration-1000"
        >
          <img
            src={data[0]}
            alt="Banner  1"
            className="w-screen h-full object-cover"
            width={1000}
            height={500}
          />
          <img
            src={data[1]}
            alt="Banner  2"
            className="w-screen h-full object-cover"
            width={1000}
            height={500}
          />
          <img
            src={data[2]}
            alt="Banner img 3"
            className="w-screen h-full object-cover"
            width={1000}
            height={500}
          />
          <img
            src={data[3]}
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

export default Baner;
