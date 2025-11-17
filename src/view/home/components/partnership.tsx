import React, { useState } from 'react';
import icon1 from "../../../assets/image/home/icon1.png"
import icon2 from "../../../assets/image/home/icon2.png"
import icon3 from "../../../assets/image/home/icon3.png"
import icon4 from "../../../assets/image/home/icon4.png"
import icon5 from "../../../assets/image/home/icon5.png"
import icon6 from "../../../assets/image/home/icon6.png"
import icon7 from "../../../assets/image/home/icon7.png"
import icon8 from "../../../assets/image/home/icon8.png"
import icon9 from "../../../assets/image/home/icon9.png"
import icon10 from "../../../assets/image/home/icon10.png"
import icon11 from "../../../assets/image/home/icon11.png"
import icon12 from "../../../assets/image/home/icon12.png"
import icon13 from "../../../assets/image/home/icon13.png"
import icon14 from "../../../assets/image/home/icon14.png"
import icon15 from "../../../assets/image/home/icon15.png"
import icon16 from "../../../assets/image/home/icon16.png"
import icon17 from "../../../assets/image/home/icon17.png"
import icon19 from "../../../assets/image/home/icon19.png"
import icon20 from "../../../assets/image/home/icon20.png"
import icon21 from "../../../assets/image/home/icon21.png"
import icon22 from "../../../assets/image/home/icon22.png"
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css/autoplay';
import SwiperCore from 'swiper';
import { Autoplay } from 'swiper/modules';
import { isMobile } from '../../../utils/tool';
import { useTranslation } from 'react-i18next';
SwiperCore.use([Autoplay]);

const App: React.FC = () => {
  let { t, i18n } = useTranslation();

  return (
    <div className="">
      <div className="flex items-center text-[#fff] text-[24px] font-[600] mb-20 mt-[30px]
      h5:mx-[16px]  h5:text-[20px]
      font-[Kavoon]
      ">
        {t('34')}
      </div>
      <div className="relative
      h5:mx-[16px] " >
        <Swiper
          spaceBetween={isMobile() ? 10 : 24}
          slidesPerView={isMobile() ? 2.5 : 6.4}
          slidesPerGroup={1}
          centeredSlides={false}
          loop={true}  
          autoplay={{
            delay: 3000,
            reverseDirection: true,
            disableOnInteraction: false,  
          }}
          speed={800}
          className=""
        >
          {
            [2, 3, 4, 5, 6, 7, 8, 9, 10].map((item: any, index: number) => (
              <SwiperSlide key={index}>
                <div className="flex items-center justify-center bg-[#FBF8EF] px-10 py-22 rounded-[10px] h5:py-16">
                  <img src={index === 0 ? icon2 : index === 1 ?
                    icon3 : index === 2 ? icon4 : index === 3 ?
                      icon5 : index === 4 ? icon6 : index === 5 ?
                        icon7 : index === 6 ? icon8 : index === 7 ? icon22 : icon9} className="w-auto block h-[24px]" alt="" />
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
      <div className="relative mt-24
      h5:mx-[16px] h5:mt-10" dir="rtl">
        <Swiper
          spaceBetween={isMobile() ? 10 : 24}
          slidesPerView={isMobile() ? 2.5 : 6.4}
          slidesPerGroup={1}
          centeredSlides={false}
          loop={true} 
          autoplay={{
            delay: 3000,
            reverseDirection: true,
            disableOnInteraction: false,  
          }}
          speed={800}
          className=""
        >
          {
            [10, 11, 12, 13, 14, 15, 16, 17, 18].map((item: any, index: number) => (
              <SwiperSlide key={index}>
                <div className="flex items-center justify-center bg-[#FBF8EF] px-10 py-22 rounded-[10px] h5:py-16">
                  <img src={index === 0 ? icon12 : index === 1 ?
                    icon13 : index === 2 ? icon14 : index === 3 ?
                      icon15 : index === 4 ? icon16 : index === 5 ?
                        icon17 : index === 6 ? icon20 : index === 7 ? icon21 : icon19} className="w-auto block h-[24px]" alt="" />
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </div>
  );
}

export default App;