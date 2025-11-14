import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import icon1 from "../../../assets/image/home/icon1.png";
import { tokenHot, tokenList } from "../../../API";
import { truncateMiddle } from "../../../utils/truncateMiddle";
import { formatAmount, isMobile } from "../../../utils/tool";
import { useTranslation } from "react-i18next";
import Lists from "./list";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/autoplay";
import SwiperCore from "swiper";
import { wsBus } from "../../../utils/wsBus";
import { useViewport } from "../../../components/viewportContext";
import { useAppKitNetwork } from "@reown/appkit/react";
import store from "../../../store";

const App: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(1);
  const [list, setList] = useState<any>([]);
  const handleGetHot = () => {
    try {
      // tokenList({
      //   order: "desc",
      //   offset: 1,
      //   limit: 21,
      // })
      tokenHot()
        .then((res: any) => {
          setList([...res.data]);
          // setList(res.data?.data);
        })
        .catch(() => {});
    } catch (error) {}
  };
  const { switchNetwork, chainId } = useAppKitNetwork(); 
  let state: any = store.getState();
  let _chainId = state.chainId 
  useEffect(() => {
    handleGetHot();
  }, [chainId]);
  let { t, i18n } = useTranslation();

  useEffect(() => {
    wsBus.on("upProductList", () => {
      handleGetHot();
    });
    return () => wsBus.off("upProductList");
  }, []);

  const [swiperIndex, setSwiperIndex] = useState(0);
  const [swiperRef, setSwiperRef]: any = useState(null);

  const h5Banner = () => { 
    const groupedList = [];
    for (let i = 0; i < list.length; i += 3) {
      groupedList.push(list.slice(i, i + 3));
    }
    return groupedList.map((group, groupIndex) => (
      <SwiperSlide key={groupIndex}>
        <div>
          {group.map((item: any, itemIndex: number) => (
            <Lists
              isHost={true}
              key={item.id || itemIndex}  
              item={item}
              index={itemIndex}
            />
          ))}
        </div>
      </SwiperSlide>
    ));
  };
  const { width } = useViewport();

  return (
    <div className={`${list && list.length > 0 ? "block" : "hidden"}`}>
      <div
        className="flex items-center text-[#fff] text-[24px] font-[600] mb-20 mt-[80px] 
        font-[Kavoon]
        h5:mt-[18px] h5:mb-[8px] h5:px-[16px] h5:text-[20px]"
      >
        {t("20")} 
        <div
          className="flex-1 flex items-center justify-end"
          style={{
            display: list.length > 3 ? "flex" : "none",
          }}
        >
          {swiperIndex === 0 ? (
            <svg
              className={
                isMobile() ? "w-[34px] h-[34px]" : " w-[40px] h-[40px]"
            } xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
              <rect x="0.5" y="0.5" width="33" height="33" rx="16.5" stroke="#FFFFE7" />
              <path d="M19.1095 11.2672C19.2473 11.132 19.4328 11.0542 19.6273 11.0502C19.8218 11.0462 20.0104 11.1162 20.1538 11.2457C20.2972 11.3752 20.3844 11.5541 20.3971 11.7452C20.4098 11.9364 20.3471 12.125 20.2221 12.2717L20.1779 12.319L15.4239 16.9997L20.1783 21.6804C20.312 21.8121 20.3907 21.9882 20.3989 22.1742C20.4071 22.3602 20.3441 22.5424 20.2225 22.6849L20.1783 22.7322C20.0446 22.8638 19.8656 22.9413 19.6767 22.9494C19.4878 22.9574 19.3026 22.8954 19.1579 22.7757L19.1099 22.7322L13.8209 17.5256C13.6872 17.394 13.6085 17.2178 13.6003 17.0318C13.5921 16.8458 13.6551 16.6636 13.7767 16.5211L13.8209 16.4738L19.1099 11.2672H19.1095Z" fill="#FFFFE7" />
            </svg> 
          ) : (
            <svg
                onClick={() => {
                  // setTabIndex(
                  //   tabIndex <= 3 && tabIndex < list.length ? 1 : tabIndex - 3
                  // );
                  swiperRef.slideTo(swiperIndex === 0 ? 0 : swiperIndex - 1);
                }}
                className={`${isMobile() ? "w-[34px] h-[34px]" : " w-[40px] h-[40px]"
                  } cursor-pointer`}
                xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="20" transform="matrix(-1 0 0 1 40 0)" fill="#FFFFE7" />
                <path d="M22.4823 13.2555C22.6443 13.0964 22.8625 13.0049 23.0914 13.0002C23.3202 12.9955 23.5421 13.0778 23.7108 13.2302C23.8796 13.3825 23.9821 13.593 23.997 13.8179C24.012 14.0427 23.9382 14.2646 23.7912 14.4373L23.7392 14.4929L18.1462 19.9996L23.7396 25.5063C23.8969 25.6612 23.9895 25.8685 23.9992 26.0873C24.0088 26.3061 23.9347 26.5204 23.7916 26.6881L23.7396 26.7437C23.5823 26.8985 23.3718 26.9897 23.1495 26.9992C22.9272 27.0087 22.7095 26.9358 22.5391 26.7949L22.4827 26.7437L16.2604 20.6183C16.1031 20.4634 16.0105 20.2561 16.0008 20.0373C15.9912 19.8185 16.0653 19.6042 16.2084 19.4365L16.2604 19.3809L22.4827 13.2555H22.4823Z" fill="#0E0E0E" />
              </svg> 
          )}
          <div className="w-[14px]"></div>
          {swiperIndex + 3 === list.length ||
          (isMobile() && (swiperIndex + 1) * 3 === list.length) ||
          (isMobile() && (swiperIndex + 1) * 3 >= 9) ? (
              <svg
                className={`${isMobile() ? "w-[34px] h-[34px]" : " w-[40px] h-[40px]"
                  } `}
                xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect x="-0.5" y="0.5" width="39" height="39" rx="19.5" transform="matrix(-1 0 0 1 39 0)" stroke="#FFFFE7" />
                <path d="M17.5177 13.2555C17.3557 13.0964 17.1375 13.0049 16.9086 13.0002C16.6798 12.9955 16.4579 13.0778 16.2892 13.2302C16.1204 13.3825 16.0179 13.593 16.003 13.8179C15.988 14.0427 16.0618 14.2646 16.2088 14.4373L16.2608 14.4929L21.8538 19.9996L16.2604 25.5063C16.1031 25.6612 16.0105 25.8685 16.0008 26.0873C15.9912 26.3061 16.0653 26.5204 16.2084 26.6881L16.2604 26.7437C16.4177 26.8985 16.6282 26.9897 16.8505 26.9992C17.0728 27.0087 17.2905 26.9358 17.4609 26.7949L17.5173 26.7437L23.7396 20.6183C23.8969 20.4634 23.9895 20.2561 23.9992 20.0373C24.0088 19.8185 23.9347 19.6042 23.7916 19.4365L23.7396 19.3809L17.5173 13.2555H17.5177Z" fill="#FFFFE7" />
              </svg> 
          ) : (
            <svg
                onClick={() => {
                  // setTabIndex(
                  //   tabIndex >= 7 && tabIndex < list.length ? 7 : tabIndex + 3
                  // );
                  swiperRef.slideTo(swiperIndex + 1);
                }}
                className={`${isMobile() ? "w-[34px] h-[34px]" : " w-[40px] h-[40px]"
                  } cursor-pointer`}
                xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                <rect width="34" height="34" rx="17" fill="#FFFFE7" />
                <path d="M14.8905 11.2672C14.7527 11.132 14.5672 11.0542 14.3727 11.0502C14.1782 11.0462 13.9896 11.1162 13.8462 11.2457C13.7028 11.3752 13.6156 11.5541 13.6029 11.7452C13.5902 11.9364 13.6529 12.125 13.7779 12.2717L13.8221 12.319L18.5761 16.9997L13.8217 21.6804C13.688 21.8121 13.6093 21.9882 13.6011 22.1742C13.5929 22.3602 13.6559 22.5424 13.7775 22.6849L13.8217 22.7322C13.9554 22.8638 14.1344 22.9413 14.3233 22.9494C14.5122 22.9574 14.6974 22.8954 14.8421 22.7757L14.8901 22.7322L20.1791 17.5256C20.3128 17.394 20.3915 17.2178 20.3997 17.0318C20.4079 16.8458 20.3449 16.6636 20.2233 16.5211L20.1791 16.4738L14.8901 11.2672H14.8905Z" fill="#1E1E1E" />
              </svg> 
          )}
        </div>
      </div>
      {list.length > 0 ? (
        <div className={`${width < 1000 ? "mx-[10px]" : "mx-[-10px]"}`}>
          <Swiper
            spaceBetween={10}
            // dir="rtl"
            ref={swiperRef}
            onSwiper={setSwiperRef}
            onSlideChange={(swiper: any) => {
              setSwiperIndex(swiper.activeIndex);
            }}
            slidesPerView={width < 1000 ? 1 : 3}
            slidesPerGroup={1}
            centeredSlides={false}
            // loop={true} 
            autoplay={{
              delay: 4600,
              // reverseDirection: true,  
              disableOnInteraction: false, 
            }}
            speed={600}
            className=""
          >
            {width < 1000
              ? h5Banner()
              : list &&
                list.map((item: any, index: number) => (
                  <SwiperSlide key={index}>
                    <Lists
                      isHost={true}
                      key={index}
                      item={item}
                      index={index}
                    />
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      ) : null}
    </div>
  );
};

export default App;
