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
        <div className="text-[#62573A] text-[14px] font-[500]">
          {t("66")}(USD)
        </div>
        <div className="flex items-center mb-24 mt-6">
          <div className="flex items-center bg-[#fff] rounded-full px-12 py-6 text-[#DCD8CB] text-[14px] font-[500]">
            <input
              type="text"
              value={marketCap1}
              onChange={(e) => setMarketCap1(e.target.value)}
              className="w-[76px] text-[#62573A] text-[14px] font-[600]"
              placeholder={t("67")}
            />
            K
          </div>
          <div className="text-[#62573A] text-[14px] font-[500] mx-8">
            {t("66_1")}
          </div>
          <div className="flex items-center bg-[#fff] rounded-full px-12 py-6 text-[#DCD8CB] text-[14px] font-[500]">
            <input
              type="text"
              value={marketCap2}
              onChange={(e) => setMarketCap2(e.target.value)}
              className="w-[76px] text-[#62573A] text-[14px] font-[600]"
              placeholder={t("68")}
            />
            K
          </div>
        </div>
      </div>
      <div>
        <div className="text-[#62573A] text-[14px] font-[500]">
          {t("69")}(USD)
        </div>
        <div className="flex items-center mb-24 mt-6">
          <div className="flex items-center bg-[#fff] rounded-full px-12 py-6 text-[#DCD8CB] text-[14px] font-[500]">
            <input
              type="text"
              value={volume1}
              onChange={(e) => setVolume1(e.target.value)}
              className="w-[76px] text-[#62573A] text-[14px] font-[600]"
              placeholder={t("67")}
            />
            K
          </div>
          <div className="text-[#62573A] text-[14px] font-[500] mx-8">
            {t("66_1")}
          </div>
          <div className="flex items-center bg-[#fff] rounded-full px-12 py-6 text-[#DCD8CB] text-[14px] font-[500]">
            <input
              type="text"
              value={volume2}
              onChange={(e) => setVolume2(e.target.value)}
              className="w-[76px] text-[#62573A] text-[14px] font-[600]"
              placeholder={t("68")}
            />
            K
          </div>
        </div>
      </div>
      <div>
        <div className="text-[#62573A] text-[14px] font-[500]">{t("70")}</div>
        <div className="flex items-center mb-24 mt-6">
          <div className="flex items-center bg-[#fff] rounded-full px-12 py-6 text-[#DCD8CB] text-[14px] font-[500]">
            <input
              type="text"
              value={holders1}
              onChange={(e) => setHolders1(e.target.value)}
              className="w-[82px] text-[#62573A] text-[14px] font-[600]"
              placeholder={t("67")}
            />
          </div>
          <div className="text-[#62573A] text-[14px] font-[500] mx-8">
            {t("66_1")}
          </div>
          <div className="flex items-center bg-[#fff] rounded-full px-12 py-6 text-[#DCD8CB] text-[14px] font-[500]">
            <input
              type="text"
              value={holders2}
              onChange={(e) => setHolders2(e.target.value)}
              className="w-[82px] text-[#62573A] text-[14px] font-[600]"
              placeholder={t("68")}
            />
          </div>
        </div>
      </div>
      <div
        className="text-[#F47126] text-[14px] font-[600] text-center cursor-pointer"
        onClick={handleClearAll}
      >
        {t("71")}
      </div>
      <div className="flex items-center justify-between mt-24">
        <div
          className="hover-effect cursor-pointer text-[#fff] text-[14px] font-[600] bg-[#999] rounded-full px-[32px] py-8"
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
          className="hover-effect cursor-pointer text-[#fff] text-[14px] font-[600] bg-[#F47126] rounded-full px-[32px] py-8"
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
      launch: 80,
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
  useEffect(() => {
    handleGetList(pageNum);
  }, [buyNum]);

  useEffect(() => {
    wsBus.on("upAdvancedList", () => {
      handleGetList(pageNum);
    });
    return () => wsBus.off("upAdvancedList");
  }, []);

  const [openPopover, setOpenPopover] = useState(false);

  return (
    <div className="w-[386px] mr-10 h5:flex-1">
      <div className="bg-[#FBF8EF] rounded-[20px] px-[20px] pt-[26px] pb-[20px] w-[386px] h5:w-auto h5:ml-15 h5:pt-[60px] h5:px-[16px]">
        <div className="flex items-center pb-16 h5:pb-0">
          <div className="flex-1 text-[24px] font-[600] text-[#F47126] h5:hidden">
            {t("170")}
          </div>
          <div className="flex-1 text-[24px] font-[600] text-[#F47126] hidden h5:block"></div>
          <svg
            onClick={() => {
              handleGetList(1);
            }}
            className="cursor-pointer h5:w-[16px]"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M20.9931 9.17365H16.9471C16.8244 9.17367 16.7029 9.14953 16.5896 9.1026C16.4763 9.05567 16.3733 8.98687 16.2865 8.90014C16.1998 8.81341 16.131 8.71044 16.084 8.59711C16.0371 8.48378 16.0129 8.36232 16.0129 8.23965C16.0129 8.11698 16.0371 7.99552 16.084 7.88219C16.131 7.76886 16.1998 7.66589 16.2865 7.57916C16.3733 7.49243 16.4763 7.42363 16.5896 7.3767C16.7029 7.32977 16.8244 7.30563 16.9471 7.30565H18.5721C17.8263 6.24731 16.8368 5.38385 15.6873 4.78811C14.5378 4.19237 13.2618 3.88182 11.9671 3.88265C10.3667 3.88285 8.80227 4.3576 7.47168 5.24688C6.14109 6.13616 5.10407 7.40003 4.49176 8.87867C3.87945 10.3573 3.71934 11.9843 4.03169 13.5539C4.34403 15.1236 5.1148 16.5653 6.24653 17.6969C7.37825 18.8285 8.82011 19.5991 10.3898 19.9112C11.9594 20.2234 13.5864 20.0631 15.065 19.4506C16.5435 18.8381 17.8073 17.8009 18.6964 16.4702C19.5855 15.1395 20.0601 13.5751 20.0601 11.9746C20.056 11.8495 20.0771 11.7248 20.1222 11.6079C20.1672 11.4911 20.2353 11.3845 20.3224 11.2945C20.4095 11.2046 20.5138 11.133 20.6291 11.0841C20.7444 11.0353 20.8684 11.0101 20.9936 11.0101C21.1188 11.0101 21.2428 11.0353 21.3581 11.0841C21.4734 11.133 21.5776 11.2046 21.6647 11.2945C21.7518 11.3845 21.8199 11.4911 21.865 11.6079C21.9101 11.7248 21.9312 11.8495 21.9271 11.9746C21.9271 17.4747 17.4671 21.9347 11.9671 21.9347C6.46708 21.9347 2.00708 17.4747 2.00708 11.9746C2.00708 6.47465 6.46708 2.01465 11.9671 2.01465C13.5506 2.0139 15.1114 2.39181 16.5192 3.11686C17.927 3.8419 19.1411 4.89306 20.0601 6.18265V4.50465C20.056 4.37949 20.0771 4.25478 20.1222 4.13795C20.1672 4.02111 20.2353 3.91453 20.3224 3.82455C20.4095 3.73456 20.5138 3.66301 20.6291 3.61414C20.7444 3.56527 20.8684 3.54009 20.9936 3.54009C21.1188 3.54009 21.2428 3.56527 21.3581 3.61414C21.4734 3.66301 21.5776 3.73456 21.6647 3.82455C21.7518 3.91453 21.8199 4.02111 21.865 4.13795C21.9101 4.25478 21.9312 4.37949 21.9271 4.50465V8.23965C21.9271 8.48736 21.8287 8.72493 21.6535 8.90009C21.4784 9.07525 21.2408 9.17365 20.9931 9.17365Z"
              fill="#62573A"
            />
          </svg>
          <Popover
            content={_content}
            color="#FDFBF5"
            trigger="hover"
            open={openPopover}
            onOpenChange={(open) => {
              setOpenPopover(open);
            }}
          >
            <svg
              className="ml-10 cursor-pointer h5:w-[16px]"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21.7012 4.96004C21.682 4.98643 21.6364 5.0128 21.6125 5.03438L15.8181 10.7808V20.2182C15.8181 21.3046 14.9859 22.1872 13.8971 22.1872C13.3934 22.1872 12.9665 21.9953 12.5996 21.65C12.5727 21.6327 12.5478 21.6126 12.5252 21.59L10.9136 19.9975C10.7145 19.8009 10.7121 19.4819 10.9088 19.2804L11.5947 18.5897C11.7889 18.4002 12.1007 18.3978 12.2974 18.5873L13.77 20.1126C13.7915 20.1318 13.8011 20.151 13.8275 20.175C13.8131 16.1242 13.8083 11.3012 13.8083 10.3371V10.1668C13.8083 10.0325 13.9282 9.89579 14.0242 9.80225L20.2166 3.66256C20.2334 3.64095 20.2526 3.581 20.2718 3.581H3.74737C3.76657 3.581 3.76415 3.63856 3.77855 3.66015L9.88228 9.81184C9.97821 9.90777 9.98779 10.0349 9.98779 10.1692V14.2056C9.98779 14.2104 10.0022 14.2176 10.0022 14.2224C9.99021 14.7692 9.5633 15.2033 9.02608 15.2033C8.47926 15.2033 7.97562 14.7572 7.97562 14.2104V10.7808L2.29399 5.0248C2.27243 5.00321 2.30838 4.96723 2.2916 4.94323C1.94383 4.57152 1.74958 4.08226 1.75197 3.5738C1.75197 2.48738 2.63456 1.56641 3.71862 1.56641H20.303C20.8282 1.56641 21.3223 1.80866 21.694 2.18037C22.0657 2.55212 22.2576 3.06538 22.2576 3.59061C22.2528 4.09663 22.049 4.59308 21.7012 4.96004ZM9.09804 15.6062C9.7024 15.6278 10.1749 16.1338 10.1533 16.7382C10.1341 17.3138 9.67123 17.7743 9.09804 17.7935C8.49366 17.7719 8.02118 17.2658 8.04276 16.6614C8.06196 16.0883 8.52244 15.6254 9.09804 15.6062Z"
                fill="#62573A"
              />
            </svg>
          </Popover>
        </div>

        <Lists
          list={list}
          buyNum={buyNum}
          RefreshBack={() => {
            handleGetList(pageNum);
          }}
          isOk={false}
        />
      </div>
      <div className="mt-[30px] mb-[20px] text-center"
        style={{
          display: total > 20 ? 'block' : 'none'
        }}>
        <div
          className={`${
            total > 20 ? "flex" : "hidden"
          }  justify-center text-center mt-[20px] w-full`}
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
