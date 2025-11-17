import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import icon4 from "../../../assets/image/icon4.png";
import { tradeList } from "../../../API";
import { getQueryParam } from "../../../utils/getUrlParamsLegacy";
import { useWeb3React } from "@web3-react/core";
import NoData from "../../../components/NoData";
import { truncateMiddle } from "../../../utils/truncateMiddle";
import {
  formatAmount,
  formatScientificNotation,
  getBit,
  NumSplic1,
  showLoding,
  timestampToDateString,
} from "../../../utils/tool";
import { browserUrl } from "../../../config";
import { useTranslation } from "react-i18next";
import { chainCoinName } from "../../coinName";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";

interface MyComponentProps {
  refreshTrades: any;
  info: any;
}
const App: React.FC<MyComponentProps> = ({ refreshTrades, info }) => {
  const { switchNetwork, chainId } = useAppKitNetwork(); 
  const web3React = useWeb3React();
  const [pageNum, setPageNum] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  let { t, i18n } = useTranslation();
  const { address: web3ModalAccount } = useAppKitAccount();
  const handleGetFriends = async (num: number) => {
    try {
      await tradeList({
        address: getQueryParam("address"),
        offset: num,
        limit: 20,
      })
        .then((res: any) => {
          setList(res?.data?.data);
          setTotal(res.data?.total);

          if (res?.data?.data?.length > 0) {
            const _add1 = res?.data?.data[0]?.wallet
            const _add2: any = web3ModalAccount
            if (_add1.toLowerCase() === _add2.toLowerCase()) {
              showLoding(false); 
            }
          }
        })
        .catch(() => {});
    } catch (error) {}
  };
  useEffect(() => {
    handleGetFriends(1);
  }, [web3ModalAccount, refreshTrades]);
  return (
    <div className="">
      <div>
        <div className="flex items-center mt-20 mb-14 px-16 ">
          <div
            className="w-[110px] text-[#cacac9] text-[12px] font-[500]
          h5:w-[100px]"
          >
            {t("107")}
          </div>
          <div
            className="w-[70px] text-[#cacac9] text-[12px] font-[500]
          h5:hidden
          "
          >
            {t("108")}
          </div>
          <div
            className="w-[135px] text-[#cacac9] text-[12px] font-[500]
          h5:hidden
          "
          >
            {t("109")}({chainCoinName(chainId)})
          </div>
          <div
            className="w-[135px] text-[#cacac9] text-[12px] font-[500] 
          h5:flex-1
          "
          >
            {chainCoinName(chainId)}
          </div>
          <div className="flex-1 text-[#cacac9] text-[12px] font-[500]">
            {info?.symbol && info?.symbol.length >= 16
              ? info?.symbol?.slice(0, 16) + "..."
              : info?.symbol}
          </div>
          <div
            className="w-[110px] text-[#cacac9] text-[12px] font-[500]
              h5:w-[90px]
              "
          >
            {t("110")}
          </div>
          <div
            className="w-[90px] text-[#cacac9] text-[12px] font-[500]
          h5:hidden
          "
          >
            {t("111")}
          </div>
        </div>
        {list && list.length === 0 ? <NoData /> : null}
        <div className="h-[520px] overflow-y-auto detailList">
          {list &&
            list.map((item: any, index: number) => (
              <div
                className="bg-[#1E1E1E] rounded-[12px] px-16 py-18 flex items-center mb-10 relative"
                key={index}
              > 
                {
                  item?.insurance ? <div className="absolute right-0 top-[0px] w-[57px] h-[57px] 
                pt-4
                rounded-tr-[10px] rounded-br-[10px] text-right font-[600]  text-[#fff] text-[14px]"
                  style={{
                    background: `url(${icon4}) no-repeat center`,
                    paddingRight: i18n.language === "en" ? '0px' : "4px",
                  }}
                >
                  {t('213')}
                  </div> : ''
                }

                <div
                  className="w-[110px] text-[#fff] text-[14px] font-[500]
                h5:w-[100px]"
                >
                  {item?.wallet ? truncateMiddle(item?.wallet, 4, 4) : ""}
                </div>
                <div
                  className="w-[70px] text-[#D62727] text-[14px] font-[500]
          h5:hidden
          "
                  style={{
                    color: item?.buy ? "#46C91B" : "#D62727",
                  }}
                >
                  {item?.buy ? "BUY" : "SELL"}
                </div>
                <div
                  className="w-[135px] text-[#46C91B] text-[14px] font-[500]
          h5:hidden
          "
                  style={{
                    color: item?.buy ? "#46C91B" : "#D62727",
                  }}
                >
                  {NumSplic1(formatScientificNotation(item?.price), 8)}
                </div>
                <div
                  className="w-[135px] text-[#46C91B] text-[14px] font-[500]
          h5:flex-1
          "
                  style={{
                    color: item?.buy ? "#46C91B" : "#D62727",
                  }}
                >
                  {NumSplic1(
                    formatScientificNotation(item?.quoteAmount),
                    Number(item?.quoteAmount) > 0.1 ? 3 : 5
                  )}
                </div>
                <div
                  className="flex-1 text-[#46C91B] text-[14px] font-[500]"
                  style={{
                    color: item?.buy ? "#46C91B" : "#D62727",
                  }}
                >
                  {Number(item?.amount) < 1000
                    ? NumSplic1(Number(item?.amount), 3)
                    : formatAmount(Number(item?.amount))}
                </div>
                <div
                  className="w-[110px] text-[#46C91B] text-[14px] font-[500]
              h5:w-[90px]
              "
                  style={{
                    color: item?.buy ? "#46C91B" : "#D62727",
                  }}
                >
                  {item?.timestamp
                    ? timestampToDateString(item?.timestamp)
                    : ""}
                </div>
                <div
                  className="w-[90px]
          h5:hidden
          "
                >
                  <a
                    href={`${browserUrl}/tx/${item?.txhash}`}
                    className="text-[#fff] text-[14px] font-[500] hover:text-[#FFFD41]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item?.wallet ? truncateMiddle(item?.txhash, 4, 4) : ""}
                    {/* <img src={juChain} className='w-[96px] rounded-lg cursor-pointer' alt="" /> */}
                  </a>
                </div>
              </div>
            ))}
        </div>
        <div className="mt-[20px] mb-[20px] text-center">
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
                handleGetFriends(page);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
