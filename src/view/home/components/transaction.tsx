import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/autoplay";
import SwiperCore from "swiper";
import { Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import icon1 from "../../../assets/image/home/icon1.png";
import { hotList, tokenList, tradeList } from "../../../API";
import { truncateMiddle } from "../../../utils/truncateMiddle";
import { formatAmount, isMobile } from "../../../utils/tool";
import { chainCoinName } from "../../coinName";
import { useAppKitNetwork } from "@reown/appkit/react";
SwiperCore.use([Autoplay]);

const App: React.FC = () => {
  const { switchNetwork, chainId } = useAppKitNetwork(); 
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [swiperRef, setSwiperRef]: any = useState(null);
  const [list, setList] = useState<any>([]);
  const handleGetHot = async () => {
    try {
      await tradeList({
        orderField: 1,
        limit: 10,
      })
        .then((res: any) => {
          setList(res.data?.data);
        })
        .catch(() => {});
    } catch (error) {}
  };
  useEffect(() => {
    handleGetHot();
  }, [chainId]);
  const navigate = useNavigate();

  return (
    <div>
      <div className="pb-[50px] h5:px-[16px] h5:pb-[22px] relative">
        {/* dir="rtl" */}
        <Swiper
          spaceBetween={isMobile() ? 12 : 24}
          ref={swiperRef}
          onSwiper={setSwiperRef}
          onSlideChange={(swiper: any) => {
            setSwiperIndex(swiper.activeIndex);
          }}
          slidesPerView={isMobile() ? 1.5 : 4.4}
          slidesPerGroup={1}
          centeredSlides={false}
          loop={true} 
          autoplay={{
            delay: 2600,
            reverseDirection: true,
            disableOnInteraction: false,  
          }}
          speed={600}
          className=""
        >
          {list &&
            list.map((item: any, index: number) => (
              <SwiperSlide key={index}>
                <div
                  className="flex items-end justify-center p-10 rounded-[10px] h5:text-[12px] h5:items-center whitespace-nowrap"
                  style={{
                    background: index % 2 !== 0 ? "#FFF" : "#FFFEAB",
                  }}
                  onClick={() => {
                    navigate(`/detail?address=${item?.tokenAddress}`);
                  }}
                >
                  {truncateMiddle(item?.wallet, 4, 2)}{" "}
                  {item?.buy ? " bought " : " sold "}
                  {formatAmount(Number(item?.quoteAmount))} {chainCoinName(chainId)} of{" "}
                  {item?.symbol.length >= 6
                    ? item?.symbol.slice(0, 6) + "..."
                    : item?.symbol}
                  <img
                    src={item?.imageUrl}
                    className="w-[20px] h-[20px] ml-4 rounded-[10px] 
                h5:w-[16px] h5:h-[16px]"
                    alt=""
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
        <div
          className="absolute top-0 right-0 w-[38px] h-[38px] z-10 h5:right-[14px]"
          style={{
            background:
              "linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, #FFFEAB 100%)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default App;
