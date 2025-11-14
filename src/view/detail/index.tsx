import React, { useEffect, useState } from 'react';
import FooterBar from '../../components/footerBar';
import TopBar from '../../components/topBar';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal, notification, Pagination, Popover, Progress, Switch } from 'antd';
import CoinInfo from "./components/coinInfo"
import { getIsMainnet, tokenDetail, tokenHolders, tokenPrice, tokenSubscribe } from '../../API';
import { getQueryParam } from '../../utils/getUrlParamsLegacy'; 
import { Contracts } from '../../web3';
import Web3 from 'web3';
import { formatAmount, formatScientificNotation, formatTimestamp, getBit, isMobile, isNumber, NumSplic1, showLoding, timestampToDateString } from '../../utils/tool';
import { contractAddress, defaultSlippage, isMain } from '../../config';
import { useWebSocket } from "../../components/WebSocketContext"
import Chart from "./components/chart"
import Lists from "./components/lists"
import H5TabIndex from './components/h5TabIndex'
import BuySell from './components/BuySell'
import { useTranslation } from 'react-i18next';
import BigNumber from 'bignumber.js';
import { useAppKit, useAppKitAccount, useAppKitNetwork, useAppKitProvider } from '@reown/appkit/react';
import { wsBus } from '../../utils/wsBus';
import { debounce } from 'lodash';
import mitt from 'mitt';
import { useViewport } from '../../components/viewportContext';
import { chainCoinName } from '../coinName';

const App: React.FC = () => {
  const { switchNetwork, chainId } = useAppKitNetwork(); 
    const { open, close } = useAppKit();
        const { address: web3ModalAccount  } = useAppKitAccount();
  const { messages, sendMessage, isConnected, setMessages, thisConnect } = useWebSocket();
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = React.useState(0); 
  const [info, setInfo]: any = useState({})
  const [price, setPrice]: any = useState({})
  const handleDetail = () => {
    tokenDetail({
      address: getQueryParam("address")
    }).then((res: any) => {
      if (res.error === "mongo: no documents in result") {
        navigate("/")
        return
      }
      setInfo(res.data)
      setTokenOut(res.data.address)
      handlePrice()
    }).catch((err: any) => {
    })
  }
  const handlePrice = () => {
    tokenPrice({
      address: getQueryParam("address")
    }).then((res: any) => {
      setPrice(res.data)
    }).catch((err: any) => {
    })
  }
  let { t, i18n } = useTranslation();
  useEffect(() => {
    handleDetail()
  }, [web3ModalAccount])

  useEffect(() => {
    setMessages([]);
    if (isConnected) { 
      const _address: any = getQueryParam("address")
      // sendMessage({ type: "subscribe", payload: `${_address}-minute_15` })
      // handleSubscribe()
    }
  }, [isConnected])

  // useEffect(() => {
  //   if (messages) {
  //     setRefreshTrades(refreshTrades + 1)
  //     handlePrice()
  //   }
  // }, [messages]) 
  const handler = debounce((msg) => {
    setRefreshTrades(msg?.timestamp || new Date().getTime()); 
    handlePrice();
  }, 800); 
  useEffect(() => {
    wsBus.on('message', handler); 
    return () => wsBus.off('message', handler);
  }, []); 

  const [tokenIn, setTokenIn] = useState<any>('0x0000000000000000000000000000000000000000');
  const [tokenInAmount, setTokenInAmount] = useState<any>("");
  const [tokenOut, setTokenOut] = useState<any>(""); 
  const [swapAmount, setSwapAmount] = useState<any>("0");
  const [swapAmount2, setSwapAmount2] = useState<any>("0");
  const handleSwapAmount = async() => {
    let _tokenInAmount: any = "0"
    try {
      _tokenInAmount = BigInt(Math.floor(tokenInAmount * 1e18)).toString()
    } catch (err) {
      console.log(err);
    }
    try {
      const _val = _tokenInAmount
      // const _val = tokenInAmount ? Math.floor(tokenInAmount * 1e18).toString() : '0'
      if (_val === '0') {
        setSwapAmount('0')
        setSwapAmount2('0')
        return
      }

      if (tabIndex === 0) {
        if (info?.insurance && !!info?.insurance) {
          await Contracts.example?.getSwapTokenNum2(tokenIn, _val, tokenOut).then((res: any) => {
            let amounted = Web3.utils.fromWei(res);
            setSwapAmount(NumSplic1(amounted, 4));
          }).catch((err: any) => {
            console.log(err);
          })
        } else {
          console.info(tokenIn, _val, tokenOut)
          await Contracts.example?.getSwapTokenNum(tokenIn, _val, tokenOut).then((res: any) => {
            let amounted = Web3.utils.fromWei(res);
            setSwapAmount(NumSplic1(amounted, 4));
          }).catch((err: any) => {
            console.log(err);
          })
          debugger
        }
      } else {
        if (info?.insurance && !!info?.insurance) {
          await Contracts.example?.getSwapTokenNum2(info?.address, _val, '0x0000000000000000000000000000000000000000').then((res: any) => {
            let amounted = Web3.utils.fromWei(res);
            setSwapAmount2(NumSplic1(amounted, 4));
            console.log(amounted);
          }).catch((err: any) => {
            console.log(err);
          })
        } else {
          await Contracts.example?.getSwapTokenNum(info?.address, _val, '0x0000000000000000000000000000000000000000').then((res: any) => {
            let amounted = Web3.utils.fromWei(res);
            setSwapAmount2(NumSplic1(amounted, 4));
            console.log(amounted);
          }).catch((err: any) => {
            console.log(err);
          })
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    handleSwapAmount()
  }, [tokenInAmount, chainId])

  const handleSell = async () => {  
    handleSwapAmount()
    if (!web3ModalAccount) {  
      open()
      showLoding(false);
      return 
    } 
    if (Number(tokenInAmount) <= 0 || !isNumber(tokenInAmount)) {
      notification.open({
        message: t('141'),
      }) 
      return
    }
    if( !tokenInAmount) {
      showLoding(false);
      return 
    }
    if (Number(coinBalance) < Number(tokenInAmount)) {
      notification.open({
        message: t('Insufficient balance'),
        key: 'insufficient_balance',
      }) 
      return
    }
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
    let maxSlippage = Number(localStorage.getItem('maxSlippage') ?? defaultSlippage)
    let slippage: any = swapAmount2 - (swapAmount2 * (maxSlippage / 100))
    try {
      slippage = BigInt(Math.floor(slippage * 1e18)).toString()
    } catch (err) {
      console.info('err0');
      console.log(err);
    } 

    let _tokenInAmount: any = "0"
    try { 
      // if (info?.insurance && !!info?.insurance && insurance) {
      //   _tokenInAmount = BigInt(Math.floor((tokenInAmount * 0.69) * 1e18)).toString()
      //   debugger
      // }
      // else if (info?.insurance && !!info?.insurance && !insurance) {
      //   _tokenInAmount = BigInt(Math.floor((tokenInAmount * 0.99) * 1e18)).toString()
      //   debugger
      // }
      // else {
      _tokenInAmount = BigInt(Math.floor(tokenInAmount * 1e18)).toString() 
      // }
    } catch (err) {
      console.info('err1');
      console.info(err);
      showLoding(false);
    }
    const _val = _tokenInAmount
    if (_val === '0') {
      setSwapAmount('0')
      setSwapAmount2('0')
      showLoding(false);
      return
    }
    showLoding(false);
    try {
      showLoding(true); 
      if (info?.insurance && !!info?.insurance) { 
        const appNum = await Contracts.example?.Tokenapprove1(web3ModalAccount, info?.address)
        if (Number(appNum) < Number(_val)) {
          await Contracts.example?.approve1(web3ModalAccount, info?.address)
        }
        await Contracts.example?.sellToken2(info?.address, _val, web3ModalAccount, slippage)
      } else { 
        const appNum = await Contracts.example?.Tokenapprove1(web3ModalAccount, info?.address)
        if (Number(appNum) < Number(_val)) {
          await Contracts.example?.approve1(web3ModalAccount, info?.address)
        }  
        await Contracts.example?.sellToken(info?.address, _val, web3ModalAccount, slippage)
      }

      setTokenInAmount('')
      showLoding(false);
      notification.open({
        message: t('125'),
      })
      // handleSwapAmount()
      handleGetCoinBalance()
      handleDetail()
      setRefreshTrades(refreshTrades + 1)
      setSwapAmount('0')
      setSwapAmount2('0')
    } catch (err) {
      console.info('err2');
      console.info(err);
      showLoding(false);
    }
  }

  const handleBuy = async () => { 

    // if (Number(price?.prograss) >= 100) {
    //   notification.open({
    //     message: t('145'),
    //     key: '145'
    //   })
    //   return
    // } 
    if (!web3ModalAccount) {
      open()
      // notification.open({
      //   message: t('Please link wallet'),
      //   key: 'Please link wallet'
      // })
      return
    }
    if(Number(tokenInAmount) < 0.001) {
      notification.open({
        message: t('141_1'),
        key: 'Please link wallet'
      })
      return
    }
    if (Number(tokenInAmount) <= 0 || !isNumber(typeof tokenInAmount === 'string' ? tokenInAmount : JSON.stringify(tokenInAmount) || !tokenInAmount)) {
      notification.open({
        message: t('141') + chainCoinName(chainId),
      })
      return
    }
    if (Number(BNBBalanceAmount) < Number(tokenInAmount)) {
      notification.open({
        message: t('Insufficient balance'),
        key: 'insufficient_balance',
      })
      return
    }

    showLoding(true);
    try { 
      const timestampInSeconds = Math.floor(Date.now() / 1000);
      // document.cookie = "t=" + JSON.stringify(timestampInSeconds) + tokenInAmount;
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
     let _val: any = "0"
     let _swapAmount: any = "0"
    try { 
      if (info?.insurance && !!info?.insurance && insurance) {
        _val = BigInt(Math.floor((tokenInAmount * 0.69) * 1e18)).toString()
        debugger

        await Contracts.example?.getSwapTokenNum2(tokenIn, _val, tokenOut).then((res: any) => {
          let amounted = Web3.utils.fromWei(res);
          _swapAmount = NumSplic1(amounted, 4);
        }).catch((err: any) => {
          console.log(err);
        }) 
      }
      else if (info?.insurance && !!info?.insurance && !insurance) {
        _val = BigInt(Math.floor((tokenInAmount * 0.99) * 1e18)).toString()
        debugger

        await Contracts.example?.getSwapTokenNum2(tokenIn, _val, tokenOut).then((res: any) => {
          let amounted = Web3.utils.fromWei(res);
          _swapAmount = NumSplic1(amounted, 4);
        }).catch((err: any) => {
          console.log(err);
        }) 
      }
      else {
        _val = BigInt(Math.floor(tokenInAmount * 1e18)).toString()
        debugger

        await Contracts.example?.getSwapTokenNum(tokenIn, _val, tokenOut).then((res: any) => {
          let amounted = Web3.utils.fromWei(res);
          _swapAmount = NumSplic1(amounted, 4);
        }).catch((err: any) => {
          console.log(err);
        }) 
      }
      // debugger
    } catch (err) {
      console.log(err);
    } 
    let isMax = false
    try {
      const _res = await Contracts.example?.getRemainTokenNum(info?.address)
      const RemainTokenNum = Web3.utils.fromWei(_res);
      console.log(tokenInAmount);
      isMax = Number(tokenInAmount) > Number(RemainTokenNum) ? true : false
    } catch (err) {
      console.log(err);
      showLoding(false);
    }
    console.log(localStorage.getItem('maxSlippage') ?? defaultSlippage); 
    let maxSlippage = Number(localStorage.getItem('maxSlippage') ?? defaultSlippage) 
    let slippage: any = isMax ? 0 : (_swapAmount - (_swapAmount * (maxSlippage / 100)))
    try {
      slippage = BigInt(Math.floor(slippage * 1e18)).toString()
    } catch (err) {
      console.log(err);
      showLoding(false);
    }

    const _tokenInAmount = new BigNumber(tokenInAmount).multipliedBy('1e18')

    if (web3ModalAccount) {
      if (info?.insurance && !!info?.insurance) { 
        Contracts.example?.buyToken2(info?.address, _tokenInAmount.toFixed(), web3ModalAccount, slippage, insurance).then((res: any) => {
          notification.open({
            message: t('124'),
          })
          setTokenInAmount('')
          handleDetail()
          setRefreshTrades(refreshTrades + 1)
          handleGetCoinBalance()
          setSwapAmount('0')
          setSwapAmount2('0')
          showLoding(false);
        }).catch((err: any) => {
          console.info(err);
          showLoding(false);
        })
      } else {
        Contracts.example?.buyToken(info?.address, _tokenInAmount.toFixed(), web3ModalAccount, slippage).then((res: any) => {
          notification.open({
            message: t('124'),
          })
          setTokenInAmount('')
          handleDetail()
          setRefreshTrades(refreshTrades + 1)
          handleGetCoinBalance()
          setSwapAmount('0')
          setSwapAmount2('0')
          showLoding(false);
        }).catch((err: any) => {
          console.info(err);
          showLoding(false);
        })
      }
    }
    showLoding(true);
  }

  // const handleCreateCoinSuccess = (res: any ) => {
  //   createCoinSuccess({
  //     txhash: res?.transactionHash,
  //   }).then((res: any) => {
  //   }).catch((err: any) => {
  //     console.log(err);
  //   })
  // }

  const [insurance, setInsurance] = useState<any>(true);
  
  const [coinBalance, setCoinBalance] = useState<any>("0"); 
  const handleGetCoinBalance = () => { 
    if (web3ModalAccount && info?.address) { 
      Contracts.example?.balanceOf2(web3ModalAccount, info?.address).then((res: any) => {
        let amounted = Web3.utils.fromWei(res);
        setCoinBalance(NumSplic1(amounted, 4)); 
      }).catch((err: any) => {
        console.log(err); 
      })
    }
  } 
  const { walletProvider }: any = useAppKitProvider("eip155");
  const [BNBBalanceAmount, setBNBBalanceAmount] = useState<any>("0");
  useEffect(() => {
    if (web3ModalAccount && walletProvider && Contracts) {  
      new Contracts(walletProvider);  
      Contracts.example.getBalance(web3ModalAccount).then((res: any) => {
        let amounted = Web3.utils.fromWei(res);
        setBNBBalanceAmount(NumSplic1(amounted, 4)); 
      }).catch((err: any) => {
        console.log(err);
      }) 
      handleGetCoinBalance() 
    } 
  }, [web3ModalAccount, swapAmount, swapAmount2, walletProvider, Contracts, tokenOut, chainId, tabIndex]); 

  const [refreshTrades, setRefreshTrades] = useState<any>(0);
  const [h5TabIndex, setH5TabIndex] = useState<any>(0);
    const { width } = useViewport();

  return (
    <div className="w-full overflow-hidden">
      <div className="pt-[104px] w-[1200px] mx-auto
      h5:w-full h5:pt-[64px]
      ">
        <TopBar /> 
        {
          width < 1000 ?
            <H5TabIndex h5TabIndex={h5TabIndex} backFun={(index: any) => {
              setH5TabIndex(index)
            }} /> : null
        }

        {
          width < 1000 ? '' :
            <div className='block h5:hidden'>
              <div className="flex ">
                <div>
                  <Chart info={info} price={price} messages={messages} sendMessage={(val: any) => sendMessage(val)} />
                </div>
                <div className="flex-1"></div>
                <BuySell info={info} setTokenInAmount={(e: any) => setTokenInAmount(e)}
                  insurance={insurance} setInsurance={(e: any) => setInsurance(e)}
                  tokenInAmount={tokenInAmount} BNBBalanceAmount={BNBBalanceAmount} coinBalance={coinBalance}
                  swapAmount={swapAmount} swapAmount2={swapAmount2}
                  tabIndex={tabIndex} setTabIndex={(index: any) => setTabIndex(index)}
                  handleBuy={handleBuy} handleSell={handleSell} />
              </div>
              <div className="flex mt-[16px] relative">
                <Lists refreshTrades={refreshTrades} info={info} backFun={() => {
                  handleDetail()
                }} />
                <div className="flex-1"></div>
                <div className="w-[360px] z-[1]">
                  <CoinInfo refreshTrades={refreshTrades} info={info} price={price} />
                </div>
              </div>
            </div>
        }

        {
          width < 1000 ? <div className="hidden h5:block px-16">
            <div className={`${h5TabIndex === 0 ? 'block' : 'hidden'}`}>
              <BuySell info={info} setTokenInAmount={(e: any) => setTokenInAmount(e)}
                insurance={insurance} setInsurance={(e: any) => setInsurance(e)}
                tokenInAmount={tokenInAmount} BNBBalanceAmount={BNBBalanceAmount} coinBalance={coinBalance}
                swapAmount={swapAmount} swapAmount2={swapAmount2}
                tabIndex={tabIndex} setTabIndex={(index: any) => setTabIndex(index)}
                handleBuy={handleBuy} handleSell={handleSell} />
            </div>
            <div className={`${h5TabIndex === 1 ? '' : 'absolute left-[2000px] hidden'}`}>
              {
                width < 1000 ?
                  <div>
                    <Chart info={info} price={price} messages={messages} sendMessage={(val: any) => sendMessage(val)} />
                  </div>
                  : null
              } 
              <Lists refreshTrades={refreshTrades} info={info} backFun={() => {
                handleDetail()
              }} />
            </div>
            <div className={`${h5TabIndex === 2 ? 'block' : 'hidden'}`}>
              <CoinInfo refreshTrades={refreshTrades} info={info} price={price} />
            </div>
          </div>
            : ""}

      </div> 
      <FooterBar index={1} />
    </div >
  );
}

export default App;