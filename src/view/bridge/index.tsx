import React, { useEffect, useState } from 'react';
import TopBar from '../../components/topBar';
import FooterBar from '../../components/footerBar';
import { submitSupport, userDetail } from '../../API';
import { NumSplic1, containsScript, showLoding } from '../../utils/tool';
import { useTranslation } from 'react-i18next';
import { Dropdown, notification } from "antd";
import seiIcon from '../../assets/image/seiIcon.png';
import bnbIcon from '../../assets/image/bnbIcon.png';
import { Contracts } from '../../web3';
import Web3 from "web3";
import {
  useAppKit,
  useAppKitAccount,
  useAppKitNetwork,
  useDisconnect, useAppKitProvider
} from "@reown/appkit/react";
import { JsonRpcProvider } from "ethers";
import { getChainConfig } from '../../getChainConfig';
import { customNetwork_BSC, customNetwork_BSC_TEST, customNetwork_Base, customNetwork_Base_TEST, customNetwork_SEI, customNetwork_SEI_TEST, customNetwork_xLayer, customNetwork_xLayer_TEST, isMain } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { saveChainId, saveSelectAll } from '../../store/actions';
import { chainCoinName } from '../coinName';


const App: React.FC = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [website, setWebsite] = useState('')
  const [twitter, setTwitter] = useState('')
  const [email, setEmail] = useState('')
  const { open: openModal, close } = useAppKit();
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();
  const [isSupport, setIsSupport] = useState('')

  let dispatch = useDispatch();
  const onSwitch = async (network: any) => {
    try {
      await switchNetwork(network)
      dispatch(
        saveChainId(network.id)
      );

    } catch (err) {
      console.error(err)
      return
    }
  }  

  const handleSubmit = async () => {
    if (!web3ModalAccount) {
      openModal();
      return
    }
    if (Number(depositAmount) > Number(BNBBalanceAmount)) {
      notification.open({
        message: t('Insufficient balance'),
        key: 'Insufficient balance'
      })
      return
    }
    // if (coinList[sendCoinIndex]?.id !== chainId) {
    //   notification.open({
    //     message: `${t('242')}${chainCoinName(chainId)}${t('243')}`,
    //     description: (
    //       <div
    //         onClick={async () => {
    //           if (coinList[sendCoinIndex]?.name === "SEI") {
    //             await onSwitch(isMain ? customNetwork_SEI : customNetwork_SEI_TEST);
    //           }
    //           else if (coinList[sendCoinIndex]?.name === "BNB") {
    //             await onSwitch(isMain ? customNetwork_BSC : customNetwork_BSC_TEST);
    //           } else {
    //             onSwitch(isMain ? customNetwork_Base : customNetwork_Base_TEST);
    //           }
    //           notification.destroy('switch network');
    //         }}
    //         className="text-[#1E1E1E] hover:text-[#1E1E1E] text-[14px] font-[500] cursor-pointer underline"
    //       >
    //         {t('244')}
    //       </div>
    //     ),
    //     key: 'switch network'
    //   });
    //   return
    // }

    notification.open({
      message: t('246'),
      key: 'tips'
    })
    return
    if (Number(depositAmount) < minDepositNum) {
      notification.open({
        message: 'The deposit amount is less than the minimum deposit amount',
        key: 'tips'
      });
      return
    }

    showLoding(true) 
    try {
      if (chainId !== coinList[sendCoinIndex]?.id) {
        if (coinList[sendCoinIndex]?.name === "SEI") {
          await onSwitch(isMain ? customNetwork_SEI : customNetwork_SEI_TEST);
        }
        else if (coinList[sendCoinIndex]?.name === "BNB") {
          await onSwitch(isMain ? customNetwork_BSC : customNetwork_BSC_TEST);
        }
        else {
          notification.open({
            message: t('201'),
            key: 'tips'
          });
          return
        }
      }
    } catch (error) {
      showLoding(false)
    }

    Contracts.example
      ?.Deposit(web3ModalAccount, depositAmount, coinList[toCoinIndex]?.id)
      .then((res: any) => {
        notification.open({
          message: t('Received successfully'),
          key: 'tips'
        });
        getBalance(web3ModalAccount)
      })
      .catch((error: any) => { 
        notification.open({
          message: error?.message.includes("User denied transaction signature.")
            ? "User denied transaction signature."
            : (error?.message || error?.name || 'Transaction error'),
          key: "err"
        });
      }).finally(() => {
        showLoding(false)
      })
  }
  let { t, i18n } = useTranslation();
  useEffect(() => {
    if (!web3ModalAccount) return
  }, [web3ModalAccount])

  const coinList = [
    {
      icon: seiIcon, name: 'SEI',
      id: (isMain ? customNetwork_SEI?.id :
        customNetwork_SEI_TEST?.id),
    },
    {
      icon: bnbIcon, name: 'BNB',
      id: (isMain ? customNetwork_BSC?.id :
        customNetwork_BSC_TEST?.id),
    }
  ];
  const [sendCoinIndex, setSendCoinIndex] = useState(0)
  const [toCoinIndex, setToCoinIndex] = useState(1)
  const items = coinList.map((item, index) => ({
    key: item.name,
    label: (
      <div
        className={`flex items-center text-[18px] pb-6 pt-4 font-[500] 
        h5:text-[12px]
          ${index === sendCoinIndex ? "text-[#7BFF48]" : "text-[#fff]"
          }`}
        style={{ 
          textAlign: "center"
        }}
      >
        <img
          src={item.icon}
          className="w-[26px] h-[26px] mr-[8px]
          h5:w-[20px] h5:h-[20px]"
          alt={item.name}
        />
        {item.name} 
      </div>
    ),
    onClick: () => {
      if (index === toCoinIndex) {
        setSendCoinIndex(index)
        setToCoinIndex(sendCoinIndex)
        return
      }
      setSendCoinIndex(index)
    }
  }));
  const items2 = coinList.map((item, index) => ({
    key: item.name,
    label: (
      <div
        className={`flex items-center text-[18px] pb-6 pt-4 font-[500] 
        h5:text-[12px]
          ${index === toCoinIndex ? "text-[#7BFF48]" : "text-[#fff]"
          }`}
        style={{ 
          textAlign: "center"
        }}
      >
        <img
          src={item.icon}
          className="w-[26px] h-[26px] mr-[8px]
          h5:w-[20px] h5:h-[20px]"
          alt={item.name}
        />
        {item.name}
      </div>
    ),
    onClick: () => {
      if (index === sendCoinIndex) {
        setToCoinIndex(index)
        setSendCoinIndex(toCoinIndex)
        return
      }
      setToCoinIndex(index)
    }
  }));

  const { switchNetwork, chainId } = useAppKitNetwork();
  const { walletProvider }: any = useAppKitProvider("eip155");
  const [BNBBalanceAmount, setBNBBalanceAmount] = useState<any>("0");
  useEffect(() => {
    if (web3ModalAccount && walletProvider && Contracts) { 
      getBalance(web3ModalAccount)
    }
  }, [web3ModalAccount, walletProvider, Contracts, chainId, sendCoinIndex]);

  async function getBalance(address: any) {
    try {
      const rpcUrls =
        coinList[sendCoinIndex]?.name === 'SEI' ?
          (
            (isMain ? customNetwork_SEI?.rpcUrls?.default?.http[0] :
              customNetwork_SEI_TEST?.rpcUrls?.default?.http[0])
          ) :
          coinList[sendCoinIndex]?.name === 'BNB' ?
            (isMain ? customNetwork_BSC?.rpcUrls?.default?.http[0] :
              customNetwork_BSC_TEST?.rpcUrls?.default?.http[0])
            :
            (isMain ? customNetwork_xLayer?.rpcUrls?.default?.http[0] :
              customNetwork_xLayer_TEST?.rpcUrls?.default?.http[0])

      const provider = new JsonRpcProvider(rpcUrls);
      const balance = await provider.getBalance(address);
      const amounted = Web3.utils.fromWei(balance.toString());
      setBNBBalanceAmount(NumSplic1(amounted, 6));
      console.info("Balance:", amounted);  

      handleGetMinDepositAmount()
    } catch (err) {
      console.info("Failed to get balance:", err);
    }
  }

  const [depositAmount, setDepositAmount] = useState<any>('');
  const [minDepositNum, setMinDepositNum] = useState<any>(0);
  const handleGetMinDepositAmount = () => {
    Contracts.example
      ?.getSwapMinDepositAmount()
      .then((res: any) => {
        const amounted = Web3.utils.fromWei(res.toString());

        setMinDepositNum(NumSplic1(amounted, 6));
        console.info("MinDepositAmount" + NumSplic1(amounted, 6))
      })
      .catch((err: any) => {
        console.info(err);
      });
  }


  return (
    <div className="w-full">
      <TopBar />
      <div className="pt-[164px] w-[628px] mx-auto
      h5:w-full h5:pt-[74px] h5:px-[16px]
      ">
        <div className="bg-[#1E1E1E] rounded-[20px] px-[42px] py-[28px]
        h5:px-[20px] h5:py-[14px]">
          <div className="flex items-center text-[#fff] text-[18px] font-[500] select-none
          h5:text-[14px]">
            From 
            {
              items?.length > 0 ?
                <Dropdown menu={{ items }} placement="bottom"
                  overlayClassName="bridge_dropdown"
                  trigger={["hover"]}>
                  <div className="flex items-center ml-[18px] bg-[#2E2E2E] rounded-[30px] px-[14px] py-8 cursor-pointer
                  h5:px-[10px]">
                    <img src={coinList[sendCoinIndex]?.icon} alt=""
                      className="w-[26px] h-[26px]
                    h5:w-[20px] h5:h-[20px]" />
                    <div className="pr-[40px] pl-8 text-[#fff] text-[20px] font-[500]
                      h5:text-[14px] h5:pr-[22px] h5:pl-6">
                      {coinList[sendCoinIndex]?.name}
                    </div>
                    <svg
                      className='h5:w-[10px] h5:h-[5px]'
                      xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none">
                      <path d="M11.3648 0.164855C11.3254 0.118262 11.2772 0.0799162 11.223 0.0520098C11.1688 0.0241035 11.1096 0.00718345 11.0489 0.00221589C10.9882 -0.00275167 10.9271 0.00433132 10.8691 0.0230595C10.8111 0.0417876 10.7573 0.0717941 10.7109 0.111364L6.30003 3.86387C6.21627 3.93501 6.11006 3.97405 6.0003 3.97405C5.89053 3.97405 5.78432 3.93501 5.70056 3.86387L1.28856 0.110201C1.24205 0.0706985 1.18824 0.0407753 1.13019 0.022142C1.07215 0.00350858 1.01101 -0.00346894 0.950275 0.00160682C0.88954 0.00668257 0.830397 0.0237127 0.776229 0.0517239C0.72206 0.0797352 0.673928 0.118178 0.634583 0.164855L0.109317 0.785815C0.0301268 0.879944 -0.00860735 1.00173 0.00160895 1.12445C0.0118252 1.24718 0.0701585 1.36084 0.163815 1.4405L5.12427 5.65931H5.12891L5.14514 5.67442C5.38068 5.88416 5.68473 6 5.99972 6C6.3147 6 6.61875 5.88416 6.85429 5.67442L6.87052 5.65931H6.87632L11.8356 1.4405C11.8822 1.40104 11.9205 1.35277 11.9484 1.29845C11.9764 1.24412 11.9933 1.18481 11.9984 1.1239C12.0035 1.06299 11.9965 1.00168 11.9779 0.94347C11.9593 0.885259 11.9295 0.831292 11.8901 0.784652L11.3648 0.163693V0.164855Z" fill="#5F5F5F" />
                    </svg>
                  </div>
                </Dropdown>
                : ''
            }
          </div>
          <div className="bg-[#2E2E2E] rounded-[20px] px-[30px] py-[16px] mt-13
          h5:p-[12px]">
            <div className="flex items-center">
              <div className="flex-1 text-[#fff] text-[14px] font-[500] select-none
              h5:text-[12px]">Send:</div>
              <div className="text-[#fff] text-[14px] font-[500]
              h5:text-[12px]">
                Max:
                {BNBBalanceAmount}
              </div>
            </div>
            <div className="flex items-center mt-10">
              <input
                className="flex-1 text-[#fff] text-[24px] font-[500] bg-transparent outline-none
                h5:text-[16px]"
                value={depositAmount}
                onChange={(e) => {
                  setDepositAmount(e.target.value);
                }}
                placeholder={minDepositNum}
                type="number" />
              <div className="text-[#fff] text-[20px] font-[500]
              h5:text-[14px]">
                {coinList[sendCoinIndex]?.name}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center py-16">
            <svg className='cursor-pointer
            h5:w-[26px] h5:h-[26px]'
              onClick={() => {
                const _toIndex = toCoinIndex
                const _sendIndex = sendCoinIndex
                setSendCoinIndex(_toIndex)
                setToCoinIndex(_sendIndex)
              }}
              xmlns="http://www.w3.org/2000/svg" width="43" height="43" viewBox="0 0 43 43" fill="none">
              <g clip-path="url(#clip0_514_4273)">
                <path d="M0.950196 21.5218C0.950197 32.8773 10.1448 42.082 21.4882 42.082C32.8315 42.082 42.0261 32.8773 42.0261 21.5218C42.0261 10.1663 32.8315 0.962018 21.4882 0.962018C10.1448 0.962019 0.950196 10.1667 0.950196 21.5218ZM18.2905 34.1048C18.2825 34.1094 18.2699 34.1094 18.2606 34.1144L18.2102 34.127C18.2006 34.127 18.1926 34.1317 18.1851 34.1317L18.1296 34.1442C18.117 34.1442 18.109 34.1489 18.1011 34.1489C18.0834 34.1522 18.0616 34.1522 18.0456 34.1568C18.033 34.1568 18.0234 34.1619 18.0108 34.1619C17.9952 34.1619 17.9776 34.1665 17.9604 34.1665C17.9495 34.1694 17.9318 34.1694 17.918 34.1694L17.9197 34.1694C17.9071 34.1694 17.8945 34.1741 17.8722 34.1694C17.847 34.1741 17.8168 34.1741 17.7882 34.1741C17.7584 34.1741 17.7328 34.1694 17.703 34.1694L17.6618 34.1665L17.619 34.1619C17.6018 34.1619 17.5841 34.1619 17.5686 34.1568C17.556 34.1568 17.5464 34.1522 17.5338 34.1522C17.5157 34.1518 17.4976 34.1489 17.48 34.1442C17.4657 34.1442 17.4577 34.1396 17.4502 34.1396L17.3952 34.127C17.3855 34.127 17.3775 34.127 17.37 34.1224L17.3196 34.1098C17.3116 34.1052 17.299 34.1052 17.291 34.1006C17.2768 34.0976 17.2595 34.088 17.2436 34.0834L17.2087 34.0708C17.1961 34.0661 17.1802 34.0582 17.1676 34.0548L17.1298 34.0388C17.1172 34.0359 17.1046 34.0279 17.0916 34.0233C17.079 34.02 17.0618 34.0137 17.0487 34.0044C17.0395 33.9964 17.0265 33.9935 17.0202 33.9885C17.0013 33.9838 16.9887 33.9759 16.9727 33.9662C16.9656 33.9591 16.9568 33.9532 16.9475 33.949C16.9299 33.941 16.9177 33.9313 16.9001 33.9221C16.893 33.9154 16.885 33.9104 16.8766 33.9062C16.8589 33.8969 16.8451 33.8839 16.8291 33.8747C16.8199 33.8713 16.8115 33.8621 16.8039 33.857L16.7565 33.8222L16.7313 33.8016C16.7187 33.7919 16.7061 33.7844 16.6935 33.7714C16.6809 33.7621 16.6729 33.7491 16.6603 33.7399C16.6523 33.7306 16.6381 33.7222 16.6305 33.7147L16.5671 33.6529L12.5165 29.4856C11.84 28.7831 11.84 27.6703 12.5165 26.9678C13.1926 26.272 14.2861 26.272 14.9621 26.9678L16.0602 28.0986L16.0602 10.7521C16.0602 9.76526 16.8375 8.96993 17.7916 8.96993C18.7507 8.96993 19.5246 9.7703 19.5246 10.7521L19.5246 32.4016C19.5246 32.4268 19.5196 32.457 19.5196 32.4885L19.5149 32.5263L19.512 32.5708C19.5124 32.5884 19.5112 32.6061 19.5074 32.6229C19.5074 32.6355 19.5028 32.6451 19.5028 32.6577C19.5019 32.6762 19.4994 32.6951 19.4948 32.7132C19.4948 32.7274 19.4902 32.7354 19.4902 32.7451L19.4776 32.8005C19.4742 32.8148 19.4742 32.8228 19.4696 32.832L19.457 32.8824C19.4524 32.892 19.4524 32.9059 19.4473 32.9143L19.4318 32.9617L19.4175 32.9966L19.4016 33.0411L19.389 33.0789L19.3713 33.1184C19.368 33.131 19.3634 33.1482 19.3537 33.1612C19.3457 33.1704 19.3428 33.1835 19.3382 33.1927C19.3335 33.2087 19.3256 33.2246 19.3159 33.2402C19.3092 33.2481 19.3037 33.2574 19.2999 33.267L19.2747 33.3145C19.268 33.3225 19.2626 33.3317 19.2592 33.3414C19.2496 33.3573 19.237 33.3716 19.2273 33.3888C19.2239 33.3985 19.2147 33.406 19.2118 33.414L19.1769 33.4615L19.158 33.4883L19.1265 33.5278C19.1185 33.5404 19.1059 33.5484 19.098 33.561L19.0728 33.5925C19.0505 33.613 19.0346 33.6353 19.0127 33.6576C18.9921 33.6798 18.9699 33.697 18.9497 33.7176C18.9418 33.7268 18.9292 33.7352 18.9195 33.7428C18.9069 33.7525 18.8989 33.7667 18.8863 33.7743C18.8737 33.784 18.8611 33.7966 18.8481 33.8045L18.8229 33.8268C18.8074 33.8394 18.7931 33.8537 18.7755 33.8629C18.7675 33.8658 18.7599 33.8742 18.7519 33.8789C18.7347 33.8881 18.7205 33.9011 18.7045 33.9104C18.6953 33.9183 18.6873 33.9229 18.6793 33.9263L18.6335 33.9532L18.6067 33.9704C18.5911 33.975 18.5781 33.983 18.5626 33.9927C18.5533 34.0006 18.5407 34.0053 18.5311 34.0099C18.5185 34.0128 18.5025 34.0225 18.4899 34.0271C18.4773 34.0305 18.4647 34.0397 18.4521 34.0447L18.4126 34.0573L18.3698 34.075L18.3383 34.0876C18.3236 34.0968 18.3064 34.1002 18.2905 34.1048ZM25.2687 8.87461L25.3115 8.87755L25.3544 8.88216C25.3703 8.88216 25.3875 8.88216 25.4048 8.88678C25.4174 8.88678 25.4253 8.89182 25.4379 8.89182C25.4564 8.89224 25.4753 8.89518 25.4934 8.8998C25.506 8.8998 25.5139 8.90442 25.5219 8.90442L25.5774 8.91702C25.587 8.91702 25.5946 8.91702 25.6025 8.92164L25.6529 8.93424C25.6626 8.93927 25.6752 8.93927 25.6832 8.94389C25.6975 8.94725 25.713 8.95649 25.7289 8.96111C25.7432 8.96447 25.7512 8.96909 25.7638 8.97371L25.8066 8.98967L25.8444 9.0052C25.857 9.00814 25.87 9.01654 25.8826 9.02116C25.8952 9.02452 25.9112 9.0304 25.9238 9.04006C25.933 9.04804 25.946 9.05098 25.9536 9.05559C25.9696 9.06063 25.9834 9.06819 26.0011 9.07785C26.009 9.08583 26.017 9.09045 26.0246 9.09548C26.0418 9.10346 26.0561 9.1127 26.072 9.12236C26.0813 9.13034 26.0897 9.13496 26.0972 9.13832C26.1132 9.14756 26.127 9.16057 26.1447 9.16981C26.1526 9.17317 26.1606 9.18241 26.1682 9.18745C26.1854 9.20004 26.1997 9.20802 26.2156 9.2223L26.2408 9.24288C26.2534 9.25254 26.266 9.26051 26.279 9.27479C26.2916 9.28739 26.3042 9.29537 26.3168 9.30965C26.3248 9.31888 26.3391 9.32686 26.3466 9.33484L26.4101 9.39657L30.4606 13.5656C31.1367 14.2597 31.1367 15.3842 30.4606 16.08C29.7846 16.7759 28.6911 16.7759 28.015 16.08L26.9169 14.9509L26.9169 32.3021C26.9169 33.2872 26.1396 34.0829 25.1856 34.0829C24.2265 34.0829 23.4526 33.2826 23.4526 32.3021L23.4525 10.6475C23.4525 10.6223 23.4572 10.5921 23.4572 10.5606C23.4572 10.548 23.4618 10.5354 23.4618 10.5211L23.4651 10.4783C23.4651 10.4607 23.4651 10.4418 23.4698 10.4262C23.4698 10.4136 23.4748 10.404 23.4748 10.3914C23.4752 10.3729 23.4782 10.354 23.4828 10.3359C23.4828 10.32 23.4874 10.312 23.4874 10.304L23.5 10.2486C23.5029 10.2331 23.5029 10.2251 23.508 10.2171L23.5206 10.165C23.5256 10.1554 23.5256 10.1428 23.5302 10.1331L23.5458 10.0857L23.56 10.0525L23.576 10.008L23.5886 9.9685L23.6058 9.93071C23.6092 9.91643 23.6138 9.89922 23.6235 9.88788C23.6314 9.87864 23.6344 9.86394 23.639 9.85638C23.644 9.83875 23.6516 9.82447 23.6613 9.80893C23.668 9.80095 23.6734 9.79172 23.6772 9.78206L23.7024 9.73461C23.7104 9.72495 23.715 9.71739 23.7184 9.70773C23.7276 9.69177 23.7406 9.6775 23.7499 9.66028C23.7532 9.6523 23.7625 9.64264 23.7658 9.6334L23.8007 9.58596L23.8196 9.56034C23.8288 9.54774 23.8385 9.53346 23.8511 9.52087C23.859 9.50827 23.8716 9.49861 23.8796 9.48769L23.9048 9.4562L23.9649 9.39111L24.0283 9.32938C24.0362 9.31972 24.0488 9.31175 24.0581 9.30419C24.0707 9.29453 24.0787 9.28193 24.0913 9.27437L24.1295 9.24246L24.1547 9.22188C24.1706 9.2076 24.1845 9.19501 24.2021 9.18577C24.2101 9.18241 24.2181 9.17317 24.2256 9.16981C24.2433 9.16057 24.2571 9.14756 24.2731 9.13832C24.2802 9.13118 24.289 9.1253 24.2983 9.1211C24.3159 9.11312 24.3281 9.10346 24.344 9.09423C24.3533 9.08625 24.3617 9.08331 24.3709 9.07827C24.3869 9.07365 24.3995 9.06567 24.415 9.05601C24.4242 9.04803 24.4373 9.04342 24.4465 9.0388L24.4877 9.02116C24.5003 9.01654 24.5129 9.00856 24.5254 9.0052L24.5649 8.98967L24.6078 8.97371L24.6392 8.95943C24.6539 8.95145 24.6699 8.94641 24.6867 8.94389C24.6947 8.93927 24.7073 8.93927 24.7165 8.93424L24.7669 8.92164C24.7766 8.92164 24.7841 8.92164 24.7925 8.91702L24.8479 8.90442C24.8605 8.90442 24.8685 8.8998 24.8765 8.8998C24.8941 8.89518 24.916 8.89518 24.9319 8.89182C24.9445 8.89182 24.9542 8.88678 24.9668 8.88678C24.9823 8.88678 25 8.88216 25.0172 8.88216C25.0298 8.87755 25.0457 8.87755 25.0583 8.87755C25.0755 8.8746 25.0881 8.87461 25.1007 8.87461C25.1259 8.86999 25.1545 8.86999 25.186 8.86999C25.2137 8.86956 25.2389 8.87461 25.2687 8.87461Z" fill="#FFFD41" />
              </g>
              <defs>
                <clipPath id="clip0_514_4273">
                  <rect width="43" height="43" fill="white" transform="translate(1.87959e-06 43) rotate(-90)" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="flex items-center text-[#fff] text-[18px] font-[500] select-none
          h5:text-[14px]">
            To
            {
              items2?.length > 0 ?
                <Dropdown menu={{ items: items2 }} placement="bottom"
                  overlayClassName="bridge_dropdown"
                  trigger={["hover"]}>
                  <div className="flex items-center ml-[18px] bg-[#2E2E2E] rounded-[30px] px-[14px] py-8 cursor-pointer
                  h5:px-[10px]">
                    <img src={coinList[toCoinIndex]?.icon} alt="" className="w-[26px] h-[26px]
                    h5:w-[20px] h5:h-[20px]" />
                    <div className="pr-[40px] pl-8 text-[#fff] text-[20px] font-[500]
                      h5:text-[14px] h5:pr-[22px] h5:pl-6">
                      {coinList[toCoinIndex]?.name}
                    </div>
                    <svg
                      className='h5:w-[10px] h5:h-[5px]'
                      xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none">
                      <path d="M11.3648 0.164855C11.3254 0.118262 11.2772 0.0799162 11.223 0.0520098C11.1688 0.0241035 11.1096 0.00718345 11.0489 0.00221589C10.9882 -0.00275167 10.9271 0.00433132 10.8691 0.0230595C10.8111 0.0417876 10.7573 0.0717941 10.7109 0.111364L6.30003 3.86387C6.21627 3.93501 6.11006 3.97405 6.0003 3.97405C5.89053 3.97405 5.78432 3.93501 5.70056 3.86387L1.28856 0.110201C1.24205 0.0706985 1.18824 0.0407753 1.13019 0.022142C1.07215 0.00350858 1.01101 -0.00346894 0.950275 0.00160682C0.88954 0.00668257 0.830397 0.0237127 0.776229 0.0517239C0.72206 0.0797352 0.673928 0.118178 0.634583 0.164855L0.109317 0.785815C0.0301268 0.879944 -0.00860735 1.00173 0.00160895 1.12445C0.0118252 1.24718 0.0701585 1.36084 0.163815 1.4405L5.12427 5.65931H5.12891L5.14514 5.67442C5.38068 5.88416 5.68473 6 5.99972 6C6.3147 6 6.61875 5.88416 6.85429 5.67442L6.87052 5.65931H6.87632L11.8356 1.4405C11.8822 1.40104 11.9205 1.35277 11.9484 1.29845C11.9764 1.24412 11.9933 1.18481 11.9984 1.1239C12.0035 1.06299 11.9965 1.00168 11.9779 0.94347C11.9593 0.885259 11.9295 0.831292 11.8901 0.784652L11.3648 0.163693V0.164855Z" fill="#5F5F5F" />
                    </svg>
                  </div>
                </Dropdown>
                : ''
            }
          </div>
          <div className="bg-[#2E2E2E] rounded-[20px] px-[30px] py-[16px] mt-13
          h5:p-[12px]">
            <div className="flex items-center">
              <div className="flex-1 text-[#fff] text-[14px] font-[500] select-none
              h5:text-[12px]">Receive (estimated):</div>
            </div>
            <div className="flex items-center mt-10">
              <input
                className="flex-1 text-[#fff] text-[24px] font-[500] bg-transparent outline-none
                h5:text-[16px]"
                placeholder='0.00'
                disabled
                type="text" />
              <div className="text-[#fff] text-[20px] font-[500]
                h5:text-[14px]">
                {coinList[toCoinIndex]?.name}
              </div>
            </div>
          </div>
          <div className="hover-effect mt-[62px] bg-[#FFFD41] text-[#1E1E1E] text-[20px] font-[600] text-center justify-center rounded-full py-10 cursor-pointer
            h5:text-[16px] h5:h-[46px] h5:mt-[30px]
            "
            onClick={handleSubmit}
            style={{
              cursor: web3ModalAccount ? "pointer" : "not-allowed",
              opacity: web3ModalAccount ? 1 : 0.5
            }} >
            {web3ModalAccount ? t('Confirm') : t('0')}
          </div>
        </div>
      </div>
      <br /><br /><br />
      <FooterBar index={1} />
    </div>
  );
}

export default App;