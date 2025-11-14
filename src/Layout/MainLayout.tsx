//@ts-ignore
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "antd"; 
import { 
  scrollToTop,
  showLoding,
  startWord,
} from "../utils/tool"; 
import { useSelector, useDispatch } from "react-redux"; 
import { Contracts } from "../web3"; 
import { useWebSocket } from "../components/WebSocketContext"
  
import Web3 from "web3";
import styled from "styled-components"; 
import { useSign } from "../hooks/useSign"; 
import {
  useAppKit,
  useAppKitAccount,
  useAppKitNetwork,
  useAppKitProvider,
  useDisconnect,
} from "@reown/appkit/react"; 
import { getQueryParam } from "../utils/getUrlParamsLegacy";
import { createLoginSuccessAction, saveChainId } from "../store/actions";
import { Login } from "../API";
import { wsBus } from "../utils/wsBus";
import LockUp from "../components/LockUp"

const {  Content } = Layout; 
 
declare let window: any;
const MainLayout: any = () => {
  const { connect } = useWebSocket();
  const web3 = new Web3(); 
  let dispatch = useDispatch();
  let token = useSelector<any>((state) => state.token);
  let { t, i18n } = useTranslation();  
  const { signFun } = useSign(); 
  const { walletProvider }: any = useAppKitProvider("eip155");
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();
  const { caipNetwork, caipNetworkId, chainId, switchNetwork } =
    useAppKitNetwork();
  const { open, close } = useAppKit();
  const { disconnect } = useDisconnect(); 
  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search);
  const invite = queryParams.get("inviteCode");

  const [showMask, setShowMask] = useState(false);  
   

  const { pathname } = useLocation();
  useEffect(() => {
                      scrollToTop()
    // window.scrollTo(0, 0);
  }, [pathname]);

  //  useEffect(() => { 
    // connect();
  // }, [connect]);
 
  useEffect(() => { 
        const currentUrl = window.location.pathname;
        wsBus.on("LoginOut", (e: number) => { 
          if(e===0) {
            disconnect();
            dispatch(
              createLoginSuccessAction(
                '',
                ''
              )
            );
            localStorage.clear();
            sessionStorage.clear();
            document.cookie.split(";").forEach(cookie => {
              const name = cookie.split("=")[0].trim();
              document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            }); 
            if (currentUrl != "/createCoin") {
              navigate("/");
            } 
            setTimeout(() => {
              open();
            }, 600)
          }
        }); 
        return () => wsBus.off('LoginOut');
      }, []) 

  useEffect(() => {
    if (!!web3ModalAccount ) {
      new Contracts(walletProvider); 
    } 
  }, [web3ModalAccount, isConnected, invite]);

  
  const navigate = useNavigate();
  const LoginFun = useCallback(async () => {
    if (web3ModalAccount) {
      const exampleValue = getQueryParam("refer") || "";  
      // let tag = await web3.utils.isAddress(exampleValue);
      // if (tag) {
      //   refereeUserAddress = exampleValue;
      // } else {
      //   refereeUserAddress = "";
      // }
      try {
        
        await signFun((res: any) => {
          Login({
           
            ...res,
            refer: exampleValue,
            address: web3ModalAccount as string,
          })
            .then((res: any) => { 
              showLoding(false);
              dispatch(
                createLoginSuccessAction(
                  res.data?.address,
                  web3ModalAccount as string
                )
              );
              localStorage.setItem("connetWallet", res.data?.address) 
            })
            .catch(() => { 
              showLoding(false);
            });
        }, `userAddress=${web3ModalAccount as string}`);
      } catch (error) {
        console.info(error);
      }
    }
  }, [web3ModalAccount]);

  useEffect(() => { 
    const exampleValue = getQueryParam("refer") || ""; 
    const isConnetWallet: any = localStorage.getItem('connetWallet') 
    console.log(web3ModalAccount);
    console.log(exampleValue === ""); 
    if (isConnetWallet && isConnetWallet === web3ModalAccount && exampleValue === "") { 
      // open();
      dispatch(
        createLoginSuccessAction(
          isConnetWallet,
          web3ModalAccount as string
        )
      );
      return
    }
    LoginFun();
  }, [web3ModalAccount]);
 
  useEffect(() => {
    if (!!chainId) {
      dispatch(
        saveChainId(chainId)
      );
      // showLoding(true);

      localStorage.setItem("chainId", String(chainId)); 
      // setTimeout(() => {
      //   showLoding(false);
      // }, 1000)
    }
  }, [chainId]);

  const onSwitch = async (network: any) => {
    try {
      await switchNetwork(network)
      // console.log('network：', network.id)
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    const chainId = localStorage.getItem("chainId")
    if (!!chainId) {
      onSwitch(Number(chainId))
    } 
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      document.querySelectorAll('w3m-modal').forEach(modal => {
        const shadow = modal.shadowRoot;
        const alertbar: any = shadow?.querySelector('w3m-alertbar');
        if (alertbar) alertbar.style.display = 'none';
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);


  return (
    <div className="MainContent11">
       {/* <button onClick={() => {
        if(web3ModalAccount) {
          disconnect()
        }else{
          
          open()
        }
        }}>{web3ModalAccount ? web3ModalAccount :'open'}</button> */}
 

      <Content className="MainContent relative overflow-hidden">
        <LockUp />

        <Outlet />
        {!!showMask && (
          <div
            className="Mask"
            onClick={() => {
              setShowMask(false);
            }}
          ></div>
        )}
      </Content> 
    </div>
  );
};
export default MainLayout;
