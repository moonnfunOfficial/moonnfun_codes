import { useEffect, useState } from "react";
import logo from "../assets/image/logo.gif";
import logo2 from "../assets/image/logo2.png";
import icon2 from "../assets/image/icon2.png"
import { useNavigate } from "react-router-dom";
import useConnectWallet from "../hooks/useConnectWallet";
import { Dropdown, notification } from "antd";
import { useWeb3React } from "@web3-react/core";
import { useTranslation } from "react-i18next";
import { LOCAL_KEY } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { truncateMiddle } from "../utils/truncateMiddle";
import { createLoginSuccessAction } from "../store/actions";
import { useAppKit, useAppKitAccount, useDisconnect } from "@reown/appkit/react";
import { logout } from "../API";
import { clearAllCookies, showLoding } from '../utils/tool';
import SwitchNetwork from "./SwitchNetwork";

const TopBar = (props: any) => {   
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { connectWallet } = useConnectWallet();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { activate, deactivate, active, account } = useWeb3React();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [liKey, setLiKey] = useState(1);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => { 
    const currentUrl = window.location.pathname;

    if (currentUrl === "/ranking") {
      setLiKey(3);
    } else if (currentUrl === '/advanced') {
      setLiKey(4);
    }
    else if (currentUrl === '/createCoin') {
      setLiKey(2);
    }
    else if (currentUrl === '/account') {
      setLiKey(5);
    }
    else if (currentUrl === '/bridge') {
      setLiKey(7);
    } 
    else if (currentUrl === '/') {
      setLiKey(1);
    } else {
      setLiKey(-1);
    }
  }, [window.location.href]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  let { t, i18n } = useTranslation();

  function changeLanguage(key: string) {
    window.localStorage.setItem(LOCAL_KEY, key);
    i18n.changeLanguage(key);
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const token = useSelector((state: any) => state?.token);

  const handleDetail = (url?: string) => {
    if (!web3ModalAccount) {
      open();
    } else {
      navigate("/account");
    }
  };

  const items = [
    {
      key: "1",
      label: (
        <div
          className={
            i18n.language === "en"
              ? "text-[#7BFF48] text-[16px] pb-6 pt-4 font-[500]"
              : "text-[#0E0E0E] text-[16px] pb-6 pt-4 font-[500]"
          }
          style={{ textAlign: "center" }}
          onClick={() => changeLanguage("en")}
        >
          English
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          className={
            i18n.language === "zh"
              ? "text-[#7BFF48] text-[16px] pb-4 font-[500]"
              : "text-[#0E0E0E] text-[14px] pb-4 font-[500]"
          }
          style={{ textAlign: "center" }}
          onClick={() => changeLanguage("zh")}
        >
          繁體中文
        </div>
      ),
    },
  ];

  const [scrollPosition, setScrollPosition] = useState(0);
  let timer: NodeJS.Timeout;
  useEffect(() => {
    const scrollContainer = document.getElementById("root");

    const handleScroll = () => {
      clearTimeout(timer);
      const dropdown: any = document.getElementsByClassName("ant-dropdown-placement-bottom")[0];
      if (dropdown) {
        // dropdown.style.display = "none";
      }
      timer = setTimeout(() => {
        const y = scrollContainer?.scrollTop || 0;
        setScrollPosition(y > 40 ? 40 : y);
      }, 50);
    };

    scrollContainer?.addEventListener("scroll", handleScroll);
    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);
  const [isShowH5Nav, setIsShowH5Nav] = useState(false);

  let dispatch = useDispatch();
  
    const { open, close } = useAppKit();
      const { disconnect } = useDisconnect(); 
        const { address: web3ModalAccount, isConnected } = useAppKitAccount();
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="block md:hidden px-16 py-8"
        style={{
          background: scrollPosition > 10 ? '#1E1E1E' : 'transparent',
          boxShadow: scrollPosition > 10 ? "0px 5px 10px 0px #fffeab61" : "none"
        }}>
        <div className="flex items-center">
          <img className="w-[143px] h-[20px] cursor-pointer"
            onClick={() => navigate("/")}
            src={logo} alt="" />
          <div className="flex-1 flex items-center justify-end">
            {
              web3ModalAccount ?
                <div
                  className="hover-effect min-w-[69px] h-[28px] cursor-pointer flex items-center rounded-[26px] px-[10px] py-[12px] 
                 bg-gradient-to-r from-[#FFFEAB] to-[#7BFF48]
                mx-6 whitespace-normal text-[#1E1E1E] font-[500] text-[14px]">
                  <img src={logo2} className="w-[14px] mr-4" alt="" />
                  {truncateMiddle(web3ModalAccount, 4, 4)}
                </div>
                :
                <div
                  className="hover-effect min-w-[69px] h-[28px] cursor-pointer flex items-center rounded-[26px] px-[10px] py-[12px] 
                mx-6 whitespace-normal text-[#1E1E1E] bg-[#FFFD41] font-[500] text-[14px]"
                  onClick={() => {
                    open();
                  }}>
                  {t('0')}
                </div>
            } 
            <svg onClick={() => { setIsShowH5Nav(true) }} xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
              <path d="M1 1H17M1 7H17M1 13H17" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-[#0E0E0E] fixed top-0 left-0 right-0 bottom-0 z-51"
        style={{
          display: isShowH5Nav ? "block" : "none"
        }}> 
        <svg
          className="fixed top-[20px] right-[20px]"
          onClick={() => { setIsShowH5Nav(false) }}
          xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 0C4.11429 0 0 4.11429 0 9C0 13.8857 4.11429 18 9 18C13.8857 18 18 13.8857 18 9C18 4.11429 13.8857 0 9 0ZM12.8571 11.5714C13.2429 11.9571 13.2429 12.4714 12.8571 12.7286C12.4714 13.1143 11.9571 13.1143 11.7 12.7286L9.12857 10.1571L6.42857 12.8571C6.04286 13.2429 5.52857 13.2429 5.14286 12.8571C4.75714 12.4714 4.75714 11.8286 5.14286 11.5714L7.84286 8.87143L5.27143 6.3C4.88571 6.04286 4.88571 5.52857 5.27143 5.14286C5.65714 4.75714 6.17143 4.75714 6.42857 5.14286L9 7.71429L11.7 5.01429C12.0857 4.62857 12.6 4.62857 12.9857 5.01429C13.3714 5.4 13.3714 5.91429 12.9857 6.3L10.2857 9L12.8571 11.5714Z" fill="#FFFD41" />
        </svg>
        <div className="flex justify-center mt-[50px] mb-22">
          <img className="w-[83px] h-[83px] cursor-pointer"
            onClick={() => navigate("/")}
            src={require('../assets/image/logo3.png')} alt="" />
        </div>
        <div className="my-16"
          onClick={() => navigate("/")}>
          <div className={`${liKey === 1 ? "text-[#FFFD41]" : "text-[#5F5F5F]"} 
           flex justify-center font-[500] text-[16px] cursor-pointer hover:opacity-80`}>{t('1')}</div>
        </div>
        <div className="my-16">
          <div className={`${liKey === 2 ? "text-[#FFFD41]" : "text-[#5F5F5F]"}
          flex justify-center font-[500] text-[16px] cursor-pointer hover:opacity-80`}
            onClick={() => {
              navigate("/createCoin")
            }}
          >{t('2')}</div>
        </div>
        <div className="my-16">
          <div className={`${liKey === 3 ? "text-[#FFFD41]" : "text-[#5F5F5F]"}
          flex justify-center font-[500] text-[16px] cursor-pointer hover:opacity-80`}
            onClick={() => {
              navigate("/ranking")
            }}
          >{t('3')}</div>
        </div>
        <div className="my-16">
          <div className={`${liKey === 4 ? "text-[#FFFD41]" : "text-[#5F5F5F]"}
          flex justify-center font-[500] text-[16px] cursor-pointer hover:opacity-80`}
            onClick={() => {
              navigate("/advanced")
            }
            }
          >{t('4')}</div>
        </div>

        <div className="my-16">
          <div className={`${liKey === 7 ? "text-[#FFFD41]" : "text-[#5F5F5F]"}
          flex justify-center font-[500] text-[16px] cursor-pointer hover:opacity-80`}
            onClick={() => {  
              navigate("/bridge")
            }
            }
          >Bridge</div>
        </div>
        <div className="my-16 hidden">
          <div className={`${liKey === 7 ? "text-[#FFFD41]" : "text-[#5F5F5F]"}
          flex justify-center font-[500] text-[16px] cursor-pointer hover:opacity-80`}
            onClick={() => {
              notification.open({
                message: t('246'),
              })
              return
              if(!web3ModalAccount) {
                notification.open({
                  message: t('Please link wallet'), 
                })
                open()
                return
              }
              navigate("/support")
            }
            }
          >{t('160')}</div>
        </div>
        <div className="my-16">
          <div className={`${liKey === 5 ? "text-[#FFFD41]" : "text-[#5F5F5F]"}
          flex justify-center font-[500] text-[16px] cursor-pointer hover:opacity-80`}
            onClick={() => {
              navigate("/account")
            }
            }
          >{t('5')}</div>
        </div>
        <div className="my-16"> 
          <Dropdown menu={{ items }} placement="bottom" trigger={["click"]} overlayClassName="dropdown-menu1">
            <div className={`${liKey === 5 ? "text-[#FFFD41]" : "text-[#62573A]"}
          flex justify-center items-center font-[500] text-[16px] cursor-pointer hover:opacity-80`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                <g clipPath="url(#clip0_1_5808)">
                  <path d="M7.5 0C3.36112 0 0 3.36112 0 7.5C0 11.6389 3.36112 15 7.5 15C11.6389 15 15 11.6389 15 7.5C15 3.36112 11.6389 0 7.5 0ZM13.8611 6.94462H11.9167C11.8335 4.88888 11.2778 3.08325 10.4167 1.83337C11.3775 2.32298 12.1978 3.04908 12.8004 3.94328C13.4029 4.83749 13.768 5.87036 13.8611 6.94462ZM6.94462 1.19438V6.945H4.19438C4.30538 4.08375 5.47237 1.695 6.94462 1.19475V1.19438ZM6.94462 8.05537V13.8056C5.47237 13.3054 4.30538 10.9166 4.19438 8.05537H6.94462ZM8.05537 13.8056V8.055H10.8056C10.6946 10.9163 9.52763 13.305 8.05537 13.8053V13.8056ZM8.05537 6.94462V1.19438C9.52763 1.69463 10.6946 4.08337 10.8056 6.94462H8.055H8.05537ZM4.5555 1.83337C3.6945 3.08325 3.13875 4.88888 3.0555 6.94462H1.11112C1.3335 4.72237 2.66663 2.80538 4.5555 1.83337ZM1.13888 8.055H3.08325C3.1665 10.1108 3.72225 11.9164 4.58325 13.1662C3.62252 12.6766 2.80223 11.9505 2.19964 11.0563C1.59706 10.1621 1.23201 9.12926 1.13888 8.055ZM10.4445 13.1662C11.3055 11.9164 11.8612 10.1108 11.9445 8.055H13.8889C13.6665 10.2773 12.3334 12.1943 10.4445 13.1662Z" fill="white" />
                </g>
                <defs>
                  <clipPath id="clip0_1_5808">
                    <rect width="15" height="15" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <div className="mx-16 text-[#fff] font-[500] text-[16px]">
                {
                  i18n.language === "en" ? "English" : "繁體中文"
                }
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M4.47699 5.875L6.88949 2.714C6.95738 2.62505 6.99904 2.51888 7.00976 2.4075C7.02048 2.29612 6.99984 2.18395 6.95018 2.08368C6.90051 1.98341 6.82379 1.89903 6.72869 1.84006C6.63359 1.7811 6.52389 1.7499 6.41199 1.75H1.58774C1.47589 1.75 1.36626 1.78126 1.27123 1.84026C1.1762 1.89926 1.09956 1.98365 1.04995 2.08391C1.00034 2.18416 0.979748 2.29628 0.99049 2.40762C1.00123 2.51896 1.04288 2.62508 1.11074 2.714L3.52324 5.875C3.57924 5.94834 3.6514 6.00777 3.73411 6.04868C3.81682 6.08959 3.90785 6.11087 4.00012 6.11087C4.09239 6.11087 4.18342 6.08959 4.26613 6.04868C4.34884 6.00777 4.42099 5.94834 4.47699 5.875Z" fill="white" />
              </svg>
            </div>
          </Dropdown>
        </div>

        <div className="my-16">
          <div className="flex items-center justify-center"> 
            <a href="https://x.com/MoonnFun" target="_blank" rel="noopener noreferrer"> 
              <svg className="hover-effect rounded-full cursor-pointer " xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M20 10C20 4.47733 15.5227 0 10 0C4.47733 0 0 4.47733 0 10C0 15.5227 4.47733 20 10 20C15.5227 20 20 15.5227 20 10ZM12.684 5.33333H14.1153L10.9887 9.28667L14.6667 14.6667H11.7867L9.53067 11.404L6.95 14.6667H5.51733L8.862 10.438L5.33333 5.33333H8.28667L10.3253 8.316L12.684 5.33333ZM12.1813 13.7187H12.9747L7.85533 6.23133H7.00467L12.1813 13.7187Z" fill="white" />
              </svg>
            </a>
            <a href="https://t.me/moonnfun" target="_blank" rel="noopener noreferrer"> 
              <svg className="hover-effect rounded-full cursor-pointer ml-10" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15.27 16.5868L16.9091 8.85273C17.0541 8.17091 16.6636 7.90409 16.2168 8.07136L6.57591 11.7877C5.91728 12.0441 5.92864 12.4127 6.46455 12.58L8.93091 13.35L14.6582 9.745C14.9259 9.56636 15.1718 9.66727 14.9709 9.84591L10.3377 14.0305L10.1591 16.5759C10.2557 16.5763 10.3511 16.5543 10.4379 16.5118C10.5246 16.4692 10.6003 16.4071 10.6591 16.3305L11.8641 15.17L14.3641 17.0114C14.8218 17.2677 15.1455 17.1341 15.2682 16.5873L15.27 16.5868ZM22 12C22 13.9778 21.4135 15.9112 20.3147 17.5557C19.2159 19.2002 17.6541 20.4819 15.8268 21.2388C13.9996 21.9957 11.9889 22.1937 10.0491 21.8078C8.10929 21.422 6.32746 20.4696 4.92894 19.0711C3.53041 17.6725 2.578 15.8907 2.19215 13.9509C1.8063 12.0111 2.00433 10.0004 2.76121 8.17316C3.51809 6.3459 4.79981 4.78412 6.4443 3.6853C8.08879 2.58649 10.0222 2 12 2C14.6522 2 17.1957 3.05357 19.0711 4.92893C20.9464 6.8043 22 9.34783 22 12Z" fill="white" />
              </svg>
            </a>
            {/* <a href="https://m.debox.pro/group?id=0000fi0r&code=o41zi37y" target="_blank" rel="noopener noreferrer">
              <svg className="hover-effect rounded-full cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM8.36621 7.72168C7.26172 7.72168 6.36634 8.61722 6.36621 9.72168V14.127C6.36621 15.1643 7.15597 16.0172 8.16699 16.1172V17.293L9.6543 16.127H15.6318C16.7364 16.127 17.6318 15.2315 17.6318 14.127V13.3018H16.3525C15.6114 13.3017 15.0108 12.7011 15.0107 11.96C15.0107 11.2188 15.6114 10.6182 16.3525 10.6182H17.6318V9.72168C17.6317 8.61722 16.7363 7.72168 15.6318 7.72168H8.36621ZM16.668 11.2842C16.2728 11.2842 15.9521 11.6048 15.9521 12C15.9522 12.3952 16.2728 12.7158 16.668 12.7158C17.063 12.7157 17.3828 12.3951 17.3828 12C17.3828 11.6049 17.063 11.2843 16.668 11.2842Z" fill="white" />
              </svg>
            </a> */}
            <a href="https://docs.moonn.fun" target="_blank" rel="noopener noreferrer">
              <svg className="hover-effect rounded-full cursor-pointer mx-10" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12.3333 2C17.8562 2 22.3333 6.47715 22.3333 12C22.3333 17.5228 17.8562 22 12.3333 22C6.81048 22 2.33333 17.5228 2.33333 12C2.33333 6.47715 6.81048 2 12.3333 2ZM12.5892 6.66699C12.2667 6.66699 11.9721 6.83256 11.3861 7.16406L8.16927 8.97852C8.14354 8.99225 8.12924 9.0019 8.11751 9.00879C7.02061 9.63751 6.34274 10.7869 6.33333 12.0303V12.1455C6.3429 13.3888 7.02101 14.5351 8.11555 15.166C8.12732 15.1729 8.14144 15.1802 8.16731 15.1963L10.1781 16.334C11.3551 16.9995 11.9441 17.3307 12.5892 17.333C13.2341 17.3352 13.8254 17.0013 15.0023 16.3359L17.1283 15.1367C17.7167 14.8052 18.0111 14.6392 18.1712 14.3652C18.3313 14.0912 18.3333 13.7593 18.3333 13.0938V11.8066C18.3333 11.6226 18.2323 11.4522 18.0677 11.3623C17.9076 11.2748 17.7141 11.2768 17.554 11.3643L13.1888 13.8213C12.8949 13.9869 12.7491 14.0702 12.5892 14.0703C12.4291 14.0703 12.2803 13.9876 11.9886 13.8242L9.03645 12.1631C8.88813 12.0802 8.81211 12.0395 8.75325 12.0303C8.6168 12.0143 8.48763 12.0876 8.43587 12.2119C8.41233 12.2672 8.41438 12.3505 8.41438 12.5186C8.41438 12.6402 8.41438 12.7023 8.4261 12.7598C8.452 12.8864 8.52058 13.0017 8.61946 13.0869C8.66415 13.126 8.71838 13.1557 8.82649 13.2178L11.9837 15.0029C12.2779 15.1687 12.4239 15.2519 12.5863 15.252C12.7487 15.252 12.8947 15.1686 13.1888 15.0029L17.0599 12.8174C17.161 12.7599 17.2107 12.7322 17.2484 12.7529C17.2858 12.7738 17.2855 12.8317 17.2855 12.9443V13.5264C17.2855 13.6922 17.2855 13.7756 17.2454 13.8447C17.2054 13.9136 17.1327 13.9554 16.9847 14.0381L13.7943 15.8369C13.206 16.1683 12.9115 16.3338 12.5892 16.334C12.2666 16.334 11.9717 16.1679 11.3831 15.834L8.39778 14.1484C8.38636 14.1417 8.38188 14.139 8.37727 14.1367C7.75108 13.7775 7.3674 13.1239 7.36263 12.417V11.8545C7.36278 11.4633 7.57648 11.1023 7.9222 10.9043C8.22825 10.7293 8.60735 10.7293 8.91341 10.9043L11.3861 12.3018C11.9744 12.6333 12.2667 12.7988 12.5892 12.7988C12.9116 12.7987 13.2059 12.6332 13.7943 12.3018L17.5355 10.1943C17.7048 10.0999 17.8079 9.92246 17.8079 9.73145C17.8078 9.54044 17.7049 9.36523 17.5355 9.26855L13.7923 7.16211C13.204 6.83064 12.9116 6.66713 12.5892 6.66699Z" fill="white" />
              </svg>
            </a>
          </div>
        </div>
        <div className="fixed left-0 right-0 bottom-[60px]"
        >
          <div className="mb-16 flex items-center justify-center">
            <SwitchNetwork />
          </div>
          <div className="flex justify-center mb-20">
            {
              web3ModalAccount ?
                <Dropdown menu={{
                  items: [{
                    key: "1",
                    label: (
                      <div className="px-6 py-4">
                        <div
                          className='text-[#62573A] text-[16px] font-[500] pb-2 text-center'
                          onClick={() => { 
                            showLoding(true)
                            logout().then(() => {  
                            }).catch(() => { 
                            }).finally(() => {
                              disconnect();
                              dispatch(
                                createLoginSuccessAction(
                                  '',
                                  ''
                                )
                              );
                              clearAllCookies()
                              localStorage.removeItem("connetWallet")
                              if (window.location.pathname !== '/') {
                                navigate('/')
                              }
                              setIsShowH5Nav(false)
                              showLoding(false)
                            })
                          }
                          }
                        >
                          {t('6')} 
                        </div>
                      </div>
                    ),
                  }]
                }} placement="bottom" trigger={["hover"]}>
                  <div
                    className="hover-effect w-[127px] h-[40px] cursor-pointer flex justify-center items-center rounded-[26px] px-[10px] py-[12px] 
                mx-4 whitespace-normal text-[#0E0E0E] bg-gradient-to-r from-[#FFFEAB] to-[#7BFF48] font-[600] text-[14px]">
                    <img src={logo2} className="w-[16px] mr-4" alt="" />
                    {truncateMiddle(web3ModalAccount, 4, 4)}
                  </div>
                </Dropdown> :

                <div
                  className="hover-effect cursor-pointer flex items-center rounded-[26px] px-[34px] py-[7px] 
                mx-4 whitespace-normal text-[#0E0E0E] bg-[#7BFF48] font-[500] text-[14px]"
                  onClick={() => {
                    open();
                  }}
                >
                  {t("0")}
                </div>
            }
          </div>
        </div>
      </div>

      <div
        className="hidden md:block"
        style={{
          background: scrollPosition > 20 ? '#1E1E1E' : 'transparent',
          boxShadow: scrollPosition > 20 ? "0px 5px 20px 0px #fffeab61" : "none"
        }}>
        <div
          className="flex items-center py-16 px-[18px] max-w-[1400px] mx-auto"
        >
          <img className="w-[186px] h-[25px] cursor-pointer"
            onClick={() => navigate("/")}
            src={logo} alt="" />
          <div className="flex items-center flex-1 pl-[60px]">
            <div className=""
              onClick={() => navigate("/")}>
              <div className={`${liKey === 1 ? "text-[#FFFD41] font-[700]" : "text-[#fff] font-[500]"} text-[16px] cursor-pointer hover:opacity-80`}>{t('1')}</div>
              <div className={`${liKey === 1 ? "h-2 bg-[#FFFD41]" : "h-2"}`}></div>
            </div>
            <div className="w-[50px]"></div>
            <div className="">
              <div className={`${liKey === 2 ? "text-[#FFFD41] font-[700]" : "text-[#fff] font-[500]"} font-[500] text-[16px] cursor-pointer hover:opacity-80`}
                onClick={() => {
                  navigate("/createCoin")
                }}
              >{t('2')}</div>
              <div className={`${liKey === 2 ? "h-2 bg-[#FFFD41]" : "h-2"}`}></div>
            </div>
            <div className="w-[50px]"></div>
            <div className="">
              <div className={`${liKey === 3 ? "text-[#FFFD41] font-[700]" : "text-[#fff] font-[500]"} font-[500] text-[16px] cursor-pointer hover:opacity-80`}
                onClick={() => {
                  navigate("/ranking")
                }}
              >{t('3')}</div>
              <div className={`${liKey === 3 ? "h-2 bg-[#FFFD41]" : "h-2"}`}></div>
            </div>
            <div className="w-[50px]"></div>
            <div className="">
              <div className={`${liKey === 4 ? "text-[#FFFD41] font-[700]" : "text-[#fff] font-[500]"} font-[500] text-[16px] cursor-pointer hover:opacity-80`}
                onClick={() => {
                  navigate("/advanced")
                }
                }
              >{t('4')}</div>
              <div className={`${liKey === 4 ? "h-2 bg-[#FFFD41]" : "h-2"}`}></div>
            </div>
            <div className="w-[50px]"></div>
            <div className="">

              <div className={`${liKey === 7 ? "text-[#FFFD41] font-[700]" : "text-[#fff] font-[500]"} font-[500] text-[16px] cursor-pointer hover:opacity-80`}
                onClick={() => { 
                  navigate("/bridge")
                }
                }
              >Bridge</div>
              {/* <div className={`${liKey === 7 ? "text-[#FFFD41] font-[700]" : "text-[#fff] font-[500]"} font-[500] text-[16px] cursor-pointer hover:opacity-80`}
                onClick={() => {
                  notification.open({
                    message: t('246'),
                  })
                  return
                  if(!web3ModalAccount) {
                    notification.open({
                      message: t('Please link wallet'),
                    })
                    open()
                    return
                  }
                  navigate("/support")
                }
                }
              >{t('160')}</div> */}
              <div className={`${liKey === 7 ? "h-2 bg-[#FFFD41]" : "h-2"}`}></div>
            </div> 
          </div> 
          <SwitchNetwork />
          {web3ModalAccount ? (
            <Dropdown menu={{
              items: [{
                key: "1",
                label: (
                  <div className="px-6 py-4">
                    <div
                      className='text-[#0E0E0E] text-[16px] font-[500] pb-10'
                      onClick={() => {
                        // notification.open({
                        //   message: "Coming soon",
                        //   key: "topBar",
                        //   duration: 1.5,
                        // })
                        navigate("/account")
                      }
                      }
                    >
                      {t('5')}
                    </div>
                    <div
                      className='text-[#0E0E0E] text-[16px] font-[500] pb-2'
                      onClick={() => {
                            showLoding(true)
                            logout().then(() => { 
                            }).catch(() => { 
                            }).finally(() => {
                              disconnect();
                              dispatch(
                                createLoginSuccessAction(
                                  '',
                                  ''
                                )
                              );
                              clearAllCookies()
                              localStorage.removeItem("connetWallet")
                              if (window.location.pathname !== '/') {
                                navigate('/')
                              } 
                              showLoding(false)
                            })
                      }
                      }
                    >
                      {t('6')} 
                    </div>
                  </div>
                ),
              }]
            }} placement="bottom" trigger={["hover"]}>
              <div
                className="hover-effect min-w-[69px] h-[40px] cursor-pointer 
                flex items-center rounded-[26px] px-[16px] py-[10px] 
                bg-gradient-to-r from-[#FFFEAB] to-[#7BFF48]
                whitespace-normal text-[#0E0E0E] font-[500] text-[16px]">
                <img src={logo2} className="w-[18px] mr-4" alt="" />
                {truncateMiddle(web3ModalAccount, 4, 4)} 
                <svg className=" ml-8" xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" fill="none">
                  <path d="M12.1148 0.664855C12.0754 0.618262 12.0272 0.579916 11.973 0.55201C11.9188 0.524103 11.8596 0.507183 11.7989 0.502216C11.7382 0.497248 11.6771 0.504331 11.6191 0.523059C11.5611 0.541788 11.5073 0.571794 11.4609 0.611364L7.05003 4.36387C6.96627 4.43501 6.86006 4.47405 6.7503 4.47405C6.64053 4.47405 6.53432 4.43501 6.45056 4.36387L2.03856 0.610201C1.99205 0.570698 1.93824 0.540775 1.88019 0.522142C1.82215 0.503509 1.76101 0.496531 1.70027 0.501607C1.63954 0.506683 1.5804 0.523713 1.52623 0.551724C1.47206 0.579735 1.42393 0.618178 1.38458 0.664855L0.859317 1.28581C0.780127 1.37994 0.741393 1.50173 0.751609 1.62445C0.761825 1.74718 0.820159 1.86084 0.913815 1.9405L5.87427 6.15931H5.87891L5.89514 6.17442C6.13068 6.38416 6.43473 6.5 6.74972 6.5C7.0647 6.5 7.36875 6.38416 7.60429 6.17442L7.62052 6.15931H7.62632L12.5856 1.9405C12.6322 1.90104 12.6705 1.85277 12.6984 1.79845C12.7264 1.74412 12.7433 1.68481 12.7484 1.6239C12.7535 1.56299 12.7465 1.50168 12.7279 1.44347C12.7093 1.38526 12.6795 1.33129 12.6401 1.28465L12.1148 0.663693V0.664855Z" fill="#0E0E0E" />
                </svg>
              </div>
            </Dropdown>
          ) : (
            <div
              onClick={() => {
                // handleDetail()
                open()
              }}
                className="hover-effect min-w-[69px] h-[40px] cursor-pointer flex items-center 
                bg-gradient-to-r from-[#FFFEAB] to-[#7BFF48]
                rounded-[26px] px-[16px] py-[10px] whitespace-normal text-[#0E0E0E] font-[500] text-[16px]">
              {t('0')}
            </div>
          )}
          <Dropdown menu={{ items }} placement="bottom" trigger={["hover"]}>
            <div className="ml-[16px]">
              <svg className="w-[20px] h-[20px] cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 0C4.476 0 0 4.476 0 10C0 15.524 4.476 20 10 20C15.524 20 20 15.524 20 10C20 4.476 15.524 0 10 0ZM18.6187 9.33333H15.9773C15.8627 6.44667 15.02 3.896 13.7453 2.19333C16.4613 3.49867 18.3747 6.18 18.6187 9.33333ZM14.6333 9.33333H10.6667V1.432C12.8093 2.00267 14.4653 5.27733 14.6333 9.33333ZM9.33333 1.432V9.33333H5.36667C5.53467 5.27733 7.19067 2.00267 9.33333 1.432ZM6.256 2.19333C4.98 3.896 4.13867 6.44667 4.024 9.33333H1.38133C1.62533 6.18 3.53867 3.49867 6.256 2.19333ZM1.38133 10.6667H4.02267C4.13733 13.5533 4.98 16.104 6.25467 17.8067C3.53867 16.5013 1.62533 13.82 1.38133 10.6667ZM5.36667 10.6667H9.33333V18.568C7.19067 17.9973 5.53467 14.7227 5.36667 10.6667ZM10.6667 18.568V10.6667H14.6333C14.4653 14.7227 12.8093 17.9973 10.6667 18.568ZM13.744 17.8067C15.02 16.104 15.8613 13.5533 15.976 10.6667H18.6173C18.3747 13.82 16.4613 16.5013 13.744 17.8067Z" fill="white" />
              </svg>
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
