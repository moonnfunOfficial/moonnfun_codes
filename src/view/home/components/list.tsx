import { notification, Progress } from "antd";
import React from "react";
import benner1 from "../../../assets/image/home/benner1.png";
import { useNavigate } from "react-router-dom";
import NoData from "../../../components/NoData";
import { truncateMiddle } from "../../../utils/truncateMiddle";
import {
  detectLanguage,
  formatAmount,
  getBit,
  parseScientificNumber,
  sciToNum,
  showLoding,
} from "../../../utils/tool";
import { isMain } from "../../../config";
import { useTranslation } from "react-i18next";
import { wsBus } from "../../../utils/wsBus";
import { userFollow } from "../../../API";
import { useAppKit, useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import useNetworkSwitch from "./hooks/useNetworkSwitch";

interface MyComponentProps {
  item: any;
  index: number;
  isHost?: boolean;
}
const App: React.FC<MyComponentProps> = ({ item, index, isHost }) => {
  const { address: web3ModalAccount } = useAppKitAccount();
  let { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { checkNetworkAndNotify } = useNetworkSwitch();
  const handleFollow = async (item: any) => {
    if (!web3ModalAccount) {
      notification.open({
        message: t("Please link wallet"), 
      });
      return;
    }

    showLoding(true);
    userFollow({
      tokenID: item?.tokenID,
      follow: item?.follow,
    })
      .then((res: any) => {
        wsBus.emit("upProductList", 0);
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        showLoding(false);
      });
  };
  const { switchNetwork, chainId } = useAppKitNetwork();


  return (
    <>
      <div
        className={`
         ${isHost ? "w-full" : "w-1/3"} px-[10px] mb-20
          h5:w-full h5:mb-[12px] h5:px-[0px]  
        `}
        key={index}
        onClick={(e: any) => {
          e.preventDefault();
          e.stopPropagation();
          if (!chainId) {
            notification.open({
              message: `${t('Please link wallet')}}`,
            })
            return
          }
          const isNetworkValid = checkNetworkAndNotify(item)
          if (!isNetworkValid) {
            return; 
          }
          navigate("/detail?address=" + item?.address);
        }}
      >
        <div
          className="bg-[#1E1E1E] rounded-[20px] px-14 py-10 flex items-center cursor-pointer home_item
          z-10
            h5:px-[14px] h5:py-[10px] hover-effect h5:items-start
            "
        >
          <div
            className=" w-[132px] h-[132px] rounded-[12px] mr-10 relative
              h5:w-[80px] h5:h-[80px]"
            style={{
              backgroundImage: `url(${item?.imageUrl})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <img src={item?.chain === "sei" ?
              require("../../../assets/image/seiIcon.png") :
              item?.chain === "bsc" ?
                require("../../../assets/image/bnbIcon.png") :
                item?.chain === "okx" ?
                  require("../../../assets/image/okIcon.png")
                  :
                  item?.chain === "base" ?
                    require("../../../assets/image/BaseIcon.png") :
                    ''
            }
              className="absolute right-1 bottom-1 w-[20px] h-[20px]
              h5:w-[16px] h5:h-[16px]"
              alt="" />
            {item?.follow ? (
              <svg
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault(); 

                  const isNetworkValid = checkNetworkAndNotify(item)
                  if (!isNetworkValid) {
                    return; 
                  }
                  handleFollow({
                    tokenID: item?.id,
                    follow: false,
                    address: web3ModalAccount
                  });
                }}
                className="absolute left-1 top-1"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <rect
                  width="20"
                  height="20"
                  rx="10"
                  fill="black"
                  fillOpacity="0.4"
                />
                <path
                  d="M13.0441 15.173C12.8764 15.173 12.6855 15.1268 12.512 15.0342L10.0017 13.7791L7.47402 15.0342C7.31207 15.121 7.13276 15.1673 6.94188 15.1673C6.69895 15.1673 6.4618 15.0921 6.27092 14.9475C5.91809 14.6814 5.73878 14.2244 5.81976 13.8022L6.33455 11.1242L4.35059 9.27902C4.04404 8.96668 3.92835 8.5213 4.04404 8.09906L4.04982 8.08749C4.19442 7.65368 4.55304 7.35291 4.98685 7.29506L7.74009 6.79185L8.97211 4.28154C9.16877 3.88243 9.57366 3.62793 10.0017 3.62793C10.4471 3.62793 10.8635 3.894 11.037 4.28732L12.2691 6.79185L15.0223 7.27193C15.4561 7.33555 15.8205 7.6479 15.942 8.07592C16.0808 8.49238 15.9651 8.94932 15.6528 9.26167L15.647 9.26745L13.6746 11.1299L14.172 13.8138C14.253 14.2418 14.0795 14.6756 13.7267 14.9475C13.5242 15.0921 13.2871 15.173 13.0441 15.173Z"
                  fill="#F47126"
                />
              </svg>
            ) : (
              <svg
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault(); 

                    const isNetworkValid = checkNetworkAndNotify(item)
                    if (!isNetworkValid) {
                      return; 
                    }
                  handleFollow({
                    tokenID: item?.id,
                    follow: true,
                    address: web3ModalAccount
                  });
                }}
                className="absolute left-1 top-1"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <rect
                  width="20"
                  height="20"
                  rx="10"
                  fill="black"
                  fillOpacity="0.4"
                />
                <path
                  d="M13.0441 15.173C12.8764 15.173 12.6855 15.1268 12.512 15.0342L10.0017 13.7791L7.47402 15.0342C7.31207 15.121 7.13276 15.1673 6.94188 15.1673C6.69895 15.1673 6.4618 15.0921 6.27092 14.9475C5.91809 14.6814 5.73878 14.2244 5.81976 13.8022L6.33455 11.1242L4.35059 9.27902C4.04404 8.96668 3.92835 8.5213 4.04404 8.09906L4.04982 8.08749C4.19442 7.65368 4.55304 7.35291 4.98685 7.29506L7.74009 6.79185L8.97211 4.28154C9.16877 3.88243 9.57366 3.62793 10.0017 3.62793C10.4471 3.62793 10.8635 3.894 11.037 4.28732L12.2691 6.79185L15.0223 7.27193C15.4561 7.33555 15.8205 7.6479 15.942 8.07592C16.0808 8.49238 15.9651 8.94932 15.6528 9.26167L15.647 9.26745L13.6746 11.1299L14.172 13.8138C14.253 14.2418 14.0795 14.6756 13.7267 14.9475C13.5242 15.0921 13.2871 15.173 13.0441 15.173Z"
                  fill="white"
                  fillOpacity="0.5"
                />
              </svg>
            )}
          </div>
          <div className="flex-1 ">
            <div className="flex items-baseline text-[#fff] text-[16px] font-[600] whitespace-nowrap h5:text-[16px] h5:leading-[18px]">
              {item?.symbol
                ? detectLanguage(item?.symbol) === "Chinese"
                  ? item?.symbol.length >= 4
                    ? item?.symbol.slice(0, 3) + "..."
                    : item?.symbol
                  : item?.symbol.length >= 7
                  ? item?.symbol.slice(0, 7) + "..."
                  : item?.symbol
                : ""}
              <div className="text-[#fff] text-[14px] font-[600] ml-4 flex-1 h5:text-[12px] whitespace-nowrap">
                {item?.name
                  ? detectLanguage(item?.name) === "Chinese"
                    ? item?.name.length >= 5
                      ? item?.name.slice(0, 4) + "..."
                      : item?.name
                    : item?.name.length >= 7
                    ? item?.name.slice(0, 7) + "..."
                    : item?.name
                  : ""}
              </div>
              <div className="flex items-center justify-end text-[14px] h5:text-[12px]">
                {item?.percent < 0 ? (
                  <div
                    className="flex items-center px-8 py-2 rounded-full"
                    style={{
                      background: "rgba(214, 39, 39, 0.10)",
                    }}
                  >
                    <svg
                      className="mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                    >
                      <path
                        d="M9.8157 1.16284L5.53492 5.76623C5.24703 6.07792 4.74636 6.07792 4.47098 5.76623L0.190202 1.16284C-0.235373 0.719281 0.102584 0 0.715912 0H9.27748C9.90332 0 10.2288 0.719281 9.8157 1.16284Z"
                        fill="#D62727"
                      />
                    </svg>
                    <div className="text-[#D62727] text-[14px] h5:text-[12px] font-[600]">
                      {item?.percent ? getBit(Number(parseScientificNumber(item?.percent)), 3) : 0}%
                    </div>
                  </div>
                ) : 
                  <div
                    className="flex items-center px-8 py-2 rounded-full"
                    style={{
                      background: "rgba(70, 201, 27, 0.10)",
                    }}
                  >
                    <svg
                      className="mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                    >
                      <path
                        d="M9.8157 4.83716L5.53492 0.233766C5.24703 -0.0779221 4.74636 -0.0779221 4.47098 0.233766L0.190202 4.83716C-0.235373 5.28072 0.102584 6 0.715912 6H9.27748C9.90332 6 10.2288 5.28072 9.8157 4.83716Z"
                        fill="#46C91B"
                      />
                    </svg>
                    <div className="text-[#46C91B] text-[14px] h5:text-[12px] font-[600]">
                      +
                      {item?.percent ? getBit(Number(parseScientificNumber(item?.percent)), 3) : 0}%
                    </div>
                  </div>
                }
              </div>
            </div>
            <div className="flex items-center pb-[1px]">
              <div
                className="text-[#1E1E1E] text-[14px] font-[500] mr-4 bg-[#FFFEAB] rounded-full px-8
                  h5:text-[12px] 
                  "
              >
                {item?.tag}
              </div>
              {
                item?.insurance ?
                  <div
                    className="text-[#1E1E1E] text-[14px] font-[500] mr-4 bg-[#FFFEAB] rounded-full px-8
                    h5:text-[12px] 
                    "
                  >{t('215')}</div> : ''
              }
              {item?.twitter ? (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation(); 
                    window.open(`${item?.twitter}`, "_blank");
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="mr-4" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M20 10C20 4.47733 15.5227 0 10 0C4.47733 0 0 4.47733 0 10C0 15.5227 4.47733 20 10 20C15.5227 20 20 15.5227 20 10ZM12.684 5.33333H14.1153L10.9887 9.28667L14.6667 14.6667H11.7867L9.53067 11.404L6.95 14.6667H5.51733L8.862 10.438L5.33333 5.33333H8.28667L10.3253 8.316L12.684 5.33333ZM12.1813 13.7187H12.9747L7.85533 6.23133H7.00467L12.1813 13.7187Z" fill="#FFFEAB" />
                  </svg> 
                </a>
              ) : (
                ""
              )}
              {item?.telegram ? (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation(); 
                    window.open(`${item?.telegram}`, "_blank");
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="mr-4" xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                    <path d="M13.27 15.0868L14.9091 7.35273C15.0541 6.67091 14.6636 6.40409 14.2168 6.57136L4.57591 10.2877C3.91728 10.5441 3.92864 10.9127 4.46455 11.08L6.93091 11.85L12.6582 8.245C12.9259 8.06636 13.1718 8.16727 12.9709 8.34591L8.33773 12.5305L8.15909 15.0759C8.25572 15.0763 8.35112 15.0543 8.43786 15.0118C8.52459 14.9692 8.60031 14.9071 8.65909 14.8305L9.86409 13.67L12.3641 15.5114C12.8218 15.7677 13.1455 15.6341 13.2682 15.0873L13.27 15.0868ZM20 10.5C20 12.4778 19.4135 14.4112 18.3147 16.0557C17.2159 17.7002 15.6541 18.9819 13.8268 19.7388C11.9996 20.4957 9.98891 20.6937 8.0491 20.3078C6.10929 19.922 4.32746 18.9696 2.92894 17.5711C1.53041 16.1725 0.578004 14.3907 0.192152 12.4509C-0.1937 10.5111 0.00433281 8.50043 0.761209 6.67316C1.51809 4.8459 2.79981 3.28412 4.4443 2.1853C6.08879 1.08649 8.02219 0.5 10 0.5C12.6522 0.5 15.1957 1.55357 17.0711 3.42893C18.9464 5.3043 20 7.84783 20 10.5Z" fill="#FFFEAB" />
                  </svg> 
                </a>
              ) : (
                ""
              )}
              {item?.website ? (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation(); 
                    window.open(`${item?.website}`, "_blank");
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="mr-4" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <g clipPath="url(#clip0_1_285)">
                      <path d="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM10 4C6.68632 4 4 6.68632 4 10C4 13.3137 6.68632 16 10 16C13.3137 16 16 13.3137 16 10C16 6.68632 13.3137 4 10 4ZM11.623 10.4736C11.6208 10.5364 11.6183 10.5994 11.6152 10.6621L11.6035 10.877L11.5879 11.0889L11.5791 11.1934L11.5596 11.4004C11.5522 11.4685 11.5443 11.5365 11.5361 11.6035L11.5107 11.8027C11.5063 11.8356 11.5011 11.8687 11.4961 11.9014L11.4668 12.0938C11.4513 12.1893 11.4346 12.2839 11.417 12.376L11.3809 12.5576C11.3685 12.6176 11.3559 12.6772 11.3428 12.7354L11.3018 12.9072L11.2812 12.9912L11.2373 13.1562L11.1914 13.3145L11.1436 13.4678C11.1357 13.4929 11.1275 13.5176 11.1191 13.542L11.0693 13.6865C11.0522 13.7336 11.0352 13.7802 11.0176 13.8252L10.9639 13.957C10.9368 14.0217 10.9097 14.0832 10.8818 14.1426L10.8252 14.2578C10.5689 14.7612 10.2795 15.0527 10 15.0527C9.72053 15.0527 9.43112 14.7612 9.1748 14.2578L9.11816 14.1426C9.09032 14.0832 9.06293 14.0214 9.03613 13.957L8.98242 13.8252C8.96485 13.7803 8.94772 13.7342 8.93066 13.6875L8.88086 13.542C8.87248 13.5176 8.86457 13.4929 8.85645 13.4678L8.80859 13.3145L8.7627 13.1562L8.71875 12.9912L8.69824 12.9072L8.65723 12.7354C8.64407 12.6772 8.63151 12.6176 8.61914 12.5576L8.58301 12.376C8.57118 12.3145 8.55987 12.2523 8.54883 12.1895L8.51758 11.998C8.50759 11.9336 8.4982 11.8685 8.48926 11.8027L8.46387 11.6035C8.45572 11.5365 8.44779 11.4688 8.44043 11.4004L8.4209 11.1934L8.41211 11.0889L8.39648 10.877L8.38477 10.6621C8.38161 10.5997 8.37906 10.5368 8.37695 10.4736H11.623ZM7.42871 10.4736L7.43066 10.5557L7.43555 10.665L7.44629 10.8828C7.4526 10.9909 7.46007 11.0981 7.46875 11.2041L7.4873 11.415L7.50879 11.624L7.51953 11.7266L7.5459 11.9307C7.555 11.9974 7.56501 12.0642 7.5752 12.1309L7.60645 12.3281L7.64062 12.5225L7.67773 12.7119L7.71777 12.8984C7.75773 13.078 7.8022 13.2567 7.85254 13.4336L7.90332 13.6035L7.95605 13.7686L8.01172 13.9297C8.11633 14.2276 8.24513 14.5164 8.39746 14.793C6.53625 14.1711 5.1569 12.4954 4.96875 10.4736H7.42871ZM15.0303 10.4736C14.8421 12.4952 13.4631 14.1711 11.6016 14.793C11.7541 14.5164 11.8837 14.2277 11.9883 13.9297L12.0439 13.7686L12.0967 13.6035L12.1465 13.4336C12.1883 13.2867 12.2272 13.139 12.2617 12.9902L12.3027 12.8057L12.3223 12.7119L12.3594 12.5225L12.3936 12.3281L12.4248 12.1309C12.4351 12.0646 12.4452 11.998 12.4541 11.9307L12.4795 11.7266L12.4912 11.624L12.5127 11.415L12.5312 11.2041C12.5399 11.0981 12.5477 10.9907 12.5537 10.8828L12.5645 10.665L12.5713 10.4736H15.0303ZM8.39746 5.20703C8.24497 5.48349 8.1163 5.77241 8.01172 6.07031L7.95605 6.23145L7.90332 6.39648L7.85254 6.56641C7.81177 6.70977 7.77353 6.85772 7.73828 7.00977L7.69727 7.19434L7.67773 7.28809L7.64062 7.47754L7.60645 7.67188L7.5752 7.86914C7.56495 7.93538 7.55484 8.00205 7.5459 8.06934L7.51953 8.27344L7.50879 8.37598L7.4873 8.58496L7.46875 8.7959C7.46007 8.90192 7.45234 9.00932 7.44629 9.11719L7.43555 9.33496L7.43066 9.44434L7.42871 9.52637H4.96875C5.15585 7.51463 6.52264 5.84458 8.37012 5.21582L8.39746 5.20703ZM10 4.94727C10.2795 4.94727 10.5689 5.23855 10.8252 5.74219L10.8818 5.85742C10.9097 5.9168 10.9371 5.97861 10.9639 6.04297L11.0176 6.1748C11.0354 6.22064 11.0526 6.26721 11.0693 6.31348L11.1191 6.45801C11.1275 6.48238 11.1354 6.50708 11.1436 6.53223L11.1914 6.68555L11.2373 6.84473L11.2812 7.00879L11.3018 7.09277L11.3428 7.26562C11.3561 7.32442 11.3686 7.38336 11.3809 7.44238L11.417 7.62402C11.4288 7.6856 11.4401 7.74863 11.4512 7.81152L11.4824 8.00195C11.4924 8.06694 11.5018 8.13212 11.5107 8.19727L11.5361 8.39648C11.5443 8.46355 11.5522 8.53123 11.5596 8.59961L11.5791 8.80664L11.5879 8.91113L11.6035 9.12305L11.6152 9.33789L11.623 9.52637H8.37695C8.37915 9.46362 8.3817 9.4006 8.38477 9.33789L8.39648 9.12305L8.41211 8.91113L8.4209 8.80664L8.44043 8.59961C8.44779 8.53149 8.45571 8.46355 8.46387 8.39648L8.48926 8.19727C8.49371 8.1645 8.49893 8.13211 8.50391 8.09961L8.5332 7.90625C8.54873 7.81072 8.56538 7.71613 8.58301 7.62402L8.61914 7.44238C8.63146 7.38261 8.64412 7.32357 8.65723 7.26562L8.69824 7.09277L8.71875 7.00879L8.7627 6.84473L8.80859 6.68555L8.85645 6.53223C8.86432 6.50705 8.87247 6.4824 8.88086 6.45801L8.93066 6.31348C8.94738 6.26713 8.96458 6.22073 8.98242 6.1748L9.03613 6.04297C9.06319 5.97835 9.09032 5.9168 9.11816 5.85742L9.1748 5.74219C9.42925 5.24227 9.71654 4.95126 9.99414 4.94727H10ZM11.6025 5.20703C13.464 5.82915 14.8433 7.50491 15.0312 9.52637H12.5713L12.5693 9.44434L12.5645 9.33496L12.5537 9.11719C12.5474 9.00909 12.5399 8.90189 12.5312 8.7959L12.5127 8.58496L12.4912 8.37695L12.4805 8.27344L12.4541 8.06934C12.4449 8.00211 12.435 7.93506 12.4248 7.86914L12.3936 7.67188L12.3594 7.47852L12.3223 7.28809L12.2822 7.10156C12.2412 6.91712 12.1967 6.73848 12.1475 6.56641L12.0967 6.39648L12.0439 6.23145L11.9883 6.07031C11.8828 5.77605 11.7647 5.50671 11.6348 5.2666L11.6025 5.20703Z" fill="#FFFEAB" />
                    </g>
                    <defs>
                      <clipPath id="clip0_1_285">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg> 
                </a>
              ) : (
                ""
              )}
              {item?.deboxUrl ? (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation(); 
                    window.open(`${item?.deboxUrl}`, "_blank");
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="mr-4" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <g clipPath="url(#clip0_1_289)">
                      <path d="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM6.36621 5.72168C5.26172 5.72168 4.36634 6.61722 4.36621 7.72168V12.127C4.36621 13.1643 5.15597 14.0172 6.16699 14.1172V15.293L7.6543 14.127H13.6318C14.7364 14.127 15.6318 13.2315 15.6318 12.127V11.3018H14.3525C13.6115 11.3017 13.0108 10.7011 13.0107 9.95996C13.0107 9.21884 13.6114 8.61825 14.3525 8.61816H15.6318V7.72168C15.6317 6.61722 14.7363 5.72168 13.6318 5.72168H6.36621ZM14.668 9.28418C14.2728 9.28418 13.9521 9.60482 13.9521 10C13.9522 10.3952 14.2728 10.7158 14.668 10.7158C15.063 10.7157 15.3828 10.3951 15.3828 10C15.3828 9.60491 15.063 9.28433 14.668 9.28418Z" fill="#FFFEAB" />
                    </g>
                    <defs>
                      <clipPath id="clip0_1_289">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg> 
                </a>
              ) : (
                ""
              )}
            </div>
            <div
              className="line-clamp-2 text-[#B3B3B3] text-[12px] leading-[15px] h-[30px] mt-3
                h5:hidden"
              style={{
                wordBreak: "break-all",
              }}
            >
              {item?.description}
            </div>
            <div className="flex items-center text-[#fff] text-[12px]">
              <div className="flex-1 text-[#fff] text-[14px]">
                {t("31")} :{" "}
              </div>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation(); 
                  window.open(
                    `${item?.chain === "sei" ?
                      (isMain ? "https://seitrace.com" : "https://testnet.seitrace.com") :
                      item?.chain === "base" ?
                        (isMain ? "https://base.blockscout.com" : "https://sepolia-preconf.base.org") :
                      (isMain ? 'https://www.oklink.com/zh-hans/x-layer' :
                        'https://www.oklink.com/zh-hans/x-layer-testnet')}/address/${item?.creator}`,
                    "_blank"
                  );
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-[#fff] text-[14px] underline">
                  {truncateMiddle(item?.creator, 4, 4)}
                </span>
              </a>
            </div>
            <div className="flex items-center text-[#fff] text-[14px]">
              <div className="flex-1 text-[#fff] text-[14px]">
                {t("32")} :{" "}
              </div>
              ${formatAmount(Number(item?.marketCap))}
            </div>
            {item?.launch ? (
              <div className="flex items-center text-[#FFFD41] text-[14px] font-[500] leading-[17px]">
                <svg
                  className="mr-8" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                  <rect width="17" height="17" rx="8.5" fill="#FFFD41" />
                  <path d="M8.62307 5.77972C9.72707 4.67572 11.2652 4.27914 12.6318 4.61677C12.964 5.98337 12.5728 7.5161 11.4688 8.62545C11.4527 8.64153 11.4367 8.65761 11.4206 8.66832L10.815 9.27391L11.3187 10.1635C11.4688 10.4315 11.4581 10.7638 11.2812 11.021L9.95751 12.9182C9.70563 13.2826 9.20187 13.3737 8.83744 13.1218C8.82672 13.1111 8.81065 13.1004 8.79993 13.095L8.80529 13.0897C8.61236 12.9718 8.54269 12.7199 8.64987 12.5216C8.91247 12.0768 8.94463 11.4926 8.76777 10.8924C8.11931 11.0371 7.4119 10.8549 6.90813 10.3511C6.40437 9.84735 6.22215 9.13993 6.36685 8.49147C5.77198 8.31462 5.18783 8.34677 4.74302 8.60937C4.53937 8.71656 4.29284 8.64689 4.17494 8.45396L4.16958 8.45932C3.92306 8.14312 3.9445 7.68759 4.23925 7.3982C4.27141 7.36604 4.30892 7.33388 4.34644 7.30709L6.24895 5.98337C6.50083 5.80651 6.8331 5.79044 7.10106 5.94049L7.97461 6.42818L8.607 5.7958L8.62307 5.77972ZM5.88988 9.74552C6.07746 10.2279 6.28111 10.5762 6.50083 10.7959C6.7152 11.0103 7.04747 11.1979 7.49228 11.364C7.59411 11.4015 7.6477 11.5194 7.61019 11.6212C7.59947 11.6588 7.57267 11.6909 7.54052 11.7123L6.77951 12.2858C6.6884 12.3501 6.56514 12.334 6.50083 12.2429C6.46332 12.1947 6.4526 12.1357 6.46868 12.0768L6.50083 11.9374C6.52763 11.8303 6.45796 11.7231 6.35078 11.6963C6.30254 11.6856 6.24895 11.6909 6.20608 11.7177L5.53082 12.0875C5.43435 12.1411 5.31109 12.1036 5.2575 12.0071C5.22534 11.9482 5.22534 11.8731 5.2575 11.8142L5.64872 11.096C5.70231 10.9996 5.6648 10.8763 5.56833 10.8227C5.53082 10.8013 5.48794 10.7959 5.44507 10.8013L5.10744 10.8495C4.9949 10.8656 4.89307 10.7906 4.88236 10.678C4.877 10.6244 4.88771 10.5708 4.91987 10.528L5.54154 9.69729C5.60585 9.60618 5.73447 9.59011 5.82557 9.65978C5.85237 9.68121 5.87381 9.70801 5.88988 9.74552ZM9.59845 7.64472C9.91464 7.96091 10.4238 7.96091 10.7346 7.64472C11.0508 7.32853 11.0508 6.8194 10.7346 6.50857C10.4184 6.19238 9.90928 6.19238 9.59845 6.50857C9.28761 6.82476 9.28761 7.33389 9.59845 7.64472Z" fill="#1E1E1E" />
                </svg>
                {
                  item?.chain === "sei" ?
                    t("33")
                    :
                    item?.chain === "bsc" ?
                      t("33_2") :
                      item?.chain === "base" ?
                        t("33_3") :
                      (i18n.language === "zh" ? '已遷移' : 'Migrated')
                }
              </div>
            ) : (
              <div className="flex items-center ">
                <Progress
                  percent={
                    item?.prograss ? Number(getBit(item?.prograss, 3)) : 0
                  }
                  showInfo={false}
                  status="active"
                  size="small"
                  className="home-page"
                    strokeColor="#FFFD41"
                    trailColor="#3D3D3D"
                />
                  <div className="text-[#FFFD41] text-[12px] font-[600] ml-4 whitespace-nowrap">
                  {Number(getBit(item?.prograss, 3))}%
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App; 

