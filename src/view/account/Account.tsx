import React, { useEffect, useRef, useState } from "react";
import FooterBar from "../../components/footerBar";
import TopBar from "../../components/topBar";
import logo2 from "../../assets/image/logo2.png";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Modal, notification, Pagination, Progress } from "antd";
import TokenOwned from "./components/tokenOwned";
import TokenFollows from "./components/tokenFollows";
import TokenCreated from "./components/tokenCreated";
import BannerList from "./components/bannerList";
import copy from "copy-to-clipboard";
import { addMessage, getBit, isMobile, showLoding } from "../../utils/tool";
import { useNavigate } from "react-router-dom";
import {
  tokenList,
  userBind,
  userDetail,
  userStatistics,
  userTokensList,
  userTokensListFollows,
} from "../../API";
import ProductList from "../home/components/productList";
import { truncateMiddle } from "../../utils/truncateMiddle";
import { useTranslation } from "react-i18next";
import InviteList from "./components/list";
import { useAppKitAccount, useAppKitNetwork, useDisconnect } from "@reown/appkit/react";
import { wsBus } from "../../utils/wsBus";

const App: React.FC = () => {
  const token = useSelector((state: any) => state?.token);
  const { address: web3ModalAccount } = useAppKitAccount();
  const { disconnect } = useDisconnect();

  let { t, i18n } = useTranslation();
  const [tag, setTag] = useState<any>(t("86"));
  const [tabIndex, setTabIndex] = useState(0);
  const items = [
    {
      key: "1",
      label: (
        <div>
          <div
            className={
              tabIndex === 0
                ? "text-[#46C91B] text-[14px] font-bold flex items-center justify-between"
                : "text-[#1E1E1E] text-[14px] font-bold flex items-center justify-between" 
            }
            style={{ textAlign: "center" }}
            onClick={() => {
              setTag(t("86"));
              setTabIndex(0);
              setPageNum2(1);
            }}
          >
            {t("86")}
            <svg 
              className="ml-10"
              style={{
                display: tabIndex === 0 ? "block" : "none",
              }}
              xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
              <path d="M13.7487 5.91273L7.17755 12.2575C7.02232 12.4072 6.80794 12.5 6.57116 12.5C6.33439 12.5 6.12 12.4072 5.96472 12.2575L2.25114 8.67106C2.09601 8.52201 2 8.31497 2 8.08635C2 7.6291 2.38393 7.25906 2.85674 7.25906C3.09352 7.25906 3.308 7.35174 3.46323 7.50155L6.57114 10.5017L12.5368 4.74177C12.692 4.59272 12.9064 4.5 13.1431 4.5C13.6158 4.5 14 4.87072 14 5.3272C14 5.55586 13.9039 5.76293 13.7487 5.91273Z" fill="#46C91B" />
            </svg>    
          </div>
          <div
            className={
              tabIndex === 1
                ? "text-[#46C91B] text-[14px] font-bold flex items-center justify-between"
                : "text-[#1E1E1E] text-[14px] font-bold flex items-center justify-between" 
            }
            style={{ textAlign: "center" }}
            onClick={() => {
              setTag(t("87"));
              setTabIndex(1);
              setPageNum2(1);
            }}
          >
            {t("87")}
            <svg 
              className="ml-10"
              style={{
                display: tabIndex === 1 ? "block" : "none",
              }}
              xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
              <path d="M13.7487 5.91273L7.17755 12.2575C7.02232 12.4072 6.80794 12.5 6.57116 12.5C6.33439 12.5 6.12 12.4072 5.96472 12.2575L2.25114 8.67106C2.09601 8.52201 2 8.31497 2 8.08635C2 7.6291 2.38393 7.25906 2.85674 7.25906C3.09352 7.25906 3.308 7.35174 3.46323 7.50155L6.57114 10.5017L12.5368 4.74177C12.692 4.59272 12.9064 4.5 13.1431 4.5C13.6158 4.5 14 4.87072 14 5.3272C14 5.55586 13.9039 5.76293 13.7487 5.91273Z" fill="#46C91B" />
            </svg>    
          </div>
          <div
            className={
              tabIndex === 2
                ? "text-[#46C91B] text-[14px] font-bold flex items-center justify-between"
                : "text-[#1E1E1E] text-[14px] font-bold flex items-center justify-between" 
            }
            style={{ textAlign: "center" }}
            onClick={() => {
              setTag(t("88"));
              setTabIndex(2);
              setPageNum2(1);
            }}
          >
            {t("88")}
            <svg 
              className="ml-10"
              style={{
                display: tabIndex === 2 ? "block" : "none",
              }}
              xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
              <path d="M13.7487 5.91273L7.17755 12.2575C7.02232 12.4072 6.80794 12.5 6.57116 12.5C6.33439 12.5 6.12 12.4072 5.96472 12.2575L2.25114 8.67106C2.09601 8.52201 2 8.31497 2 8.08635C2 7.6291 2.38393 7.25906 2.85674 7.25906C3.09352 7.25906 3.308 7.35174 3.46323 7.50155L6.57114 10.5017L12.5368 4.74177C12.692 4.59272 12.9064 4.5 13.1431 4.5C13.6158 4.5 14 4.87072 14 5.3272C14 5.55586 13.9039 5.76293 13.7487 5.91273Z" fill="#46C91B" />
            </svg>    
          </div>
          <div
            className={
              tabIndex === 3
                ? "text-[#46C91B] text-[14px] font-bold flex items-center justify-between"
                : "text-[#1E1E1E] text-[14px] font-bold flex items-center justify-between" 
            }
            style={{ textAlign: "center" }}
            onClick={() => {
              setTag(t("89"));
              setTabIndex(3);
              setPageNum2(1);
            }}
          >
            {t("89")}
            <svg 
              className="ml-10"
              style={{
                display: tabIndex === 3 ? "block" : "none",
              }}
              xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
              <path d="M13.7487 5.91273L7.17755 12.2575C7.02232 12.4072 6.80794 12.5 6.57116 12.5C6.33439 12.5 6.12 12.4072 5.96472 12.2575L2.25114 8.67106C2.09601 8.52201 2 8.31497 2 8.08635C2 7.6291 2.38393 7.25906 2.85674 7.25906C3.09352 7.25906 3.308 7.35174 3.46323 7.50155L6.57114 10.5017L12.5368 4.74177C12.692 4.59272 12.9064 4.5 13.1431 4.5C13.6158 4.5 14 4.87072 14 5.3272C14 5.55586 13.9039 5.76293 13.7487 5.91273Z" fill="#46C91B" />
            </svg>   
          </div>
        </div>
      ),
    },
  ];

  const [orderField, setOrderField] = useState<any>(t("90"));
  const [tabIndex2, setTabIndex2] = useState(0);
  const items2 = [
    {
      key: "11",
      label: (
        <div>
          <div
            className={
              tabIndex2 === 0
                ? "text-[#46C91B] text-[14px] font-bold flex items-center justify-between pb-4"
                : "text-[#1E1E1E] text-[14px] font-bold flex items-center justify-between pb-4"
            }
            style={{ textAlign: "center" }}
            onClick={() => {
              setTabIndex2(0);
              setOrderField(t("90"));
              setPageNum2(1);
            }}
          >
            {t("90")}
            <svg 
              className="ml-10"
              style={{
                display: tabIndex2 === 0 ? "block" : "none",
              }}
              xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
              <path d="M13.7487 5.91273L7.17755 12.2575C7.02232 12.4072 6.80794 12.5 6.57116 12.5C6.33439 12.5 6.12 12.4072 5.96472 12.2575L2.25114 8.67106C2.09601 8.52201 2 8.31497 2 8.08635C2 7.6291 2.38393 7.25906 2.85674 7.25906C3.09352 7.25906 3.308 7.35174 3.46323 7.50155L6.57114 10.5017L12.5368 4.74177C12.692 4.59272 12.9064 4.5 13.1431 4.5C13.6158 4.5 14 4.87072 14 5.3272C14 5.55586 13.9039 5.76293 13.7487 5.91273Z" fill="#46C91B" />
            </svg> 
          </div>
          <div
            className={
              tabIndex2 === 1
                ? "text-[#46C91B] text-[14px] font-bold flex items-center justify-between pb-4"
                : "text-[#1E1E1E] text-[14px] font-bold flex items-center justify-between pb-4"
            }
            style={{ textAlign: "center" }}
            onClick={() => {
              setTabIndex2(1);
              setOrderField(t("91"));
              setPageNum2(1);
            }}
          >
            {t("91")}
            <svg 
              className="ml-10"
              style={{
                display: tabIndex2 === 1 ? "block" : "none",
              }}
              xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
              <path d="M13.7487 5.91273L7.17755 12.2575C7.02232 12.4072 6.80794 12.5 6.57116 12.5C6.33439 12.5 6.12 12.4072 5.96472 12.2575L2.25114 8.67106C2.09601 8.52201 2 8.31497 2 8.08635C2 7.6291 2.38393 7.25906 2.85674 7.25906C3.09352 7.25906 3.308 7.35174 3.46323 7.50155L6.57114 10.5017L12.5368 4.74177C12.692 4.59272 12.9064 4.5 13.1431 4.5C13.6158 4.5 14 4.87072 14 5.3272C14 5.55586 13.9039 5.76293 13.7487 5.91273Z" fill="#46C91B" />
            </svg> 
          </div>
          <div
            className={
              tabIndex2 === 2
                ? "text-[#46C91B] text-[14px] font-bold flex items-center justify-between pb-4"
                : "text-[#1E1E1E] text-[14px] font-bold flex items-center justify-between pb-4"
            }
            style={{ textAlign: "center" }}
            onClick={() => {
              setTabIndex2(2);
              setOrderField(t("92"));
              setPageNum2(1);
            }}
          >
            {t("92")}
            <svg 
              className="ml-10"
              style={{
                display: tabIndex2 === 2 ? "block" : "none",
              }}
              xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
              <path d="M13.7487 5.91273L7.17755 12.2575C7.02232 12.4072 6.80794 12.5 6.57116 12.5C6.33439 12.5 6.12 12.4072 5.96472 12.2575L2.25114 8.67106C2.09601 8.52201 2 8.31497 2 8.08635C2 7.6291 2.38393 7.25906 2.85674 7.25906C3.09352 7.25906 3.308 7.35174 3.46323 7.50155L6.57114 10.5017L12.5368 4.74177C12.692 4.59272 12.9064 4.5 13.1431 4.5C13.6158 4.5 14 4.87072 14 5.3272C14 5.55586 13.9039 5.76293 13.7487 5.91273Z" fill="#46C91B" />
            </svg> 
          </div>
          <div
            className={
              tabIndex2 === 3
                ? "text-[#46C91B] text-[14px] font-bold flex items-center justify-between pb-4"
                : "text-[#1E1E1E] text-[14px] font-bold flex items-center justify-between pb-4"
            }
            style={{ textAlign: "center" }}
            onClick={() => {
              setTabIndex2(3);
              setOrderField(t("93"));
              setPageNum2(1);
            }}
          >
            {t("93")}
            <svg 
              className="ml-10"
              style={{
                display: tabIndex2 === 3 ? "block" : "none",
              }}
              xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
              <path d="M13.7487 5.91273L7.17755 12.2575C7.02232 12.4072 6.80794 12.5 6.57116 12.5C6.33439 12.5 6.12 12.4072 5.96472 12.2575L2.25114 8.67106C2.09601 8.52201 2 8.31497 2 8.08635C2 7.6291 2.38393 7.25906 2.85674 7.25906C3.09352 7.25906 3.308 7.35174 3.46323 7.50155L6.57114 10.5017L12.5368 4.74177C12.692 4.59272 12.9064 4.5 13.1431 4.5C13.6158 4.5 14 4.87072 14 5.3272C14 5.55586 13.9039 5.76293 13.7487 5.91273Z" fill="#46C91B" />
            </svg>  
          </div>
        </div>
      ),
    },
  ];
  const handleShar = () => {
    if (!web3ModalAccount) return;
    // const _url =
    //   window.origin + "?" + encodeURIComponent("inviteCode=" + web3ModalAccount);
    // copy(userData?.refferalUrl);
    copy(web3ModalAccount);
    notification.open({
      message: t("Copied successfully"),
    });
  };

  const [searchAdd, setSearchAdd] = useState("");
  const navigate = useNavigate();
  const [tabIndex3, setTabIndex3] = useState(0);

  const [pageNum, setPageNum] = useState(1);
  const [total, setTotal] = useState(0);
  const [list1, setList1] = useState<any>([]);
  const handleLoad1 = (offset: number, add?: string) => {
    userTokensList({
      offset: offset,
      limit: 21,
      creator: web3ModalAccount,
      address: add === "noAddress" ? "" : searchAdd,
      tag: tabIndex,
      orderField: tabIndex2 ?? "",
    })
      .then((res) => {
        setList1(res.data?.data);
        setTotal(res.data?.total);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [pageNum2, setPageNum2] = useState(1);
  const [total2, setTotal2] = useState(0);
  const [list2, setList2] = useState<any>([]);
  const handleLoad2 = (offset: number, add?: string) => {
    tokenList({
      offset: offset,
      limit: 21,
      creator: web3ModalAccount,
      address: add === "noAddress" ? "" : searchAdd,
      tag: tabIndex,
      orderField: tabIndex2 ?? "",
    })
      .then((res) => {
        setList2(res.data);
        setTotal2(res.data?.total);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { switchNetwork, chainId } = useAppKitNetwork(); 
  useEffect(() => {
    if (web3ModalAccount && token) {
      handleLoad1(1);
      handleLoad2(1);
      handleLoad3(1);
      handleUserInfo();
    } else if (!web3ModalAccount) {
      notification.open({
        message: t("135"),
        key: "135",
      });
      navigate("/");
    }
  }, [web3ModalAccount, tag, orderField, token, chainId]);

  const [total3, setTotal3] = useState(0);
  const [list3, setList3] = useState<any>([]);
  const handleLoad3 = (offset: number, add?: string) => {
    userTokensListFollows({
      offset: offset,
      limit: 21,
      creator: web3ModalAccount,
      address: add === "noAddress" ? "" : searchAdd,
      tag: tabIndex,
      orderField: tabIndex2 ?? "",
    })
      .then((res) => {
        setList3(res.data?.data);
        setTotal3(res.data?.total);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  useEffect(() => {
    wsBus.on("upProductList", () => {
      handleLoad1(1);
      handleLoad2(1);
      handleLoad3(1);
    });
    return () => wsBus.off("upProductList");
  }, []);

  let dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState<any>({});
  const [userData, setUserData] = useState<any>({});
  const handleUserInfo = () => {
    userStatistics({
      address: web3ModalAccount,
    })
      .then((res: { data: any }) => {
        setUserInfo(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
    userDetail({
      address: web3ModalAccount,
    })
      .then((res: { data: any }) => {
        setUserData(res.data);
        setFromID(res.data?.fromID);
      })
      .catch((err: any) => {});
  };
  const [fromID, setFromID] = useState("");
  const handleBind = () => {
    if (!fromID) return;
    showLoding(true);
    userBind({
      refer: fromID,
    })
      .then((res: { data: any }) => {
        notification.open({
          message: t("150"),
          key: "Bind success",
        });
        handleUserInfo();
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        showLoding(false);
      });
  };

  const btnRef = useRef(null);
  const replayAnimation = () => {
    const el: any = btnRef.current;
    if (!el) return;

    el.classList.remove("animate-spin-once"); 
    requestAnimationFrame(() => {
      el.classList.add("animate-spin-once");
    });
  };
  const [isFocused, setIsFocused] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <TopBar />
      <div className="pt-[104px] w-[1200px] mx-auto  relative z-10 h5:w-full h5:pt-[64px] h5:px-16">
        <div className="bg-[#1E1E1E] rounded-[20px] p-[40px] h5:p-16 ">
          <div
            className=" flex items-center
        h5:block
        "
          >
            <div className="h5:flex h5:items-center h5:flex-1">
              <div className="flex items-center h5:flex-1">
                <img
                  src={logo2}
                  alt=""
                  className="w-[73px] h-[71px] h5:w-[40px] h5:h-[40px] h5:min-w-[40px]"
                />
                <div
                  className=" ml-10  pt-6
               h5:flex-1 h5:pt-0
              "
                >
                  <div className="text-[#fff] text-[28px] font-[600] leading-[30px] h5:leading-[20px] h5:text-[16px]">
                    {truncateMiddle(web3ModalAccount, 6, 4)}
                  </div>
                  <div
                    className="flex items-center text-[#C1C1C1] text-[20px] font-[600] pt-6
            h5:text-[12px] h5:pl-0 h5:mt-0 h5:leading-[16px] h5:pt-0
            "
                  >
                    {isMobile()
                      ? truncateMiddle(web3ModalAccount, 18, 4)
                      : web3ModalAccount ?? "-"}
                    <div className="flex-1 flex items-center justify-end">
                      <svg
                        onClick={() => {
                          handleShar();
                        }}
                        className="ml-8 cursor-pointer h5:w-[12px] h5:h-[12px]"
                        xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
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
              </div>
            </div>
            <div className="flex items-center flex-1">
              <div className="flex-1">
                <div
                  className="text-[#fff] text-[24px] mt-[10px] font-[600] text-center
              h5:text-[16px] h5:mt-[14px]"
                >
                  {userInfo?.totalCreated ?? "0"}
                </div>
                <div
                  className="text-[#5F5F5F] text-[16px] mt-[10px] text-center
              h5:text-[12px] h5:mt-[6px]"
                >
                  {t("79")}
                </div>
              </div>
              <div className="flex-1">
                <div
                  className="text-[#fff] text-[24px] mt-[10px] font-[600] text-center
              h5:text-[16px] h5:mt-[14px]"
                >
                  {userInfo?.totalOwned ?? "0"}
                </div>
                <div
                  className="text-[#5F5F5F] text-[16px] mt-[10px] text-center
              h5:text-[12px] h5:mt-[6px]"
                >
                  {t("80")}
                </div>
              </div>
              <div className="flex-1">
                <div
                  className="text-[#fff] text-[24px] mt-[10px] font-[600] text-center
              h5:text-[16px] h5:mt-[14px]"
                >
                  {getBit(userInfo?.totalTrading ?? "0")}
                </div>
                <div
                  className="text-[#5F5F5F] text-[16px] mt-[10px] text-center
              h5:text-[12px] h5:mt-[6px]"
                >
                  {t("81")}
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex items-center mt-[30px] pt-[30px] h5:mt-[20px] h5:pt-[20px] h5:block"
            style={{ borderTop: "1px solid #5F5F5F" }}
          >
            <div className="text-[28px] text-[#FFFD41] font-[600] h5:text-[20px] mr-[60px] h5:mr-0">
              {t("142")}
            </div>
            <div className="text-[#5F5F5F] text-[14px] mt-4 h5:mt-0 h5:text-[12px]">
              {t("143")}
            </div>
          </div>
          <div className="pt-24 flex items-center h5:pt-0 h5:block">
            <div className="flex-1">
              <div className="flex items-center h5:pt-[12px]">
                <div className="flex-1 text-[16px] text-[#fff] font-[600] h5:text-[14px]">
                  {t("134")}
                </div>
                <div
                  className="flex items-center text-[16px] text-[#5F5F5F] cursor-pointer h5:text-[14px]"
                  onClick={() => {
                    setOpen(true);
                    // navigate('/web3ModalAccount/invite')
                  }}
                >
                  {t("144")}
                  <svg className="relative top-[-1px] ml-2" xmlns="http://www.w3.org/2000/svg" width="10" height="9" viewBox="0 0 10 9" fill="none">
                    <path d="M0.191055 8.69088L0.190586 8.69041C-0.0634766 8.43666 -0.0634765 8.02494 0.190274 7.77103L3.27152 4.68979L0.190586 1.60979C-0.0633204 1.35588 -0.0633202 0.94416 0.190742 0.69041L0.191055 0.690098C0.444961 0.436504 0.856211 0.43666 1.1098 0.69041L4.77809 4.35869C4.96105 4.54166 4.96121 4.83854 4.77809 5.0215L1.10996 8.69057C0.856211 8.94432 0.444961 8.94447 0.191055 8.69088ZM5.19105 8.69088L5.19059 8.69041C4.93652 8.43666 4.93652 8.0251 5.19027 7.77119L8.27059 4.68994L5.19012 1.60947C4.93637 1.35572 4.93637 0.94416 5.19012 0.69041C5.44387 0.43666 5.85527 0.43666 6.10918 0.69041L9.77809 4.35854C9.96121 4.5415 9.96121 4.83838 9.77809 5.0215L6.10996 8.69057C5.85621 8.94432 5.44496 8.94447 5.19105 8.69088Z" fill="#5F5F5F" />
                  </svg> 
                </div>
              </div>
              <div className="bg-[#2E2E2E]  px-16 py-[13px] rounded-[12px] mt-2 flex items-center">
                <div className="flex-1 text-[16px] text-[#fff] font-[600] h5:text-[14px]">
                  {truncateMiddle(userData?.refferalUrl, 22, 4)}
                </div>
                <svg
                  className="cursor-pointer"
                  onClick={() => {
                    copy(userData?.refferalUrl);
                    notification.open({
                      key: userData?.refferalUrl,
                      message: t("Copied successfully"),
                    });
                  }}
                  xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
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
            <div className="flex-1 pl-[24px] h5:pl-0 pt-4">
              <div className="flex items-center h5:pt-[12px]">
                <div className="flex-1 text-[16px] text-[#fff] font-[600] h5:text-[14px]">
                  {t("148")}
                </div>
              </div>
              <div className="bg-[#2E2E2E]  px-16 py-[13px] rounded-[12px] mt-2 flex items-center">
                <div className="flex-1 text-[16px] text-[#fff] font-[600] h5:text-[14px]">
                  {userData?.refferalID}
                </div>
                <svg
                  className="cursor-pointer"
                  onClick={() => {
                    copy(userData?.refferalID);
                    notification.open({
                      key: userData?.refferalID,
                      message: t("Copied successfully"),
                    });
                  }}
                  xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
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
            <div className="flex-1 pl-[24px] h5:pl-0 pt-4">
              <div className="flex items-center h5:pt-[12px]">
                <div className="flex-1 text-[16px] text-[#fff] font-[600] h5:text-[14px]">
                  {t("149")}
                </div>
              </div>
              <div className="bg-[#2E2E2E] px-16 py-[8.5px] rounded-[12px] mt-2 flex items-center h-[50px]">
                <input
                  className="flex-1 text-[16px] text-[#fff] font-[600] h5:text-[14px] bg-[#2E2E2E]"
                  value={fromID}
                  disabled={userData?.fromID ? true : false}
                  onChange={(e) => setFromID(e.target.value)}
                />
                {userData?.fromID ? (
                  ""
                ) : (
                  <div
                      className="hover-effect flex cursor-pointer ml-[10px] items-center text-[#2E2E2E] text-[14px] 
                    font-[600] px-16 py-[6px] bg-[#FFFD41] rounded-full"
                    style={{
                      opacity: fromID ? 1 : 0.5,
                    }}
                    onClick={() => {
                      handleBind();
                    }}
                  >
                    {t("Confirm")}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center mt-[30px] h5:mt-[24px] h5:overflow-x-scroll h5:whitespace-nowrap h5:scrollbar-hidden">
          <div
            className="text-[20px] font-[600] cursor-pointer
          h5:text-[16px] h5:inline-block
          "
            style={{
              color: tabIndex3 === 0 ? "#FFFD41" : "#c4c4ba",
            }}
            onClick={() => {
              setTabIndex3(0);
            }}
          >
            {t("82")}
            <div
              className={`${
                tabIndex3 === 0 ? "bg-[#FFFD41]" : "bg-transparent"
              } h-[2px] rounded-full mt-10
             h5:mt-2
            `}
            ></div>
          </div>
          <div className="w-[50px] h5:min-w-[12px]"></div>
          <div
            className="text-[20px] font-[600] cursor-pointer 
          h5:text-[16px] h5:inline-block
          "
            style={{
              color: tabIndex3 === 1 ? "#FFFD41" : "#c4c4ba",
            }}
            onClick={() => {
              setTabIndex3(1);
            }}
          >
            {t("83")}
            <div
              className={`${
                tabIndex3 === 1 ? "bg-[#FFFD41]" : "bg-transparent"
              } h-[2px] rounded-full mt-10
             h5:mt-2
            `}
            ></div>
          </div>
          <div className="w-[50px] h5:min-w-[12px]"></div>
          <div
            className="text-[20px] font-[600] cursor-pointer 
          h5:text-[16px] h5:inline-block
          "
            style={{
              color: tabIndex3 === 2 ? "#FFFD41" : "#c4c4ba",
            }}
            onClick={() => {
              setTabIndex3(2);
            }}
          >
            {t("157")}
            <div
              className={`${
                tabIndex3 === 2 ? "bg-[#FFFD41]" : "bg-transparent"
              } h-[2px] rounded-full mt-10
             h5:mt-2
            `}
            ></div>
          </div>
          {/* <div className="w-[50px] h5:min-w-[12px]"></div>
          <div
            className="text-[20px] font-[600] cursor-pointer
          h5:text-[16px] h5:inline-block
          "
            style={{
              color: tabIndex3 === 3 ? "#FFFD41" : "#c4c4ba",
            }}
            onClick={() => {
              setTabIndex3(3);
            }}
          >
            {t("182")}
            <div
              className={`${
                tabIndex3 === 3 ? "bg-[#FFFD41]" : "bg-transparent"
              } h-[2px] rounded-full mt-10
             h5:mt-2
            `}
            ></div>
          </div> */}
        </div>
        <div className="h-1 bg-[#535353] mt-[-1px]"></div>

        <div className={`${tabIndex3 != 3 ? "block" : "hidden"}`}>
          <div
            className="flex items-center mt-20 
          h5:block h5:mt-14"
          >
            <div
              className="flex items-center flex-1
           h5:mb-12 "
            >
              <div
                className="hover-effect flex cursor-pointer mr-[30px] items-center text-[#0E0E0E] text-[14px] 
            font-[600] px-16 py-9 bg-[#FFFD41] rounded-full whitespace-nowrap overflow-hidden text-ellipsis
            h5:mr-6 h5:py-6
            "
                onClick={() => {
                  navigate("/createCoin");
                }}
              > 
                <svg
                  className="mr-10 h5:mr-4"
                  xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M9.375 4.375H5.625V0.625C5.625 0.25 5.3125 0 5 0C4.6875 0 4.375 0.25 4.375 0.625V4.375H0.625C0.3125 4.375 0 4.625 0 5C0 5.375 0.3125 5.625 0.625 5.625H4.375V9.375C4.375 9.75 4.6875 10 5 10C5.3125 10 5.625 9.75 5.625 9.375V5.625H9.375C9.6875 5.625 10 5.375 10 5C10 4.625 9.6875 4.375 9.375 4.375Z" fill="#0E0E0E" />
                </svg>
                {t("84")}
              </div>
              <div
                className="flex items-center rounded-full px-16 pt-7 py-[7.8px]
             h5:py-8 h5:flex-auto"
                style={{
                  border: isFocused
                    ? "1px solid #FFFD41"
                    : "1px solid transparent",
                  background: "#FFFFE7",
                }}
              >
                {isMobile() ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M14.5157 14.5155C14.4692 14.5621 14.414 14.599 14.3533 14.6242C14.2926 14.6494 14.2274 14.6624 14.1617 14.6624C14.0959 14.6624 14.0308 14.6494 13.97 14.6242C13.9093 14.599 13.8541 14.5621 13.8077 14.5155L11.783 12.4912C10.5362 13.555 8.92601 14.0949 7.28993 13.9978C5.65385 13.9007 4.11885 13.1741 3.00662 11.9703C1.89439 10.7665 1.29127 9.1789 1.32366 7.54026C1.35604 5.90162 2.02142 4.33911 3.18034 3.18019C4.33926 2.02126 5.90177 1.35589 7.54041 1.32351C9.17906 1.29112 10.7666 1.89424 11.9704 3.00647C13.1742 4.11869 13.9008 5.65369 13.9979 7.28978C14.095 8.92586 13.5551 10.536 12.4913 11.7828L14.5157 13.8075C14.5622 13.854 14.5992 13.9091 14.6244 13.9699C14.6496 14.0306 14.6626 14.0957 14.6626 14.1615C14.6626 14.2273 14.6496 14.2924 14.6244 14.3531C14.5992 14.4139 14.5622 14.4691 14.5157 14.5155ZM11.447 3.89251C10.7 3.14543 9.74817 2.63665 8.71198 2.43051C7.67579 2.22437 6.60174 2.33013 5.62566 2.73442C4.64957 3.13871 3.8153 3.82336 3.22833 4.7018C2.64136 5.58024 2.32807 6.61301 2.32807 7.66951C2.32807 8.72601 2.64136 9.75878 3.22833 10.6372C3.8153 11.5157 4.64957 12.2003 5.62566 12.6046C6.60174 13.0089 7.67579 13.1147 8.71198 12.9085C9.74817 12.7024 10.7 12.1936 11.447 11.4465C12.4486 10.4447 13.0113 9.08612 13.0113 7.66951C13.0113 6.2529 12.4486 4.8943 11.447 3.89251Z" fill="#1E1E1E" />
                    <path d="M6.10182 4.2629V4.2649C6.16237 4.36883 6.18112 4.49191 6.15425 4.60915C6.12739 4.7264 6.05692 4.82904 5.95715 4.89623C5.29427 5.36416 4.83052 6.06324 4.65715 6.8559C4.63084 6.97678 4.56181 7.08411 4.46274 7.1582C4.36367 7.23229 4.2412 7.26816 4.11782 7.25923C4.04728 7.25725 3.97799 7.24021 3.91458 7.20926C3.85117 7.17831 3.79511 7.13416 3.75016 7.07977C3.70521 7.02538 3.67241 6.96201 3.65395 6.89391C3.6355 6.8258 3.63181 6.75454 3.64315 6.6849C3.86587 5.63858 4.47737 4.71579 5.35415 4.1029C5.41317 4.0625 5.47979 4.03454 5.54997 4.0207C5.62014 4.00687 5.69239 4.00745 5.76232 4.02242C5.83226 4.03738 5.89843 4.06642 5.95679 4.10776C6.01515 4.1491 6.06449 4.20189 6.10182 4.2629Z" fill="#1E1E1E" />
                  </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M21.7733 21.7733C21.7036 21.8431 21.6208 21.8985 21.5297 21.9363C21.4386 21.9741 21.3409 21.9936 21.2423 21.9936C21.1436 21.9936 21.0459 21.9741 20.9548 21.9363C20.8637 21.8985 20.7809 21.8431 20.7113 21.7733L17.6743 18.7368C15.804 20.3325 13.3888 21.1423 10.9347 20.9967C8.48054 20.851 6.17804 19.7611 4.5097 17.9554C2.84136 16.1497 1.93668 13.7684 1.98526 11.3104C2.03384 8.85243 3.0319 6.50866 4.77028 4.77028C6.50866 3.0319 8.85243 2.03384 11.3104 1.98526C13.7684 1.93668 16.1497 2.84136 17.9554 4.5097C19.7611 6.17804 20.851 8.48054 20.9967 10.9347C21.1423 13.3888 20.3325 15.804 18.7368 17.6743L21.7733 20.7113C21.8431 20.7809 21.8985 20.8637 21.9363 20.9548C21.9741 21.0459 21.9936 21.1436 21.9936 21.2423C21.9936 21.3409 21.9741 21.4386 21.9363 21.5297C21.8985 21.6208 21.8431 21.7036 21.7733 21.7733ZM17.1703 5.83876C16.0497 4.71814 14.622 3.95497 13.0677 3.64576C11.5135 3.33655 9.90238 3.4952 8.43825 4.10163C6.97413 4.70806 5.72272 5.73504 4.84227 7.0527C3.96182 8.37036 3.49188 9.91952 3.49188 11.5043C3.49188 13.089 3.96182 14.6382 4.84227 15.9558C5.72272 17.2735 6.97413 18.3005 8.43825 18.9069C9.90238 19.5133 11.5135 19.672 13.0677 19.3628C14.622 19.0536 16.0497 18.2904 17.1703 17.1698C18.6727 15.6671 19.5167 13.6292 19.5167 11.5043C19.5167 9.37935 18.6727 7.34145 17.1703 5.83876Z" fill="#0E0E0E" />
                      <path d="M9.15272 6.39483V6.39783C9.24356 6.55373 9.27168 6.73835 9.23138 6.91422C9.19108 7.09009 9.08538 7.24404 8.93572 7.34483C7.94141 8.04673 7.24578 9.09535 6.98572 10.2843C6.94626 10.4657 6.84272 10.6267 6.69411 10.7378C6.54551 10.8489 6.3618 10.9027 6.17672 10.8893C6.07093 10.8864 5.96699 10.8608 5.87187 10.8144C5.77676 10.7679 5.69267 10.7017 5.62525 10.6201C5.55782 10.5386 5.50861 10.4435 5.48093 10.3413C5.45324 10.2392 5.44772 10.1323 5.46472 10.0278C5.7988 8.45836 6.71606 7.07417 8.03122 6.15483C8.11976 6.09424 8.21969 6.0523 8.32495 6.03154C8.4302 6.01079 8.53858 6.01166 8.64349 6.03411C8.74839 6.05656 8.84764 6.10012 8.93518 6.16213C9.02273 6.22414 9.09674 6.30332 9.15272 6.39483Z" fill="#0E0E0E" />
                    </svg>
                )}
                <input
                  type="text"
                  value={searchAdd}
                  onChange={(e) => setSearchAdd(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") { 
                      console.log("Enter pressed, value:", e.key);
                      handleLoad1(1);
                      handleLoad2(1);
                    }
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="w-[240px] text-[#0E0E0E] text-[16px] ml-4 bg-transparent
                h5:w-[120px] h5:text-[12px] h5:flex-1 h5:relative h5:top-[2px]"
                  placeholder={t("85")}
                />
                <svg
                  onClick={() => {
                    setSearchAdd("");
                    handleLoad1(1, "noAddress");
                    handleLoad2(1, "noAddress");
                  }}
                  className={`${
                    searchAdd ? "opacity-[1]" : "opacity-[0]"
                  } cursor-pointer`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M8 0C3.65714 0 0 3.65714 0 8C0 12.3429 3.65714 16 8 16C12.3429 16 16 12.3429 16 8C16 3.65714 12.3429 0 8 0ZM11.4286 10.2857C11.7714 10.6286 11.7714 11.0857 11.4286 11.3143C11.0857 11.6571 10.6286 11.6571 10.4 11.3143L8.11429 9.02857L5.71429 11.4286C5.37143 11.7714 4.91429 11.7714 4.57143 11.4286C4.22857 11.0857 4.22857 10.5143 4.57143 10.2857L6.97143 7.88571L4.68571 5.6C4.34286 5.37143 4.34286 4.91429 4.68571 4.57143C5.02857 4.22857 5.48571 4.22857 5.71429 4.57143L8 6.85714L10.4 4.45714C10.7429 4.11429 11.2 4.11429 11.5429 4.45714C11.8857 4.8 11.8857 5.25714 11.5429 5.6L9.14286 8L11.4286 10.2857Z"
                    fill="#DDD9CD"
                  />
                </svg>
              </div>
              <div className="flex-1 h5:hidden"></div>
            </div>
            <div className="flex items-center">
              <Dropdown menu={{ items }} placement="bottom" trigger={["hover"]}>
                <div
                  className="hover-effect flex justify-between cursor-pointer items-center text-[#0E0E0E] text-[14px] font-[500] mr-14 px-16 py-9 bg-[#FFFFE7] rounded-full
               h5:py-6 min-w-[107px]"
                >
                  {tag}
                  <svg 
                    className="ml-10"
                    xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none">
                    <path d="M11.3648 0.164855C11.3254 0.118262 11.2772 0.0799162 11.223 0.0520098C11.1688 0.0241035 11.1096 0.00718345 11.0489 0.00221589C10.9882 -0.00275167 10.9271 0.00433132 10.8691 0.0230595C10.8111 0.0417876 10.7573 0.0717941 10.7109 0.111364L6.30003 3.86387C6.21627 3.93501 6.11006 3.97405 6.0003 3.97405C5.89053 3.97405 5.78432 3.93501 5.70056 3.86387L1.28856 0.110201C1.24205 0.0706985 1.18824 0.0407753 1.13019 0.022142C1.07215 0.00350858 1.01101 -0.00346894 0.950275 0.00160682C0.88954 0.00668257 0.830397 0.0237127 0.776229 0.0517239C0.72206 0.0797352 0.673928 0.118178 0.634583 0.164855L0.109317 0.785815C0.0301268 0.879944 -0.00860735 1.00173 0.00160895 1.12445C0.0118252 1.24718 0.0701585 1.36084 0.163815 1.4405L5.12427 5.65931H5.12891L5.14514 5.67442C5.38068 5.88416 5.68473 6 5.99972 6C6.3147 6 6.61875 5.88416 6.85429 5.67442L6.87052 5.65931H6.87632L11.8356 1.4405C11.8822 1.40104 11.9205 1.35277 11.9484 1.29845C11.9764 1.24412 11.9933 1.18481 11.9984 1.1239C12.0035 1.06299 11.9965 1.00168 11.9779 0.94347C11.9593 0.885259 11.9295 0.831292 11.8901 0.784652L11.3648 0.163693V0.164855Z" fill="#0E0E0E" />
                  </svg> 
                </div>
              </Dropdown>
              <Dropdown
                menu={{ items: items2 }}
                placement="bottom"
                trigger={["hover"]}
              >
                <div
                  className="hover-effect min-w-[127px] whitespace-nowrap flex justify-between cursor-pointer 
              items-center text-[#0E0E0E] text-[14px] font-[500] px-16 py-9 bg-[#FFFFE7] rounded-full
               h5:py-6 "
                >
                  {orderField ?? "-"}
                  <svg 
                    className="ml-10"
                    xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none">
                    <path d="M11.3648 0.164855C11.3254 0.118262 11.2772 0.0799162 11.223 0.0520098C11.1688 0.0241035 11.1096 0.00718345 11.0489 0.00221589C10.9882 -0.00275167 10.9271 0.00433132 10.8691 0.0230595C10.8111 0.0417876 10.7573 0.0717941 10.7109 0.111364L6.30003 3.86387C6.21627 3.93501 6.11006 3.97405 6.0003 3.97405C5.89053 3.97405 5.78432 3.93501 5.70056 3.86387L1.28856 0.110201C1.24205 0.0706985 1.18824 0.0407753 1.13019 0.022142C1.07215 0.00350858 1.01101 -0.00346894 0.950275 0.00160682C0.88954 0.00668257 0.830397 0.0237127 0.776229 0.0517239C0.72206 0.0797352 0.673928 0.118178 0.634583 0.164855L0.109317 0.785815C0.0301268 0.879944 -0.00860735 1.00173 0.00160895 1.12445C0.0118252 1.24718 0.0701585 1.36084 0.163815 1.4405L5.12427 5.65931H5.12891L5.14514 5.67442C5.38068 5.88416 5.68473 6 5.99972 6C6.3147 6 6.61875 5.88416 6.85429 5.67442L6.87052 5.65931H6.87632L11.8356 1.4405C11.8822 1.40104 11.9205 1.35277 11.9484 1.29845C11.9764 1.24412 11.9933 1.18481 11.9984 1.1239C12.0035 1.06299 11.9965 1.00168 11.9779 0.94347C11.9593 0.885259 11.9295 0.831292 11.8901 0.784652L11.3648 0.163693V0.164855Z" fill="#0E0E0E" />
                  </svg>  
                </div>
              </Dropdown>
              <div className="flex-1 flex justify-end">
                <svg 
                  onClick={() => {
                    if (searchAdd !== "") {
                      handleLoad1(1, "noAddress");
                      handleLoad2(1, "noAddress");
                    }
                    setSearchAdd("");
                    setOrderField(t("90"));
                    setTag(t("86"));
                    setTabIndex(0);
                    setTabIndex2(0);
                    replayAnimation();
                  }}
                  ref={btnRef}
                  className="hover-effect rounded-full ml-10 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M20 0C8.97215 0 0 8.97217 0 20C0 31.0278 8.97216 40 20 40C31.0278 40 40 31.0278 40 20C40 8.97212 31.0278 0 20 0ZM19.8845 30.8059C15.4761 30.8059 11.7196 28.0037 10.2741 24.0913L10.2888 24.0854C10.1989 23.9047 10.1374 23.7085 10.1374 23.493C10.1374 22.7481 10.7412 22.1442 11.4862 22.1442C12.0853 22.1442 12.5761 22.5415 12.752 23.0819L12.7709 23.0742C13.8122 26.0025 16.6033 28.1084 19.8845 28.1084C24.0507 28.1084 27.4398 24.7193 27.4398 20.553C27.4398 16.3868 24.0507 12.9977 19.8845 12.9977C18.9702 12.9977 18.1002 13.1758 17.2886 13.4751L18.2394 15.2982C18.3506 15.4181 18.4191 15.5794 18.4191 15.7566C18.4191 16.1332 18.0431 16.4243 17.7316 16.4309C17.727 16.4309 17.7223 16.4309 17.7177 16.4309C17.7079 16.4309 17.6986 16.4309 17.6888 16.4303L10.9508 16.1411C10.7104 16.1306 10.493 15.993 10.3817 15.779C10.2705 15.5655 10.2817 15.3087 10.4107 15.1053L14.0303 9.41436C14.1594 9.21151 14.3886 9.09433 14.6284 9.1029C14.8688 9.11338 15.0861 9.25112 15.1973 9.46514L16.0287 11.0593C17.2203 10.5735 18.5204 10.3002 19.8845 10.3002C25.5378 10.3002 30.1374 14.8998 30.1374 20.5531C30.1374 26.2064 25.5377 30.8059 19.8845 30.8059Z" fill="#FFFD41" />
                </svg> 
              </div>
            </div>
          </div>
        </div>
        {
          tabIndex3 === 0 ? (
            <TokenOwned
              list={list1}
              pageNum={pageNum}
              total={total}
              callBack={(e: number) => {
                handleLoad1(e);
                setPageNum(e);
                const mainContainer = document.querySelector("#root");
                if (mainContainer) {
                  mainContainer.scrollTo(100, 300);
                }
              }}
            />
          ) : tabIndex3 === 1 ? (
            <div className="mt-20 h5:mx-[-10px]">
              <ProductList list={list2?.data || []} />
            </div>
          ) : tabIndex3 === 2 ? (
            <TokenFollows
              list={list3}
              pageNum={pageNum}
                  total={total3}
              callBack={(e: number) => {
                handleLoad3(e);
                setPageNum(e);
                const mainContainer = document.querySelector("#root");
                if (mainContainer) {
                  mainContainer.scrollTo(100, 300);
                }
              }}
            />
          ) : tabIndex3 === 3 ? (
            <BannerList />
          ) : (
            ""
          )
          // <TokenCreated data={list2} />
        }  
        <div
          className={`${
            total2 > 21 && tabIndex3 === 1 ? "block" : "hidden"
            } mt-[40px] mb-[20px] text-center`}
        >
          <div className={`flex justify-center w-full`}>
            <Pagination
              current={pageNum2}
              defaultPageSize={21}
              total={total2}
              showSizeChanger={false}
              onChange={(page: any) => {
                setPageNum2(page);
                handleLoad2(page);
                const mainContainer = document.querySelector("#root");
                if (mainContainer) {
                  mainContainer.scrollTo(100, 300);
                }
              }}
            />
          </div>
        </div> 
        <div className="w-full h-[200px] h5:hidden"></div>
      </div>
      <FooterBar index={1} />

      <Modal
        width={670}
        open={open}
        centered={true}
        onCancel={() => {
          setOpen(false);
        }}
        closable={false}
        footer={null}
        title={null}
        style={{
          border: "2px solid #fff",
          borderRadius: "20px",
          paddingBottom: "0px",
        }}
        destroyOnHidden={true}
      >
        <div className="p-[10px] pb-[20px] h5:px-[6px] h5:py-[14px]">
          <div className="relative ">
            <div
              className=" text-[#FFFD41] text-[24px] font-[600] pb-16
            h5:text-[20px] h5:pb-14 h5:leading-6
            "
            >
              {t("138")}
            </div>
          </div>
          <svg
            className="absolute top-[18px] right-[18px] cursor-pointer"
            onClick={() => {
              setOpen(false);
            }}
            xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 0C4.11429 0 0 4.11429 0 9C0 13.8857 4.11429 18 9 18C13.8857 18 18 13.8857 18 9C18 4.11429 13.8857 0 9 0ZM12.8571 11.5714C13.2429 11.9571 13.2429 12.4714 12.8571 12.7286C12.4714 13.1143 11.9571 13.1143 11.7 12.7286L9.12857 10.1571L6.42857 12.8571C6.04286 13.2429 5.52857 13.2429 5.14286 12.8571C4.75714 12.4714 4.75714 11.8286 5.14286 11.5714L7.84286 8.87143L5.27143 6.3C4.88571 6.04286 4.88571 5.52857 5.27143 5.14286C5.65714 4.75714 6.17143 4.75714 6.42857 5.14286L9 7.71429L11.7 5.01429C12.0857 4.62857 12.6 4.62857 12.9857 5.01429C13.3714 5.4 13.3714 5.91429 12.9857 6.3L10.2857 9L12.8571 11.5714Z" fill="#FFFD41" />
          </svg> 
          <InviteList />
        </div>
      </Modal>
    </div>
  );
};

export default App;
