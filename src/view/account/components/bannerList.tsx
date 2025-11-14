import { Pagination, Progress } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ApplyBannerList } from "../../../API";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { formatTimestamp, isMobile } from "../../../utils/tool";
import NoData from "../../../components/NoData";
import { chainCoinName } from "../../coinName";

interface MyComponentProps {
  data?: any;
}
const App: React.FC<MyComponentProps> = ({ data }) => {
  const [pageNum, setPageNum] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const { switchNetwork, chainId } = useAppKitNetwork(); 
  const { address: web3ModalAccount } = useAppKitAccount();
  const handleList = async () => {
    try {
      await ApplyBannerList({
        address: web3ModalAccount,
      })
        .then((res: any) => {
          setList(res.data);

          // setList([{
          //   bannerImageUrl: '',
          //   createdAt: '',
          //   remain: '',
          //   status: 'removed'
          // }]);
          // setTotal(res.data?.total);
        })
        .catch(() => {});
    } catch (error) {}
  };
  let { t, i18n } = useTranslation();
  useEffect(() => {
    if (web3ModalAccount) {
      handleList();
    }
  }, [web3ModalAccount]);

  const millisecondsToHM = (milliseconds: number) => {
    // Convert milliseconds to seconds first
    const totalSeconds = Math.floor(milliseconds / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const remainingSeconds = totalSeconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);

    // Format with ** emphasis as requested and using translation function
    return `${hours}${t("178")} ${minutes}${t("179")}`;
  };
  return (
    <div className="mt-[30px] h5:mt-20">
      <div
        className=" items-center px-20 mb-12"
        style={{
          display: isMobile() ? "none" : "flex",
        }}
      >
        <div className="w-[230px] text-[#c8ca90]">{t("183")}</div>
        <div className="flex-1 text-[#c8ca90] text-[14px]">{t("184")}</div>
        <div className="flex-1 text-[#c8ca90] text-[14px]">{t("185")}</div>
        <div className="flex-1 text-[#c8ca90] text-[14px]">{t("186")}</div>
        <div className="flex-1 text-[#c8ca90] text-[14px]">{t("187")}</div>
      </div>
      {list && list.length > 0 ? (
        list.map((item: any, index: number) => (
          <div className="" key={index}>
            {isMobile() ? (
              <div className="bg-[#1E1E1E] p-10 rounded-[12px] mb-10">
                <div
                  className="h-[92px] rounded-[12px]"
                  style={{
                    backgroundImage: `url(${item?.bannerImageUrl})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="text-[#fff] text-[14px] flex items-center pt-[8px]">
                  {t("184")}
                  <div className="flex-1 text-[#fff] text-[14px] font-[600] text-right">
                    {formatTimestamp(item?.createdAt)}
                  </div>
                </div>
                <div className="text-[#62573A] text-[14px] flex items-center pt-[8px]">
                  {t("185")}
                  <div className="flex-1 text-[#fff] text-[14px] font-[600] text-right">
                    {item?.remain > 0 ? millisecondsToHM(item?.remain) : "--"}
                  </div>
                </div>
                <div className="text-[#fff] text-[14px] flex items-center pt-[8px]">
                  {t("186")}
                  <div className="flex-1 text-[#fff] text-[14px] font-[600] text-right">
                    100 {chainCoinName(chainId)}
                  </div>
                </div>
                <div className="text-[#62573A] text-[14px] flex items-center pt-[8px]">
                  {t("187")}
                  <div
                    className="flex-1 text-[#fff] text-[14px] font-[600] text-right"
                    style={{
                      color:
                        item?.status === "listed"
                          ? "#46C91B"
                          : item?.status === "verifyFailed" || item?.remain <= 0
                          ? "red"
                            : "#fff",
                    }}
                  >
                    {item?.status === "removed"
                      ? t("191_1")
                      : item?.status === "paid"
                      ? t("188")
                      : item?.status === "listed"
                      ? t("189")
                      : item?.status === "pending"
                      ? t("190")
                      : item?.statue === "verifyFailed"
                      ? t("192")
                      : t("191")}
                  </div>
                </div>
              </div>
            ) : (
                <div className="flex items-center bg-[#1E1E1E] px-20 py-14 rounded-[12px] mb-[12px]">
                <div className="w-[230px]">
                  <img
                    src={item?.bannerImageUrl}
                    className="max-w-[183px] h-[52px] rounded-[12px]"
                    alt=""
                  />
                </div>
                  <div className="flex-1 text-[#fff] text-[14px] font-[500]">
                  {formatTimestamp(item?.createdAt)}
                </div>
                  <div className="flex-1 text-[#fff] text-[14px] font-[500]">
                  {item?.remain > 0 ? millisecondsToHM(item?.remain) : "--"}
                </div>
                  <div className="flex-1 text-[#fff] text-[14px] font-[500]">
                    100 {chainCoinName(chainId)}
                </div>
                <div
                  className="flex-1 text-[14px] font-[500]"
                  style={{
                    color:
                      item?.status === "listed"
                        ? "#46C91B"
                        : item?.status === "verifyFailed" || item?.remain <= 0
                        ? "red"
                          : "#fff",
                  }}
                >
                  {item?.status === "removed"
                    ? t("191_1")
                    : item?.status === "paid"
                    ? t("188")
                    : item?.status === "listed"
                    ? t("189")
                    : item?.status === "pending"
                    ? t("190")
                    : item?.statue === "verifyFailed"
                    ? t("192")
                    : t("191")}
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <NoData />
      )}

      {/* <div className="mt-[40px] mb-[20px] text-center">
        <div
          className={`${
            total > 20 ? "block" : "hidden"
          } text-center mt-[20px] w-full`}
        >
          <Pagination
            current={pageNum}
            defaultPageSize={20}
            total={1010}
            showSizeChanger={false}
            onChange={(page: any) => {
              setPageNum(page);
              handleGetFriends(page);
            }}
          />
        </div>
      </div> */}
    </div>
  );
};

export default App;
