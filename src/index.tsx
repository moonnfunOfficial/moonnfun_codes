//@ts-ignore
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { Web3ReactProvider } from "@web3-react/core";
import store from "./store";
import Web3 from "web3";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ChainId, Contracts, } from "./web3";

import "./index.css";
// import "antd/dist/antd.min.css";
import "animate.css";
import "swiper/css";
// import { customNetwork_BSC, mainnet } from "./config";

import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";

//@ts-ignore
import { bscTestnet, bsc, seiDevnet, sei, seiTestnet } from "@reown/appkit/networks";
import { customNetwork_BSC, customNetwork_BSC_TEST, customNetwork_Base, customNetwork_Base_TEST, customNetwork_SEI, customNetwork_SEI_TEST, customNetwork_xLayer, customNetwork_xLayer_TEST, isMain } from "./config";


function getLibrary(provider: any): Web3 {
  const library = new Web3(provider);
  new Contracts(provider);
  return library;
}

// 1. Get projectId
const projectId = "your projectId";

// 2. Set chains

// 3. Create a metadata object
const metadata = {
  name: "MOONN",
  description: "MOONN.FUN",
  url: isMain ? "https://moonn.fun/" : "https://dapp.moonn.fun/",
  icons: [
    isMain
      ? "https://moonn.fun/favicon.ico"
      : "https://dapp.moonn.fun/favicon.ico",
  ],
};

createAppKit({
  adapters: [new EthersAdapter()],
  // customNetwork_Base，customNetwork_Base_TEST
  networks: isMain ? [customNetwork_BSC, customNetwork_SEI] :
    [customNetwork_BSC_TEST, customNetwork_SEI_TEST],
  metadata,
  projectId,
  themeMode: "dark",
  enableCoinbase: false,
  enableEIP6963: true, // true by default 
  featuredWalletIds: [
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
    // "38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662",
    // "20459438007b75f4f4acb98bf29aa3b800550309646d375da5fd4aac6c2a2c66",
    "971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709"
  ],
  excludeWalletIds: [
    // "971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709",
  ],
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    connectMethodsOrder: ["wallet"],
  },
  allWallets: 'HIDE',
  defaultNetwork: isMain ? customNetwork_BSC : customNetwork_BSC_TEST,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <Web3ReactProvider getLibrary={getLibrary}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Web3ReactProvider>
  </Provider>
);

reportWebVitals();
