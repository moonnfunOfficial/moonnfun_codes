import { notification, Progress } from "antd";
import React from "react";
import {
  formatAmount,
  formatScientificNotation,
  getBit,
  isMobile,
  NumSplic1,
  showLoding,
} from "../../../utils/tool";
import copy from "copy-to-clipboard";
import { truncateMiddle } from "../../../utils/truncateMiddle";
import { useNavigate } from "react-router-dom";
import { Contracts } from "../../../web3";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { defaultSlippage } from "../../../config";
import Web3 from "web3";
import BigNumber from "bignumber.js";
import NoData from "../../../components/NoData";
import { useAppKit, useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { userFollow } from "../../../API";
import { wsBus } from "../../../utils/wsBus";
import iconJu from "../../../assets/image/JU.png";
import DownTime from "./downTime";

interface MyComponentProps {
  list: any;
  buyNum: any;
  RefreshBack: any;
  isOk: boolean;
  is24HoursVolume?: boolean;
}
const App: React.FC<MyComponentProps> = ({
  list,
  buyNum,
  RefreshBack,
  isOk,
  is24HoursVolume,
}) => {
  const navigate = useNavigate();
  const { address: web3ModalAccount } = useAppKitAccount();
  const { open, close } = useAppKit();
  const handleBuy = async (item: any) => {
    if (!web3ModalAccount) {
      open()
      return;
    }
    showLoding(true);
    const _num = buyNum || 10;
    if (Number(_num) < 0.001) {
      notification.open({
        message: t("141_1"),
      });
      showLoding(false);
      return;
    }
    const _tokenInAmount = new BigNumber(_num).multipliedBy("1e18"); 
    let isMax = false;
    try { 
      const _res = await Contracts.example?.getRemainTokenNum(item?.address);
      const RemainTokenNum = Web3.utils.fromWei(_res);
      isMax = Number(_num) > Number(RemainTokenNum) ? true : false;
    } catch (err) {
      console.log(err);
      showLoding(true);
    }

    let _val: any = "0";
    let _swapAmount: any = "0";
    try {
      if (item?.insurance) {
        _val = BigInt(Math.floor((_num * 0.99) * 1e18)).toString();
        await Contracts.example
          ?.getSwapTokenNum2(
            "0x0000000000000000000000000000000000000000",
            _val,
            item?.address
          )
          .then((res: any) => {
            let amounted = Web3.utils.fromWei(res);
            _swapAmount = NumSplic1(amounted, 4);
          })
          .catch((err: any) => {
            console.log(err);
          });
      } else {
        _val = BigInt(Math.floor(_num * 1e18)).toString();
        await Contracts.example
          ?.getSwapTokenNum(
            "0x0000000000000000000000000000000000000000",
            _val,
            item?.address
          )
          .then((res: any) => {
            let amounted = Web3.utils.fromWei(res);
            _swapAmount = NumSplic1(amounted, 4);
          })
          .catch((err: any) => {
            console.log(err);
          });
      } 
    } catch (err) {
      console.log(err);
    }

    let maxSlippage = Number(
      localStorage.getItem("maxSlippage") ?? defaultSlippage
    ); 
    let slippage: any = isMax
      ? 0
      : _swapAmount - _swapAmount * (maxSlippage / 100);
    try {
      slippage = BigInt(Math.floor(slippage * 1e18)).toString();
    } catch (err) {
      console.log(err);
    }

    if (web3ModalAccount && _num) { 
      showLoding(true);
      if (item?.insurance && !!item?.insurance) {
        await Contracts.example?.buyToken2(
          item?.address,
          _tokenInAmount.toFixed(),
          web3ModalAccount,
          slippage,
          false
        )
          .then((res: any) => {
            console.log(res);
            RefreshBack();
            notification.open({
              message: "Buy success",
            });
          })
          .catch((err: any) => {
            console.log(err);
            showLoding(false);
          });
      }
      else {
        await Contracts.example
          ?.buyToken(
            item?.address,
            _tokenInAmount.toFixed(),
            web3ModalAccount,
            slippage
          )
          .then((res: any) => {
            console.log(res);
            RefreshBack();
            notification.open({
              message: "Buy success",
            });
          })
          .catch((err: any) => {
            console.log(err);
            showLoding(false);
          });
      }
      showLoding(false);
    } else {
      showLoding(false);
    }
  };
  let { t, i18n } = useTranslation();
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
        // RefreshBack()
        wsBus.emit("upAdvancedList", 0);
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
    <div className="">
      {list.map((item: any, index: number) => (
        <div
          key={index}
          className="cursor-pointer h5:pt-[10px]"
          onClick={(e: any) => {
            e.preventDefault();
            e.stopPropagation();  
            navigate("/detail?address=" + item?.address);
          }}
        >
          <div className="flex items-center mb-6">
            <div
              className="w-[60px] h-[60px] mr-16 rounded-[12px] relative
              h5:w-[44px] h5:h-[44px] h5:mr-8 
              "
              style={{
                backgroundImage: `url(${item?.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {item?.follow ? (
                <svg
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault(); 
                    handleFollow({
                      tokenID: item?.id,
                      follow: false,
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
                    handleFollow({
                      tokenID: item?.id,
                      follow: true,
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
            <div className="flex-1">
              <div className="text-[16px] font-[600] text-[#fff] flex items-center">
                {item?.symbol && item?.symbol.length >= 12
                  ? item?.symbol?.slice(0, 11) + "..."
                  : item?.symbol}
                {item?.downTime ? <DownTime time={item?.downTime} /> : ""}
              </div>
              <div
                className="text-[14px] text-[#5F5F5F] flex items-center
                h5:text-[12px]
                "
              >
                {item?.createdAt ? dayjs(item?.createdAt).fromNow() : "0"}
                <span
                  className="text-[14px] text-[#5F5F5F] pl-10 pr-6
                h5:text-[12px] h5:pl-8
                "
                >
                  {truncateMiddle(item?.address, 4, 4)}
                </span>
                <svg 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();  
                    copy(item?.address);
                    notification.open({
                      message: t("Copied successfully"),
                    });
                  }}
                  className="cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M3.55263 0H9.07895C9.32323 3.27158e-09 9.5575 0.0970392 9.73023 0.26977C9.90296 0.442501 10 0.676774 10 0.921053V6.44737C10 6.69165 9.90296 6.92592 9.73023 7.09865C9.5575 7.27138 9.32323 7.36842 9.07895 7.36842H3.55263C3.30835 7.36842 3.07408 7.27138 2.90135 7.09865C2.72862 6.92592 2.63158 6.69165 2.63158 6.44737V0.921053C2.63158 0.676774 2.72862 0.442501 2.90135 0.26977C3.07408 0.0970392 3.30835 0 3.55263 0ZM3.55263 0.789474C3.51773 0.789474 3.48427 0.803337 3.45959 0.828012C3.43492 0.852688 3.42105 0.886156 3.42105 0.921053V6.44737C3.42105 6.46465 3.42446 6.48176 3.43107 6.49772C3.43768 6.51369 3.44737 6.52819 3.45959 6.54041C3.47181 6.55263 3.48632 6.56232 3.50228 6.56893C3.51824 6.57554 3.53535 6.57895 3.55263 6.57895H9.07895C9.11384 6.57895 9.14731 6.56508 9.17199 6.54041C9.19666 6.51573 9.21053 6.48226 9.21053 6.44737V0.921053C9.21053 0.886156 9.19666 0.852688 9.17199 0.828012C9.14731 0.803337 9.11384 0.789474 9.07895 0.789474H3.55263ZM6.57895 8.1579C6.57895 8.0532 6.62054 7.9528 6.69456 7.87877C6.76859 7.80475 6.86899 7.76316 6.97368 7.76316C7.07837 7.76316 7.17878 7.80475 7.25281 7.87877C7.32683 7.9528 7.36842 8.0532 7.36842 8.1579V9.07895C7.36842 9.32323 7.27138 9.5575 7.09865 9.73023C6.92592 9.90296 6.69165 10 6.44737 10H0.921053C0.676774 10 0.442501 9.90296 0.26977 9.73023C0.0970392 9.5575 3.27158e-09 9.32323 0 9.07895V3.55263C0 3.30835 0.0970392 3.07408 0.26977 2.90135C0.442501 2.72862 0.676774 2.63158 0.921053 2.63158H1.84211C1.9468 2.63158 2.0472 2.67317 2.12123 2.7472C2.19525 2.82122 2.23684 2.92163 2.23684 3.02632C2.23684 3.13101 2.19525 3.23141 2.12123 3.30544C2.0472 3.37946 1.9468 3.42105 1.84211 3.42105H0.921053C0.886156 3.42105 0.852688 3.43492 0.828012 3.45959C0.803337 3.48427 0.789474 3.51773 0.789474 3.55263V9.07895C0.789474 9.11384 0.803337 9.14731 0.828012 9.17199C0.852688 9.19666 0.886156 9.21053 0.921053 9.21053H6.44737C6.48226 9.21053 6.51573 9.19666 6.54041 9.17199C6.56508 9.14731 6.57895 9.11384 6.57895 9.07895V8.1579Z" fill="#5F5F5F" />
                </svg> 
              </div>
            </div> 
            <div
              className="px-14 py-4 rounded-full flex items-center text-[14px] text-[#FFFD41] font-[600]"
              style={{
                border: "1px solid #FFFD41",
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();  
                handleBuy(item);
              }}
            >
              {buyNum || 10}
              <img
                src={(chainId === 196 || chainId === 11952) ?
                  require("../../../assets/image/okIcon.png") :
                  (chainId === 56 || chainId === 97) ?
                    require("../../../assets/image/bnbIcon.png") :
                    (chainId === 84532 || chainId === 8453) ?
                      require("../../../assets/image/BaseIcon.png") :
                    iconJu
                }
                className="w-[16px] ml-6"
                alt=""
              /> 
            </div>
          </div>
          <div className="flex items-center">
            {isOk ? (
              <>
                <div className="text-[14px] font-[600] text-[#fff] ">
                  ${NumSplic1(formatScientificNotation(item?.price), 6)}
                </div>
                <div
                  className={`text-[14px] font-[600] text-[#46C91B] ml-6`}
                  style={{
                    color: item?.percent >= 0 ? "#46C91B" : "#D62727",
                  }}
                >
                  {Number((item?.percent).toFixed(2))}%
                </div>
              </>
            ) : (
              <>
                <div className="w-[60px] h5:w-[52px]">
                  <Progress
                    percent={item?.prograss}
                    status="active"
                    size="small"
                    className=""
                    showInfo={false}
                      strokeColor="#FFFD41"
                    trailColor="#DDD9CD"
                  />
                </div>
                <div
                    className="pr-12 pl-6 text-[14px] font-[600] text-[#FFFD41] 
                      h5:text-[12px] h5:px-9 h5:w-[48px] h5:flex-[unset]
                      "
                >
                    {Number(getBit(item?.prograss, 3))}%
                  {/* {Number((item?.prograss).toFixed(0))}% */}
                </div>
              </>
            )}

            <div className="flex items-center justify-end flex-1">
              <div
                className="text-[13px] font-[400] text-[#5F5F5F] flex items-center
              h5:text-[12px]"
              >
                {/* {t('76')} */}
                {isMobile() ? (
                  <svg
                    className="mr-2 w-[14px] h-[14px]"
                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3.80225 4.85675C3.80225 6.43294 5.08085 7.71155 6.65704 7.71155C8.23324 7.71155 9.51389 6.43294 9.51389 4.85675C9.51389 3.28056 8.23529 2.00195 6.65704 2.00195C5.0788 2.00195 3.80225 3.2785 3.80225 4.85675Z" fill="white" />
                    <path d="M8.02538 7.87363H5.78218C3.18187 7.87363 1.07617 9.97932 1.07617 12.5776C1.07617 13.3616 1.7124 13.9978 2.49844 13.9998H11.0403C11.656 13.9998 12.1567 13.5011 12.1567 12.8834V12.0029C12.1547 9.72483 10.3055 7.87363 8.02538 7.87363ZM9.87864 4.83412C9.88069 5.55859 9.62004 6.26049 9.14801 6.81257C9.09464 6.87414 9.0967 6.9665 9.15416 7.02601C9.98946 7.89005 11.3645 7.91262 12.2286 7.07937C12.6575 6.6648 12.8956 6.09425 12.8915 5.49908C12.8833 4.31898 11.9228 3.35233 10.7427 3.34002C10.4205 3.33592 10.1023 3.40364 9.81091 3.5391C9.71035 3.58425 9.66109 3.69918 9.69803 3.80385C9.81912 4.13222 9.88069 4.48112 9.87864 4.83412Z" fill="white" />
                    <path d="M11.1088 8.04102H10.4808C10.411 8.04102 10.3556 8.09643 10.3535 8.16621C10.3535 8.21136 10.3761 8.25241 10.4151 8.27498C11.7122 9.04255 12.5044 10.4361 12.5044 11.9425V12.8496C12.5044 13.0857 12.4325 13.3155 12.2971 13.5084C12.2581 13.5638 12.2704 13.6418 12.3258 13.6829C12.3463 13.6972 12.371 13.7055 12.3976 13.7055H13.8938C14.4623 13.7055 14.9241 13.2437 14.9241 12.6752V11.8625C14.9241 9.75061 13.2145 8.04102 11.1088 8.04102Z" fill="white" />
                  </svg> 
                ) : (
                  <svg
                      className="mr-2 relative top-[-1px] w-[14px] h-[14px]"
                      xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3.80225 4.85675C3.80225 6.43294 5.08085 7.71155 6.65704 7.71155C8.23324 7.71155 9.51389 6.43294 9.51389 4.85675C9.51389 3.28056 8.23529 2.00195 6.65704 2.00195C5.0788 2.00195 3.80225 3.2785 3.80225 4.85675Z" fill="white" />
                      <path d="M8.02538 7.87363H5.78218C3.18187 7.87363 1.07617 9.97932 1.07617 12.5776C1.07617 13.3616 1.7124 13.9978 2.49844 13.9998H11.0403C11.656 13.9998 12.1567 13.5011 12.1567 12.8834V12.0029C12.1547 9.72483 10.3055 7.87363 8.02538 7.87363ZM9.87864 4.83412C9.88069 5.55859 9.62004 6.26049 9.14801 6.81257C9.09464 6.87414 9.0967 6.9665 9.15416 7.02601C9.98946 7.89005 11.3645 7.91262 12.2286 7.07937C12.6575 6.6648 12.8956 6.09425 12.8915 5.49908C12.8833 4.31898 11.9228 3.35233 10.7427 3.34002C10.4205 3.33592 10.1023 3.40364 9.81091 3.5391C9.71035 3.58425 9.66109 3.69918 9.69803 3.80385C9.81912 4.13222 9.88069 4.48112 9.87864 4.83412Z" fill="white" />
                      <path d="M11.1088 8.04102H10.4808C10.411 8.04102 10.3556 8.09643 10.3535 8.16621C10.3535 8.21136 10.3761 8.25241 10.4151 8.27498C11.7122 9.04255 12.5044 10.4361 12.5044 11.9425V12.8496C12.5044 13.0857 12.4325 13.3155 12.2971 13.5084C12.2581 13.5638 12.2704 13.6418 12.3258 13.6829C12.3463 13.6972 12.371 13.7055 12.3976 13.7055H13.8938C14.4623 13.7055 14.9241 13.2437 14.9241 12.6752V11.8625C14.9241 9.75061 13.2145 8.04102 11.1088 8.04102Z" fill="white" />
                    </svg>  
                )}
                {item?.holders ? formatAmount(item?.holders) : "0"}
              </div>
              <div
                className="text-[12px] font-[400] text-[#5F5F5F] mx-8
              h5:text-[12px] h5:mx-8"
              >
                {t("77")}: $
                {item?.marketCap ? formatAmount(item?.marketCap) : "0"}
              </div>
              {is24HoursVolume ? (
                <div
                  className="text-[12px] font-[400] text-[#5F5F5F]
              h5:text-[12px]"
                >
                  {t("78")}: $
                  {item?.volume24 ? formatAmount(item?.volume24) : "0"}
                </div>
              ) : (
                <div
                    className="text-[12px] font-[400] text-[#5F5F5F]
              h5:text-[12px]"
                >
                  {t("78")}: ${item?.volume ? formatAmount(item?.volume) : "0"}
                </div>
              )}
            </div>
          </div>
          {index + 1 !== list.length ? (
            <div className="h-1 bg-[#5F5F5F] my-14 h5:mb-0 h5:mt-6"></div>
          ) : null}
        </div>
      ))}
      {list && list.length === 0 ? <NoData /> : null}
    </div>
  );
};

export default App;
