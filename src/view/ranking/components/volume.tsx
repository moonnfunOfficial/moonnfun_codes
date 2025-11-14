import React, { useEffect, useState } from "react";
import ranking1 from "../../../assets/image/ranking1.png";
import ranking2 from "../../../assets/image/ranking2.png";
import ranking3 from "../../../assets/image/ranking3.png";
import icon1 from "../../../assets/image/icon1.png";
import {
  formatAmount,
  getBit,
  getFormattedTime,
  showLoding,
} from "../../../utils/tool";
import { tokenList } from "../../../API";
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import NoData from "../../../components/NoData";
import { useTranslation } from "react-i18next";
import { SearchFiltering } from "../../../config";
import { useAppKitNetwork } from "@reown/appkit/react";

const App: React.FC = () => {
  let { t, i18n } = useTranslation();
  const [pageNum, setPageNum] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const { switchNetwork, chainId } = useAppKitNetwork();
  const handleGetList = async (num: number) => {
    showLoding(true);
    tokenList({
      order: "desc",
      offset: num,
      limit: 20,
      orderField: 1,
      page: "ranking",
    })
      .then((res: any) => {
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
      })
      .catch(() => {})
      .finally(() => {
        showLoding(false);
      });
  };
  useEffect(() => {
    handleGetList(pageNum);
  }, [chainId]);

  const navigate = useNavigate();
  return (
    <div
      className="flex-1 bg-[#1E1E1E] rounded-[20px] px-[40px] pt-[30px]
    h5:mr-0 h5:rounded-t-[0px] h5:px-[16px] h5:pt-[26px]
    "
    >
      <div
        className="text-[24px] font-[600] text-[#FFFD41] pb-16
      h5:hidden
      "
      >
        {t("53")}
      </div>
      {list?.map((item: any, index: number) => {
        return (
          <div
            className="flex items-center mb-20 cursor-pointer
          h5:mb-[26px]
          "
            key={index}
            onClick={(e: any) => {
              navigate("/detail?address=" + item?.address);
            }}
          >
            {index <= 2 ? (
              <img
                src={
                  index === 0
                    ? ranking1
                    : index === 1
                    ? ranking2
                    : index === 2
                    ? ranking3
                    : ""
                }
                className="w-[24px]"
                alt=""
              />
            ) : (
                <span className="text-[#FFFD41] text-[14px] font-[600] w-[24px] text-center">
                {index + 1}
              </span>
            )}
            <div
              className="w-[60px] h-[60px] mx-16 rounded-[12px]
            h5:w-[44px] h5:h-[44px] h5:mx-8 
            "
              style={{
                backgroundImage: `url(${item?.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="flex-1">
              <div className="text-[16px] font-[600] text-[#fff]">
                {/* ${formatAmount(item?.supply)} */}
                {item?.symbol && item?.symbol.length >= 16
                  ? item?.symbol?.slice(0, 16) + "..."
                  : item?.symbol}
              </div>
              <div className="flex items-center text-[#5F5F5F] text-[12px]">
                <div className="whitespace-nowrap text-[#5F5F5F] text-[12px] mr-2">
                  {t("54")}:{" "}
                </div>
                ${Number(getBit(item?.marketCap)).toLocaleString()}
              </div>
              {/* <div className="text-[14px] font-[500] text-[#62573A]">{item?.symbol}</div> */}
            </div>
            <div className="">
              <div className="text-[16px] font-[600] text-[#fff] text-right">
                ${formatAmount(item?.volume24)}
              </div>
              <div
                className="text-[14px] text-[#5F5F5F] text-right
              h5:text-[12px]"
              >
                {t("55")}
              </div>
            </div>
          </div>
        );
      })}
      {list.length === 0 ? (
        <div className="h5:pb-[26px]">
          <NoData />
        </div>
      ) : null}

      <div
        className={`${
          total > 20 ? "hidden" : "hidden"
        } mt-[40px] mb-[20px] text-center`}
      >
        <div className={`text-center mt-[20px] w-full`}>
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
    </div>
  );
};

export default App;
