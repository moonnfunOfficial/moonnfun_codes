import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import TopBar from "../../components/topBar";
import FooterBar from "../../components/footerBar";
import {
  Carousel,
  Dropdown,
  Pagination,
  PaginationProps,
  Progress,
  Switch,
} from "antd";
import Banner1 from "./components/banner1";
import Partnership from "./components/partnership";
import BannerCarousel from "./components/bannerCarousel";
import Transaction from "./components/transaction";
import ProductList from "./components/productList";
import Host from "./components/host";
import CreateCoin from "./components/createCoin";
import { useNavigate } from "react-router-dom";
import { tokenList } from "../../API";
import { isMobile, showLoding } from "../../utils/tool";
import { useTranslation } from "react-i18next";
import { wsBus } from "../../utils/wsBus";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { SearchFiltering } from "../../config";
import store from "../../store";

const Account = () => {
  const token = useSelector((state: any) => state?.token);
  const { address: web3ModalAccount } = useAppKitAccount();
  const { switchNetwork, chainId } = useAppKitNetwork(); 

  useEffect(() => {}, [token, web3ModalAccount]);
  let { t, i18n } = useTranslation();

  const [tag, setTag] = useState<any>(t("23"));
  const [tabIndex, setTabIndex] = useState<any>(0);
  const items = [
    {
      key: "1",
      label: (
        <div
          className={
            tabIndex === 0
              ? "text-[#46C91B] text-[14px] font-bold flex items-center justify-between pb-4"
              : "text-[#1E1E1E] text-[14px] font-bold flex items-center justify-between pb-4"
          }
          style={{ textAlign: "center" }}
          onClick={() => {
            setTag(t("23"));
            setTabIndex(0);
            setPageNum(1);
          }}
        >
          {t("23")}
          <svg
            className="ml-10"
            style={{
              display: tabIndex === 0 ? "block" : "none",
            }}
            xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
            <path d="M13.7487 5.91273L7.17755 12.2575C7.02232 12.4072 6.80794 12.5 6.57116 12.5C6.33439 12.5 6.12 12.4072 5.96472 12.2575L2.25114 8.67106C2.09601 8.52201 2 8.31497 2 8.08635C2 7.6291 2.38393 7.25906 2.85674 7.25906C3.09352 7.25906 3.308 7.35174 3.46323 7.50155L6.57114 10.5017L12.5368 4.74177C12.692 4.59272 12.9064 4.5 13.1431 4.5C13.6158 4.5 14 4.87072 14 5.3272C14 5.55586 13.9039 5.76293 13.7487 5.91273Z" fill="#46C91B" />
          </svg>    
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          className={
            tabIndex === 1
              ? "text-[#46C91B] text-[14px] font-bold flex items-center justify-between pb-4"
              : "text-[#1E1E1E] text-[14px] font-bold flex items-center justify-between pb-4"
          }
          style={{ textAlign: "center" }}
          onClick={() => {
            setTag(t("24"));
            setTabIndex(1);
            setPageNum(1);
          }}
        >
          {t("24")}
          <svg
            className="ml-10"
            style={{
              display: tabIndex === 1 ? "block" : "none",
            }}
            xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
            <path d="M13.7487 5.91273L7.17755 12.2575C7.02232 12.4072 6.80794 12.5 6.57116 12.5C6.33439 12.5 6.12 12.4072 5.96472 12.2575L2.25114 8.67106C2.09601 8.52201 2 8.31497 2 8.08635C2 7.6291 2.38393 7.25906 2.85674 7.25906C3.09352 7.25906 3.308 7.35174 3.46323 7.50155L6.57114 10.5017L12.5368 4.74177C12.692 4.59272 12.9064 4.5 13.1431 4.5C13.6158 4.5 14 4.87072 14 5.3272C14 5.55586 13.9039 5.76293 13.7487 5.91273Z" fill="#46C91B" />
          </svg>    
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div
          className={
            tabIndex === 2
              ? "text-[#46C91B] text-[14px] font-bold flex items-center justify-between pb-4"
              : "text-[#1E1E1E] text-[14px] font-bold flex items-center justify-between pb-4"
          }
          style={{ textAlign: "center" }}
          onClick={() => {
            setTag(t("25"));
            setTabIndex(2);
            setPageNum(1);
          }}
        >
          {t("25")}
          <svg
            className="ml-10"
            style={{
              display: tabIndex === 2 ? "block" : "none",
            }}
            xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
            <path d="M13.7487 5.91273L7.17755 12.2575C7.02232 12.4072 6.80794 12.5 6.57116 12.5C6.33439 12.5 6.12 12.4072 5.96472 12.2575L2.25114 8.67106C2.09601 8.52201 2 8.31497 2 8.08635C2 7.6291 2.38393 7.25906 2.85674 7.25906C3.09352 7.25906 3.308 7.35174 3.46323 7.50155L6.57114 10.5017L12.5368 4.74177C12.692 4.59272 12.9064 4.5 13.1431 4.5C13.6158 4.5 14 4.87072 14 5.3272C14 5.55586 13.9039 5.76293 13.7487 5.91273Z" fill="#46C91B" />
          </svg>    
        </div>
      ),
    },
    {
      key: "5",
      label: (
        <div
          className={
            tabIndex === 3
              ? "text-[#46C91B] text-[14px] font-bold flex items-center justify-between pb-4"
              : "text-[#1E1E1E] text-[14px] font-bold flex items-center justify-between pb-4"
          }
          style={{ textAlign: "center" }}
          onClick={() => {
            setTag(t("26"));
            setTabIndex(3);
            setPageNum(1);
          }}
        >
          {t("26")}
          <svg
            className="ml-10"
            style={{
              display: tabIndex === 3 ? "block" : "none",
            }}
            xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
            <path d="M13.7487 5.91273L7.17755 12.2575C7.02232 12.4072 6.80794 12.5 6.57116 12.5C6.33439 12.5 6.12 12.4072 5.96472 12.2575L2.25114 8.67106C2.09601 8.52201 2 8.31497 2 8.08635C2 7.6291 2.38393 7.25906 2.85674 7.25906C3.09352 7.25906 3.308 7.35174 3.46323 7.50155L6.57114 10.5017L12.5368 4.74177C12.692 4.59272 12.9064 4.5 13.1431 4.5C13.6158 4.5 14 4.87072 14 5.3272C14 5.55586 13.9039 5.76293 13.7487 5.91273Z" fill="#46C91B" />
          </svg>    
        </div>
      ),
    },
  ];

  const [orderField, setOrderField] = useState<any>(t("27"));
  const [tabIndex2, setTabIndex2] = useState<any>(0);
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
              setOrderField(t("27"));
              setPageNum(1);
            }}
          >
            {t("27")}
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
              setOrderField(t("28"));
              setPageNum(1);
            }}
          >
            {t("28")}
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
              setOrderField(t("29"));
              setPageNum(1);
            }}
          >
            {t("29")}
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
              setOrderField(t("30"));
              setPageNum(1);
            }}
          >
            {t("30")}
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

  useEffect(() => {
    setTag(tabIndex === 0 ? t("23") : tabIndex === 1 ? t("24") : tabIndex === 2 ? t("25") : tabIndex === 3 ? t("26") : t("83"));
    setOrderField(tabIndex2 === 1 ? t("28") : tabIndex2 === 2 ? t("29") : tabIndex2 === 3 ? t("30") : t("27"));
  }, [i18n.language]);

  const navigate = useNavigate();
  const [pageNum, setPageNum] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  // const [isListLoadOk, setIsListLoadOk] = useState(false);
  const handleGetFriends = async (num: number) => {
    // if (isListLoadOk) {
    //   return
    // }
    // setIsListLoadOk(true);
    showLoding(true);
    tokenList({
      order: "desc",
      offset: num,
      limit: 21,
      address: searchAdd,
      progress: isListed,
      insurance: insurance,
      tag: tabIndex,
      orderField: tabIndex2 ?? "",
    })
      .then((res: any) => {
        const list = res.data?.data || []; 
        // const sortedList = list.sort((a: any, b: any) => {
        //   const isAFeige = SearchFiltering.test(a.symbol);
        //   const isBFeige = SearchFiltering.test(b.symbol);

        //   if (isAFeige && !isBFeige) return 1;
        //   if (!isAFeige && isBFeige) return -1;
        //   return 0;
        // });
        // setList(sortedList);
        setList(list);
        setTotal(res.data?.total); 
        setPageNum(num > res.data?.total / 21 ?
          Math.ceil(res.data?.total / 21) :
          num)
        // setIsListLoadOk(false);
      })
      .catch(() => {})
      .finally(() => {
        showLoding(false);
      });
  };
  const [searchAdd, setSearchAdd] = useState("");
  const [isListed, setIsListed] = useState("");
  const [insurance, setInsurance] = useState(false);

  let state: any = store.getState();
  let _chainId = state.chainId 
  useEffect(() => {
    setPageNum(1)
    handleGetFriends(1); 
  }, [isListed, tabIndex, tabIndex2, insurance]); 
  useEffect(() => {
    wsBus.on("switchNetwork", () => {
      setInsurance(false);
      setIsListed("");
      setSearchAdd("");
      setTabIndex(0);
      setTabIndex2(0);
      handleGetFriends(1);
    });
    return () => wsBus.off("switchNetwork");
  }, []);

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

  useEffect(() => {
    wsBus.on("upProductList", () => {
      handleGetFriends(pageNum);
    });
    return () => wsBus.off("upProductList");
  }, []);

  const itemRender: PaginationProps["itemRender"] = (
    current,
    type: any,
    originalElement
  ) => {
    if (type === "page") {
      const totalPages = Math.ceil(total / 21);  

      if (
        current === totalPages &&
        current >= 4 &&
        pageNum + 1 != current &&
        pageNum != current
      ) { 
        return null;
      }

      if (current === 1 && pageNum >= 4) {
        return null;
      }
    }
    return originalElement;
  };

  return (
    <div className="w-full"> 
      <TopBar />
      <div className="pt-[172px] h5:pt-[90px]">
        <Banner1 />
      </div>
      {/* <SwitchNetwork /> */}
      <div className=" w-[1200px] mx-auto pt-[80px] h5:w-full h5:pt-[20px] z-10 relative">
        <Transaction />
        <div className="flex items-center mb-[72px] h5:mb-[56px] h5:block">
          <div className="w-full h5:px-[16px]">
            <BannerCarousel />
          </div>
        </div> 

        <Host />
        <div
          className="flex items-center text-[#fff] text-[24px] font-[600] mb-20 mt-[30px] 
            font-[Kavoon]
          h5:mt-[22px] h5:mb-[8px] h5:px-[16px] h5:text-[20px]"
        >
          {t("21")}
        </div>
        <div className="flex items-center  h5:block  h5:px-16 box-border">
          <div className="flex items-center h5:block ">
            <div className="flex items-center">
              <div
                className="flex items-center rounded-full pt-6 pb-[6.86px] box-border
                  h5:flex-1 h5:h-[34px] h5:px-0"
                style={{
                  border: isFocused
                    ? "1px solid #FFFD41"
                    : "1px solid transparent",
                  background: "#FFFFE7",
                }}
              >
                <div className={`${isMobile() ? "w-[10px]" : "w-[15px]"}`}></div>
                {isMobile() ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M14.5157 14.5158C14.4692 14.5623 14.414 14.5993 14.3533 14.6245C14.2926 14.6497 14.2274 14.6626 14.1617 14.6626C14.0959 14.6626 14.0308 14.6497 13.97 14.6245C13.9093 14.5993 13.8541 14.5623 13.8077 14.5158L11.783 12.4914C10.5362 13.5552 8.92601 14.0951 7.28993 13.998C5.65385 13.9009 4.11885 13.1743 3.00662 11.9705C1.89439 10.7667 1.29127 9.17915 1.32366 7.5405C1.35604 5.90186 2.02142 4.33935 3.18034 3.18043C4.33926 2.02151 5.90177 1.35613 7.54041 1.32375C9.17906 1.29136 10.7666 1.89448 11.9704 3.00671C13.1742 4.11894 13.9008 5.65394 13.9979 7.29002C14.095 8.92611 13.5551 10.5363 12.4913 11.7831L14.5157 13.8078C14.5622 13.8542 14.5992 13.9094 14.6244 13.9701C14.6496 14.0309 14.6626 14.096 14.6626 14.1618C14.6626 14.2275 14.6496 14.2926 14.6244 14.3534C14.5992 14.4141 14.5622 14.4693 14.5157 14.5158ZM11.447 3.89275C10.7 3.14567 9.74817 2.63689 8.71198 2.43075C7.67579 2.22461 6.60174 2.33038 5.62566 2.73466C4.64957 3.13895 3.8153 3.8236 3.22833 4.70204C2.64136 5.58049 2.32807 6.61326 2.32807 7.66975C2.32807 8.72625 2.64136 9.75902 3.22833 10.6375C3.8153 11.5159 4.64957 12.2006 5.62566 12.6048C6.60174 13.0091 7.67579 13.1149 8.71198 12.9088C9.74817 12.7026 10.7 12.1938 11.447 11.4468C12.4486 10.445 13.0113 9.08636 13.0113 7.66975C13.0113 6.25315 12.4486 4.89454 11.447 3.89275Z" fill="#333333" />
                    <path d="M6.10166 4.26339V4.26539C6.16222 4.36932 6.18097 4.49239 6.1541 4.60964C6.12723 4.72689 6.05677 4.82952 5.957 4.89672C5.29412 5.36465 4.83037 6.06373 4.657 6.85638C4.63068 6.97726 4.56166 7.0846 4.46259 7.15869C4.36352 7.23277 4.24105 7.26865 4.11766 7.25972C4.04713 7.25774 3.97784 7.2407 3.91443 7.20975C3.85102 7.1788 3.79496 7.13464 3.75001 7.08026C3.70506 7.02587 3.67226 6.9625 3.6538 6.89439C3.63534 6.82629 3.63166 6.75503 3.643 6.68538C3.86571 5.63907 4.47722 4.71627 5.354 4.10339C5.41302 4.06299 5.47964 4.03503 5.54981 4.02119C5.61998 4.00736 5.69223 4.00794 5.76217 4.02291C5.83211 4.03787 5.89827 4.06691 5.95664 4.10825C6.015 4.14959 6.06434 4.20237 6.10166 4.26339Z" fill="#1E1E1E" />
                  </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M21.7733 21.7735C21.7036 21.8434 21.6208 21.8988 21.5297 21.9366C21.4386 21.9744 21.3409 21.9938 21.2423 21.9938C21.1436 21.9938 21.0459 21.9744 20.9548 21.9366C20.8637 21.8988 20.7809 21.8434 20.7113 21.7735L17.6743 18.737C15.804 20.3327 13.3888 21.1426 10.9347 20.9969C8.48054 20.8513 6.17804 19.7614 4.5097 17.9557C2.84136 16.15 1.93668 13.7686 1.98526 11.3106C2.03384 8.85267 3.0319 6.50891 4.77028 4.77052C6.50866 3.03214 8.85243 2.03408 11.3104 1.9855C13.7684 1.93693 16.1497 2.8416 17.9554 4.50994C19.7611 6.17829 20.851 8.48079 20.9967 10.9349C21.1423 13.389 20.3325 15.8043 18.7368 17.6745L21.7733 20.7115C21.8431 20.7812 21.8985 20.8639 21.9363 20.9551C21.9741 21.0462 21.9936 21.1439 21.9936 21.2425C21.9936 21.3412 21.9741 21.4388 21.9363 21.53C21.8985 21.6211 21.8431 21.7038 21.7733 21.7735ZM17.1703 5.83901C16.0497 4.71839 14.622 3.95522 13.0677 3.64601C11.5135 3.3368 9.90238 3.49544 8.43825 4.10187C6.97413 4.7083 5.72272 5.73528 4.84227 7.05295C3.96182 8.37061 3.49188 9.91976 3.49188 11.5045C3.49188 13.0893 3.96182 14.6384 4.84227 15.9561C5.72272 17.2737 6.97413 18.3007 8.43825 18.9071C9.90238 19.5136 11.5135 19.6722 13.0677 19.363C14.622 19.0538 16.0497 18.2906 17.1703 17.17C18.6727 15.6673 19.5167 13.6294 19.5167 11.5045C19.5167 9.3796 18.6727 7.34169 17.1703 5.83901Z" fill="#1E1E1E" />
                      <path d="M9.15272 6.39508V6.39808C9.24356 6.55397 9.27168 6.73859 9.23138 6.91446C9.19108 7.09034 9.08538 7.24429 8.93572 7.34508C7.94141 8.04698 7.24578 9.09559 6.98572 10.2846C6.94626 10.4659 6.84272 10.6269 6.69411 10.738C6.54551 10.8492 6.3618 10.903 6.17672 10.8896C6.07093 10.8866 5.96699 10.861 5.87187 10.8146C5.77676 10.7682 5.69267 10.702 5.62525 10.6204C5.55782 10.5388 5.50861 10.4437 5.48093 10.3416C5.45324 10.2394 5.44772 10.1325 5.46472 10.0281C5.7988 8.45861 6.71606 7.07441 8.03122 6.15508C8.11976 6.09449 8.21969 6.05254 8.32495 6.03179C8.4302 6.01103 8.53858 6.01191 8.64349 6.03436C8.74839 6.05681 8.84764 6.10036 8.93518 6.16238C9.02273 6.22439 9.09674 6.30356 9.15272 6.39508Z" fill="#1E1E1E" />
                    </svg>
                )}
                <input
                  type="text"
                  value={searchAdd}
                  onChange={(e) => setSearchAdd(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleGetFriends(1);
                    }
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => {
                    setTimeout(() => {
                      setIsFocused(false);
                    }, 200);
                  }}
                  className={`w-[224px] text-[#000] text-[16px] ml-4 bg-transparent font-[500]
                    h5:text-[12px] ${isFocused ? "h5:w-[100%]" : "h5:w-[100%]"
                    } h5:h-[26px]`}
                  placeholder={t("22")}
                />
                <svg
                  onClick={() => {
                    setSearchAdd("");
                    tokenList({
                      order: "desc",
                      offset: 1,
                      limit: 21,
                      address: "",
                      progress: isListed,
                      tag: tabIndex,
                      orderField: tabIndex2 ?? "",
                    })
                      .then((res: any) => {
                        setList(res.data?.data);
                        setTotal(res.data?.total);
                      })
                      .catch(() => { })
                      .finally(() => { });
                  }}
                  className={`${searchAdd ? "opacity-[1]" : "opacity-[0]"
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
                <div className={`${isMobile() ? "w-[10px]" : "w-[15px]"}`}></div>
              </div>
              <div style={{ display: isFocused ? "block" : "none" }}>
                <div
                  className="py-6 hover-effect px-20 ml-8 bg-[#FFFD41] text-[#0E0E0E] text-[16px] items-center 
                  justify-center rounded-[20px] cursor-pointer whitespace-nowrap flex 
                  h5:w-[58px] h5:text-[14px] h5:h-[34px] h5:leading-[34px]
                  "
                  onClick={() => {
                    handleGetFriends(1);
                  }}
                >
                  {t("171")}
                </div>
              </div>
            </div>
            <div
              className="flex-1 pl-20 h5:pl-[0px] h5:mt-12"
            >
              <div className="flex items-center">
                <div className="flex items-center">
                  <Switch
                    defaultChecked={false}
                    size={isMobile() ? "small" : "default"}
                    checked={isListed === "launch" ? true : false}
                    onChange={(val: boolean) => {
                      setIsListed(val ? "launch" : "");
                      setPageNum(1);
                    }}
                  />
                  <div
                    className="text-[#FFFFE7] text-[16px] font-[500] ml-8 
                  h5:ml-0 h5:text-[12px] h5:pl-4 h5:whitespace-nowrap"
                  > 
                    {i18n.language === "zh" ? '已遷移' : 'Migrated'}
                    {/* {chainId === 113329 || chainId === 1328 || chainId === 1329 ? t("33") : t('33_2')} */}
                  </div>
                </div>
                <div className="flex items-center ml-20 hidden">
                  <Switch
                    defaultChecked={false}
                    size={isMobile() ? "small" : "default"}
                    onChange={(val: boolean) => {
                      setInsurance(val);
                      setPageNum(1);
                    }}
                  />
                  <div
                    className="text-[#FFFFE7] text-[16px] font-[500] ml-8 
                  h5:ml-0 h5:text-[12px] h5:pl-4 h5:whitespace-nowrap"
                  >
                    {t("33_1")}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center flex-1 justify-end h5:justify-start h5:mt-12">
            <Dropdown menu={{ items }} placement="bottom" trigger={["hover"]}>
              <div
                className="hover-effect flex justify-between cursor-pointer items-center
                text-[#1E1E1E] text-[14px] font-[500] mr-14 px-16 py-9 bg-[#FFFFE7] rounded-full min-w-[107px]
                h5:py-6
                "
              >
                {tag ?? "-"}
                <svg
                  className="ml-10"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="6"
                  viewBox="0 0 12 6"
                  fill="none"
                >
                  <path
                    d="M11.3648 0.164855C11.3254 0.118262 11.2772 0.0799162 11.223 0.0520098C11.1688 0.0241035 11.1096 0.00718345 11.0489 0.00221589C10.9882 -0.00275167 10.9271 0.00433132 10.8691 0.0230595C10.8111 0.0417876 10.7573 0.0717941 10.7109 0.111364L6.30003 3.86387C6.21627 3.93501 6.11006 3.97405 6.0003 3.97405C5.89053 3.97405 5.78432 3.93501 5.70056 3.86387L1.28856 0.110201C1.24205 0.0706985 1.18824 0.0407753 1.13019 0.022142C1.07215 0.00350858 1.01101 -0.00346894 0.950275 0.00160682C0.88954 0.00668257 0.830397 0.0237127 0.776229 0.0517239C0.72206 0.0797352 0.673928 0.118178 0.634583 0.164855L0.109317 0.785815C0.0301268 0.879944 -0.00860735 1.00173 0.00160895 1.12445C0.0118252 1.24718 0.0701585 1.36084 0.163815 1.4405L5.12427 5.65931H5.12891L5.14514 5.67442C5.38068 5.88416 5.68473 6 5.99972 6C6.3147 6 6.61875 5.88416 6.85429 5.67442L6.87052 5.65931H6.87632L11.8356 1.4405C11.8822 1.40104 11.9205 1.35277 11.9484 1.29845C11.9764 1.24412 11.9933 1.18481 11.9984 1.1239C12.0035 1.06299 11.9965 1.00168 11.9779 0.94347C11.9593 0.885259 11.9295 0.831292 11.8901 0.784652L11.3648 0.163693V0.164855Z"
                    fill="#62573A"
                  />
                </svg>
              </div>
            </Dropdown>
            <Dropdown
              menu={{ items: items2 }}
              getPopupContainer={() => {
                return document.getElementById("root") || document.body;
              }}
              placement="bottom"
              trigger={["hover"]}
            >
              <div
                className="hover-effect min-w-[127px] whitespace-nowrap 
                flex justify-between cursor-pointer items-center
                text-[#1E1E1E] text-[14px] font-[500] px-16 py-9 bg-[#FFFFE7] rounded-full
                h5:py-6 "
              >
                {orderField ? orderField : "-"}
                <svg
                  className="ml-10"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="6"
                  viewBox="0 0 12 6"
                  fill="none"
                >
                  <path
                    d="M11.3648 0.164855C11.3254 0.118262 11.2772 0.0799162 11.223 0.0520098C11.1688 0.0241035 11.1096 0.00718345 11.0489 0.00221589C10.9882 -0.00275167 10.9271 0.00433132 10.8691 0.0230595C10.8111 0.0417876 10.7573 0.0717941 10.7109 0.111364L6.30003 3.86387C6.21627 3.93501 6.11006 3.97405 6.0003 3.97405C5.89053 3.97405 5.78432 3.93501 5.70056 3.86387L1.28856 0.110201C1.24205 0.0706985 1.18824 0.0407753 1.13019 0.022142C1.07215 0.00350858 1.01101 -0.00346894 0.950275 0.00160682C0.88954 0.00668257 0.830397 0.0237127 0.776229 0.0517239C0.72206 0.0797352 0.673928 0.118178 0.634583 0.164855L0.109317 0.785815C0.0301268 0.879944 -0.00860735 1.00173 0.00160895 1.12445C0.0118252 1.24718 0.0701585 1.36084 0.163815 1.4405L5.12427 5.65931H5.12891L5.14514 5.67442C5.38068 5.88416 5.68473 6 5.99972 6C6.3147 6 6.61875 5.88416 6.85429 5.67442L6.87052 5.65931H6.87632L11.8356 1.4405C11.8822 1.40104 11.9205 1.35277 11.9484 1.29845C11.9764 1.24412 11.9933 1.18481 11.9984 1.1239C12.0035 1.06299 11.9965 1.00168 11.9779 0.94347C11.9593 0.885259 11.9295 0.831292 11.8901 0.784652L11.3648 0.163693V0.164855Z"
                    fill="#62573A"
                  />
                </svg>
              </div>
            </Dropdown>
            <div className="h5:flex-1 h5:flex h5:justify-end">
              <svg
                onClick={() => {
                  if (searchAdd !== "") {
                    tokenList({
                      order: "desc",
                      offset: 1,
                      limit: 21,
                      address: "",
                      progress: isListed,
                      tag: tabIndex,
                      orderField: tabIndex2 ?? "",
                    })
                      .then((res: any) => {
                        setList(res.data?.data);
                        setTotal(res.data?.total);
                      })
                      .catch(() => { })
                      .finally(() => { });
                  }
                  setIsListed("");
                  setInsurance(false); 
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

        <div className="mt-20 h5:mt-[16px]">
          <ProductList list={list} />
        </div>

        <div
          className={`${total > 20 ? "block" : "hidden"} mb-[26px] text-center`}
        >
          <div
            className={`text-center mt-[20px] w-full flex justify-center indexPagination`}
          >
            <Pagination
              current={pageNum}
              defaultPageSize={21}
              total={total}
              showSizeChanger={false}
              itemRender={itemRender}
              // showLessItems
              onChange={(page: any) => {
                setSearchAdd("");
                setPageNum(page);
                handleGetFriends(page);
                const mainContainer = document.querySelector("#root");
                if (mainContainer) {
                  mainContainer.scrollTo(100, 300);
                }
              }}
            />
          </div>
        </div>
        <Partnership />
        <div></div>
      </div> 
      <FooterBar index={1} />
    </div>
  );
};

export default Account;
