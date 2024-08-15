'use client'

import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

function Suggestion({className}:{className:string}) {
  return (
    <div className={`flex relative justify-center gap-2 items-center w-80 h-fit ${className}`}>
      <Swiper
        direction="horizontal"
        autoplay={{ delay: 2500 }}
        
        loop={true}
        slidesPerView={1}
        modules={[Autoplay]}
        aria-label="Suggestion Slider"
      >
        <SwiperSlide>
          <div className="w-64   bg-green-700 rounded-lg p-4">
            <p className="lg:text-xl max-sm:text-sm max-md:text-lg text-white  text-wrap">
             can add categories of your choice
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="w-64   bg-green-700 rounded-lg p-4">
            <p className="lg:text-xl max-sm:text-sm max-md:text-lg text-white  w-full text-wrap">
            Easily monitor your expenses
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="w-64   bg-green-700 rounded-lg p-4">
            <p className="lg:text-xl max-sm:text-sm max-md:text-lg text-white text-wrap">
            Manage your budget effectively
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Suggestion;
