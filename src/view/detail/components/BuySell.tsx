import { Popover, Switch, notification } from "antd";
import React from "react";
import { getBit, isMobile } from "../../../utils/tool";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SwapConfigModal from "../../../components/swapConfigModal";
import { defaultSlippage } from "../../../config";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import iconJu from "../../../assets/image/JU.png";
import PayoutPool from "./PayoutPool";
import { chainCoinName } from "../../coinName";
import { getChainConfig } from "../../../getChainConfig";

interface MyComponentProps {
  info: any;
  setTokenInAmount: any;
  tokenInAmount: any;
  BNBBalanceAmount: any;
  coinBalance: any;
  swapAmount: any;
  swapAmount2: any;
  tabIndex: any;
  setTabIndex: any;
  handleBuy: any;
  handleSell: any;
  insurance: any;
  setInsurance: any;
}
const App: React.FC<MyComponentProps> = ({
  info,
  setTokenInAmount,
  tokenInAmount,
  BNBBalanceAmount,
  coinBalance,
  swapAmount,
  swapAmount2,
  tabIndex,
  setTabIndex,
  handleBuy,
  handleSell,
  insurance,
  setInsurance
}) => {
  const navigate = useNavigate();
  const { switchNetwork, chainId } = useAppKitNetwork(); 
  let { t, i18n } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [maxSlippage, setMaxSlippage] = React.useState(
    Number(localStorage.getItem("maxSlippage") ?? defaultSlippage)
  );
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();

  return (
    <div
      className="w-[360px] mt-[12px] bg-[#1E1E1E] rounded-[20px] px-16 pt-[28px] pb-[30px] h-[fit-content] relative
     h5:w-full h5:pb-[30px]"
      style={{
        height: "fit-content",
      }}
    >
      <div className="">
        <div className="flex items-center flex-1">
          <div className="text-[#fff] text-[16px] font-[600] flex items-center">
            <svg
              onClick={() => {
                navigate("/");
              }}
              className="mr-10 hidden h5:block" xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
              <path d="M6.50256 4.60677V2.89566C6.347 2.18011 5.75589 2.61566 5.75589 2.61566L1.64923 6.13122C0.747003 6.75344 1.587 7.22011 1.587 7.22011L5.63145 10.7045C6.44034 11.2957 6.50256 10.3934 6.50256 10.3934V8.80677C10.6092 7.53122 12.2892 12.6334 12.2892 12.6334C12.4448 12.9134 12.5381 12.6334 12.5381 12.6334C14.1248 4.98011 6.50256 4.60677 6.50256 4.60677Z" fill="#FFFD41" />
            </svg>
            {t("99")}
          </div>
          <Popover
            content={<div className="w-[306px]">{t("100")}</div>}
            trigger="hover"
          >
            <svg
              className="hidden h5:block"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M7.9998 2.30005C4.8518 2.30005 2.2998 4.85205 2.2998 8.00005C2.2998 11.148 4.8518 13.7 7.9998 13.7C11.1478 13.7 13.6998 11.148 13.6998 8.00005C13.6998 4.85205 11.1478 2.30005 7.9998 2.30005ZM7.9998 3.30005C10.5958 3.30005 12.6998 5.40405 12.6998 8.00005C12.6998 10.596 10.5958 12.7 7.9998 12.7C5.4038 12.7 3.2998 10.596 3.2998 8.00005C3.2998 5.40405 5.4038 3.30005 7.9998 3.30005Z"
                fill="#62573A"
              />
              <path
                d="M8.00047 7.22363C8.34714 7.22363 8.52047 7.39697 8.52047 7.74363V10.4476C8.52047 10.7943 8.34714 10.9676 8.00047 10.9676C7.6538 10.9676 7.48047 10.7943 7.48047 10.4476V7.74363C7.48047 7.39697 7.6538 7.22363 8.00047 7.22363Z"
                fill="#62573A"
              />
              <path
                d="M7.24023 5.79247C7.24023 5.99404 7.32031 6.18734 7.46283 6.32987C7.60536 6.4724 7.79867 6.55247 8.00023 6.55247C8.2018 6.55247 8.39511 6.4724 8.53764 6.32987C8.68016 6.18734 8.76023 5.99404 8.76023 5.79247C8.76023 5.59091 8.68016 5.3976 8.53764 5.25507C8.39511 5.11254 8.2018 5.03247 8.00023 5.03247C7.79867 5.03247 7.60536 5.11254 7.46283 5.25507C7.32031 5.3976 7.24023 5.59091 7.24023 5.79247Z"
                fill="#62573A"
              />
            </svg>
            <svg 
              className="ml-2 mr-12 mb-2 cursor-pointer block h5:hidden"
              xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M7.9998 2.2998C4.8518 2.2998 2.2998 4.8518 2.2998 7.9998C2.2998 11.1478 4.8518 13.6998 7.9998 13.6998C11.1478 13.6998 13.6998 11.1478 13.6998 7.9998C13.6998 4.8518 11.1478 2.2998 7.9998 2.2998ZM7.9998 3.2998C10.5958 3.2998 12.6998 5.4038 12.6998 7.9998C12.6998 10.5958 10.5958 12.6998 7.9998 12.6998C5.4038 12.6998 3.2998 10.5958 3.2998 7.9998C3.2998 5.4038 5.4038 3.2998 7.9998 3.2998Z" fill="#5F5F5F" />
              <path d="M8.00047 7.22363C8.34714 7.22363 8.52047 7.39697 8.52047 7.74363V10.4476C8.52047 10.7943 8.34714 10.9676 8.00047 10.9676C7.6538 10.9676 7.48047 10.7943 7.48047 10.4476V7.74363C7.48047 7.39697 7.6538 7.22363 8.00047 7.22363Z" fill="#5F5F5F" />
              <path d="M7.24023 5.79223C7.24023 5.99379 7.32031 6.1871 7.46283 6.32963C7.60536 6.47216 7.79867 6.55223 8.00023 6.55223C8.2018 6.55223 8.39511 6.47216 8.53764 6.32963C8.68016 6.1871 8.76023 5.99379 8.76023 5.79223C8.76023 5.59066 8.68016 5.39735 8.53764 5.25483C8.39511 5.1123 8.2018 5.03223 8.00023 5.03223C7.79867 5.03223 7.60536 5.1123 7.46283 5.25483C7.32031 5.39735 7.24023 5.59066 7.24023 5.79223Z" fill="#5F5F5F" />
            </svg> 
          </Popover>
          {/* <Switch defaultChecked onChange={(val: boolean) => { console.log(val) }} /> */}
          <div className="flex-1"></div>
          <div
            className="rounded-full px-10 h-[24px] flex items-center justify-center cursor-pointer"
            style={{
              border: "1px solid #5F5F5F",
            }}
            onClick={() => {
              setOpen(true);
            }}
          >
            <svg 
              className="w-[16px] h-[16px] cursor-pointer"
              xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <g clipPath="url(#clip0_1_1515)">
                <path d="M15.8326 6.43753C15.7376 5.93509 15.4294 5.61019 15.0347 5.61019H14.9662C13.8997 5.61019 13.0322 4.74271 13.0322 3.67585C13.0322 3.33883 13.1939 2.95454 13.2002 2.93927C13.3969 2.49647 13.2459 1.95385 12.8479 1.67535L10.8465 0.561018L10.8171 0.546621C10.4167 0.372993 9.86872 0.484125 9.57018 0.795148C9.35414 1.01797 8.60933 1.65332 8.04101 1.65332C7.46529 1.65332 6.71883 1.00523 6.50169 0.778178C6.20367 0.464882 5.66133 0.347269 5.25642 0.520597L3.18383 1.65615L3.15272 1.67595C2.7546 1.95333 2.60304 2.49593 2.79873 2.93703C2.80549 2.95316 2.96781 3.33432 2.96781 3.67587C2.96781 4.74273 2.10031 5.61021 1.03377 5.61021H0.95291C0.570617 5.61021 0.262406 5.93509 0.167406 6.43755C0.160327 6.4729 0 7.32316 0 8.00489C0 8.68574 0.160327 9.53569 0.167406 9.57077C0.262406 10.0735 0.570617 10.3987 0.965333 10.3987H1.03377C2.10031 10.3987 2.96781 11.2662 2.96781 12.3327C2.96781 12.672 2.80551 13.0549 2.79929 13.0696C2.60306 13.5132 2.7535 14.055 3.15047 14.3321L5.11392 15.4337L5.14389 15.4473C5.54993 15.626 6.09904 15.5095 6.39594 15.1849C6.67019 14.8886 7.4133 14.2733 7.95899 14.2733C8.55051 14.2733 9.31228 14.9621 9.53171 15.2041C9.73414 15.4258 10.0452 15.5593 10.3636 15.5593C10.5123 15.5593 10.6531 15.5299 10.782 15.4745L12.8179 14.3525L12.8479 14.3332C13.2459 14.055 13.3975 13.5133 13.2013 13.0719C13.1945 13.0555 13.0322 12.6743 13.0322 12.3328C13.0322 11.2662 13.8997 10.3987 14.9663 10.3987H15.046C15.4288 10.3987 15.7376 10.0735 15.8326 9.57079C15.8394 9.53571 16 8.68576 16 8.00491C16 7.32314 15.8394 6.47288 15.8326 6.43753ZM14.8396 8.00487C14.8396 8.44539 14.7519 9.01148 14.7118 9.24786C13.1119 9.37906 11.8718 10.7159 11.8718 12.3327C11.8718 12.7891 12.0166 13.2262 12.0935 13.4273L10.3568 14.3864C10.2714 14.2971 10.0192 14.0425 9.67591 13.7869C9.07307 13.3402 8.49509 13.112 7.95897 13.112C7.4274 13.112 6.85399 13.3345 6.25398 13.7756C5.91241 14.0244 5.6636 14.2721 5.5765 14.3637L3.90598 13.4284C3.98742 13.2172 4.12825 12.7857 4.12825 12.3327C4.12825 10.7159 2.88808 9.37906 1.28882 9.24786C1.2481 9.01148 1.16044 8.44541 1.16044 8.00487C1.16044 7.56347 1.2481 6.99712 1.28882 6.76074C2.88808 6.62982 4.12825 5.29267 4.12825 3.67587C4.12825 3.22205 3.98347 2.7835 3.90656 2.58274L5.68623 1.60468C5.7637 1.68217 6.01762 1.9307 6.36483 2.17783C6.95637 2.59999 7.51965 2.81376 8.04103 2.81376C8.55733 2.81376 9.11662 2.60395 9.70418 2.18999C10.0542 1.944 10.3076 1.69886 10.3811 1.62959L12.094 2.58104C12.0165 2.78067 11.8718 3.2178 11.8718 3.67587C11.8718 5.29267 13.1119 6.62982 14.7118 6.76074C14.7519 6.99766 14.8396 7.5663 14.8396 8.00487Z" fill="#5F5F5F" />
                <path d="M7.96535 5.14795C6.39605 5.14795 5.11914 6.42488 5.11914 7.99418C5.11914 9.56373 6.39607 10.8401 7.96535 10.8401C9.53464 10.8401 10.8116 9.56373 10.8116 7.99418C10.8116 6.42488 9.53464 5.14795 7.96535 5.14795ZM9.65116 7.99418C9.65116 8.92357 8.89507 9.67965 7.96535 9.67965C7.03565 9.67965 6.28012 8.92357 6.28012 7.99418C6.28012 7.06531 7.03565 6.30895 7.96535 6.30895C8.89507 6.30897 9.65116 7.06531 9.65116 7.99418Z" fill="#5F5F5F" />
              </g>
              <defs>
                <clipPath id="clip0_1_1515">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg> 
            <span className="text-[#5F5F5F] text-[14px] ml-2">
              {maxSlippage || 0}%
            </span>
          </div>
        </div>
        <div className="h-1 bg-[#5F5F5F] mt-16 mb-24"></div>
        <div className="bg-[#262626] p-6 rounded-full flex items-center">
          <div
            className="flex-1 text-[16px] font-[600] text-center rounded-full py-10 cursor-pointer"
            style={{
              color: tabIndex === 0 ? "#46C91B" : "#5F5F5F",
              border: tabIndex === 0 ? "1px solid #46C91B" : "1px solid #262626",
              background: tabIndex === 0 ? "rgba(70, 201, 27, 0.20)" : "none",
            }}
            onClick={() => {
              setTokenInAmount("");
              setTabIndex(0);
            }}
          >
            {t("101")}{" "}
          </div>
          <div
            className="flex-1 text-[16px] font-[600] text-center rounded-full py-10 cursor-pointer"
            style={{
              color: tabIndex === 1 ? "#D62727" : "#5F5F5F",
              border: tabIndex === 1 ? "1px solid #D62727" : "1px solid #262626",
              background: tabIndex === 1 ? "rgba(214, 39, 39, 0.20)" : "none",
            }}
            onClick={() => {
              setTokenInAmount("");
              setTabIndex(1);
            }}
          >
            {t("102")}
          </div>
        </div>
      </div>
      <div className="bg-[#363636] rounded-[20px] px-16 py-20 mt-24"
        style={{
          border: '1px solid #5F5F5F'
        }}>
        <div className="flex items-center min-w-0">
          <div className="flex-1"> 
            <input
              type="number"
              value={tokenInAmount}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "" || /^-?\d*\.?\d*$/.test(val)) {
                  setTokenInAmount(val);
                } 
              }}
              className="w-full text-[#fff] text-[16px] font-[600] bg-transparent"
            />
          </div>
          <div
            className="px-10 py-4 rounded-full mx-10 text-[#FFFD41] text-[12px] font-[400] cursor-pointer"
            style={{
              display: tabIndex === 0 ? "flex" : "none",
              background: "rgba(221, 217, 205, 0.20)",
            }}
            onClick={() => { 
              const _num = getChainConfig().buyGasFee
              setTokenInAmount(
                tabIndex === 0
                  ? Number(BNBBalanceAmount) - _num > 0
                    ? Number(BNBBalanceAmount) - _num
                    : 0
                  : coinBalance
              );
            }}
          >
            MAX
          </div>
          <div className="text-[#5F5F5F] text-[16px] font-[600] whitespace-nowrap line-clamp-1_1">
            {tabIndex === 0
              ? chainCoinName(chainId)
              : info?.symbol && info?.symbol.length > 7
              ? info?.symbol.slice(0, 7) + "..."
              : info?.symbol}
          </div>
          <img
            src={tabIndex === 0 ?
              (
                (chainId === 196 || chainId === 11952) ?
                  require("../../../assets/image/okIcon.png") :
                  (chainId === 56 || chainId === 97) ?
                    require("../../../assets/image/bnbIcon.png") :
                    (chainId === 84532 || chainId === 8453) ?
                      require("../../../assets/image/BaseIcon.png") :
                    iconJu
              )
              : info?.imageUrl}
            className="w-[22px] h-[22px] ml-6 rounded-full"
            alt=""
          />
        </div>
      </div>
      <div className="text-[#5F5F5F] text-[12px] font-400] text-right my-10">
        {t("103")}:{` ${tabIndex === 0 ? BNBBalanceAmount : coinBalance} `}
        {`${
          tabIndex === 0
          ? chainCoinName(chainId)
            : info?.symbol && info?.symbol.length > 6
            ? info?.symbol?.slice(0, 6) + "..."
            : info?.symbol
        }`}
      </div>
      <div className={`${tabIndex === 0 ? "flex" : "hidden"} items-center`}>
        <div
          className="flex-1 text-[12px] text-[#fff] bg-[#262626] font-[600] text-center rounded-full py-10 cursor-pointer"
          onClick={() => {
            const _num = tabIndex === 0 ? BNBBalanceAmount : coinBalance
            if (_num <= 0) {
              return notification.open({
                message: t("Insufficient balance "),
                key: "Insufficient balance ",
                duration: 1
              });
            }
            setTokenInAmount(
              getChainConfig().buyNunber[0] > Number(BNBBalanceAmount)
                ? Number(BNBBalanceAmount) - getChainConfig().buyGasFee > 0
                  ? Number(BNBBalanceAmount) - getChainConfig().buyGasFee
                  : 0
                : getChainConfig().buyNunber[0]
            );
          }}
        >
          {getChainConfig().buyNunber[0]} {chainCoinName(chainId)}
        </div>
        <div className="w-[14px]"></div>
        <div
          className="flex-1 text-[12px] text-[#fff] bg-[#262626] font-[600] text-center rounded-full py-10 cursor-pointer"
          onClick={() => {
            const _num = tabIndex === 0 ? BNBBalanceAmount : coinBalance
            if (_num <= 0) {
              return notification.open({
                message: t("Insufficient balance "),
                key: "Insufficient balance ",
                duration: 1
              });
            }
            setTokenInAmount(
              getChainConfig().buyNunber[1] > Number(BNBBalanceAmount)
                ? Number(BNBBalanceAmount) - getChainConfig().buyGasFee > 0
                  ? Number(BNBBalanceAmount) - getChainConfig().buyGasFee
                  : 0
                : getChainConfig().buyNunber[1]
            );
          }}
        >
          {getChainConfig().buyNunber[1]} {chainCoinName(chainId)}
        </div>
        <div className="w-[14px]"></div>
        <div
          className="flex-1 text-[12px] text-[#fff] bg-[#262626] font-[600] text-center rounded-full py-10 cursor-pointer"
          onClick={() => {
            const _num = tabIndex === 0 ? BNBBalanceAmount : coinBalance
            if (_num <= 0) {
              return notification.open({
                message: t("Insufficient balance "),
                key: "Insufficient balance ",
                duration: 1
              });
            }
            setTokenInAmount(
              getChainConfig().buyNunber[2] > Number(BNBBalanceAmount)
                ? Number(BNBBalanceAmount) - getChainConfig().buyGasFee > 0
                  ? Number(BNBBalanceAmount) - getChainConfig().buyGasFee
                  : 0
                : getChainConfig().buyNunber[2]
            );
          }}
        >
          {getChainConfig().buyNunber[2]} {chainCoinName(chainId)}
        </div>
        <div className="w-[14px]"></div>
        <div
          className="flex-1 text-[12px] text-[#fff] bg-[#262626] font-[600] text-center rounded-full py-10 cursor-pointer"
          onClick={() => {
            const _num = tabIndex === 0 ? BNBBalanceAmount : coinBalance
            if (_num <= 0) {
              return notification.open({
                message: t("Insufficient balance "),
                key: "Insufficient balance ",
                duration: 1
              });
            }
            setTokenInAmount(
              getChainConfig().buyNunber[3] > Number(BNBBalanceAmount)
                ? Number(BNBBalanceAmount) - getChainConfig().buyGasFee
                : getChainConfig().buyNunber[3]
            );
          }}
        >
          {getChainConfig().buyNunber[3]} {chainCoinName(chainId)}
        </div>
      </div>
      <div className={`${tabIndex === 1 ? "flex" : "hidden"} items-center`}>
        <div
          className="flex-1 text-[12px] text-[#fff] bg-[#262626] font-[600] text-center rounded-full py-10 cursor-pointer"
          onClick={() => {
            setTokenInAmount(getBit(coinBalance * 0.25));
          }}
        >
          25%
        </div>
        <div className="w-[14px]"></div>
        <div
          className="flex-1 text-[12px] text-[#fff] bg-[#262626] font-[600] text-center rounded-full py-10 cursor-pointer"
          onClick={() => {
            setTokenInAmount(getBit(coinBalance * 0.5));
          }}
        >
          50%
        </div>
        <div className="w-[14px]"></div>
        <div
          className="flex-1 text-[12px] text-[#fff] bg-[#262626] font-[600] text-center rounded-full py-10 cursor-pointer"
          onClick={() => {
            setTokenInAmount(getBit(coinBalance * 0.75));
          }}
        >
          75%
        </div>
        <div className="w-[14px]"></div>
        <div
          className="flex-1 text-[12px] text-[#fff] bg-[#262626] font-[600] text-center rounded-full py-10 cursor-pointer"
          onClick={() => {
            setTokenInAmount(getBit(coinBalance));
          }}
        >
          100%
        </div>
      </div>
      <div className="flex items-center my-24">
        <div className="flex-1 text-[12px] text-[#5F5F5F] font-[400] ">{t("104")}:</div>
        <div className=" text-[12px] font-[400] text-[#fff]"> 
          {tabIndex === 0 ? swapAmount : swapAmount2}{" "}
          {tabIndex === 0
            ? info?.symbol && info?.symbol.length > 6
              ? info?.symbol?.slice(0, 6) + "..."
              : info?.symbol
            : chainCoinName(chainId)}
        </div>
      </div>
      {/* 赔付模式 */} 
      <div className={`${info?.insurance && info?.insurance ? 'block' : 'hidden'}`}>
        <div className="h-1 bg-[#DDD9CD]"></div>
        <div className="flex items-center my-16">
          <div className="flex-1 text-[12px] font-[400] ">{t('206')}:</div>
          <Switch
            value={(info?.insurance && info?.insurance && tabIndex === 1) ? false : insurance}
            defaultChecked={insurance}
            disabled={info?.insurance && info?.insurance && tabIndex === 1}
            size={isMobile() ? "small" : "default"}
            onChange={(val: boolean) => {
              setInsurance(val);
            }}
          /> 
        </div>

      </div>
      {tabIndex === 0 ? (
        <div
          className="hover-effect bg-[#46C91B] text-[#fff] text-[18px] font-[600] text-center rounded-full py-10 cursor-pointer"
          onClick={() => {
            handleBuy();
          }}
        >
          {web3ModalAccount ? t("101") : t("0")}
        </div>
      ) : (
        <div
          className="hover-effect bg-[#D62727] text-[#fff] text-[18px] font-[600] text-center rounded-full py-10 cursor-pointer"
          onClick={() => {
            handleSell();
          }}
        >
          {web3ModalAccount ? t("102") : t("0")}
        </div>
      )}

      {/* 赔付模式 */}
      <div className={`${info?.insurance && info?.insurance ? 'block' : 'hidden'} mt-[24px]`}>  
        <div className="text-[#5F5F5F] text-[12px] text-center mb-4">
          {t('207')}
          <span className="text-[#FFFD41] ml-2">30%</span>
        </div>
        <div
          className="hover-effect bg-[#FFFD41] text-[#fff] text-[18px] font-[600] flex justify-center items-center rounded-full py-10 cursor-pointer"
          onClick={(e: any) => {
            e.preventDefault();
            e.stopPropagation();  
            setOpen2(true)
          }} 
        >
          {t('208')}
          <Popover
            content={<div className="w-[306px]">
              <div className="flex ">
                <div className=" text-[#5F5F5F] text-[12px] mr-4">1.</div>
                <div className="text-[#5F5F5F] text-[12px] leading-4">{t('209')}</div>
              </div>
              <div className="flex my-4">
                <div className=" text-[#5F5F5F] text-[12px] mr-4">2.</div>
                <div className="text-[#5F5F5F] text-[12px] leading-4">
                  {t('210')}
                  <div>{t('211')}</div>
                </div>
              </div>
              <div className="flex ">
                <div className=" text-[#5F5F5F] text-[12px] mr-4">3.</div>
                <div className="text-[#5F5F5F] text-[12px] leading-4">{t('212')}</div>
              </div>
            </div>}
            trigger="hover"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8.00005 2.30005C4.85205 2.30005 2.30005 4.85205 2.30005 8.00005C2.30005 11.148 4.85205 13.7 8.00005 13.7C11.148 13.7 13.7 11.148 13.7 8.00005C13.7 4.85205 11.148 2.30005 8.00005 2.30005ZM8.00005 3.30005C10.596 3.30005 12.7 5.40405 12.7 8.00005C12.7 10.596 10.596 12.7 8.00005 12.7C5.40405 12.7 3.30005 10.596 3.30005 8.00005C3.30005 5.40405 5.40405 3.30005 8.00005 3.30005Z" fill="white" />
              <path d="M7.99998 7.22363C8.34665 7.22363 8.51998 7.39697 8.51998 7.74363V10.4476C8.51998 10.7943 8.34665 10.9676 7.99998 10.9676C7.65331 10.9676 7.47998 10.7943 7.47998 10.4476V7.74363C7.47998 7.39697 7.65331 7.22363 7.99998 7.22363Z" fill="white" />
              <path d="M7.23999 5.79247C7.23999 5.99404 7.32006 6.18734 7.46259 6.32987C7.60512 6.4724 7.79843 6.55247 7.99999 6.55247C8.20156 6.55247 8.39486 6.4724 8.53739 6.32987C8.67992 6.18734 8.75999 5.99404 8.75999 5.79247C8.75999 5.59091 8.67992 5.3976 8.53739 5.25507C8.39486 5.11254 8.20156 5.03247 7.99999 5.03247C7.79843 5.03247 7.60512 5.11254 7.46259 5.25507C7.32006 5.3976 7.23999 5.59091 7.23999 5.79247Z" fill="white" />
            </svg>
          </Popover>
        </div>
      </div>

      {/* 弹框 */}
      <SwapConfigModal
        open={open}
        refreshTrades={() => {
          setMaxSlippage(
            Number(localStorage.getItem("maxSlippage") ?? defaultSlippage)
          );
          setOpen(!open);
        }}
      />
      {/* 赔款池 */}
      <PayoutPool
        open={open2}
        info={info}
        refreshTrades={() => {
          setOpen2(!open2);
        }}
      />
    </div>
  );
};

export default App;
