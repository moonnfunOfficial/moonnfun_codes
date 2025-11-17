import { notification } from "antd";
import copy from "copy-to-clipboard";
import React from "react";
import { useNavigate } from "react-router-dom";
import { truncateMiddle } from "../../../utils/truncateMiddle";
import {
  formatAmount,
  formatScientificNotation,
  formatTimestamp,
  getBit,
  NumSplic1,
  parseScientificNumber,
} from "../../../utils/tool";
import LighCharts from "../../home/lighCharts";
import { useTranslation } from "react-i18next";
import { getQueryParam } from "../../../utils/getUrlParamsLegacy";
import { tokenSubscribe } from "../../../API";
import Chart from "../../../components/Chart";
import { chainCoinName } from "../../coinName";
import { useAppKitNetwork } from "@reown/appkit/react";

interface MyComponentProps {
  info: any;
  price: any;
  messages: any;
  sendMessage: any;
}
const App: React.FC<MyComponentProps> = ({
  info,
  price,
  messages,
  sendMessage,
}) => {
  const { switchNetwork, chainId } = useAppKitNetwork(); 
  const navigate = useNavigate();
  const [minute, setMinute] = React.useState(1);
  let { t, i18n } = useTranslation();

  const handleSubscribe = (topic: any) => {
    const _address: any = getQueryParam("address");
    tokenSubscribe({
      address: _address,
      topic: topic,
    })
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <div className="w-[810px] relative h5:w-full">
      <div className="flex items-center box-border">
        <svg 
          className="cursor-pointer block h5:hidden"
          onClick={() => {
            navigate(-1);
          }}
          xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M11.1465 7.03976V4.10643C10.8799 2.87976 9.86655 3.62643 9.86655 3.62643L2.82655 9.6531C1.27988 10.7198 2.71988 11.5198 2.71988 11.5198L9.65321 17.4931C11.0399 18.5064 11.1465 16.9598 11.1465 16.9598V14.2398C18.1865 12.0531 21.0665 20.7998 21.0665 20.7998C21.3332 21.2798 21.4932 20.7998 21.4932 20.7998C24.2132 7.67976 11.1465 7.03976 11.1465 7.03976Z" fill="#FFFD41" />
        </svg> 
        <div className="w-[14px]">
          <svg
            onClick={() => {
              navigate(-1);
            }}
            className=" hidden h5:block"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M6.50256 4.10677V2.39566C6.347 1.68011 5.75589 2.11566 5.75589 2.11566L1.64923 5.63122C0.747003 6.25344 1.587 6.72011 1.587 6.72011L5.63145 10.2045C6.44034 10.7957 6.50256 9.89344 6.50256 9.89344V8.30677C10.6092 7.03122 12.2892 12.1334 12.2892 12.1334C12.4448 12.4134 12.5381 12.1334 12.5381 12.1334C14.1248 4.48011 6.50256 4.10677 6.50256 4.10677Z"
              fill="#F47126"
            />
          </svg>
        </div>
        <div className="w-[10px] h-10px hidden h5:block h5:min-w-[4px]"></div>
        <div
          className="w-[48px] h-[48px] rounded-[10px] relative
          h5:w-[38px] h5:h-[38px] h5:min-w-[38px]"
          style={{
            backgroundImage: `url(${info?.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <img src={info?.chain === "sei" ?
            require("../../../assets/image/seiIcon.png") :
            info?.chain === "bsc" ?
              require("../../../assets/image/bnbIcon.png") :
              info?.chain === "okx" ?
                require("../../../assets/image/okIcon.png") :
                info?.chain === "base" ?
                  require("../../../assets/image/BaseIcon.png")
                : ''
          }
            className="absolute right-[2px] bottom-[2px] w-[16px] h-[16px]
              h5:w-[14px] h5:h-[14px]"
            alt="" />
        </div>
        <div className="w-[10px] h-10px h5:min-w-[4px]"></div>
        <div>
          <div
            className="text-[#FFFD41] text-[20px] font-[600]
           h5:text-[16px] 
          "
          >
            {info?.symbol && info?.symbol.length >= 16
              ? info?.symbol?.slice(0, 16) + "..."
              : info?.symbol}{" "}
            / {chainCoinName(chainId)}
          </div>
          <div className="flex items-center">
            <div className="text-[#5F5F5F] text-[14px] font-[500] ">
              {t("94")}:
            </div>
            <div className="text-[#fff] text-[14px] font-[600] ml-4 mr-6 ">
              {info?.address ? truncateMiddle(info?.address, 8, 4) : ""}
            </div>
            <svg
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();  
                copy(info?.address);
                notification.open({
                  message: t("Copied successfully"),
                });
              }}
              className="cursor-pointer mr-20 w-[14px] h-[14px]" xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
              <g clipPath="url(#clip0_1_2888)">
                <path d="M14.4 13.3H12.8V14.9C12.8 15.78 12.08 16.5 11.2 16.5H1.6C0.72 16.5 0 15.78 0 14.9V5.3C0 4.42 0.72 3.7 1.6 3.7H3.2V2.1C3.2 1.22 3.92 0.5 4.8 0.5H14.4C15.28 0.5 16 1.22 16 2.1V11.7C16 12.58 15.28 13.3 14.4 13.3ZM2.4 5.3C1.92 5.3 1.6 5.62 1.6 6.1V14.1C1.6 14.58 1.92 14.9 2.4 14.9H10.4C10.88 14.9 11.2 14.58 11.2 14.1V6.1C11.2 5.62 10.88 5.3 10.4 5.3H2.4ZM14.4 2.9C14.4 2.42 14.08 2.1 13.6 2.1H5.6C5.12 2.1 4.8 2.42 4.8 2.9V3.7H11.2C12.08 3.7 12.8 4.42 12.8 5.3V11.7H13.6C14.08 11.7 14.4 11.38 14.4 10.9V2.9Z" fill="#C1C1C1" />
              </g>
              <defs>
                <clipPath id="clip0_1_2888">
                  <rect width="16" height="16" fill="white" transform="translate(0 0.5)" />
                </clipPath>
              </defs>
            </svg> 
            <div className="flex items-center h5:hidden">
              <div className="text-[#5F5F5F] text-[14px] font-[500]">
                {t("95")}:
              </div>
              <div className="text-[#fff] text-[14px] font-[600] ml-4 mr-6">
                {info?.creator ? truncateMiddle(info?.creator, 8, 4) : ""}
              </div>
              <svg
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();  
                  copy(info?.creator);
                  notification.open({
                    message: t("Copied successfully"),
                  });
                }}
                className="cursor-pointer mr-20 w-[14px] h-[14px]" xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                <g clipPath="url(#clip0_1_2888)">
                  <path d="M14.4 13.3H12.8V14.9C12.8 15.78 12.08 16.5 11.2 16.5H1.6C0.72 16.5 0 15.78 0 14.9V5.3C0 4.42 0.72 3.7 1.6 3.7H3.2V2.1C3.2 1.22 3.92 0.5 4.8 0.5H14.4C15.28 0.5 16 1.22 16 2.1V11.7C16 12.58 15.28 13.3 14.4 13.3ZM2.4 5.3C1.92 5.3 1.6 5.62 1.6 6.1V14.1C1.6 14.58 1.92 14.9 2.4 14.9H10.4C10.88 14.9 11.2 14.58 11.2 14.1V6.1C11.2 5.62 10.88 5.3 10.4 5.3H2.4ZM14.4 2.9C14.4 2.42 14.08 2.1 13.6 2.1H5.6C5.12 2.1 4.8 2.42 4.8 2.9V3.7H11.2C12.08 3.7 12.8 4.42 12.8 5.3V11.7H13.6C14.08 11.7 14.4 11.38 14.4 10.9V2.9Z" fill="#C1C1C1" />
                </g>
                <defs>
                  <clipPath id="clip0_1_2888">
                    <rect width="16" height="16" fill="white" transform="translate(0 0.5)" />
                  </clipPath>
                </defs>
              </svg>  
            </div>
          </div>
        </div>
        <div className="flex-1 text-right">
          <div className="text-[#fff] text-[18px] font-[600] h5:text-[16px] ">
            {NumSplic1(formatScientificNotation(price?.price), 8)} {chainCoinName(chainId)}
          </div>
          {price?.percent > 0 ? (
            <div className="flex items-center justify-end text-[#46C91B] text-[14px] font-[600] h5:text-[16px] h5:font-[600]">
              <svg
                className="mr-4"
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
              +
              {price?.percent ? getBit(Number(parseScientificNumber(price?.percent)), 3) : 0}
              %
            </div>
          ) : (
            <div className="flex items-center justify-end mr-2 text-[#D62727] text-[14px] font-[600] h5:text-[16px] h5:font-[600]">
              <svg
                className="mr-4"
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
                {price?.percent ? getBit(Number(parseScientificNumber(price?.percent)), 3) : 0}
                %
            </div>
          )}
        </div>
      </div>

      <div className="items-center pt-6 hidden h5:flex flex-wrap">
        <div className="w-[50%]">
          <div className="flex items-center">
            <div className="text-[#5F5F5F] text-[14px] font-[500] ">
              {t("95")}:
            </div>
            <div className="text-[#fff] text-[14px] font-[600] ml-6 h5:font-[600]">
              {info?.creator ? truncateMiddle(info?.creator, 4, 4) : ""}
            </div>
          </div>
        </div>
        <div className="w-[50%]">
          <div className="flex items-center justify-end">
            <div className="text-[#5F5F5F] text-[14px] font-[500] h5:font-[500]">
              {t("96")}
            </div>
            <div className="text-[#fff] text-[14px] font-[560000] ml-6 h5:font-[600]">
              ${formatAmount(Number(1000000000) * Number(price?.priceUsd))}
            </div>
          </div>
        </div>
        <div className="pt-4">
          <div className="flex items-center">
            <div className="text-[#5F5F5F] text-[14px] font-[500] h5:font-[500]">
              {t("97")}
            </div>
            <div className="text-[#fff] text-[14px] font-[600] ml-6 h5:font-[600]">
              ${formatAmount(Number(info?.volume))}
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-end pt-4">
          <div className="text-[#fff] text-[14px] font-[500] whitespace-nowrap h5:font-[500]">
            {t("98")}
          </div>
          <div className="text-[#fff] text-[14px] font-[600] ml-6 whitespace-nowrap h5:font-[600]">
            {formatTimestamp(info?.createdAt)}
          </div>
        </div>
      </div>
      {/* <div className="flex items-center pt-16 h5:hidden">
        <div className="text-[#62573A] text-[14px] font-[500]">{t("167")}</div>
        <div className="text-[#000] text-[14px] font-[600] ml-6">
          {info?.pair}
        </div>
        <div className="text-[#62573A] text-[14px] font-[500] ml-[30px]">
          {t("168")}
        </div>
        <div className="text-[#000] text-[14px] font-[600] ml-6">
          ${formatAmount(Number(info?.tokenAmount))}
        </div>
        <div className="text-[#62573A] text-[14px] font-[500] ml-[30px]">
          {t("169")}
        </div>
        <div className="text-[#000] text-[14px] font-[600] ml-6">
          {formatAmount(Number(info?.totalAmount))}
        </div>
      </div> */}
      <div className="flex items-center pt-16 h5:hidden">
        <div className="text-[#5F5F5F] text-[14px] font-[500]">{t("96")}</div>
        <div className="text-[#fff] text-[14px] font-[600] ml-6">
          ${formatAmount(Number(1000000000) * Number(price?.priceUsd))}
        </div>
        <div className="text-[#5F5F5F] text-[14px] font-[500] ml-[30px]">
          {t("97")}
        </div>
        <div className="text-[#fff] text-[14px] font-[600] ml-6">
          ${formatAmount(Number(info?.volume))}
        </div>
        <div className="text-[#5F5F5F] text-[14px] font-[500] ml-[30px]">
          {t("98")}
        </div>
        <div className="text-[#fff] text-[14px] font-[600] ml-6">
          {formatTimestamp(info?.createdAt)}
        </div>
      </div>
      <div className="bg-[#000] rounded-[12px] mt-[16px]">
        {/* "second_1":  Second,
                "second_5":  5 * Second,
                "second_8":  8 * Second,
                "second_15": 15 * Second,
                "minute_1":  60 * Second,
                "minute_5":  60 * 5 * Second,
                "minute_30": 60 * 30 * Second,
                "hour_1":    60 * 60 * Second,
                "hour_4":    4 * 60 * 60 * Second,
                "day_1":     24 * 60 * 60 * Second,
                "week_1":    7 * 24 * 60 * 60 * Second,
                "month_1":   30 * 24 * 60 * 60 * Second, 
                "year_1":    365 * 24 * 60 * 60 * Second,
                */}
        <div className="flex items-center pt-10 pb-6 hidden">
          {/* <div
            className={`${minute === -1 ? 'text-[#fff]' : 'text-[#8a8989]'} 
            text-[13px] font-[400] ml-6 cursor-pointer pl-10
            h5:text-center h5:leading-[14px] h5:pl-0
            `}
            onClick={() => {
              // handleSubscribe("second_1")
              sendMessage({ type: "subscribe", payload: `${info?.address}-second_1` })
              setMinute(-1)
            }}
          >1 {t('151')}</div> */}
          <div
            className={`${
              minute === 0 ? "text-[#fff]" : "text-[#5F5F5F]"
            } text-[13px]
             font-[400] ml-6 cursor-pointer pl-10
            h5:text-center h5:leading-[14px]
            `}
            onClick={() => {
              sendMessage({
                type: "subscribe",
                payload: `${info?.address}-minute_1`,
              });
              // handleSubscribe("second_1")
              setMinute(0);
            }}
          >
            1 {t("152")}
          </div>
          <div
            className={`${minute === 1 ? "text-[#fff]" : "text-[#5F5F5F]"} 
            text-[13px] font-[400] ml-6 cursor-pointer pl-10
            h5:text-center h5:leading-[14px]
            `}
            onClick={() => {
              sendMessage({
                type: "subscribe",
                payload: `${info?.address}-minute_15`,
              });
              // handleSubscribe("minute_15")
              setMinute(1);
            }}
          >
            15 {t("152")}
          </div>
          <div
            className={`${minute === 2 ? "text-[#fff]" : "text-[#8a8989]"} 
            text-[13px] font-[400] ml-6 cursor-pointer pl-10
            h5:text-center h5:leading-[14px]
            `}
            onClick={() => {
              sendMessage({
                type: "subscribe",
                payload: `${info?.address}-hour_4`,
              });
              // handleSubscribe("hour_4")
              setMinute(2);
            }}
          >
            4 {t("153")}
          </div>
          <div
            className={`${minute === 3 ? "text-[#fff]" : "text-[#5F5F5F]"} 
            text-[13px] font-[400] ml-6 cursor-pointer pl-10
            h5:text-center h5:leading-[14px]
            `}
            onClick={() => {
              sendMessage({
                type: "subscribe",
                payload: `${info?.address}-day_1`,
              });
              // handleSubscribe("day_1")
              setMinute(3);
            }}
          >
            1 {t("154")}
          </div>
          <div
            className={`${minute === 4 ? "text-[#fff]" : "text-[#5F5F5F]"} 
            text-[13px] font-[400] ml-6 cursor-pointer pl-10
            h5:text-center h5:leading-[14px]
            `}
            onClick={() => {
              sendMessage({
                type: "subscribe",
                payload: `${info?.address}-week_1`,
              });
              // handleSubscribe("week_1")
              setMinute(4);
            }}
          >
            1 {t("155")}
          </div>
        </div>
        {/* <LighCharts dataLine={messages} /> */}
        <Chart info={info}></Chart>
      </div>
    </div>
  );
};

export default App;
