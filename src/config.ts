import Token from "./ABI/ERC20Token.json"; 
import NFT from "./ABI/NFT.json";  
import Meme from "./ABI/Meme.json";
import Meme2 from "./ABI/Meme2.json";  
import InsurancePool from "./ABI/InsurancePool.json"; 
import MemeBanFee from "./ABI/MemeBanFee.json"; 
import BridgeAddress from "./ABI/MoonnBridge.json"
import { defineChain } from "@reown/appkit/networks";  
import { getChainConfig } from "./getChainConfig";
//   /api
const windowHost = window.location.origin;
let pattern =
  /^(http:\/\/localhost|http:\/\/192\.168|https:\/\/localhost|https:\/\/192\.168|file:\/\/*)/i; 
//  
export const isMain = true; 
export const LOCAL_KEY = "PIJS_LANG";
   
// BNB Main
export const customNetwork_BSC = defineChain({
  id: 56,
  caipNetworkId: "eip155:56",
  chainNamespace: "eip155",
  name: "BSC Chain",
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "BNB",
  },
  rpcUrls: {
    default: {
      http: ["https://bsc-dataseed.binance.org/"],
      webSocket: ["WS_RPC_URL"],
    },
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://bscscan.com",
    },
  },
}); 
// BNB 
export const customNetwork_BSC_TEST = defineChain({
  id: 97,
  caipNetworkId: "eip155:97",
  chainNamespace: "eip155",
  name: "BNBChain_test",
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "BNB",
  },
  rpcUrls: {
    default: {
      // http: ["https://testnet.bscscan.com/"],
      http: ["https://bsc-testnet-dataseed.bnbchain.org/"],
      webSocket: ["WS_RPC_URL"],
    },
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://testnet.bscscan.com/",
    },
  },
});
// xLayer
export const customNetwork_xLayer = defineChain({
  id: 196,
  caipNetworkId: "eip155:196",
  chainNamespace: "eip155",
  name: "XLayer_Chain",
  nativeCurrency: {
    decimals: 18,
    name: "SEI",
    symbol: "SEI",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.xlayer.tech"],
      webSocket: ["WS_RPC_URL"],
    },
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://www.oklink.com/zh-hans/x-layer",
    },
  },
}); 
//  xLayer 
export const customNetwork_xLayer_TEST = defineChain({
  id: 11952,
  caipNetworkId: "eip155:11952",
  chainNamespace: "eip155",
  name: "xLayer_test",
  nativeCurrency: {
    decimals: 18,
    name: "OKB",
    symbol: "OKB",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.moonn.fun"],
      webSocket: ["WS_RPC_URL"],
    },
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://www.oklink.com/zh-hans/x-layer-testnet/",
    },
  },
});
// SEI Main
export const customNetwork_SEI = defineChain({
  id: 1329,
  caipNetworkId: "eip155:1329",
  chainNamespace: "eip155",
  name: "SEI",
  nativeCurrency: {
    decimals: 18,
    name: "SEI",
    symbol: "SEI",
  },
  rpcUrls: {
    default: {
      http: ["https://evm-rpc.sei-apis.com"],
      webSocket: ["WS_RPC_URL"],
    },
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://seitrace.com",
    },
  },
}); 
// SEI 
export const customNetwork_SEI_TEST = defineChain({
  id: 1328,
  caipNetworkId: "eip155:1328",
  chainNamespace: "eip155",
  name: "SEI_Test",
  nativeCurrency: {
    decimals: 18,
    name: "SEI",
    symbol: "SEI",
  },
  rpcUrls: {
    default: {
      http: ["https://evm-rpc-testnet.sei-apis.com"],
      webSocket: ["WS_RPC_URL"],
    },
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://testnet.seitrace.com",
    },
  },
})
// SEI fork
// export const customNetwork_SEI_TEST = defineChain({
//   id: 113329,
//   caipNetworkId: "eip155:113329",
//   chainNamespace: "eip155",
//   name: "SEI_Test",
//   nativeCurrency: {
//     decimals: 18,
//     name: "SEI",
//     symbol: "SEI",
//   },
//   rpcUrls: {
//     default: {
//       http: ["https://rpc.moonn.fun"],
//       webSocket: ["WS_RPC_URL"],
//     },
//   },
//   blockExplorers: {
//     default: {
//       name: "Explorer",
//       url: "https://testnet.seitrace.com",
//     },
//   },
// })
 
export const customNetwork_Base = defineChain({
  id: 8453,
  caipNetworkId: "eip155:8453",
  chainNamespace: "eip155",
  name: "Base",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://mainnet-preconf.base.org"],
      webSocket: ["WS_RPC_URL"],
    },
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://base.blockscout.com/",
    },
  },
})
// base test
export const customNetwork_Base_TEST = defineChain({
  id: 84532,
  caipNetworkId: "eip155:84532",
  chainNamespace: "eip155",
  name: "Base_Test",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://sepolia-preconf.base.org"],
      webSocket: ["WS_RPC_URL"],
    },
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://sepolia-explorer.base.org",
    },
  },
})

 
export const defaultSlippage = 5


interface abiObjType {
  [propName: string]: any;
}

interface contractAddressType {
  [propName: string]: string;
}

export const abiObj: abiObjType = {
  USDT: Token,
  USDTBSC: Token,   
  NFT: NFT,   
  Meme: Meme,
  Meme2: Meme2,
  InsurancePool: InsurancePool,
  MemeBanFee: MemeBanFee,
  BridgeAddress: BridgeAddress,
};

declare let window: any;  
 
export let baseUrl: string = pattern.test(windowHost)
? `${windowHost}/` 
: `${windowHost}/`;
 
export const WebSocket_URL = pattern.test(windowHost) ? 
`wss://bsc.mcplabs.me/` : 
`wss://${window.location.host}/`;


export const browserUrl = 
getChainConfig().isBSC ?
(isMain ? 'https://bscscan.com/':'https://testnet.bscscan.com/')
 : 
 getChainConfig().isXLayer?
(isMain ? 'https://www.oklink.com/zh-hans/x-layer' : 'https://www.oklink.com/zh-hans/x-layer-testnet')
:
getChainConfig().isBase ?
(isMain ? 'https://base.blockscout.com' : 'https://sepolia-explorer.base.org') :
(isMain ? "https://seitrace.com" : "https://testnet.seitrace.com")
; 




export const Main: contractAddressType = {
  USDTBSC: "0x55d398326f99059fF775485246999027B3197955",  
  MemeBanFee: "0x0000000000000000000000000000000000000000",
  Meme: "0x0000000000000000000000000000000000000000",
  Meme2: "0x0000000000000000000000000000000000000000",  
  InsurancePool: "0x0000000000000000000000000000000000000000",  
  BridgeAddress: "0x0000000000000000000000000000000000000000", 
};

const Test = {
  USDTBSC: "0x55d398326f99059fF775485246999027B3197955",  
  MemeBanFee: "0x0000000000000000000000000000000000000000",
  Meme: "0x0000000000000000000000000000000000000000",
  Meme2: "0x0000000000000000000000000000000000000000",  
  InsurancePool: "0x0000000000000000000000000000000000000000",  
  BridgeAddress: "0x0000000000000000000000000000000000000000", 
};  

export const contractAddress: contractAddressType = isMain ? Main : Test;

export const SearchFiltering = /FeiGe|Feige/  

if (!pattern.test(windowHost)) {
  window.console = {
    ...window.console,
    log: () => { },
  };
}