import { Modal, notification, Pagination, Popover, Progress } from "antd";
import React, { useEffect, useState } from "react";
import bnbIcon from "../../../assets/image/julogo.png";
import icon1 from "../../../assets/image/icon1.png";
import SwapConfigModal from "../../../components/swapConfigModal";
import { formatAmount, scrollToTop, showLoding } from "../../../utils/tool";
import { tokenList, tokenSearch } from "../../../API";
import { truncateMiddle } from "../../../utils/truncateMiddle";
import copy from "copy-to-clipboard";
import { useWeb3React } from "@web3-react/core";
import { Contracts } from "../../../web3";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Lists from "./list";
import { useTranslation } from "react-i18next";
import { wsBus } from "../../../utils/wsBus";
import { SearchFiltering } from "../../../config";
import { useAppKitNetwork } from "@reown/appkit/react";
dayjs.extend(relativeTime);

interface MyComponentProps {
  buyNum: any;
  tabIndex: number;
}
const App: React.FC<MyComponentProps> = ({ buyNum, tabIndex }) => {
  let { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleClearAll = () => {
    setMarketCap1("");
    setMarketCap2("");
    setVolume1("");
    setVolume2("");
    setHolders1("");
    setHolders2("");
  };
  const handleSearch = () => {
    const popover: any = document.getElementsByClassName("ant-popover")[1];
    if (popover) {
      // popover.style.left = '-1000px';
      setOpenPopover(!openPopover);
    }
    handleGetList(1);
  };
  const [marketCap1, setMarketCap1] = useState<any>("");
  const [marketCap2, setMarketCap2] = useState<any>("");
  const [volume1, setVolume1] = useState<any>("");
  const [volume2, setVolume2] = useState<any>("");
  const [holders1, setHolders1] = useState<any>("");
  const [holders2, setHolders2] = useState<any>("");
  const _content = (
    <div className="p-6">
      <div>
        <div className="text-[#0E0E0E] text-[14px] font-[500]">
          {t("66")}(USD)
        </div>
        <div className="flex items-center mb-24 mt-6">
          <div className="flex items-center bg-[#DBDBB6] rounded-full px-12 py-6 text-[#DCD8CB] text-[14px] font-[500]">
            <input
              type="text"
              value={marketCap1}
              onChange={(e) => setMarketCap1(e.target.value)}
              className="w-[76px] text-[#0E0E0E] text-[14px] font-[600] bg-transparent"
              placeholder={t("67")}
            />
            K
          </div>
          <div className="text-[#0E0E0E] text-[14px] font-[500] mx-8">
            {t("66_1")}
          </div>
          <div className="flex items-center bg-[#DBDBB6] rounded-full px-12 py-6 text-[#0E0E0E] text-[14px] font-[500]">
            <input
              type="text"
              value={marketCap2}
              onChange={(e) => setMarketCap2(e.target.value)}
              className="w-[76px] text-[#0E0E0E] text-[14px] font-[600] bg-transparent"
              placeholder={t("68")}
            />
            K
          </div>
        </div>
      </div>
      <div>
        <div className="text-[#0E0E0E] text-[14px] font-[500]">
          {t("69")}(USD)
        </div>
        <div className="flex items-center mb-24 mt-6">
          <div className="flex items-center bg-[#DBDBB6] rounded-full px-12 py-6 text-[#0E0E0E] text-[14px] font-[500]">
            <input
              type="text"
              value={volume1}
              onChange={(e) => setVolume1(e.target.value)}
              className="w-[76px] text-[#0E0E0E] text-[14px] font-[600] bg-transparent"
              placeholder={t("67")}
            />
            K
          </div>
          <div className="text-[#0E0E0E] text-[14px] font-[500] mx-8">
            {t("66_1")}
          </div>
          <div className="flex items-center bg-[#DBDBB6] rounded-full px-12 py-6 text-[#0E0E0E] text-[14px] font-[500]">
            <input
              type="text"
              value={volume2}
              onChange={(e) => setVolume2(e.target.value)}
              className="w-[76px] text-[#0E0E0E] text-[14px] font-[600] bg-transparent"
              placeholder={t("68")}
            />
            K
          </div>
        </div>
      </div>
      <div>
        <div className="text-[#0E0E0E] text-[14px] font-[500]">{t("70")}</div>
        <div className="flex items-center mb-24 mt-6">
          <div className="flex items-center bg-[#DBDBB6] rounded-full px-12 py-6 text-[#0E0E0E] text-[14px] font-[500]">
            <input
              type="text"
              value={holders1}
              onChange={(e) => setHolders1(e.target.value)}
              className="w-[82px] text-[#0E0E0E] text-[14px] font-[600] bg-transparent"
              placeholder={t("67")}
            />
          </div>
          <div className="text-[#0E0E0E] text-[14px] font-[500] mx-8">
            {t("66_1")}
          </div>
          <div className="flex items-center bg-[#DBDBB6] rounded-full px-12 py-6 text-[#0E0E0E] text-[14px] font-[500]">
            <input
              type="text"
              value={holders2}
              onChange={(e) => setHolders2(e.target.value)}
              className="w-[82px] text-[#0E0E0E] text-[14px] font-[600] bg-transparent"
              placeholder={t("68")}
            />
          </div>
        </div>
      </div>
      <div
        className="text-[#46C91B] text-[14px] font-[600] text-center cursor-pointer"
        onClick={handleClearAll}
      >
        {t("71")}
      </div>
      <div className="flex items-center justify-between mt-24">
        <div
          className="hover-effect cursor-pointer text-[#fff] text-[14px] font-[600] bg-[#BABAA0] rounded-full px-[32px] py-8"
          onClick={() => {
            const popover: any =
              document.getElementsByClassName("ant-popover")[0];
            if (popover) {
              // popover.style.left = '-1000px';
              setOpenPopover(!openPopover);
            }
          }}
        >
          {t("72")}
        </div>
        <div
          onClick={handleSearch}
          className="hover-effect cursor-pointer text-[#fff] text-[14px] font-[600] bg-[#46C91B] rounded-full px-[32px] py-8"
        >
          {t("73")}
        </div>
      </div>
    </div>
  );
  const [pageNum, setPageNum] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const handleGetList = async (num: number) => {
    showLoding(true);

    const _rangeParams = {
      marketCap: {
        rangeStart: marketCap1,
        rangeEnd: marketCap2,
      },
      volume: {
        rangeStart: volume1,
        rangeEnd: volume2,
      },
      holders: {
        rangeStart: holders1,
        rangeEnd: holders2,
      },
    };
    const jsonString = JSON.stringify(_rangeParams);
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(jsonString);
    const _range = Array.from(encodedData)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
    // const queryString = Object.entries(_rangeParams)
    //   .flatMap(([key, value]) => [
    //     `${key}[rangeStart]=${value.rangeStart}`,
    //     `${key}[rangeEnd]=${value.rangeEnd}`,
    //   ])
    //   .join("&");
    // const _range = encodeURIComponent(queryString);
    tokenSearch({
      offset: num,
      limit: 20,
      launch: "true",
      rangeParams: _range,
    })
      .then((res: any) => {
        if (!res.error) {
          const list = res.data?.data || []; 
          const sortedList = list.sort((a: any, b: any) => {
            const isAFeige = SearchFiltering.test(a.symbol);
            const isBFeige = SearchFiltering.test(b.symbol);

            if (isAFeige && !isBFeige) return 1;
            if (!isAFeige && isBFeige) return -1;
            return 0;
          });
          setList(sortedList);
          // setList(res.data?.data);
          setTotal(res.data?.total);
          scrollToTop();
        }
      })
      .catch(() => {})
      .finally(() => {
        showLoding(false);
      });
  };
  const { switchNetwork, chainId } = useAppKitNetwork(); 
  useEffect(() => {
    handleGetList(pageNum);
  }, [buyNum, chainId]);

  useEffect(() => {
    wsBus.on("upAdvancedList", () => {
      handleGetList(pageNum);
    });
    return () => wsBus.off("upAdvancedList");
  }, []);

  const [openPopover, setOpenPopover] = useState(false);

  return (
    <div className="w-[386px] h5:flex-1">
      <div className=" bg-[#1E1E1E] rounded-[20px] px-[20px] pt-[26px] pb-[20px] w-[386px] h5:w-auto h5:ml-15 h5:pt-[60px] h5:px-[16px]">
        <div className="flex items-center pb-16 h5:pb-0">
          <div className="flex-1 text-[24px] font-[600] text-[#FFFD41] h5:hidden">
            {t("146")}
          </div>
          <div className="flex-1 text-[24px] font-[600] text-[#FFFD41] hidden h5:block"></div>
          <svg
            onClick={() => {
              handleGetList(1);
            }}
            className="cursor-pointer h5:w-[16px]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20.9928 9.17463H16.9468C16.8242 9.17465 16.7027 9.1505 16.5894 9.10357C16.476 9.05664 16.373 8.98785 16.2863 8.90112C16.1996 8.81438 16.1307 8.71141 16.0838 8.59809C16.0369 8.48476 16.0127 8.36329 16.0127 8.24063C16.0127 8.11796 16.0369 7.99649 16.0838 7.88317C16.1307 7.76984 16.1996 7.66687 16.2863 7.58014C16.373 7.4934 16.476 7.42461 16.5894 7.37768C16.7027 7.33075 16.8242 7.30661 16.9468 7.30663H18.5718C17.826 6.24829 16.8366 5.38483 15.6871 4.78909C14.5375 4.19335 13.2616 3.8828 11.9668 3.88363C10.3664 3.88382 8.80202 4.35858 7.47143 5.24786C6.14084 6.13714 5.10383 7.40101 4.49152 8.87965C3.8792 10.3583 3.7191 11.9853 4.03144 13.5549C4.34379 15.1245 5.11456 16.5663 6.24628 17.6979C7.37801 18.8295 8.81987 19.6001 10.3895 19.9122C11.9592 20.2244 13.5862 20.0641 15.0647 19.4516C16.5433 18.8391 17.807 17.8019 18.6962 16.4712C19.5853 15.1405 20.0598 13.576 20.0598 11.9756C20.0557 11.8505 20.0769 11.7258 20.1219 11.6089C20.167 11.4921 20.2351 11.3855 20.3222 11.2955C20.4093 11.2055 20.5136 11.134 20.6289 11.0851C20.7442 11.0363 20.8681 11.0111 20.9933 11.0111C21.1186 11.0111 21.2425 11.0363 21.3578 11.0851C21.4731 11.134 21.5774 11.2055 21.6645 11.2955C21.7516 11.3855 21.8197 11.4921 21.8647 11.6089C21.9098 11.7258 21.9309 11.8505 21.9268 11.9756C21.9268 17.4756 17.4668 21.9356 11.9668 21.9356C6.46684 21.9356 2.00684 17.4756 2.00684 11.9756C2.00684 6.47563 6.46684 2.01563 11.9668 2.01563C13.5504 2.01488 15.1112 2.39279 16.519 3.11783C17.9268 3.84287 19.1408 4.89403 20.0598 6.18363V4.50563C20.0557 4.38047 20.0769 4.25576 20.1219 4.13893C20.167 4.02209 20.2351 3.91551 20.3222 3.82552C20.4093 3.73554 20.5136 3.66399 20.6289 3.61512C20.7442 3.56625 20.8681 3.54107 20.9933 3.54107C21.1186 3.54107 21.2425 3.56625 21.3578 3.61512C21.4731 3.66399 21.5774 3.73554 21.6645 3.82552C21.7516 3.91551 21.8197 4.02209 21.8647 4.13893C21.9098 4.25576 21.9309 4.38047 21.9268 4.50563V8.24063C21.9268 8.48834 21.8284 8.72591 21.6533 8.90106C21.4781 9.07622 21.2405 9.17463 20.9928 9.17463Z" fill="#5F5F5F" />
          </svg>
          <Popover
            content={_content}
            color="#FFFFE7"
            trigger="hover"
            open={openPopover}
            onOpenChange={(open) => {
              setOpenPopover(open);
            }}
          >
            <svg
              className="ml-10 cursor-pointer h5:w-[16px]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M21.7012 4.96004C21.682 4.98643 21.6364 5.0128 21.6125 5.03438L15.8181 10.7808V20.2182C15.8181 21.3046 14.9859 22.1872 13.8971 22.1872C13.3934 22.1872 12.9665 21.9953 12.5996 21.65C12.5727 21.6327 12.5478 21.6126 12.5252 21.59L10.9136 19.9975C10.7145 19.8009 10.7121 19.4819 10.9088 19.2804L11.5947 18.5897C11.7889 18.4002 12.1007 18.3978 12.2974 18.5873L13.77 20.1126C13.7915 20.1318 13.8011 20.151 13.8275 20.175C13.8131 16.1242 13.8083 11.3012 13.8083 10.3371V10.1668C13.8083 10.0325 13.9282 9.89579 14.0242 9.80225L20.2166 3.66256C20.2334 3.64095 20.2526 3.581 20.2718 3.581H3.74737C3.76657 3.581 3.76415 3.63856 3.77855 3.66015L9.88228 9.81184C9.97821 9.90777 9.98779 10.0349 9.98779 10.1692V14.2056C9.98779 14.2104 10.0022 14.2176 10.0022 14.2224C9.99021 14.7692 9.5633 15.2033 9.02608 15.2033C8.47926 15.2033 7.97562 14.7572 7.97562 14.2104V10.7808L2.29399 5.0248C2.27243 5.00321 2.30838 4.96723 2.2916 4.94323C1.94383 4.57152 1.74958 4.08226 1.75197 3.5738C1.75197 2.48738 2.63456 1.56641 3.71862 1.56641H20.303C20.8282 1.56641 21.3223 1.80866 21.694 2.18037C22.0657 2.55212 22.2576 3.06538 22.2576 3.59061C22.2528 4.09663 22.049 4.59308 21.7012 4.96004ZM9.09804 15.6062C9.7024 15.6278 10.1749 16.1338 10.1533 16.7382C10.1341 17.3138 9.67123 17.7743 9.09804 17.7935C8.49366 17.7719 8.02118 17.2658 8.04276 16.6614C8.06196 16.0883 8.52244 15.6254 9.09804 15.6062Z" fill="#5F5F5F" />
            </svg>
          </Popover>  
        </div>

        <Lists
          list={list}
          buyNum={buyNum}
          RefreshBack={() => {
            handleGetList(pageNum);
          }}
          isOk={true}
        />
      </div>
      <div className="mt-[30px] mb-[20px] text-center"
        style={{
          display: total > 20 ? 'block' : 'none'
        }}>
        <div
          className={`${
            total > 20 ? "flex" : "hidden"
          } justify-center text-center mt-[20px] w-full`}
        >
          <Pagination
            current={pageNum}
            defaultPageSize={20}
            total={total}
            showSizeChanger={false}
            onChange={(page: any) => {
              setPageNum(page);
              handleGetList(page);
            }}
          />
        </div>
      </div>
      {/* 弹框 */}
      <SwapConfigModal open={open} refreshTrades={() => setOpen(!open)} />
    </div>
  );
};

export default App;
