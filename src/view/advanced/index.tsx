import React, { useState } from "react";
import FooterBar from "../../components/footerBar";
import TopBar from "../../components/topBar";
import ranking1 from "../../assets/image/ranking1.png";
import ranking2 from "../../assets/image/ranking2.png";
import ranking3 from "../../assets/image/ranking3.png";
import bnbIcon from "../../assets/image/home/bnb.png";
import icon1 from "../../assets/image/icon1.png";
import { useNavigate } from "react-router-dom";
import { Dropdown, Modal, Popover, Progress } from "antd";
import Newly from "./components/newly";
import HoursVolume from "./components/hoursVolume";
import Graduated from "./components/graduated";
import Launch from "./components/launch";
import SwapConfigModal from "../../components/swapConfigModal";
import { isMobile } from "../../utils/tool";
import { useTranslation } from "react-i18next";
import { useViewport } from "../../components/viewportContext.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { chainCoinName } from "../coinName";
import { useAppKitNetwork } from "@reown/appkit/react";

const App: React.FC = () => {
  const { switchNetwork, chainId } = useAppKitNetwork(); 
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
          className="flex justify-end items-center text-[#fff] text-[14px] font-[600] z-10 relative
        h5:text-[#000]
        "
        >
          <div className="flex items-center flex-1 h5:hidden">
            {swiperIndex === 0 ? (
              <svg
                className={
                  isMobile() ? "w-[34px] h-[34px]" : " w-[40px] h-[40px]"
                }
                xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect x="0.5" y="-0.5" width="39" height="39" rx="19.5" transform="matrix(1 8.74228e-08 8.74228e-08 -1 4.37114e-08 39)" stroke="#FFFFE7" />
                <path d="M22.4823 26.7445C22.6443 26.9036 22.8625 26.9951 23.0914 26.9998C23.3202 27.0045 23.5421 26.9222 23.7108 26.7698C23.8796 26.6175 23.9821 26.407 23.997 26.1821C24.012 25.9573 23.9382 25.7354 23.7912 25.5627L23.7392 25.5071L18.1462 20.0004L23.7396 14.4937C23.8969 14.3388 23.9895 14.1315 23.9992 13.9127C24.0088 13.694 23.9347 13.4796 23.7916 13.3119L23.7396 13.2563C23.5823 13.1015 23.3718 13.0103 23.1495 13.0008C22.9272 12.9913 22.7095 13.0643 22.5392 13.2051L22.4827 13.2563L16.2604 19.3817C16.1031 19.5366 16.0105 19.7439 16.0008 19.9627C15.9912 20.1815 16.0653 20.3958 16.2084 20.5635L16.2604 20.6191L22.4827 26.7445L22.4823 26.7445Z" fill="#FFFFE7" />
              </svg>
            ) : ( 
              <svg
                  onClick={() => {
                    swiperRef.slideTo(swiperIndex === 0 ? 0 : swiperIndex - 1);
                  }} 
                  className={`${isMobile() ? "w-[34px] h-[34px]" : " w-[40px] h-[40px]"
                    }  cursor-pointer`}
                  xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <rect width="40" height="40" rx="20" transform="matrix(-1 0 0 1 40 0)" fill="#FFFFE7" />
                  <path d="M22.4823 13.2555C22.6443 13.0964 22.8625 13.0049 23.0914 13.0002C23.3202 12.9955 23.5421 13.0778 23.7108 13.2302C23.8796 13.3825 23.9821 13.593 23.997 13.8179C24.012 14.0427 23.9382 14.2646 23.7912 14.4373L23.7392 14.4929L18.1462 19.9996L23.7396 25.5063C23.8969 25.6612 23.9895 25.8685 23.9992 26.0873C24.0088 26.3061 23.9347 26.5204 23.7916 26.6881L23.7396 26.7437C23.5823 26.8985 23.3718 26.9897 23.1495 26.9992C22.9272 27.0087 22.7095 26.9358 22.5391 26.7949L22.4827 26.7437L16.2604 20.6183C16.1031 20.4634 16.0105 20.2561 16.0008 20.0373C15.9912 19.8185 16.0653 19.6042 16.2084 19.4365L16.2604 19.3809L22.4827 13.2555H22.4823Z" fill="#0E0E0E" />
              </svg>
            )}
            <div className="w-[10px]"></div>
            {swiperIndex === 1 ? ( 
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
                    swiperRef.slideTo(swiperIndex + 1);
                  }}
                  className={`${isMobile() ? "w-[34px] h-[34px]" : " w-[40px] h-[40px]"
                    } cursor-pointer`}
                  xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <rect width="40" height="40" rx="20" transform="matrix(1 8.74228e-08 8.74228e-08 -1 0 40)" fill="#FFFFE7" />
                  <path d="M17.5177 26.7445C17.3557 26.9036 17.1375 26.9951 16.9086 26.9998C16.6798 27.0045 16.4579 26.9222 16.2892 26.7698C16.1204 26.6175 16.0179 26.407 16.003 26.1821C15.988 25.9573 16.0618 25.7354 16.2088 25.5627L16.2608 25.5071L21.8538 20.0004L16.2604 14.4937C16.1031 14.3388 16.0105 14.1315 16.0008 13.9127C15.9912 13.6939 16.0653 13.4796 16.2084 13.3119L16.2604 13.2563C16.4177 13.1015 16.6283 13.0103 16.8505 13.0008C17.0728 12.9913 17.2905 13.0642 17.4609 13.2051L17.5173 13.2563L23.7396 19.3817C23.8969 19.5366 23.9895 19.7439 23.9992 19.9627C24.0088 20.1815 23.9347 20.3958 23.7916 20.5635L23.7396 20.6191L17.5173 26.7445L17.5177 26.7445Z" fill="#0E0E0E" />
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
            className="ml-6 mr-[24px] bg-[#2E2E2E] px-10 py-[6px] rounded-full
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
              className="bg-transparent w-[80px] text-[#fff] text-[14px] font-[600] "
              placeholder={`10 ${chainCoinName(chainId)}`}
            />
          </div>
          <svg 
            onClick={() => setOpen(true)}
            className="cursor-pointer
        h5:mr-[16px]
        "
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21.4207 10.1211C21.3064 9.51676 20.9357 9.12599 20.461 9.12599H20.3787C19.0959 9.12599 18.0525 8.08265 18.0525 6.79952C18.0525 6.39417 18.247 5.93198 18.2546 5.91361C18.4912 5.38105 18.3096 4.72843 17.8308 4.39347L15.4238 3.05324L15.3884 3.03592C14.9069 2.8271 14.2478 2.96076 13.8887 3.33483C13.6289 3.60283 12.7331 4.36697 12.0495 4.36697C11.3571 4.36697 10.4593 3.5875 10.1981 3.31442C9.83971 2.93761 9.18743 2.79616 8.70044 3.00462L6.20769 4.37038L6.17027 4.39419C5.69144 4.72781 5.50916 5.3804 5.74451 5.91092C5.75264 5.93033 5.94787 6.38875 5.94787 6.79955C5.94787 8.08268 4.90451 9.12602 3.62176 9.12602H3.52451C3.06471 9.12602 2.69402 9.51676 2.57976 10.1211C2.57125 10.1636 2.37842 11.1862 2.37842 12.0062C2.37842 12.825 2.57125 13.8473 2.57976 13.8895C2.69402 14.4942 3.06471 14.8853 3.53945 14.8853H3.62176C4.90451 14.8853 5.94787 15.9286 5.94787 17.2114C5.94787 17.6194 5.75267 18.0799 5.74518 18.0976C5.50918 18.6312 5.69012 19.2828 6.16756 19.616L8.52905 20.941L8.5651 20.9573C9.05345 21.1723 9.71387 21.0321 10.071 20.6418C10.4008 20.2853 11.2946 19.5453 11.9509 19.5453C12.6623 19.5453 13.5785 20.3737 13.8424 20.6648C14.0859 20.9315 14.46 21.092 14.8429 21.092C15.0218 21.092 15.1911 21.0566 15.3462 20.99L17.7948 19.6406L17.8308 19.6174C18.3096 19.2828 18.4919 18.6312 18.2559 18.1003C18.2478 18.0806 18.0526 17.6222 18.0526 17.2114C18.0526 15.9286 19.0959 14.8853 20.3787 14.8853H20.4746C20.935 14.8853 21.3064 14.4942 21.4207 13.8895C21.4288 13.8473 21.622 12.8251 21.622 12.0062C21.622 11.1862 21.4288 10.1636 21.4207 10.1211ZM20.2264 12.0061C20.2264 12.536 20.1209 13.2168 20.0726 13.5011C18.1484 13.6589 16.6569 15.2668 16.6569 17.2113C16.6569 17.7602 16.831 18.286 16.9235 18.5278L14.8348 19.6813C14.732 19.5739 14.4287 19.2678 14.0159 18.9603C13.2908 18.423 12.5957 18.1486 11.9509 18.1486C11.3115 18.1486 10.6219 18.4162 9.90022 18.9467C9.48941 19.246 9.19016 19.5439 9.0854 19.6541L7.07623 18.5292C7.17418 18.2751 7.34356 17.7561 7.34356 17.2113C7.34356 15.2668 5.85198 13.6589 3.92851 13.5011C3.87954 13.2168 3.7741 12.536 3.7741 12.0061C3.7741 11.4752 3.87954 10.7941 3.92851 10.5098C5.85198 10.3523 7.34356 8.7441 7.34356 6.79955C7.34356 6.25372 7.16943 5.72627 7.07693 5.48481L9.21738 4.30847C9.31056 4.40168 9.61594 4.70058 10.0335 4.99782C10.745 5.50555 11.4225 5.76266 12.0496 5.76266C12.6705 5.76266 13.3432 5.51032 14.0499 5.01245C14.4709 4.71658 14.7756 4.42175 14.864 4.33843L16.9242 5.48277C16.831 5.72287 16.6569 6.24862 16.6569 6.79955C16.6569 8.7441 18.1484 10.3523 20.0726 10.5098C20.1209 10.7947 20.2264 11.4787 20.2264 12.0061Z" fill="white" />
            <path d="M11.9584 8.57031C10.0709 8.57031 8.53516 10.1061 8.53516 11.9935C8.53516 13.8813 10.071 15.4164 11.9584 15.4164C13.8458 15.4164 15.3816 13.8813 15.3816 11.9935C15.3816 10.1061 13.8458 8.57031 11.9584 8.57031ZM13.9859 11.9935C13.9859 13.1113 13.0765 14.0207 11.9584 14.0207C10.8402 14.0207 9.93149 13.1113 9.93149 11.9935C9.93149 10.8764 10.8402 9.96667 11.9584 9.96667C13.0765 9.96669 13.9859 10.8764 13.9859 11.9935Z" fill="white" />
          </svg>
        </div>

        <div className="relative">
          <div className="w-full px-[16px] pt-[34px] absolute hidden h5:block">
            <div className="px-[16px] flex items-center overflow-x-scroll whitespace-nowrap scrollbar-hidden">
              <div
                className="inline-block pb-6 text-[14px] font-[600] pl-2 whitespace-nowrap"
                style={{
                  color: tabIndex === 0 ? "#FFFD41" : "#636443",
                  borderBottom:
                    tabIndex === 0
                      ? "1px solid #FFFD41"
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
                  color: tabIndex === 1 ? "#FFFD41" : "#636443",
                  borderBottom:
                    tabIndex === 1
                      ? "1px solid #FFFD41"
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
                  color: tabIndex === 2 ? "#FFFD41" : "#636443",
                  borderBottom:
                    tabIndex === 2
                      ? "1px solid #FFFD41"
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
                  color: tabIndex === 3 ? "#FFFD41" : "#636443",
                  borderBottom:
                    tabIndex === 3
                      ? "1px solid #FFFD41"
                      : "1px solid transparent",
                }}
                onClick={() => {
                  setTabIndex(3);
                }}
              >
                {t("75")}
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
            ) : (
              <HoursVolume tabIndex={tabIndex} buyNum={buyNum} />
            )}
          </div>
        ) : (
          <div className="w-[1300px] mx-auto my-[30px] h5:my-[20px] h5:w-full ">
            <Swiper
                spaceBetween={14}
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
                  <div className="h-[calc(100vh-44px)] overflow-y-scroll advanced_list"
                  >
                <Newly tabIndex={tabIndex} buyNum={buyNum} />
                  </div>
              </SwiperSlide>
              <SwiperSlide>
                  <div className="h-[calc(100vh-44px)] overflow-y-scroll overflow-x-hidden advanced_list">
                <Launch tabIndex={tabIndex} buyNum={buyNum} />
                  </div>
              </SwiperSlide>
              <SwiperSlide>
                  <div className="h-[calc(100vh-44px)] overflow-y-scroll advanced_list">
                <Graduated tabIndex={tabIndex} buyNum={buyNum} />
                  </div>
              </SwiperSlide>
              <SwiperSlide>
                  <div className="h-[calc(100vh-44px)] overflow-y-scroll advanced_list">
                <HoursVolume tabIndex={tabIndex} buyNum={buyNum} />
                  </div>
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
      <FooterBar index={1} />
      {/* 弹框 */}
      <SwapConfigModal open={open} refreshTrades={() => setOpen(!open)} />
    </div>
  );
};

export default App;
