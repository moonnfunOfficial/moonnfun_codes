import { notification, Progress, Statistic } from "antd";
import React, { useEffect, useState } from "react";
import iconUSDT from "../../../assets/image/home/USDT.png";
import { tokenHolders } from "../../../API";
import { getQueryParam } from "../../../utils/getUrlParamsLegacy";
import { truncateMiddle } from "../../../utils/truncateMiddle";
import { formatAmount, formatTimestamp, getBit, timestampToDateString } from "../../../utils/tool";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import copy from "copy-to-clipboard";
import { chainCoinName } from "../../coinName";
import { useAppKitNetwork } from "@reown/appkit/react";

interface MyComponentProps {
  info: any;
  refreshTrades: any;
  price: any;
}
const App: React.FC<MyComponentProps> = ({ info, refreshTrades, price }) => {
  const { switchNetwork, chainId } = useAppKitNetwork(); 
  let { t, i18n } = useTranslation();
  const [holders, setHolders]: any = useState([]);
  const handleGetHolders = () => {
    tokenHolders({
      address: getQueryParam("address"),
    })
      .then((res: any) => {
        setHolders(res.data);
      })
      .catch((err: any) => {});
  };
  useEffect(() => {
    handleGetHolders();
  }, [refreshTrades]);
  const navigate = useNavigate();

  return (
    <div className="h5:pb-[100px]">
      <div className="bg-[#1E1E1E] rounded-[20px] px-16 py-20 mt-8">
        <div className="flex items-center"> 
          <svg
            onClick={() => {
              navigate("/");
            }}
            className="hidden h5:block mr-10"
            xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M6.50256 4.10677V2.39566C6.347 1.68011 5.75589 2.11566 5.75589 2.11566L1.64923 5.63122C0.747003 6.25344 1.587 6.72011 1.587 6.72011L5.63145 10.2045C6.44034 10.7957 6.50256 9.89344 6.50256 9.89344V8.30677C10.6092 7.03122 12.2892 12.1334 12.2892 12.1334C12.4448 12.4134 12.5381 12.1334 12.5381 12.1334C14.1248 4.48011 6.50256 4.10677 6.50256 4.10677Z" fill="#FFFD41" />
          </svg>
          <div
            className="w-[50px] h-[50px] mr-10 rounded-[10px]"
            style={{
              backgroundImage: `url(${info?.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="flex-1">
            <div className="text-[#fff] text-[20px] font-[600] line-clamp-1">
              {info?.symbol && info?.symbol.length >= 16
                ? info?.symbol?.slice(0, 16) + "..."
                : info?.symbol}
            </div>
            <div className="flex items-center">
              <span
                className="hover-effect bg-[#FFFEAB] text-[#1E1E1E] text-[14px] font-[500] rounded-full px-10 pt-1 pb-1 mr-4
            h5:text-[12px] h5:py-2
            "
                style={{
                  display: info?.tag ? "inline-block" : "none",
                }}
              >
                {info?.tag}
              </span>
              {info?.twitter ? (
                <a
                  href={info?.twitter}
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
              {info?.telegram ? (
                <a
                  href={info?.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M13.27 14.5868L14.9091 6.85273C15.0541 6.17091 14.6636 5.90409 14.2168 6.07136L4.57591 9.78773C3.91728 10.0441 3.92864 10.4127 4.46455 10.58L6.93091 11.35L12.6582 7.745C12.9259 7.56636 13.1718 7.66727 12.9709 7.84591L8.33773 12.0305L8.15909 14.5759C8.25572 14.5763 8.35112 14.5543 8.43786 14.5118C8.52459 14.4692 8.60031 14.4071 8.65909 14.3305L9.86409 13.17L12.3641 15.0114C12.8218 15.2677 13.1455 15.1341 13.2682 14.5873L13.27 14.5868ZM20 10C20 11.9778 19.4135 13.9112 18.3147 15.5557C17.2159 17.2002 15.6541 18.4819 13.8268 19.2388C11.9996 19.9957 9.98891 20.1937 8.0491 19.8078C6.10929 19.422 4.32746 18.4696 2.92894 17.0711C1.53041 15.6725 0.578004 13.8907 0.192152 11.9509C-0.1937 10.0111 0.00433281 8.00043 0.761209 6.17316C1.51809 4.3459 2.79981 2.78412 4.4443 1.6853C6.08879 0.58649 8.02219 0 10 0C12.6522 0 15.1957 1.05357 17.0711 2.92893C18.9464 4.8043 20 7.34783 20 10Z"
                      fill="#FFC19E"
                    />
                  </svg>
                </a>
              ) : (
                ""
              )}
              {info?.website ? (
                <a
                  href={info?.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <g clipPath="url(#clip0_1_516)">
                      <path d="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM10 4C6.68632 4 4 6.68632 4 10C4 13.3137 6.68632 16 10 16C13.3137 16 16 13.3137 16 10C16 6.68632 13.3137 4 10 4ZM11.623 10.4736C11.6208 10.5364 11.6183 10.5994 11.6152 10.6621L11.6035 10.877L11.5879 11.0889L11.5791 11.1934L11.5596 11.4004C11.5522 11.4685 11.5443 11.5365 11.5361 11.6035L11.5107 11.8027C11.5063 11.8356 11.5011 11.8687 11.4961 11.9014L11.4668 12.0938C11.4513 12.1893 11.4346 12.2839 11.417 12.376L11.3809 12.5576C11.3685 12.6176 11.3559 12.6772 11.3428 12.7354L11.3018 12.9072L11.2812 12.9912L11.2373 13.1562L11.1914 13.3145L11.1436 13.4678C11.1357 13.4929 11.1275 13.5176 11.1191 13.542L11.0693 13.6865C11.0522 13.7336 11.0352 13.7802 11.0176 13.8252L10.9639 13.957C10.9368 14.0217 10.9097 14.0832 10.8818 14.1426L10.8252 14.2578C10.5689 14.7612 10.2795 15.0527 10 15.0527C9.72053 15.0527 9.43112 14.7612 9.1748 14.2578L9.11816 14.1426C9.09032 14.0832 9.06293 14.0214 9.03613 13.957L8.98242 13.8252C8.96485 13.7803 8.94772 13.7342 8.93066 13.6875L8.88086 13.542C8.87248 13.5176 8.86457 13.4929 8.85645 13.4678L8.80859 13.3145L8.7627 13.1562L8.71875 12.9912L8.69824 12.9072L8.65723 12.7354C8.64407 12.6772 8.63151 12.6176 8.61914 12.5576L8.58301 12.376C8.57118 12.3145 8.55987 12.2523 8.54883 12.1895L8.51758 11.998C8.50759 11.9336 8.4982 11.8685 8.48926 11.8027L8.46387 11.6035C8.45572 11.5365 8.44779 11.4688 8.44043 11.4004L8.4209 11.1934L8.41211 11.0889L8.39648 10.877L8.38477 10.6621C8.38161 10.5997 8.37906 10.5368 8.37695 10.4736H11.623ZM7.42871 10.4736L7.43066 10.5557L7.43555 10.665L7.44629 10.8828C7.4526 10.9909 7.46007 11.0981 7.46875 11.2041L7.4873 11.415L7.50879 11.624L7.51953 11.7266L7.5459 11.9307C7.555 11.9974 7.56501 12.0642 7.5752 12.1309L7.60645 12.3281L7.64062 12.5225L7.67773 12.7119L7.71777 12.8984C7.75773 13.078 7.8022 13.2567 7.85254 13.4336L7.90332 13.6035L7.95605 13.7686L8.01172 13.9297C8.11633 14.2276 8.24513 14.5164 8.39746 14.793C6.53625 14.1711 5.1569 12.4954 4.96875 10.4736H7.42871ZM15.0303 10.4736C14.8421 12.4952 13.4631 14.1711 11.6016 14.793C11.7541 14.5164 11.8837 14.2277 11.9883 13.9297L12.0439 13.7686L12.0967 13.6035L12.1465 13.4336C12.1883 13.2867 12.2272 13.139 12.2617 12.9902L12.3027 12.8057L12.3223 12.7119L12.3594 12.5225L12.3936 12.3281L12.4248 12.1309C12.4351 12.0646 12.4452 11.998 12.4541 11.9307L12.4795 11.7266L12.4912 11.624L12.5127 11.415L12.5312 11.2041C12.5399 11.0981 12.5477 10.9907 12.5537 10.8828L12.5645 10.665L12.5713 10.4736H15.0303ZM8.39746 5.20703C8.24497 5.48349 8.1163 5.77241 8.01172 6.07031L7.95605 6.23145L7.90332 6.39648L7.85254 6.56641C7.81177 6.70977 7.77353 6.85772 7.73828 7.00977L7.69727 7.19434L7.67773 7.28809L7.64062 7.47754L7.60645 7.67188L7.5752 7.86914C7.56495 7.93538 7.55484 8.00205 7.5459 8.06934L7.51953 8.27344L7.50879 8.37598L7.4873 8.58496L7.46875 8.7959C7.46007 8.90192 7.45234 9.00932 7.44629 9.11719L7.43555 9.33496L7.43066 9.44434L7.42871 9.52637H4.96875C5.15585 7.51463 6.52264 5.84458 8.37012 5.21582L8.39746 5.20703ZM10 4.94727C10.2795 4.94727 10.5689 5.23855 10.8252 5.74219L10.8818 5.85742C10.9097 5.9168 10.9371 5.97861 10.9639 6.04297L11.0176 6.1748C11.0354 6.22064 11.0526 6.26721 11.0693 6.31348L11.1191 6.45801C11.1275 6.48238 11.1354 6.50708 11.1436 6.53223L11.1914 6.68555L11.2373 6.84473L11.2812 7.00879L11.3018 7.09277L11.3428 7.26562C11.3561 7.32442 11.3686 7.38336 11.3809 7.44238L11.417 7.62402C11.4288 7.6856 11.4401 7.74863 11.4512 7.81152L11.4824 8.00195C11.4924 8.06694 11.5018 8.13212 11.5107 8.19727L11.5361 8.39648C11.5443 8.46355 11.5522 8.53123 11.5596 8.59961L11.5791 8.80664L11.5879 8.91113L11.6035 9.12305L11.6152 9.33789L11.623 9.52637H8.37695C8.37915 9.46362 8.3817 9.4006 8.38477 9.33789L8.39648 9.12305L8.41211 8.91113L8.4209 8.80664L8.44043 8.59961C8.44779 8.53149 8.45571 8.46355 8.46387 8.39648L8.48926 8.19727C8.49371 8.1645 8.49893 8.13211 8.50391 8.09961L8.5332 7.90625C8.54873 7.81072 8.56538 7.71613 8.58301 7.62402L8.61914 7.44238C8.63146 7.38261 8.64412 7.32357 8.65723 7.26562L8.69824 7.09277L8.71875 7.00879L8.7627 6.84473L8.80859 6.68555L8.85645 6.53223C8.86432 6.50705 8.87247 6.4824 8.88086 6.45801L8.93066 6.31348C8.94738 6.26713 8.96458 6.22073 8.98242 6.1748L9.03613 6.04297C9.06319 5.97835 9.09032 5.9168 9.11816 5.85742L9.1748 5.74219C9.42925 5.24227 9.71654 4.95126 9.99414 4.94727H10ZM11.6025 5.20703C13.464 5.82915 14.8433 7.50491 15.0312 9.52637H12.5713L12.5693 9.44434L12.5645 9.33496L12.5537 9.11719C12.5474 9.00909 12.5399 8.90189 12.5312 8.7959L12.5127 8.58496L12.4912 8.37695L12.4805 8.27344L12.4541 8.06934C12.4449 8.00211 12.435 7.93506 12.4248 7.86914L12.3936 7.67188L12.3594 7.47852L12.3223 7.28809L12.2822 7.10156C12.2412 6.91712 12.1967 6.73848 12.1475 6.56641L12.0967 6.39648L12.0439 6.23145L11.9883 6.07031C11.8828 5.77605 11.7647 5.50671 11.6348 5.2666L11.6025 5.20703Z" fill="#FFFEAB" />
                    </g>
                    <defs>
                      <clipPath id="clip0_1_516">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="text-[#B3B3B3] text-[12px] font-[400] mt-10 break-all">
          {t("114")}: {info?.description}
          {/* <span className='text-[#F47126]'> 10% </span>  */}
        </div>
        <div
          className="text-[#FFFD41] text-[14px] font-[600] flex justify-center items-center rounded-full py-8 mt-10 cursor-pointer"
          onClick={() => {
            copy(window.location.href);
            notification.open({
              message: t("Copied successfully"),
            });
          }}
          style={{
            border: " 1px solid #FFFD41",
          }}
        >
          {t("127")}
        </div>
      </div>

      <div className="bg-[#1E1E1E] rounded-[20px] px-16 py-20 mt-24 h5:mt-16">
        <div className="flex items-center">
          <div className="flex-1 text-[#fff] text-[14px] font-[600]">
            {t("115")}
          </div>
          <div className="text-[#FFFD41] text-[14px] font-[600]">
            {price?.prograss
              ? getBit(price?.prograss).includes("e")
                ? "0"
                : getBit(price?.prograss)
              : "0"}
            %
          </div>
        </div>
        <div>
          <Progress
            percent={price?.prograss}
            status="active"
            className="detail-page"
            showInfo={false}
            strokeColor="#FFFD41"
            trailColor="#3D3D3D"
          />
        </div>
        <div className="text-[#5F5F5F] text-[12px] font-[400] mt-6">
          {t("116")}
          <span className="text-[#FFFD41] font-[600]">
            {" "}
            {info?.launchMC || 0}{" "}
          </span>
          <span className="text-[#fff] font-[600]"> {chainCoinName(chainId)} </span>
          {(chainId === 113329 || chainId === 1328 || chainId === 1329) ?
            t("117") :
            (chainId === 8453 || chainId === 84532) ?
              t("117_2") :
              t("117_1")}
          <span className="text-[#FFFD41] font-[600]">
            {" "}
            &nbsp;
            {price?.totalAmount
              ? Number(getBit(price?.totalAmount)) < 0.01
                ? "<0.01"
                : getBit(price?.totalAmount)
              : ""}{" "}
          </span>
          <span className="text-[#fff] font-[600]"> {chainCoinName(chainId)} </span>
          {t("118")}
          {
            info?.launchTime === 0 ? '' :
              <div className="mt-10">
                {t('199')}
                <span className="text-[#FFFD41] font-[600]">
                  {formatTimestamp(info?.launchTime)}
                </span>
              </div>
          }
        </div>
        <div className="flex items-center pt-14">
          <div className="flex-1 text-[#fff] text-[14px] font-[600]">
            {t("119")}
          </div>
          <div className="text-[#fff] text-[14px] font-[600]">
            {Number(info?.supply).toLocaleString()}
          </div>
        </div>
        <div className="flex items-center pt-14">
          <div className="flex-1 text-[#5F5F5F] text-[12px] font-[400]">
            {t("120")}
          </div>
          <div className="text-[#5F5F5F] text-[12px] font-[400]">
            {t("121")}
          </div>
        </div>
        {holders &&
          holders.map((item: any, index: number) => (
            <div className="flex items-center pt-14" key={index}>
              <div
                className={`${
                  index === 0
                  ? "font-[600] text-[#fff]"
                  : "font-[400] text-[#5F5F5F]"
                } flex-1 text-[12px]x`}
              >
                {item?.wallet ? truncateMiddle(item?.wallet, 10, 4) : "--"}
                {/* ({formatAmount(item?.amount)}) */}
                {index === 0 ? (
                  <span className="font-[600] text-[#fff]"> ({t("122")})</span>
                ) : (
                  ""
                )}
                {item?.wallet?.toUpperCase() === info?.creator?.toUpperCase() &&
                price?.prograss >= 100 ? (
                  <span> ({t("123")})</span>
                ) : (
                  ""
                )}
              </div>
              <div className="text-[#fff] text-[12px] font-[600]">
                {Number(getBit(item?.percent)) < 0.1
                  ? "<0.1"
                  : getBit(item?.percent)}
                %
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
