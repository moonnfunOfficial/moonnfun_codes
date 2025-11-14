import { notification, Pagination, Progress } from "antd";
import React, { useState } from "react";
import logo2 from "../../../assets/image/logo2.png";
import icon3 from "../../../assets/image/icon3.png";
import { truncateMiddle } from "../../../utils/truncateMiddle";
import NoData from "../../../components/NoData";
import {
  formatAmount,
  formatScientificNotation,
  getBit,
  NumSplic1,
  showLoding,
} from "../../../utils/tool";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { userFollow } from "../../../API";
import { wsBus } from "../../../utils/wsBus";
import { chainCoinName } from "../../coinName";

interface MyComponentProps {
  list: any;
  pageNum: number;
  total: number;
  callBack: (pageNum: number) => void;
}
const App: React.FC<MyComponentProps> = ({
  list,
  pageNum,
  total,
  callBack,
}) => {
  const { switchNetwork, chainId } = useAppKitNetwork(); 
  let { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { address: web3ModalAccount } = useAppKitAccount();
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

  return (
    <div>
      <div className="flex items-center mt-22 mb-14 px-16">
        <div className="flex-1 text-[#c8ca90] text-[14px] font-[500]">
          {t("129")}
        </div>
        <div
          className="w-[212px] text-[#c8ca90] text-[14px] font-[500]
        h5:w-[100px]"
        >
          {t("130")}
        </div>
        <div
          className="w-[212px] text-[#c8ca90] text-[14px] font-[500]
        h5:hidden"
        >
          {t("131")}
        </div>
        <div
          className="w-[212px] text-[#c8ca90] text-[14px] font-[500]
        h5:hidden"
        >
          {t("132")}
        </div>
        <div
          className="w-[250px] text-[#c8ca90] text-[14px] font-[500]
         h5:w-[80px]"
        >
          {t("133")}
        </div>
      </div>
      {list &&
        list.map((item: any, index: any) => (
          <div
            className="bg-[#1E1E1E] rounded-[12px] px-16 py-16 flex items-center mb-10 cursor-pointer"
            key={index}
            onClick={(e: any) => {
              navigate("/detail?address=" + item?.address);
            }}
          >
            <div className="flex-1 text-[#000] text-[12px] font-[500]">
              <div className="flex items-center">
                <div
                  className="w-[52px] h-[52px] mr-10 rounded-lg relative
                h5:w-[30px] h5:h-[30px] h5:mr-6"
                  style={{
                    backgroundImage: `url(${item?.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
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
                <div className="">
                  <div className="text-[#fff] text-[14px] font-[600] leading-[20px] pb-4 
                  h5:pb-2 h5:leading-[12px] h5:text-[12px]">
                    {item?.symbol && item?.symbol.length >= 16
                      ? item?.symbol?.slice(0, 16) + "..."
                      : item?.symbol}
                  </div>
                  <div className=" leading-[16px] h5:leading-[12px]">
                    <span className="text-[#5F5F5F] text-[14px] font-[400] pr-2 leading-[12px] h5:text-[11px]">
                      {t("94")}:
                    </span>
                    <span className="text-[14px] text-[#fff] leading-[12px] h5:text-[11px]">
                      {truncateMiddle(item?.address, 4, 4)}
                    </span>
                  </div>
                  <div className="flex items-center leading-[16px] h5:items-end h5:leading-[12px]">
                    <span className="text-[#5F5F5F] text-[14px] font-[400] pr-2 leading-[12px] h5:hidden">
                      {t("95")}:
                    </span>
                    <img
                      className="w-[15px] h-[15px] hidden h5:block"
                      src={icon3}
                      alt=""
                    />
                    <span className="text-[14px] text-[#fff] leading-[12px] h5:text-[11px]">
                      {truncateMiddle(item?.creator, 4, 4)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-[212px] text-[#fff] text-[14px] font-[500]
        h5:w-[100px]"
            > 
              {formatAmount(Number(item?.amount))}
            </div>
            <div
              className="w-[212px] text-[#fff] text-[14px] font-[500]
        h5:hidden"
            >
              {NumSplic1(formatScientificNotation(item?.avgPrice), 8)} {chainCoinName(chainId)}
            </div>
            <div
              className="w-[212px] text-[#fff] text-[14px] font-[500]
        h5:hidden"
            >
              ${formatAmount(Number(item?.virtualLiquidity))}
              {/* {Number(getBit(item?.virtualLiquidity)).toLocaleString()} */}
            </div>
            <div className="w-[250px] flex items-center h5:block h5:w-[80px]">
              <div className="w-[164px] h5:w-[80px]">
                <Progress
                  percent={item?.prograss}
                  size="small"
                  className="home-page"
                  status="active"
                  showInfo={false}
                  strokeColor="#FFFD41"
                  trailColor="#3D3D3D"
                />
              </div>
              <div className="text-[#FFFD41] text-[14px] font-[500] ml-12 h5:ml-0 h5:text-[12px]">
                ${formatAmount(Number(item?.marketCap))}
              </div>
            </div>
          </div>
        ))}
      {list?.length === 0 ? <NoData /> : null}
      <div className="mt-[40px] mb-[20px] text-center">
        <div
          className={`${
            total > 21 ? "flex justify-center" : "hidden"
            } mt-[20px] w-full`}
        >
          <Pagination
            current={pageNum}
            defaultPageSize={21}
            total={total}
            showSizeChanger={false}
            onChange={(page: any) => {
              callBack(page);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
