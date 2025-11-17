import {
  OnReadyCallback,
  LibrarySymbolInfo,
  ResolutionString,
  PeriodParams,
  HistoryCallback,
  Bar,
  SubscribeBarsCallback,
} from "./charting_library/charting_library";
import { WebSocket_URL } from "../../config";
import { getQueryParam } from "../../utils/getUrlParamsLegacy";
import { wsBus } from "../../utils/wsBus"; 
import { WSstatus } from "../../API"; 
import store from "../../store";
import { getChainConfig } from "../../getChainConfig";

declare let window: any;  

const subscribers: Record<string, {
  socket: WebSocket;
  lastBarTime: number;
}> = {};

const resolutionToBackend: Record<string, string> = {  
  '1': 'minute_1',
  '5': 'minute_5',
  '15': 'minute_15',
  '60': 'hour_1',
  '240': 'hour_4',
  '1D': 'day_1',
};
let socket: any = '';  
let ack = ""

const DataFeed = {
  onReady: (callback: any) => {
    setTimeout(() => {
      callback({
        supports_search: false,
        supports_group_request: false,
        supports_marks: false, 
        supported_resolutions: Object.keys(resolutionToBackend),
        symbols_types: [{ name: "crypto", value: "crypto" }],
      }); 
    }, 0);
  },

  resolveSymbol: (
    symbolName: string,
    onSymbolResolvedCallback: (info: LibrarySymbolInfo) => void,
    onResolveErrorCallback: any
  ) => {
    const symbolInfo: any = {
      name: symbolName,
      description: symbolName,
      session: "24x7",
      timezone: "Asia/Shanghai",
      type: "crypto",
      has_intraday: true,
      has_daily: true,
      exchange: "",
      minmov: 1,
      minmove2: 0,
      fractional: false,
      pricescale: 1000000000,
      format: "price",
      supported_resolutions: Object.keys(resolutionToBackend) as ResolutionString[],
    };
    setTimeout(() => {
      symbolName ? onSymbolResolvedCallback(symbolInfo) : onResolveErrorCallback("unknown_symbol");
    }, 10);
  },

  getBars: async (
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    periodParams: PeriodParams,
    onHistoryCallback: HistoryCallback,
    onErrorCallback: ErrorCallback
  ) => { 
    try {
      wsBus.emit("chart_loading", 0);
      onHistoryCallback([], { noData: true });
    } catch (e: any) {
      console.log(e);
      onErrorCallback(e);
    }
  },

  subscribeBars: (
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    onTick: SubscribeBarsCallback,
    listenerGuid: string,
    onResetCacheNeededCallback: Function
  ) => {
    if (!symbolInfo.name) { return }
    const address = getQueryParam("address");
    if (!address) { return }
    const subKey = `${symbolInfo.name}_${resolution}`; 
    if (subscribers[subKey]) {
      try {
        subscribers[subKey].socket.close();
        delete subscribers[subKey];
      } catch (err) {
        console.warn(`[Failed to clean up old socket]: ${subKey}`, err);
      }
    }
    socket = ""

    let isInitCompleted = false; 
    let lastBarTime: number = 0  
    const onReconnect = () => {  
      socket = ""
      setTimeout(() => {
        try {
          DataFeed.subscribeBars(symbolInfo, resolution, onTick, listenerGuid, onResetCacheNeededCallback)
        } catch (e) {
          console.warn("Error closing WebSocket", e);
        } 
      },2000)
    }  
    let heartbeatTimeoutTimer: NodeJS.Timeout | null = null;
    const HEARTBEAT_TIMEOUT = 60000;  
    if (heartbeatTimeoutTimer) clearTimeout(heartbeatTimeoutTimer);
    function resetHeartbeatTimeout() {
      if (heartbeatTimeoutTimer) clearTimeout(heartbeatTimeoutTimer);
      heartbeatTimeoutTimer = setTimeout(() => {
        console.warn("🛑 WebSocket heartbeat timeout, forcing reconnect...");
        try {
          socket?.close();  
        } catch (e) {
          console.error("Error closing socket on heartbeat timeout", e);
        }
      }, HEARTBEAT_TIMEOUT);
    }

    // const cleanupResources = () => {
    //   console.log("🧹 ..."); 
    //   if (HttpConnectTimer) {
    //     clearInterval(HttpConnectTimer);
    //     HttpConnectTimer = null;
    //   }
    //   if (heartbeatTimeoutTimer) {
    //     clearTimeout(heartbeatTimeoutTimer);
    //     heartbeatTimeoutTimer = null;
    //   } 
    //   debugger
    // };
    // const handlePageLeave = () => {
    //   cleanupResources();  
    //   debugger
    // };
    // window.addEventListener("beforeunload", handlePageLeave);
    // const originalPushState = window.history.pushState;
    // window.history.pushState = function (...args: any) {
    //   handlePageLeave();  
    //   return originalPushState.apply(window.history, args);
    // }; 
    let HttpConnectTimer: NodeJS.Timeout | null = null;
    const RestHttpConnect = async() => {  
      if (HttpConnectTimer) clearTimeout(HttpConnectTimer); 
      if(window.location.pathname === "/detail") {
        HttpConnectTimer = setInterval(() => {
          WSstatus().then((data: any) => {
            if(data?.data) {
              socket?.close();
              onReconnect()
            }
          }) 
        }, 5000)
      }
    }
    
    let state: any = store.getState();
    let _chainId = state.chainId ? state.chainId : Number(localStorage.getItem("chainId"));
    let _WebSocket_URL = WebSocket_URL + 
    `${getChainConfig().isBSC ? 'bsc' 
    :getChainConfig().isBase ? 'base'
    :getChainConfig().isXLayer ? 'xlayer'
    : 'sei'}/api/v1/ws`
 
    // if (socket !== '') {
    //   const backendType = resolutionToBackend[resolution] || `minute_${resolution}`;
    //   console.log(`${address}-${backendType}`);
    //   socket.send(JSON.stringify({ type: "subscribe", payload: `${address}-${backendType}` }));
    // } else {
      socket = new WebSocket(`${_WebSocket_URL}${ack ? "?id="+ack : ''}` );
    // }

    socket.onmessage = (ev: MessageEvent) => {
      resetHeartbeatTimeout();  
      // RestHttpConnect()
      try {
        if (ev.data === "p") {
          socket.send("o") 
          return
        }
      } catch (err) {  
      }

      let msg
      try {
        msg = JSON.parse(ev.data)
      } catch (err) {
        console.error("⛔ Invalid JSON:", ev.data)
        return
      } 
 
      if(msg.type === "ack") {
        ack = msg.payload 
        const backendType = resolutionToBackend[resolution] || `minute_${resolution}`;  
        try {
          socket.send(JSON.stringify({ type: "subscribe", payload: `${address}-${backendType}` })); 
        } catch (err) {  
        }
        return
      }
   
      if (msg?.id && (msg.id).includes(getQueryParam("address"))) { 
        const payload = msg?.payload || [] 
        if (msg.type?.includes("price_init") && Array.isArray(payload)) {  
          const bars = payload
            .map((item: any) => ({
              ...item,
              time: Math.floor(item.timestamp),
            }))
            .sort((a, b) => a.time - b.time)  

          if (bars.length > 0) {
            if (typeof window.tvChart?.resetData === 'function') {
              try {
                onResetCacheNeededCallback?.()  
                // window.tvChart.resetData();
              } catch (err) {
                console.log(err);
              }
            }
            setTimeout(() => {
              bars.forEach(onTick) 
              lastBarTime = bars[bars.length - 1].time 
              isInitCompleted = true 
              wsBus.emit("chart_loading", 1); 
            }, 200)
          }
          // if (bars.length > 0) {
          //   onResetCacheNeededCallback?.()  
          //   setTimeout(() => {
          //     bars.forEach(onTick) 
          //     lastBarTime = bars[bars.length - 1].time
          //   }, 200)
          // }
          isInitCompleted = true 
          wsBus.emit("chart_loading", 1);  
        }
 
        if (
          (msg.type?.includes("price_update") || msg.type?.includes("price_append")) &&
          Array.isArray(payload) &&
          payload[0]
        ) {
          const rawBar = payload[0]
          const time = Math.floor(rawBar.timestamp)
          const bar = { ...rawBar, time }

          if (time >= lastBarTime) { 
            if (isInitCompleted) {
              onTick(bar) 
              lastBarTime = time
            }  
          } else {
            console.warn("⛔ dropped: time order violation", {
              time,
              lastBarTime,
            })
          }
        }

        if(Array.isArray(payload)) {
          wsBus.emit("message", payload); 
        }
      }
    }

    socket.onopen = () => {
      const backendType = resolutionToBackend[resolution] || `minute_${resolution}`;
      try {
        // socket.send(JSON.stringify({ 
        //   payload: ack || '',
        //   type: "init" 
        // })); 
      } catch (err) {  
      }
      // socket.send(JSON.stringify({ type: "subscribe", payload: `${address}-${backendType}` })); 
    };

    socket.onclose = () => {
      console.log(`[socket closed]: ${subKey}`); 
      if (heartbeatTimeoutTimer) clearTimeout(heartbeatTimeoutTimer);  
      // cleanupResources()
      // window.tvChart.resetData(); 
      console.log('socket.readyState:'+socket.readyState);
      switch (socket.readyState) {
        case WebSocket.CONNECTING: 
          return '连接中';
        case WebSocket.OPEN: 
          return '已连接';
        case WebSocket.CLOSING: 
          onReconnect()
          return '关闭中';
        case WebSocket.CLOSED:
          onReconnect() 
          return '已关闭';
        default:
          onReconnect() 
          return '未知状态';
      }
       
      // onReconnect();  
    };

    socket.onerror = (err: any) => {  
      console.error(`[socket error]: ${subKey}`, err)
      if (heartbeatTimeoutTimer) clearTimeout(heartbeatTimeoutTimer); 
      // onReconnect();  
    };

    subscribers[subKey] = {
      socket,
      lastBarTime: 0,
    }; 
  },

  unsubscribeBars: (listenerGuid: string) => { 
    for (const key in subscribers) { 
      if (key.includes(listenerGuid)) {
        try {
          subscribers[key].socket?.close();
          delete subscribers[key];
          socket = ""
          console.log(`[unsubscribeBars]: ${listenerGuid}`);
        } catch (e) {
          console.warn("Error closing WebSocket", e);
        }
      }
    }  
  },

  searchSymbols: async (
    userInput: any,
    exchange: any,
    symbolType: any,
    onResultReadyCallback: any
  ) => {
    onResultReadyCallback([]); 
  },
};

export default DataFeed;
