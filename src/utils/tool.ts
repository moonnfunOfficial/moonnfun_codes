import dayjs from "dayjs";
import store from "../store";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {
  createAddMessageAction,
  createSetLodingAction,
} from "../store/actions";
import relativeTime from "dayjs/plugin/relativeTime";
import BigNumber from "big.js";
import { Decimal } from 'decimal.js';
import Web3 from "web3";

export function toThousands(num: string) {
  let numArr = num.split(".");
  if (numArr.length > 1) {
    return parseFloat(numArr[0]).toLocaleString() + "." + numArr[1];
  } else {
    return parseFloat(numArr[0]).toLocaleString();
  }
} 
export function AddrHandle(
  addr: string,
  start = 4,
  end = 4,
  replace = "..."
): string | undefined {
  if (!addr) {
    return;
  }
  let r = new RegExp("(.{" + start + "}).*(.{" + end + "})");
  let addrArr: RegExpMatchArray | null = addr.match(r);
  return addrArr![1] + replace + addrArr![2];
}
export function HowLongAgo(time: number) {
  dayjs.extend(relativeTime);
  var a = dayjs();
  return a.to(new Date(time));
}

export function GetQueryString(name: string) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  // console.log(window.location)
  var r = window.location.search.slice(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
}

export function JudgmentNumber(number: string) {
  let numArr = number.split(".");
  if (numArr.length > 1) {
    return numArr[1].length > 18;
  }
  return false;
} 
export function NumSplic(val: any, len: number = 6) {
  var f = parseFloat(val);
  if (isNaN(f)) {
    return false;
  }
  var s = val.toString();
  if (s.indexOf(".") > 0) {
    let f = s.split(".")[1].substring(0, len);
    s = s.split(".")[0] + "." + f;
  }
  var rs = s.indexOf(".");
  if (rs < 0) {
    rs = s.length;
    s += ".";
  }
  while (s.length <= rs + len) {
    s += "0";
  }
  return s;
} 
export function NumSplic1(val: any, len: number = 6) {
  var f = parseFloat(val);
  if (isNaN(f)) {
    return false;
  }
  var s = val.toString();
  if (s.indexOf(".") > 0) {
    let f = s.split(".")[1].substring(0, len);
    s = s.split(".")[0] + "." + f;
  }
  return s;
} 
export function getBit(value: number, bit = 5) {
  let str = value.toString();
  let strIndex = str.indexOf(".");
  if (strIndex === -1) return str;
  str = str.substring(0, strIndex + bit);
  // console.log(str, bit);
  // console.log(typeof str,'getBit值')
  return str;
}  
function truncate(num: number | string, decimals: number): string {
  const str = String(num);
  if (!str.includes(".")) return str;
  const [int, frac] = str.split(".");
  return frac.length > decimals ? `${int}.${frac.slice(0, decimals)}` : str;
}

export function formatAmount(data: number) {
  let output = data;

  if (data < 1000) {
    return truncate(data, 2);  
  } else if (data >= 1000 && data < 1000000) {
    output = new Decimal(`${data}`).dividedBy(1000).toNumber();
    return `${truncate(output, 1)}K`;
  } else if (data >= 1000000 && data < 1000000000) {
    output = new Decimal(`${data}`).dividedBy(1000000).toNumber();
    return `${truncate(output, 1)}M`;
  } else if (data >= 1000000000) {
    output = new Decimal(`${data}`).dividedBy(1000000000).toNumber();
    return `${truncate(output, 1)}B`;
  }

  return String(data);
}


export function numberDivision() { }

export function showLoding(isShow: boolean) {
  store.dispatch(createSetLodingAction(isShow));
}

export function addMessage(msg: string) {
  store.dispatch(
    createAddMessageAction({
      message: msg,
      index: store.getState().message.length,
    })
  );
}
export function isApprove(price: number | string, Approve: string) {
  return new BigNumber(Approve).gte(price);
}
export function dateFormat(fmt: string, date: Date) {
  let ret;
  const opt: { [key: string]: string } = {
    "Y+": date.getFullYear().toString(),  
    "m+": (date.getMonth() + 1).toString(),  
    "d+": date.getDate().toString(),  
    "H+": date.getHours().toString(),  
    "M+": date.getMinutes().toString(),  
    "S+": date.getSeconds().toString(),  
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }
  return fmt;
}
export function getFullNum(num: any) { 
  if (isNaN(num)) {
    return num;
  } 
  var str = "" + num;
  if (!/e/i.test(str)) {
    return num;
  }
  return num.toFixed(18).replace(/\.?0+$/, "");
}
 

export function countLeadingZerosAfterDecimal(n: string) {
  try {
    const str = n.toString();
    const decimalPart = str.split('.')[1] || '';
    const match = decimalPart.match(/^0+/);  
    return match ? match[0].length : 0;
  } catch (error) {
    return 0;
  }
}

export function startWord(name: string) {
  if (name.startsWith("/View")) return name.slice(5);
  return "";
}
 
export function timestampToDateString(timestamp: any) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const dateString = `${month}/${day} ${hours}:${minutes}`;
  return dateString;
}

export function formatTimestamp(timestamp: any) {
  const date = new Date(timestamp);

  const Y = date.getFullYear();
  const M = String(date.getMonth() + 1).padStart(2, '0');  
  const D = String(date.getDate()).padStart(2, '0');

  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  const s = String(date.getSeconds()).padStart(2, '0');

  return `${Y}/${M}/${D} ${h}:${m}:${s}`;
}
 
export function convertToLocalUtc0Timestamp(timeString: number): number { 
  const localDate = new Date(timeString);
 
  const offset = localDate.getTimezoneOffset();
 
  const utc0Date = new Date(localDate.getTime() + offset * 60 * 1000);
 
  return utc0Date.getTime();
}
 
export function handleBeforeInput(event: any) {
  const regex = /[\u4e00-\u9fff]/;
  return regex.test(event);
}

export function formatTimestamp2(timestamp: number): string {
  const date = new Date(timestamp);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}·${day}`;
}

export function ToThousand(
  num: string | number,
  decimalPlaces?: number
): string { 
  let parsedNum = typeof num === "string" ? parseFloat(num) : num;
 
  if (isNaN(parsedNum)) {
    throw new Error("Invalid number");
  }
 
  if (decimalPlaces !== undefined) {
    parsedNum = parseFloat(parsedNum.toFixed(decimalPlaces));
  }
 
  const sign = parsedNum < 0 ? "-" : "";
  parsedNum = Math.abs(parsedNum);
 
  const parts = parsedNum.toString().split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1];
 
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );
 
  if (decimalPart) {
    return sign + formattedIntegerPart + "." + decimalPart;
  } else {
    return sign + formattedIntegerPart;
  }
}
 
export function formatScientificNotation(num: number | string): string {
  const numStr = typeof num === 'number' ? num.toString() : String(num);
 
  if (numStr.includes('e-')) {
    const [base, exponentStr] = numStr.split('e-');
    const exponent = parseInt(exponentStr, 10);
    const [integerPart, decimalPart = ''] = base.split('.');

    const leadingZeros = exponent - 1;
    const digits = (integerPart + decimalPart).slice(0, 8);  

    return `0.0${toSubscript(leadingZeros)}${digits}`;
  }
 
  if (numStr.startsWith('0.')) {
    const decimalPart = numStr.split('.')[1];
    const leadingZeros = decimalPart.match(/^0+/)?.[0]?.length || 0;
    const remainingDigits = decimalPart.slice(leadingZeros).slice(0, 8);  

    if (leadingZeros > 0) {
      return `0.0${toSubscript(leadingZeros)}${remainingDigits}`;
    }
  }
 
  return String(num).slice(0, 8);
}

 
function toSubscript(num: number): string {
  const subscriptDigits = '₀₁₂₃₄₅₆₇₈₉';
  return num.toString().split('').map(d => subscriptDigits[parseInt(d)]).join('');
}
 
export function getFormattedTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');  
  const day = String(now.getDate()).padStart(2, '0');

  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const second = String(now.getSeconds()).padStart(2, '0');

  return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
}
 
type IsMobileFunction = {
  (): boolean;
  __listenerAdded?: boolean;  
};
const isMobile: IsMobileFunction = () => { 
  let cachedIsMobile: boolean | null = null;
  let lastWindowWidth: number | null = null;
 
  const check = (): boolean => {
    if (cachedIsMobile === null || window.innerWidth !== lastWindowWidth) {
      lastWindowWidth = window.innerWidth;
      cachedIsMobile = (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth < 768
      );
    }
    return cachedIsMobile;
  };
 
  if (!isMobile.__listenerAdded) {
    let resizeTimer: number;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        cachedIsMobile = null;  
      }, 200);
    });
    isMobile.__listenerAdded = true;
  }
 
  return check();
};
export { isMobile };

export function isNumber(str: any) {
  return typeof str === 'string' && !isNaN(Number(str));
}
 
export function scrollToTop() { 
    document.body.scrollTo(0, 0);
 
    document.documentElement.scrollTo(0, 0);
 
    const mainContainer = document.querySelector('#root');
    if (mainContainer) {
      mainContainer.scrollTo(0, 0);
    }
} 
export function clearAllCookies() {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.slice(0, eqPos).trim() : cookie.trim();
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
} 
export function detectLanguage(str: any) { 
  let chineseCount = 0;
  let englishCount = 0;
  let otherCount = 0; 
  for (let char of str) {
    if (/[\u4e00-\u9fa5]/.test(char)) {
      chineseCount++;
    } else if (/[a-zA-Z]/.test(char)) {
      englishCount++;
    } else {
      otherCount++;
    }
  }  
  if (chineseCount > englishCount) {
    return 'Chinese';
  } else if (englishCount > chineseCount) {
    return 'English';
  } else {
    return 'Mixed or Other';
  }
}
 
 export function containsScript(str: any) {
  return typeof str === 'string' && str.toLowerCase().includes('script');
}

export function   parseScientificNumber(value: any, unit: any = 'ether') {
  try {
    const numStr = String(value);  
    const wei = Web3.utils.toWei(numStr, unit);  
    const decimalStr = Web3.utils.fromWei(wei, unit); 
    return decimalStr;  
  } catch (e) {
    return null;
  }
}
export function sciToNum(sciNotation: any) {
  if (typeof sciNotation === 'number') {
    return sciNotation;
  }
  
  if (typeof sciNotation === 'string') {
    const num = parseFloat(sciNotation);
    return isNaN(num) ? 0 : num;
  }
  
  return 0;
}