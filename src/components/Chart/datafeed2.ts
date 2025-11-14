//@ts-nocheck
import {
  OnReadyCallback,
  LibrarySymbolInfo,
  ResolutionString,
  PeriodParams,
  HistoryCallback,
  Bar,
  SubscribeBarsCallback,
} from "./charting_library/charting_library";
import { lotteryLatelyWinning } from "../../API/raffle";
import { webSocketUrl } from "../../config";

type HistroyParams = {
  resolution?: number | string;
  symbol: string;
  from?: number;
  to?: number;
  quote?: number;
  compress?: number;
};
declare let window: any;

export const getQuoteBySymbol = (
  symbol: string,
  params?: { column?: string }
) => {
  const url = `https://ws.api.beta.cnyes.cool/ws/api/v2/quote/quotes/${symbol}?`;

  return fetch(url + new URLSearchParams(params)).then((response) => {
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  });
};

// 將tradingview的resolution轉成api的resolution, 1c是跨日
const formatResolution = (resolution: ResolutionString) => {
  switch (resolution) {
    case "1":
    case "5":
    // case "10":
    case "15":
    // case "30":
    case "60":
    case "240":
      return resolution;
    // case "1D":
    //   return 24 * 60 * 60;
    // case "1W":
    //   return 7 * 24 * 60 * 60;
    // case "1M":
    //   return 30 * 7 * 24 * 60 * 60;
    default:
      return resolution;
    // return /[0-9]+[DWM]/.test(resolution)
    //   ? String(resolution).replace(/[0-9]/g, "")
    //   : resolution;
  }
};

type HistoryProps = {
  from: number;
  to: number;
  resolution: ResolutionString;
  symbol: string;
};

function getTestData(timestamp = new Date().getTime(), length = 800) {
  let basePrice = 5000;
  timestamp =
    Math.floor(timestamp / 1000 / 60) * 60 * 1000 - length * 60 * 1000;
  const dataList = [];
  for (let i = 0; i < length; i++) {
    const prices = [];
    for (let j = 0; j < 4; j++) {
      prices.push(basePrice + Math.random() * 60 - 30);
    }
    prices.sort();
    const open = +prices[Math.round(Math.random() * 3)].toFixed(2);
    const high = +prices[3].toFixed(2);
    const low = +prices[0].toFixed(2);
    const close = +prices[Math.round(Math.random() * 3)].toFixed(2);
    const volume = Math.round(Math.random() * 100) + 10;
    const turnover = ((open + high + low + close) / 4) * volume;
    dataList.push({
      time: timestamp,
      open,
      high,
      low,
      close,
      volume,
      // turnover,
    });

    basePrice = close;
    timestamp += 60 * 1000;
  }
  // debugger;
  return dataList;
}

export const GETv1HistoryBySymbol = ({
  resolution = 5,
  symbol,
  from,
  to,
  quote = 0,
  compress,
}: HistroyParams) => {
  const url = "https://ws.api.beta.cnyes.cool/ws/api/v1/charting/history?";
  const params: any = {
    symbol,
    quote,
    resolution,
  };

  if (from) params.from = from;
  if (to) params.to = to;
  if (compress) params.compress = compress;

  return fetch(url + new URLSearchParams(params)).then((response) => {
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  });
};
export const getSymbolHistories = async ({
  from,
  to,
  resolution,
  symbol,
}: HistoryProps) => {
  const apiResolution = formatResolution(resolution);
  const res = await GETv1HistoryBySymbol({
    resolution: apiResolution,
    symbol,
    quote: 1,
    to: from /* api的from是比較大的值,和tradingview相反 */,
    from: to,
  });
  const statusCode = res?.statusCode;
  const data = res?.data;

  return { statusCode, data };
};

const DataFeed = {
  onReady: (callback: OnReadyCallback) => {
    console.log("[onReady]: Method call");
    const config: any = {
      supports_search: false,
      supports_group_request: false,
      supports_marks: false,
      supported_resolutions: ["1", "5", "15", "60", "240", "1D"],
      symbols_types: [{ name: "crypto", value: "crypto" }],
    };
    callback(config);
  },  
  
  resolveSymbol(
    symbolName,
    onSymbolResolvedCallback,
    onResolveErrorCallback,
    extension
  ) {
    setTimeout(() => {
      // Return some simple symbol information for the TEST symbol
      if (!!symbolName) {
        onSymbolResolvedCallback({
          name: "TEST",
          timezone: "Asia/Shanghai",
          minmov: 1,
          minmov2: 0,
          pointvalue: 1,
          session: "24x7",
          has_intraday: false,
          // visible_plots_set: "c",
          description: "Test Symbol",
          type: "stock",
          supported_resolutions: ["15", "D"],
          pricescale: 100,
          ticker: "TEST",
          exchange: "Test Exchange",
          has_daily: true,
          format: "price",
        });
      } else {
        // Ignore all other symbols
        onResolveErrorCallback("unknown_symbol");
      }
    }, 50);
  },

  getBars(
    symbolInfo,
    resolution,
    periodParams,
    onHistoryCallback,
    onErrorCallback
  ) {
    setTimeout(() => {
      // For this piece of code only we will only return bars for the TEST symbol
      // if (symbolInfo.ticker === "TEST" && resolution === "1D") {
      // We are constructing an array for `countBack` bars.
      const bars = new Array(periodParams.countBack);
      debugger;
      // For constructing the bars we are starting from the `to` time minus 1 day, and working backwards until we have `countBack` bars.
      let time = new Date(periodParams.to * 1000);
      time.setUTCHours(0);
      time.setUTCMinutes(0);
      time.setUTCMilliseconds(0);
      time.setUTCDate(time.getUTCDate() - 1);

      // Fake price.
      let price = 100;

      for (let i = periodParams.countBack - 1; i > -1; i--) { 
        const open = price;
 
        const volatility = 0.1;
        const x = Math.random() - 0.5;
        const changePercent = 2 * volatility * x;
        const changeAmount = price * changePercent;
        price = price + changeAmount;
 
        const close = price;
        function getRandomInt(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        } 
        const high = Math.max(open, close) + getRandomInt(1, 10);  
        const low = Math.min(open, close) - getRandomInt(1, 10);  
 
        const volume = Math.floor(Math.random() * 1000);  
 
        bars[i] = {
          open: parseFloat(open.toFixed(2)),
          high: parseFloat(high.toFixed(2)),
          low: parseFloat(low.toFixed(2)),
          close: parseFloat(close.toFixed(2)),
          volume: volume,
          time: time.getTime(),
        };
 
        time.setUTCDate(time.getUTCDate() - 1);
      }
 
      onHistoryCallback(bars);
      // } else {
      //   // If no result, return an empty array and specify it to the library by changing the value of `noData` to true.
      //   onHistoryCallback([], {
      //     noData: true,
      //   });
      // }
    }, 50);
  },
  subscribeBars: (
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    onTick: SubscribeBarsCallback,
    listenerGuid: string,
    onResetCacheNeededCallback: Function
  ) => {
    console.log("[subscribeBars]: Method call with subscriberUID:");
    var socket: any;
    var chartInterval: any;
    var socketData: any = {};
    //判断当前浏览器是否支持websocket
    if (window.WebSocket) {
      //go on
      socket = new WebSocket(webSocketUrl);
      //相当于channelReado, ev 收到服务器端回送的消息
      socket.onmessage = (ev: any, onTick: any) => {
        socketData = { ...JSON.parse(ev.data) };
        // debugger;
        //@ts-nocheck
        let { time, open, low, high, close } =
          window.bars[window.bars?.length - 1];
        console.log(
          window.bars[window.bars?.length - 1],
          "----------last---------",
          socketData?.data?.swapKLineResp,
          "-----------new---------",
          Number(formatResolution(resolution)) * 60 * 1000
        );

        let reallyBar: any = {};
        if (
          Number(socketData?.data?.swapKLineResp?.openTime) * 1000 - time >=
          Number(formatResolution(resolution)) * 60 * 1000
        ) {
          reallyBar.time =
            Number(time) + Number(formatResolution(resolution)) * 60 * 1000;
          reallyBar.open = close;
          reallyBar.low =
            Number(close) < Number(socketData?.data?.swapKLineResp?.low)
              ? close
              : Number(socketData?.data?.swapKLineResp?.low);
          reallyBar.high =
            Number(close) > Number(socketData?.data?.swapKLineResp?.high)
              ? close
              : Number(socketData?.data?.swapKLineResp?.high);
          reallyBar.close = socketData?.data?.swapKLineResp?.close;
        } else {
          reallyBar.time = time;
          reallyBar.open = open;
          reallyBar.close = socketData?.data?.swapKLineResp?.close;
          reallyBar.low =
            Number(low) < Number(socketData?.data?.swapKLineResp?.low)
              ? Number(low)
              : Number(socketData?.data?.swapKLineResp?.low);
          reallyBar.high =
            Number(high) > Number(socketData?.data?.swapKLineResp?.high)
              ? Number(high)
              : Number(socketData?.data?.swapKLineResp?.high);
        }
        console.log(reallyBar, "reallyBar");
        window.bars = [reallyBar];
        onTick(reallyBar);
        // onTick({
        //   close: 2.108454110269884,
        //   high: 2.0023845411026984,
        //   low: 2.0023845411026984,
        //   open: 2.0023845411026984,
        //   time: 1734955778000,
        // });
      };

      //相当于连接开启(感知到连接开启)
      socket.onopen = function (ev: any) {
        console.log("WebSocket opened: " + ev);
      };

      //相当于连接关闭(感知到连接关闭)
      socket.onclose = function (ev: any) {
        console.log("WebSocket closed: " + ev);
      };

      socket.onerror = function (ev: any) {
        console.info(ev);
        console.log("WebSocket error：" + ev);
      };
    } else {
      alert("当前浏览器不支持websocket");
    }

    //发送消息到服务器
    function send(message: any) {
      if (socket.readyState == WebSocket.OPEN) {
        //通过socket 发送消息
        socket.send(message);
      } else {
        alert("连接没有开启");
      }
    }
    chartInterval = setTimeout(() => {
      if (!!symbolInfo?.base_name && window?.bars?.length > 0) {
        send(
          JSON.stringify({
            lastBar: window?.bars[window?.bars?.length - 1],
            operate: 4,
            intervalTime: formatResolution(resolution),
            swapTokenName1: symbolInfo?.base_name[0]?.split("/")[0],
            swapTokenName2: symbolInfo?.base_name[0]?.split("/")[1],
          })
        );
      }
    }, 1000);
    // setInterval(() => {
    //   onTick(
    //     {
    //       time: Number(socketData?.data?.swapKLineResp?.openTime) * 1000,
    //       low: socketData?.data?.swapKLineResp?.low,
    //       high: socketData?.data?.swapKLineResp?.high,
    //       open: socketData?.data?.swapKLineResp?.open,
    //       close: socketData?.data?.swapKLineResp?.close,
    //     }
    //     // { time: 1734690879758, open: 10, high: 14, low: 9, close: 14 }
    //   );
    // }, 2000);
    // console.log(onTick, "onTick");
    // onTick({ time: 1734690705772, open: 10, high: 14, low: 9, close: 14 });
  },
  unsubscribeBars: () => {
    console.log("[unsubscribeBars]: Method call with subscriberUID:");
  },
  searchSymbols: async (
    userInput: any,
    exchange: any,
    symbolType: any,
    onResultReadyCallback: any
  ) => {
    console.log("[searchSymbols]: Method call");
    // const symbols = await getMatchingSymbolsFromBackend(
    //   userInput,
    //   exchange,
    //   symbolType
    // );
    // const newSymbols: any = [
    //   {
    //     symbol: "DEMAIN_BTIA",
    //     description: "DEMAIN_BTIA/USDA",
    //     exchange: "USDA",
    //     ticker: "DEMAIN_BTIA:USDA",
    //     type: "crypto", // "futures"/"crypto"/"forex"/"index"
    //   },
    // ];
    onResultReadyCallback([]);
  },
};

export default DataFeed;
