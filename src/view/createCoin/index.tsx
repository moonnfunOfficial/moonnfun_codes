import React, { useEffect, useState } from "react";
import TopBar from "../../components/topBar";
import FooterBar from "../../components/footerBar";
import iconJu from "../../assets/image/JU.png";
import { Dropdown, Modal, notification, Switch, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { createCoinSuccess, createToken, getIsMainnet, tokenList, uploadFile } from "../../API";
import { useWeb3React } from "@web3-react/core";
import { Contracts } from "../../web3";
import { NumSplic1, containsScript, showLoding } from "../../utils/tool";
import { useTranslation } from "react-i18next";
import {
  useAppKit,
  useAppKitAccount,
  useAppKitNetwork,
  useDisconnect, useAppKitProvider
} from "@reown/appkit/react";
import { useDispatch } from "react-redux";
import { createLoginSuccessAction } from "../../store/actions";
import { customNetwork_BSC, customNetwork_BSC_TEST, customNetwork_Base, customNetwork_Base_TEST, customNetwork_SEI, customNetwork_SEI_TEST, customNetwork_xLayer, customNetwork_xLayer_TEST, isMain } from "../../config";

import BigNumber from "big.js";
import { chainCoinName } from "../coinName";
import Web3 from "web3";
import { getChainConfig } from "../../getChainConfig";
// import UpImage from './components/upImage';

const App: React.FC = () => {
  let { t, i18n } = useTranslation();
  const { switchNetwork, chainId } = useAppKitNetwork(); 
  const [tabIndex, setTabIndex] = useState(0);
  const items = [
    {
      key: "1",
      label: (
        <div
          className={
            tabIndex === 0
              ? "text-[#46C91B] text-[14px] font-bold flex items-center justify-between"
              : " text-[14px] font-bold flex items-center justify-between"
          }
          style={{ textAlign: "center" }}
          onClick={() => {
            setTag("Meme");
            setTabIndex(0);
          }}
        >
          Meme
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
              ? "text-[#46C91B] text-[14px] font-bold flex items-center justify-between"
              : " text-[14px] font-bold flex items-center justify-between"
          }
          style={{ textAlign: "center" }}
          onClick={() => {
            setTag("AI");
            setTabIndex(1);
          }}
        >
          AI
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
      key: "4",
      label: (
        <div
          className={
            tabIndex === 4
              ? "text-[#46C91B] text-[14px] font-bold flex items-center justify-between"
              : " text-[14px] font-bold flex items-center justify-between"
          }
          style={{ textAlign: "center" }}
          onClick={() => {
            setTag("Game");
            setTabIndex(4);
          }}
        >
          Game
          <svg 
            className="ml-10"
            style={{
              display: tabIndex === 4 ? "block" : "none",
            }}
            xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
            <path d="M13.7487 5.91273L7.17755 12.2575C7.02232 12.4072 6.80794 12.5 6.57116 12.5C6.33439 12.5 6.12 12.4072 5.96472 12.2575L2.25114 8.67106C2.09601 8.52201 2 8.31497 2 8.08635C2 7.6291 2.38393 7.25906 2.85674 7.25906C3.09352 7.25906 3.308 7.35174 3.46323 7.50155L6.57114 10.5017L12.5368 4.74177C12.692 4.59272 12.9064 4.5 13.1431 4.5C13.6158 4.5 14 4.87072 14 5.3272C14 5.55586 13.9039 5.76293 13.7487 5.91273Z" fill="#46C91B" />
          </svg>  
        </div>
      ),
    },
  ];
  const [tabIndex2, setTabIndex2] = useState(0);
  const itemsType = [
    {
      key: "1",
      label: (
        <div
          className={
            tabIndex2 === 0
              ? "text-[#46C91B] text-[14px] font-bold flex items-center justify-between"
              : " text-[14px] font-bold flex items-center justify-between"
          }
          style={{ textAlign: "center" }}
          onClick={() => {
            setPlayType(t('204'))
            setTabIndex2(0);
          }}
        >
          {t('204')} 
          <svg
            className="ml-10"
            style={{
              display: tabIndex2 === 0 ? "block" : "none",
            }} xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
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
            tabIndex2 === 1
              ? "text-[#46C91B] text-[14px] font-bold flex items-center justify-between"
              : " text-[14px] font-bold flex items-center justify-between"
          }
          style={{ textAlign: "center" }}
          onClick={() => {
            setTabIndex2(1);
            setPlayType(t('205'))
          }}
        >
          {t('205')}

          <svg
            className="ml-10"
            style={{
              display: tabIndex2 === 1 ? "block" : "none",
            }}
            xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
            <path d="M13.7487 5.91273L7.17755 12.2575C7.02232 12.4072 6.80794 12.5 6.57116 12.5C6.33439 12.5 6.12 12.4072 5.96472 12.2575L2.25114 8.67106C2.09601 8.52201 2 8.31497 2 8.08635C2 7.6291 2.38393 7.25906 2.85674 7.25906C3.09352 7.25906 3.308 7.35174 3.46323 7.50155L6.57114 10.5017L12.5368 4.74177C12.692 4.59272 12.9064 4.5 13.1431 4.5C13.6158 4.5 14 4.87072 14 5.3272C14 5.55586 13.9039 5.76293 13.7487 5.91273Z" fill="#46C91B" />
          </svg> 
        </div>
      ),
    },
  ];

  let dispatch = useDispatch();
  const { disconnect } = useDisconnect();
  const [merchantHead, setMerchantHead] = useState<any>(null);
  const beforeUpload = async (file: any) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/webp" ||
      file.type === "image/gif";
    if (!isJpgOrPng) {
      notification.open({
        message: "Type: jpeg/png/webp/gif",
      });
      return;
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      notification.open({
        message: "Max Size: 5MB",
      });
      return;
    }

    showLoding(true);
    uploadFile({
      file: file,
      address: web3ModalAccount,
    })
      .then((res: any) => {
        console.info(file);
        console.log(res?.data);
        setImageUrl(res?.data);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64String = reader.result;
          setBase64Head(base64String);
        };
        setMerchantHead(file);
      })
      .catch((err: any) => {
        console.log(err);
        if (String(err).includes("403")) {
          disconnect();
          dispatch(createLoginSuccessAction("", ""));
          localStorage.clear();
          sessionStorage.clear();
          document.cookie.split(";").forEach((cookie) => {
            const name = cookie.split("=")[0].trim();
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          });
          notification.open({
            message: t("135"),
            key: "135",
          });
          openModal();
        }
      })
      .finally(() => {
        showLoding(false);
      });
    return false;
    // return isJpgOrPng && isLt2M;
  };
  const navigate = useNavigate();

  const { activate, deactivate, active, account } = useWeb3React();
  const [base64Head, setBase64Head] = useState<any>(null);

  const { walletProvider }: any = useAppKitProvider("eip155");
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();
  const [BNBBalanceAmount, setBNBBalanceAmount] = useState<any>("0");
  useEffect(() => {
    if (web3ModalAccount && walletProvider && Contracts) {
      new Contracts(walletProvider);
      Contracts.example.getBalance(web3ModalAccount).then((res: any) => {
        let amounted = Web3.utils.fromWei(res);
        setBNBBalanceAmount(amounted);
      }).catch((err: any) => {
        console.log(err);
      })
    }
  }, [web3ModalAccount, walletProvider, Contracts, chainId]); 

  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [twitter, setTwitter] = useState("");
  const [telegram, setTelegram] = useState("");
  const [tag, setTag] = useState("Meme");
  const [playType, setPlayType] = useState();
  const [buyAmount, setBuyAmount] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { open: openModal, close } = useAppKit();

  const handleSubmit = async () => {   
    if (getChainConfig().createTokenFee + Number(buyAmount) > Number(BNBBalanceAmount)) {
      notification.open({
        message: t('Insufficient balance'),
        key: 'Insufficient balance'
      })
      return
    }  
    let isAddressTrue = true
    try {
      const _web3 = new Web3(
        (chainId === 56 || chainId === 97) ?
          (isMain ? customNetwork_BSC?.rpcUrls?.default?.http[0] :
            customNetwork_BSC_TEST?.rpcUrls?.default?.http[0])
          :
          (chainId === 84532 || chainId === 8453) ?
            (isMain ? customNetwork_Base?.rpcUrls?.default?.http[0] :
              customNetwork_Base_TEST?.rpcUrls?.default?.http[0]) :
          (chainId === 196 || chainId === 11952) ?
            (isMain ? customNetwork_xLayer?.rpcUrls?.default?.http[0] :
              customNetwork_xLayer_TEST?.rpcUrls?.default?.http[0]) :
            (isMain ? customNetwork_SEI?.rpcUrls?.default?.http[0] :
              customNetwork_SEI_TEST?.rpcUrls?.default?.http[0])
      )
      console.log(customNetwork_BSC_TEST?.rpcUrls?.default?.http[0])
      console.log(getChainConfig().memeAddress)
      const code = await _web3.eth.getCode(getChainConfig().memeAddress);
      console.log(code)
      isAddressTrue = true;
    } catch (err) {
      isAddressTrue = false;
      console.log(err);
    }
    if (!isAddressTrue) {
      notification.open({
        message: t('245'),
        key: '245'
      })
      setTimeout(() => { 
        window.location.reload();
      }, 2000);
      return
    }

    // handleMeMe("1756799544998142173", 'name', 'symbol', '904183');
    // return
    if (showError || showError2) {
      notification.open({
        message: t('241'),
        key: '241',
      });
      return
    } 
    const fieldsToCheck: any = { name, symbol, description, website, twitter, telegram, debox, buyAmount }; 
    const hasIllegalScript = Object.values(fieldsToCheck).some(containsScript);
    if (hasIllegalScript) {
      return notification.open({
        message: t('202'),
        key: 'Illegal parameters',
      });
    }

    if (!web3ModalAccount) {
      openModal();
      return;
    } 

    if (!name || !symbol || !description || !imageUrl) {
      return;
    }
    console.log(imageUrl);
    showLoding(true);

    try {
      const { data } = await getIsMainnet()
      if (data !== isMain) {
        notification.open({
          message: t('201'),
          key: 'Please switch to the main network'
        })
        showLoding(false);
        return
      }
    }
    catch (err) {
      showLoding(false);
      return
    }

    createToken({
      name: name,
      symbol: symbol,
      description: description,
      insurance: tabIndex2 === 1 ? true : false,
      imageUrl: imageUrl,
      website: website,
      twitter: twitter,
      telegram: telegram,
      creator: web3ModalAccount,
      tag: tag,
      deboxUrl: debox,
      buyAmount: buyAmount,
    })
      .then((res: any) => {
        handleMeMe(res?.data?.id, name, symbol, res?.data?.salt);
        // if (tabIndex2 === 0) {
        //   handleMeMe(res?.data?.id, name, symbol, res?.data?.salt);
        // } else { 
        //   handleMeMe2(res?.data?.id, name, symbol);
        // }
      })
      .catch((err: any) => {
        console.log(err);
        showLoding(false);
      });
  };
  const handleMeMe = async (id: any, name: string, symbol: string, salt: string) => {
    console.info(web3ModalAccount, id, name, symbol, buyAmount, salt) 
  // console.info(web3ModalAccount, new BigNumber(id), name, symbol, buyAmount, new BigNumber(salt))
    try {
      await Contracts.example
        ?.createToken(web3ModalAccount, id, name, symbol, buyAmount, salt)
        .then((res: any) => {
          handleCreateCoinSuccess(res, id);
          console.info(res);
        })
        .catch((err: any) => {
          console.info(err);
          showLoding(false);
          notification.open({
            message: err?.message.includes("User denied transaction signature.")
              ? "User denied transaction signature."
              : "Contract execution failed, please refresh and try again.",
          });
        });
    } catch (err: any) {
      console.log(err);
      showLoding(false);
    }
  }; 
  const handleCreateCoinSuccess = (res: any, tokenID: any) => {
    createCoinSuccess({
      okenID: tokenID,
      txhash: res?.transactionHash,
    }).then((res: any) => {
      setName("");
      setSymbol("");
      setDescription("");
      setWebsite("");
      setTwitter("");
      setTelegram("");
      setTag("Meme");
      setBuyAmount("");
      setImageUrl("");
      setDebox("");
      setMerchantHead(null);
      setBase64Head(null);
      showLoding(false);
      setOpen(true);
    }).catch((err: any) => {
      showLoding(false);
      console.log(err);
    })
  }
  const handleMeMe2 = async (id: any, name: string, symbol: string) => {
    try {
      await Contracts.example
        ?.createToken2(web3ModalAccount, id, name, symbol, buyAmount)
        .then((res: any) => {
          console.log(res);
          setName("");
          setSymbol("");
          setDescription("");
          setWebsite("");
          setTwitter("");
          setTelegram("");
          setTag("Meme");
          setBuyAmount("");
          setImageUrl("");
          setDebox("");
          setMerchantHead(null);
          setBase64Head(null);
          showLoding(false);
          setOpen(true);
        })
        .catch((err: any) => {
          console.log(err);
          showLoding(false);
          notification.open({
            message: err?.message.includes("User denied transaction signature.")
              ? "User denied transaction signature."
              : "Transaction error",
          });
        });
    } catch (err: any) {
      console.log(err);
      showLoding(false);
    }
  }; 
  const handleCheckSlefCoin = () => {
    if (!web3ModalAccount) {
      return;
    }
    tokenList({
      offset: 1,
      limit: 50,
      creator: web3ModalAccount,
      address: '',
    })
      .then((res) => {
        console.info(res.data)
        debugger
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    // handleCheckSlefCoin();
  }, [web3ModalAccount]); 
  const [open, setOpen] = useState(false);
  const [debox, setDebox] = useState("");

  const [showError, setShowError] = useState(false);
  const [showError2, setShowError2] = useState(false);
  return (
    <div className="w-full">
      <TopBar />
      <div
        className="pt-[104px] w-[740px] mx-auto
      h5:w-full h5:pt-[64px] h5:px-[16px]
      "
      >
        <div
          className="text-center text-[40px] text-[#FFFD41] font-bold pb-[60px]
        h5:text-[30px] h5:pb-[24px]
        "
        >
          {t("37")}
        </div>
        <div className="flex h5:block">
          <div
            className="w-[190px] h-[190px] bg-[#1E1E1E] rounded-[10px] mr-[30px] relative
          h5:mx-auto
          "
          >
            {/* <UpImage /> */}
            <Upload
              name="avatar"
              listType="picture-card"
              showUploadList={false}
              action=""
              beforeUpload={beforeUpload}
              className="imgUpload"
              maxCount={1}
            >
              {base64Head ? (
                <div className="flex h-[190px] justify-center items-center">
                  <img
                    src={base64Head}
                    alt="avatar"
                    className="w-[170px] h-[170px] absolute left-[10px] top-[10px] rounded-[10px]"
                  />
                </div>
              ) : (
                <div className="text-center pt-[20px] cursor-pointer">
                  <svg
                    className="mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    width="52"
                    height="44"
                    viewBox="0 0 52 44"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_10_716)">
                      <path
                        d="M47.3964 2.23983e-10H4.60435C3.51581 2.23983e-10 2.47185 0.434276 1.70213 1.20729C0.932421 1.98031 0.5 3.02874 0.5 4.12195L0.5 39.878C0.525376 40.9543 0.968974 41.9778 1.73595 42.7298C2.50294 43.4819 3.53243 43.9027 4.60435 43.9024H47.3964C48.4683 43.9027 49.4978 43.4819 50.2648 42.7298C51.0318 41.9778 51.4754 40.9543 51.5008 39.878V4.12195C51.5008 3.58064 51.3946 3.04464 51.1883 2.54454C50.9821 2.04444 50.6798 1.59003 50.2986 1.20728C49.9175 0.824517 49.465 0.520897 48.9671 0.313752C48.4691 0.106608 47.9354 -5.64255e-06 47.3964 2.23983e-10ZM40.6692 22.2439C40.3178 21.9825 39.8921 21.8414 39.4549 21.8414C39.0176 21.8414 38.5919 21.9825 38.2406 22.2439L29.3762 28.2439L16.7717 12.4634C16.5805 12.2534 16.3479 12.0857 16.0887 11.971C15.8294 11.8562 15.5492 11.797 15.2659 11.797C14.9826 11.797 14.7024 11.8562 14.4432 11.971C14.184 12.0857 13.9514 12.2534 13.7602 12.4634L4.60435 21.8049V4.12195H47.3964V25.0488L40.6692 22.2439Z"
                        fill="#CCCCCC"
                      />
                      <path
                        d="M36.5891 8.34131C35.4507 8.34131 34.3378 8.68033 33.3913 9.3155C32.4448 9.95067 31.707 10.8535 31.2714 11.9097C30.8357 12.966 30.7218 14.1282 30.9439 15.2495C31.1659 16.3709 31.7141 17.4008 32.5191 18.2093C33.3241 19.0177 34.3497 19.5682 35.4662 19.7912C36.5827 20.0143 37.74 19.8998 38.7918 19.4623C39.8435 19.0248 40.7424 18.2839 41.3749 17.3333C42.0073 16.3826 42.3449 15.265 42.3449 14.1218C42.3449 12.5887 41.7384 11.1184 40.659 10.0344C39.5796 8.95036 38.1156 8.34135 36.5891 8.34135V8.34131ZM36.5891 15.6584C36.2624 15.6584 35.9431 15.5611 35.6716 15.3788C35.4 15.1966 35.1883 14.9376 35.0633 14.6345C34.9384 14.3314 34.9057 13.998 34.9694 13.6762C35.0331 13.3545 35.1904 13.059 35.4214 12.827C35.6523 12.5951 35.9466 12.4371 36.2669 12.3731C36.5873 12.3091 36.9193 12.342 37.2211 12.4675C37.5229 12.5931 37.7808 12.8056 37.9623 13.0784C38.1437 13.3511 38.2406 13.6718 38.2406 13.9998C38.2538 14.2257 38.2209 14.4519 38.1439 14.6645C38.0668 14.8772 37.9473 15.0717 37.7926 15.2362C37.6379 15.4007 37.4513 15.5317 37.2443 15.6211C37.0374 15.7104 36.8144 15.7564 36.5891 15.756V15.6584Z"
                        fill="#CCCCCC"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_10_716">
                        <rect
                          width="51"
                          height="44"
                          fill="white"
                          transform="translate(0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="text-[14px] text-[#CCC] font-[400] mt-[10px]">
                    jpeg/png/webp/gif
                  </div>
                  <div className="text-[14px] text-[#CCC] font-[400] mb-6">
                    {t("38")}: 5MB
                  </div>
                    <svg 
                    className="mx-auto"
                      xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <g clipPath="url(#clip0_1_2355)">
                        <path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.1429 12.6429C17.1429 12.7607 17.0464 12.8571 16.9286 12.8571H12.8571V16.9286C12.8571 17.0464 12.7607 17.1429 12.6429 17.1429H11.3571C11.2393 17.1429 11.1429 17.0464 11.1429 16.9286V12.8571H7.07143C6.95357 12.8571 6.85714 12.7607 6.85714 12.6429V11.3571C6.85714 11.2393 6.95357 11.1429 7.07143 11.1429H11.1429V7.07143C11.1429 6.95357 11.2393 6.85714 11.3571 6.85714H12.6429C12.7607 6.85714 12.8571 6.95357 12.8571 7.07143V11.1429H16.9286C17.0464 11.1429 17.1429 11.2393 17.1429 11.3571V12.6429Z" fill="#FFFD41" />
                      </g>
                      <defs>
                        <clipPath id="clip0_1_2355">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg> 
                </div>
              )}
            </Upload>
          </div>
          <div className="flex-1  h5:pt-[26px]">
            <div>
              <div
                className="text-[18px] text-[#fff] font-[500] flex items-center
              h5:text-[14px]
              "
              >
                {t("39")}
                <span className="text-[18px] text-[#D62727] font-[500] ml-4 relative top-[2px]">
                  *
                </span>
              </div>
              <div className="relative">
                <div className="w-full h-[50px] bg-[#1E1E1E] px-16 flex items-center rounded-[10px] mt-[6px]">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      const val = e.target.value;
                      setName(val);
                      if (val.length <= 100) {
                        setShowError(false);
                      } else {
                        setShowError(true);
                      }
                    }}
                    className="w-full bg-transparent text-[16px] text-[#fff] font-[600]
                h5:text-[14px]
                "
                  />
                </div>
                {showError && (
                  <div className="absolute left-0 top-full mt-1 text-[12px] text-[#D62727]">
                    {t('241')}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-[20px]">
              <div
                className="text-[18px] text-[#fff] font-[500] flex items-center
              h5:text-[14px]
              "
              >
                {t("40")}
                <span className="text-[18px] text-[#D62727] font-[500] ml-4 relative top-[2px]">
                  *
                </span>
              </div>
              <div className="relative">
                <div className="w-full h-[50px] bg-[#1E1E1E] px-16 flex items-center rounded-[10px] mt-[6px]">
                  <input
                    type="text"
                    value={symbol}
                    onChange={(e) => {
                      const val = e.target.value; 
                      setSymbol(val);
                      if (val.length <= 100) {
                        setShowError2(false);
                      } else {
                        setShowError2(true);
                      }
                    }}
                    className="w-full bg-transparent text-[16px] text-[#fff] font-[600]
                h5:text-[14px]
                "
                  />
                </div>
                {showError2 && (
                  <div className="absolute left-0 top-full mt-1 text-[12px] text-[#D62727]">
                    {t('241')}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[20px]">
          <div
            className="text-[18px] text-[#fff] font-[500] flex items-center
              h5:text-[14px]
              "
          >
            {t("41")}
            <span className="text-[18px] text-[#D62727] font-[500] ml-4 relative top-[2px]">
              *
            </span>
          </div>
          <div className="w-full bg-[#1E1E1E] px-16 py-10 flex items-center rounded-[10px] mt-[6px]">
            <textarea
              value={description}
              onChange={(e) => {
                if (e.target.value.length <= 600)
                  setDescription(e.target.value);
              }}
              className="w-full h-[80px] bg-transparent text-[16px] text-[#fff] font-[600] 
              h5:text-[14px]
              "
            />
          </div>
        </div>
        {/* <Dropdown
          menu={{ items: itemsType }}
          placement="bottom"
          trigger={["hover"]}
        >
          <div className="mt-[20px] cursor-pointer">
            <div
              className="text-[18px] text-[#fff] font-[500] flex items-center
              h5:text-[14px]
              "
            >
              {t('203')}
            </div>
            <div className="w-full h-[50px] bg-[#1E1E1E] px-16 flex items-center justify-between rounded-[10px] mt-[6px]">
              <div className="text-[16px] text-[#fff] font-[600]">{playType || t("204")}</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
              >
                <path
                  d="M11.3648 0.664855C11.3254 0.618262 11.2772 0.579916 11.223 0.55201C11.1688 0.524103 11.1096 0.507183 11.0489 0.502216C10.9882 0.497248 10.9271 0.504331 10.8691 0.523059C10.8111 0.541788 10.7573 0.571794 10.7109 0.611364L6.30003 4.36387C6.21627 4.43501 6.11006 4.47405 6.0003 4.47405C5.89053 4.47405 5.78432 4.43501 5.70056 4.36387L1.28856 0.610201C1.24205 0.570698 1.18824 0.540775 1.13019 0.522142C1.07215 0.503509 1.01101 0.496531 0.950275 0.501607C0.88954 0.506683 0.830397 0.523713 0.776229 0.551724C0.72206 0.579735 0.673928 0.618178 0.634583 0.664855L0.109317 1.28581C0.0301268 1.37994 -0.00860735 1.50173 0.00160895 1.62445C0.0118252 1.74718 0.0701585 1.86084 0.163815 1.9405L5.12427 6.15931H5.12891L5.14514 6.17442C5.38068 6.38416 5.68473 6.5 5.99972 6.5C6.3147 6.5 6.61875 6.38416 6.85429 6.17442L6.87052 6.15931H6.87632L11.8356 1.9405C11.8822 1.90104 11.9205 1.85277 11.9484 1.79845C11.9764 1.74412 11.9933 1.68481 11.9984 1.6239C12.0035 1.56299 11.9965 1.50168 11.9779 1.44347C11.9593 1.38526 11.9295 1.33129 11.8901 1.28465L11.3648 0.663693V0.664855Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>
        </Dropdown> */}
        <div className="mt-[20px]">
          <div
            className="text-[18px] text-[#fff] font-[500] flex items-center
              h5:text-[14px]
              "
          >
            {t("43")}
          </div>
          <div className="w-full h-[50px] bg-[#1E1E1E] px-16 flex items-center rounded-[10px] mt-[6px]"
            style={{
              display: chainId ? 'flex' : 'none'
            }}>
            <img
              src={(chainId === 1329 || chainId === 1328 || chainId === 113329) ?
                require("../../assets/image/seiIcon.png")
                :
                (chainId === 196 || chainId === 11952) ?
                  require("../../assets/image/okIcon.png") :
                  (chainId === 84532 || chainId === 8453) ?
                    require("../../assets/image/BaseIcon.png") :
                  require("../../assets/image/bnbIcon.png")
              }
              className="w-[24px] rounded-lg mr-[10px]"
              alt=""
            />
            <div
              className="text-[16px] text-[#fff] font-[600]
              h5:text-[14px]
              "
            >
              {(chainId === 1329 || chainId === 113329 || chainId === 1328) ?
                'SEI Chain' :
                (chainId === 196 || chainId === 11952) ?
                  'OKB Coin' :
                  (chainId === 84532 || chainId === 8453) ?
                    'Base Chain' :
                  'BNB Coin'} 
            </div>
          </div>
        </div>
        <div className="mt-[20px]">
          <div
            className="text-[18px] text-[#fff] font-[500] flex items-center
              h5:text-[14px]
              "
          >
            {t("44")} {t("137")}
          </div>
          <div className="w-full h-[50px] bg-[#1E1E1E] px-16 flex items-center rounded-[10px] mt-[6px]">
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full bg-transparent text-[16px] text-[#fff] font-[600]
              h5:text-[14px]
              "
            />
          </div>
        </div>
        <div className="mt-[20px]">
          <div
            className="text-[18px] text-[#fff] font-[500] flex items-center
              h5:text-[14px]
              "
          >
            {t("45")} {t("137")}
          </div>
          <div className="w-full h-[50px] bg-[#1E1E1E] px-16 flex items-center rounded-[10px] mt-[6px]">
            <input
              type="text"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              className="w-full bg-transparent text-[16px] text-[#fff] font-[600]
              h5:text-[14px]
              "
            />
          </div>
        </div>
        <div className="mt-[20px]">
          <div
            className="text-[18px] text-[#fff] font-[500] flex items-center
              h5:text-[14px]
              "
          >
            {t("46")} {t("137")}
          </div>
          <div className="w-full h-[50px] bg-[#1E1E1E] px-16 flex items-center rounded-[10px] mt-[6px]">
            <input
              type="text"
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
              className="w-full bg-transparent text-[16px] text-[#fff] font-[600]
              h5:text-[14px]
              "
            />
          </div>
        </div>
        <div className="mt-[20px] hidden">
          <div
            className="text-[18px] text-[#fff] font-[500] flex items-center
              h5:text-[14px]
              "
          >
            Debox {t("137")}
          </div>
          <div className="w-full h-[50px] bg-[#1E1E1E] px-16 flex items-center rounded-[10px] mt-[6px]">
            <input
              type="text"
              value={debox}
              onChange={(e) => setDebox(e.target.value)}
              className="w-full bg-transparent text-[16px] text-[#fff] font-[600]
              h5:text-[14px]
              "
            />
          </div>
        </div>
        <Dropdown
          menu={{ items: items }}
          placement="bottom"
          trigger={["hover"]}
        >
          <div className="mt-[20px] cursor-pointer">
            <div
              className="text-[18px] text-[#fff] font-[500] flex items-center
              h5:text-[14px]
              "
            >
              {t("47")}
            </div>
            <div className="w-full h-[50px] bg-[#1E1E1E] px-16 flex items-center justify-between rounded-[10px] mt-[6px]">
              <div className="text-[16px] text-[#fff] font-[600]">{tag}</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
              >
                <path
                  d="M11.3648 0.664855C11.3254 0.618262 11.2772 0.579916 11.223 0.55201C11.1688 0.524103 11.1096 0.507183 11.0489 0.502216C10.9882 0.497248 10.9271 0.504331 10.8691 0.523059C10.8111 0.541788 10.7573 0.571794 10.7109 0.611364L6.30003 4.36387C6.21627 4.43501 6.11006 4.47405 6.0003 4.47405C5.89053 4.47405 5.78432 4.43501 5.70056 4.36387L1.28856 0.610201C1.24205 0.570698 1.18824 0.540775 1.13019 0.522142C1.07215 0.503509 1.01101 0.496531 0.950275 0.501607C0.88954 0.506683 0.830397 0.523713 0.776229 0.551724C0.72206 0.579735 0.673928 0.618178 0.634583 0.664855L0.109317 1.28581C0.0301268 1.37994 -0.00860735 1.50173 0.00160895 1.62445C0.0118252 1.74718 0.0701585 1.86084 0.163815 1.9405L5.12427 6.15931H5.12891L5.14514 6.17442C5.38068 6.38416 5.68473 6.5 5.99972 6.5C6.3147 6.5 6.61875 6.38416 6.85429 6.17442L6.87052 6.15931H6.87632L11.8356 1.9405C11.8822 1.90104 11.9205 1.85277 11.9484 1.79845C11.9764 1.74412 11.9933 1.68481 11.9984 1.6239C12.0035 1.56299 11.9965 1.50168 11.9779 1.44347C11.9593 1.38526 11.9295 1.33129 11.8901 1.28465L11.3648 0.663693V0.664855Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>
        </Dropdown>
        <div className="mt-[20px] mb-[40px]">
          <div
            className="text-[18px] text-[#fff] font-[500] flex items-center
              h5:text-[14px]
              "
          >
            {t("48")}
            {chainCoinName(chainId)}
            {t("48_1")}
          </div>
          <div className="w-full h-[50px] bg-[#1E1E1E] px-16 flex items-center rounded-[10px] mt-[6px]">
            <input
              type="text"
              value={buyAmount}
              onChange={(e) => {
                const value = e.target.value; 
                if (/^\d*\.?\d*$/.test(value)) {
                  setBuyAmount(value);
                }
              }}
              className="w-full bg-transparent text-[16px] text-[#fff] font-[600]
              h5:text-[14px]
              "
            />
            <div className=" h-[48px] bg-[#1E1E1E] px-16 flex items-center rounded-[10px] mt-[6px]"
              style={{
                display: chainId ? 'flex' : 'none'
              }}> 
              <img
                src={(chainId === 1329 || chainId === 1328 || chainId === 113329) ?
                  require("../../assets/image/seiIcon.png") :
                  (chainId === 196 || chainId === 11952) ?
                    require("../../assets/image/okIcon.png") :
                    (chainId === 84532 || chainId === 8453) ?
                      require("../../assets/image/BaseIcon.png") :
                    require("../../assets/image/bnbIcon.png")}
                className="w-[24px] rounded-lg mr-[10px]"
                alt=""
              />
              <div
                className="text-[16px] text-[#fff] font-[600] whitespace-nowrap
              h5:text-[14px]
              "
              > 
                {(chainId === 1329 || chainId === 1328 || chainId === 113329) ?
                  'SEI Coin' :
                  (chainId === 196 || chainId === 11952) ? 'OKB Coin' :
                    (chainId === 84532 || chainId === 8453) ? 'Base Coin'
                      : 'BNB Coin'} 
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex items-center flex-1 my-[30px]">
          <Switch checked={switchVal} onChange={(val: boolean) => { setSwitchVal(val) }} />
          <div className="text-[#62573A] text-[16px] font-[500] ml-8">Extra Options</div>
        </div> */}
        <div
          className="hover-effect bg-[#FFFD41] text-[#0E0E0E] text-[20px] font-[600] text-center justify-center rounded-full py-10 cursor-pointer
          h5:text-[16px] h5:h-[46px]
        "
          style={{
            cursor:
              name && symbol && description && imageUrl
                ? "pointer"
                : "not-allowed",
            opacity: name && symbol && description && imageUrl ? 1 : 0.5,
          }}
          onClick={handleSubmit}
        >   
          {web3ModalAccount ? t("49") : t("0")}
        </div>
      </div>
      <FooterBar index={1} />
      <Modal
        width={560}
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
      >
        <div className="p-[10px] pb-[20px] h5:px-[6px] h5:py-[14px]">
          <svg 
            className="absolute top-[18px] right-[18px] cursor-pointer"
            onClick={() => {
              setOpen(false);
            }}
            xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 0C4.11429 0 0 4.11429 0 9C0 13.8857 4.11429 18 9 18C13.8857 18 18 13.8857 18 9C18 4.11429 13.8857 0 9 0ZM12.8571 11.5714C13.2429 11.9571 13.2429 12.4714 12.8571 12.7286C12.4714 13.1143 11.9571 13.1143 11.7 12.7286L9.12857 10.1571L6.42857 12.8571C6.04286 13.2429 5.52857 13.2429 5.14286 12.8571C4.75714 12.4714 4.75714 11.8286 5.14286 11.5714L7.84286 8.87143L5.27143 6.3C4.88571 6.04286 4.88571 5.52857 5.27143 5.14286C5.65714 4.75714 6.17143 4.75714 6.42857 5.14286L9 7.71429L11.7 5.01429C12.0857 4.62857 12.6 4.62857 12.9857 5.01429C13.3714 5.4 13.3714 5.91429 12.9857 6.3L10.2857 9L12.8571 11.5714Z" fill="#FFFD41" />
          </svg>
          <div className="pt-16 text-center"> 
            <svg
              className="mx-auto block h5:w-[48px]" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
              <path d="M30 0C37.9565 0 45.5871 3.16071 51.2132 8.7868C56.8393 14.4129 60 22.0435 60 30C60 37.9565 56.8393 45.5871 51.2132 51.2132C45.5871 56.8393 37.9565 60 30 60C22.0435 60 14.4129 56.8393 8.7868 51.2132C3.16071 45.5871 0 37.9565 0 30C0 22.0435 3.16071 14.4129 8.7868 8.7868C14.4129 3.16071 22.0435 0 30 0ZM46.5 19.5967C45.8749 18.9718 45.0272 18.6207 44.1433 18.6207C43.2595 18.6207 42.4118 18.9718 41.7867 19.5967L25.2867 36.0967L18.2133 29.0233C17.9058 28.705 17.538 28.451 17.1313 28.2763C16.7247 28.1016 16.2873 28.0097 15.8447 28.0058C15.4021 28.002 14.9631 28.0863 14.5535 28.2539C14.1438 28.4215 13.7717 28.669 13.4587 28.982C13.1457 29.295 12.8982 29.6672 12.7306 30.0768C12.563 30.4865 12.4787 30.9254 12.4825 31.368C12.4863 31.8106 12.5783 32.248 12.753 32.6547C12.9277 33.0614 13.1816 33.4292 13.5 33.7367L22.9333 43.1667L23.2233 43.4233C23.864 43.9299 24.6684 44.1836 25.4838 44.1363C26.2992 44.089 27.0689 43.7439 27.6467 43.1667L46.5033 24.31C47.1282 23.6849 47.4793 22.8372 47.4793 21.9533C47.4793 21.0695 47.1282 20.2218 46.5033 19.5967H46.5Z" fill="#FFFD41" />
            </svg>
            <div className="text-[18px] text-[#FFFFFF] font-[500] mt-[20px] pb-[40px] h5:text-[16px]">
              {t("126")}
            </div>
          </div>
          <div
            className="bg-[#FFFD41] text-[#0E0E0E] text-[20px] font-[500] text-center rounded-full py-10 cursor-pointer
            h5:text-[20px] h5:h-[46px] h5:flex h5:items-center h5:justify-center 
            "
            onClick={() => {
              setOpen(false);
              navigate("/");
            }}
          >
            {t("Confirm")}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default App;
