import React, { useState } from "react";
import FooterBar from "../../components/footerBar";
import TopBar from "../../components/topBar";
import { useNavigate } from "react-router-dom";
import Newly from "./components/newly";
import ToDown from "./components/toDown";
import HoursVolume from "./components/hoursVolume";
import Graduated from "./components/graduated";
import Launch from "./components/launch";
import SwapConfigModal from "../../components/swapConfigModal";
import { isMobile } from "../../utils/tool";
import { useTranslation } from "react-i18next";
import { useViewport } from "../../components/viewportContext.jsx";
import { Swiper, SwiperSlide } from "swiper/react";

const App: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [buyNum, setBuyNum]: any = useState("");
  let { t, i18n } = useTranslation();
  const [tabIndex, setTabIndex] = useState(0);
  const { width } = useViewport();

  const [swiperIndex, setSwiperIndex] = useState(0);
  const [swiperRef, setSwiperRef]: any = useState(null);

  // swiperRef.slideTo(swiperIndex === 0 ? 1 : swiperIndex - 1);
  return (
    <div className="w-full">
      <TopBar />
      <div className="pt-[104px] w-[1300px] mx-auto h5:w-full h5:pt-[60px]">
        <div
          className="flex justify-end items-center text-[#62573A] text-[14px] font-[600]
        h5:text-[#000]
        "
        >
          <div className="flex items-center flex-1 h5:hidden">
            {swiperIndex === 0 ? (
              <svg
                className={
                  isMobile() ? "w-[34px] h-[34px]" : " w-[40px] h-[40px]"
                }
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <rect width="40" height="40" rx="20" fill="#FCF9F2" />
                <path
                  d="M22.4823 13.2555C22.6443 13.0964 22.8625 13.0049 23.0914 13.0002C23.3202 12.9955 23.5421 13.0778 23.7108 13.2302C23.8796 13.3825 23.9821 13.593 23.997 13.8179C24.012 14.0427 23.9382 14.2646 23.7912 14.4373L23.7392 14.4929L18.1462 19.9996L23.7396 25.5063C23.8969 25.6612 23.9895 25.8685 23.9992 26.0873C24.0088 26.3061 23.9347 26.5204 23.7916 26.6881L23.7396 26.7437C23.5823 26.8985 23.3718 26.9897 23.1495 26.9992C22.9272 27.0087 22.7095 26.9358 22.5391 26.7949L22.4827 26.7437L16.2604 20.6183C16.1031 20.4634 16.0105 20.2561 16.0008 20.0373C15.9912 19.8185 16.0653 19.6042 16.2084 19.4365L16.2604 19.3809L22.4827 13.2555H22.4823Z"
                  fill="#DDD9CD"
                />
              </svg>
            ) : (
              <svg
                onClick={() => {
                  swiperRef.slideTo(swiperIndex === 0 ? 0 : swiperIndex - 1);
                }}
                className={`${
                  isMobile() ? "w-[34px] h-[34px]" : " w-[40px] h-[40px]"
                } cursor-pointer`}
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <rect
                  width="40"
                  height="40"
                  rx="20"
                  transform="matrix(-1 0 0 1 40 0)"
                  fill="#FCF9F2"
                />
                <path
                  d="M22.4823 13.2555C22.6443 13.0964 22.8625 13.0049 23.0914 13.0002C23.3202 12.9955 23.5421 13.0778 23.7108 13.2302C23.8796 13.3825 23.9821 13.593 23.997 13.8179C24.012 14.0427 23.9382 14.2646 23.7912 14.4373L23.7392 14.4929L18.1462 19.9996L23.7396 25.5063C23.8969 25.6612 23.9895 25.8685 23.9992 26.0873C24.0088 26.3061 23.9347 26.5204 23.7916 26.6881L23.7396 26.7437C23.5823 26.8985 23.3718 26.9897 23.1495 26.9992C22.9272 27.0087 22.7095 26.9358 22.5391 26.7949L22.4827 26.7437L16.2604 20.6183C16.1031 20.4634 16.0105 20.2561 16.0008 20.0373C15.9912 19.8185 16.0653 19.6042 16.2084 19.4365L16.2604 19.3809L22.4827 13.2555H22.4823Z"
                  fill="#F47126"
                />
              </svg>
            )}
            <div className="w-[10px]"></div>
            {swiperIndex === 2 ? (
              <svg
                className={`${
                  isMobile() ? "w-[34px] h-[34px]" : " w-[40px] h-[40px]"
                } `}
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <rect
                  width="40"
                  height="40"
                  rx="20"
                  transform="matrix(-1 0 0 1 40 0)"
                  fill="#FCF9F2"
                />
                <path
                  d="M17.5177 13.2555C17.3557 13.0964 17.1375 13.0049 16.9086 13.0002C16.6798 12.9955 16.4579 13.0778 16.2892 13.2302C16.1204 13.3825 16.0179 13.593 16.003 13.8179C15.988 14.0427 16.0618 14.2646 16.2088 14.4373L16.2608 14.4929L21.8538 19.9996L16.2604 25.5063C16.1031 25.6612 16.0105 25.8685 16.0008 26.0873C15.9912 26.3061 16.0653 26.5204 16.2084 26.6881L16.2604 26.7437C16.4177 26.8985 16.6282 26.9897 16.8505 26.9992C17.0728 27.0087 17.2905 26.9358 17.4609 26.7949L17.5173 26.7437L23.7396 20.6183C23.8969 20.4634 23.9895 20.2561 23.9992 20.0373C24.0088 19.8185 23.9347 19.6042 23.7916 19.4365L23.7396 19.3809L17.5173 13.2555H17.5177Z"
                  fill="#DDD9CD"
                />
              </svg>
            ) : (
              <svg
                onClick={() => {
                  swiperRef.slideTo(swiperIndex + 1);
                }}
                className={`${
                  isMobile() ? "w-[34px] h-[34px]" : " w-[40px] h-[40px]"
                } cursor-pointer`}
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <rect width="40" height="40" rx="20" fill="#FCF9F2" />
                <path
                  d="M17.5177 13.2555C17.3557 13.0964 17.1375 13.0049 16.9086 13.0002C16.6798 12.9955 16.4579 13.0778 16.2892 13.2302C16.1204 13.3825 16.0179 13.593 16.003 13.8179C15.988 14.0427 16.0618 14.2646 16.2088 14.4373L16.2608 14.4929L21.8538 19.9996L16.2604 25.5063C16.1031 25.6612 16.0105 25.8685 16.0008 26.0873C15.9912 26.3061 16.0653 26.5204 16.2084 26.6881L16.2604 26.7437C16.4177 26.8985 16.6282 26.9897 16.8505 26.9992C17.0728 27.0087 17.2905 26.9358 17.4609 26.7949L17.5173 26.7437L23.7396 20.6183C23.8969 20.4634 23.9895 20.2561 23.9992 20.0373C24.0088 19.8185 23.9347 19.6042 23.7916 19.4365L23.7396 19.3809L17.5173 13.2555H17.5177Z"
                  fill="#F47126"
                />
              </svg>
            )}
          </div>
          {/* <svg
            className='mr-6 cursor-pointer'
            xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <g clipPath="url(#clip0_245_1203)">
              <path d="M9 0C11.3869 0 13.6761 0.948212 15.364 2.63604C17.0518 4.32387 18 6.61305 18 9C18 11.3869 17.0518 13.6761 15.364 15.364C13.6761 17.0518 11.3869 18 9 18C6.61305 18 4.32387 17.0518 2.63604 15.364C0.948212 13.6761 0 11.3869 0 9C0 6.61305 0.948212 4.32387 2.63604 2.63604C4.32387 0.948212 6.61305 0 9 0ZM13.95 5.879C13.7625 5.69153 13.5082 5.58621 13.243 5.58621C12.9778 5.58621 12.7235 5.69153 12.536 5.879L7.586 10.829L5.464 8.707C5.37175 8.61149 5.26141 8.53531 5.1394 8.4829C5.0174 8.43049 4.88618 8.4029 4.7534 8.40175C4.62062 8.4006 4.48894 8.4259 4.36605 8.47618C4.24315 8.52646 4.1315 8.60071 4.0376 8.6946C3.94371 8.7885 3.86946 8.90015 3.81918 9.02305C3.7689 9.14594 3.7436 9.27762 3.74475 9.4104C3.7459 9.54318 3.77349 9.6744 3.8259 9.7964C3.87831 9.91841 3.95449 10.0288 4.05 10.121L6.88 12.95L6.967 13.027C7.15921 13.179 7.40053 13.2551 7.64514 13.2409C7.88976 13.2267 8.12066 13.1232 8.294 12.95L13.951 7.293C14.1385 7.10547 14.2438 6.85116 14.2438 6.586C14.2438 6.32084 14.1385 6.06653 13.951 5.879H13.95Z" fill="#F47126" />
            </g>
            <defs>
              <clipPath id="clip0_245_1203">
                <rect width="18" height="18" fill="white" />
              </clipPath>
            </defs>
          </svg>
          MEV protection */}
          <div className="w-[24px]"></div>
          {t("61")}
          <div
            className="ml-6 mr-[24px] bg-[#FBF8EF] px-10 py-[6px] rounded-full
        h5:mr-[10px]
        "
          >
            <input
              value={buyNum}
              onChange={(e) => {
                const val = e.target.value; 
                if (/^(\d+)?(\.\d{0,18})?$/.test(val)) {
                  setBuyNum(val);
                }
              }}
              type="number"
              className="bg-transparent w-[80px] text-[#62573A] text-[14px] font-[600] "
              placeholder="10JU"
            />
          </div>
          <svg
            onClick={() => setOpen(true)}
            className="cursor-pointer
        h5:mr-[16px]
        "
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21.4204 10.1211C21.3061 9.51676 20.9354 9.12599 20.4607 9.12599H20.3784C19.0957 9.12599 18.0523 8.08265 18.0523 6.79952C18.0523 6.39417 18.2468 5.93198 18.2543 5.91361C18.491 5.38105 18.3094 4.72843 17.8306 4.39347L15.4235 3.05324L15.3882 3.03592C14.9066 2.8271 14.2475 2.96076 13.8885 3.33483C13.6286 3.60283 12.7328 4.36697 12.0493 4.36697C11.3568 4.36697 10.4591 3.5875 10.1979 3.31442C9.83947 2.93761 9.18718 2.79616 8.70019 3.00462L6.20744 4.37038L6.17003 4.39419C5.69119 4.72781 5.50892 5.3804 5.74427 5.91092C5.7524 5.93033 5.94763 6.38875 5.94763 6.79955C5.94763 8.08268 4.90426 9.12602 3.62151 9.12602H3.52426C3.06447 9.12602 2.69378 9.51676 2.57952 10.1211C2.571 10.1636 2.37817 11.1862 2.37817 12.0062C2.37817 12.825 2.571 13.8473 2.57952 13.8895C2.69378 14.4942 3.06447 14.8853 3.5392 14.8853H3.62151C4.90426 14.8853 5.94763 15.9286 5.94763 17.2114C5.94763 17.6194 5.75242 18.0799 5.74494 18.0976C5.50894 18.6312 5.68987 19.2828 6.16732 19.616L8.5288 20.941L8.56485 20.9573C9.05321 21.1723 9.71363 21.0321 10.0707 20.6418C10.4006 20.2853 11.2943 19.5453 11.9506 19.5453C12.6621 19.5453 13.5783 20.3737 13.8422 20.6648C14.0856 20.9315 14.4597 21.092 14.8427 21.092C15.0215 21.092 15.1909 21.0566 15.346 20.99L17.7945 19.6406L17.8306 19.6174C18.3094 19.2828 18.4917 18.6312 18.2557 18.1003C18.2475 18.0806 18.0523 17.6222 18.0523 17.2114C18.0523 15.9286 19.0957 14.8853 20.3785 14.8853H20.4744C20.9348 14.8853 21.3061 14.4942 21.4204 13.8895C21.4286 13.8473 21.6217 12.8251 21.6217 12.0062C21.6217 11.1862 21.4286 10.1636 21.4204 10.1211ZM20.2261 12.0061C20.2261 12.536 20.1207 13.2168 20.0724 13.5011C18.1482 13.6589 16.6566 15.2668 16.6566 17.2113C16.6566 17.7602 16.8308 18.286 16.9233 18.5278L14.8345 19.6813C14.7318 19.5739 14.4284 19.2678 14.0156 18.9603C13.2906 18.423 12.5954 18.1486 11.9506 18.1486C11.3113 18.1486 10.6216 18.4162 9.89998 18.9467C9.48916 19.246 9.18992 19.5439 9.08516 19.6541L7.07599 18.5292C7.17394 18.2751 7.34331 17.7561 7.34331 17.2113C7.34331 15.2668 5.85174 13.6589 3.92827 13.5011C3.87929 13.2168 3.77386 12.536 3.77386 12.0061C3.77386 11.4752 3.87929 10.7941 3.92827 10.5098C5.85174 10.3523 7.34331 8.7441 7.34331 6.79955C7.34331 6.25372 7.16919 5.72627 7.07668 5.48481L9.21714 4.30847C9.31031 4.40168 9.6157 4.70058 10.0333 4.99782C10.7448 5.50555 11.4222 5.76266 12.0493 5.76266C12.6703 5.76266 13.3429 5.51032 14.0496 5.01245C14.4706 4.71658 14.7753 4.42175 14.8638 4.33843L16.9239 5.48277C16.8308 5.72287 16.6566 6.24862 16.6566 6.79955C16.6566 8.7441 18.1482 10.3523 20.0723 10.5098C20.1207 10.7947 20.2261 11.4787 20.2261 12.0061Z"
              fill="black"
            />
            <path
              d="M11.9582 8.56934C10.0708 8.56934 8.53503 10.1051 8.53503 11.9926C8.53503 13.8803 10.0708 15.4154 11.9582 15.4154C13.8457 15.4154 15.3815 13.8803 15.3815 11.9926C15.3815 10.1051 13.8457 8.56934 11.9582 8.56934ZM13.9858 11.9926C13.9858 13.1104 13.0764 14.0197 11.9582 14.0197C10.8401 14.0197 9.93137 13.1104 9.93137 11.9926C9.93137 10.8754 10.8401 9.96569 11.9582 9.96569C13.0764 9.96572 13.9858 10.8754 13.9858 11.9926Z"
              fill="black"
            />
          </svg>
        </div>

        <div className="relative">
          <div className="w-full px-[16px] pt-[34px] absolute hidden h5:block">
            <div className="px-[16px] flex items-center overflow-x-scroll whitespace-nowrap scrollbar-hidden">
              <div
                className="inline-block pb-6 text-[14px] font-[600] pl-2 whitespace-nowrap"
                style={{
                  color: tabIndex === 0 ? "#F47126" : "#62573A",
                  borderBottom:
                    tabIndex === 0
                      ? "1px solid #F47126"
                      : "1px solid transparent",
                }}
                onClick={() => {
                  setTabIndex(0);
                }}
              >
                {t("56")}
              </div>
              <div
                className="inline-block pb-6 text-[14px] font-[600] mx-[20px] whitespace-nowrap"
                style={{
                  color: tabIndex === 1 ? "#F47126" : "#62573A",
                  borderBottom:
                    tabIndex === 1
                      ? "1px solid #F47126"
                      : "1px solid transparent",
                }}
                onClick={() => {
                  setTabIndex(1);
                }}
              >
                {t("156")}
              </div>
              <div
                className="inline-block pb-6 text-[14px] font-[600] whitespace-nowrap"
                style={{
                  color: tabIndex === 2 ? "#F47126" : "#62573A",
                  borderBottom:
                    tabIndex === 2
                      ? "1px solid #F47126"
                      : "1px solid transparent",
                }}
                onClick={() => {
                  setTabIndex(2);
                }}
              >
                {t("146")}
              </div>
              <div
                className="inline-block pb-6 text-[14px] font-[600] ml-[20px] whitespace-nowrap"
                style={{
                  color: tabIndex === 3 ? "#F47126" : "#62573A",
                  borderBottom:
                    tabIndex === 3
                      ? "1px solid #F47126"
                      : "1px solid transparent",
                }}
                onClick={() => {
                  setTabIndex(3);
                }}
              >
                {t("75")}
              </div>
              <div
                className="inline-block pb-6 text-[14px] font-[600] ml-[20px] whitespace-nowrap"
                style={{
                  color: tabIndex === 4 ? "#F47126" : "#62573A",
                  borderBottom:
                    tabIndex === 4
                      ? "1px solid #F47126"
                      : "1px solid transparent",
                }}
                onClick={() => {
                  setTabIndex(4);
                }}
              >
                {t("170")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {
        width < 1000 ? (
          <div
            className="flex my-[30px]
              h5:my-[20px] h5:pr-[15px]
              "
          >
            {tabIndex === 0 ? (
              <Newly tabIndex={tabIndex} buyNum={buyNum} />
            ) : tabIndex === 1 ? (
              <Launch tabIndex={tabIndex} buyNum={buyNum} />
            ) : tabIndex === 2 ? (
              <Graduated tabIndex={tabIndex} buyNum={buyNum} />
            ) : tabIndex === 3 ? (
              <HoursVolume tabIndex={tabIndex} buyNum={buyNum} />
            ) : (
              <ToDown tabIndex={tabIndex} buyNum={buyNum} />
            )}
          </div>
        ) : (
          <div className="w-[1300px] mx-auto my-[30px] h5:my-[20px] h5:w-full ">
            <Swiper
              spaceBetween={16}
              ref={swiperRef}
              onSwiper={setSwiperRef}
              onSlideChange={(swiper: any) => {
                setSwiperIndex(swiper.activeIndex);
              }}
              slidesPerView={3.2}
              centeredSlides={false}
              speed={200}
              className=""
            >
              <SwiperSlide>
                <Newly tabIndex={tabIndex} buyNum={buyNum} />
              </SwiperSlide>
              <SwiperSlide>
                <Launch tabIndex={tabIndex} buyNum={buyNum} />
              </SwiperSlide>
              <SwiperSlide>
                <Graduated tabIndex={tabIndex} buyNum={buyNum} />
              </SwiperSlide>
              <SwiperSlide>
                <HoursVolume tabIndex={tabIndex} buyNum={buyNum} />
              </SwiperSlide>
              <SwiperSlide>
                <ToDown tabIndex={tabIndex} buyNum={buyNum} />
              </SwiperSlide>
            </Swiper>
          </div>
        )
        // <div className='relative w-[100vw]'>
        //   <div className={`flex flex-nowrap ${width > 1618 ? 'justify-center' : ''} my-[30px] px-16 box-border
        //         h5:my-[20px] h5:px-0
        //       `}>
        //     <div className="min-w-[2vw]"></div>
        //     <Newly tabIndex={tabIndex} buyNum={buyNum}   />
        //     <HoursVolume tabIndex={tabIndex} buyNum={buyNum} />
        //     <Graduated tabIndex={tabIndex} buyNum={buyNum} />
        //     <Launch tabIndex={tabIndex} buyNum={buyNum}   />
        //     <div className="min-w-[2vw] "></div>
        //   </div>
        // </div>
      }
      <div className="w-full h-[100px] h5:hidden"></div>
      <FooterBar index={1} />
      {/* 弹框 */}
      <SwapConfigModal open={open} refreshTrades={() => setOpen(!open)} />
    </div>
  );
};

export default App;
