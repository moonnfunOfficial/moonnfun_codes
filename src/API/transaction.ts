import axois from "../utils/axiosExport";

 
export function ccexWithdraw(data?: any) {
  return axois.request({
    url: `/trade/ccexWithdraw`,
    method: "POST",
    data: {
      ...data,
    },
  });
}
export function getCCexWithdrawRecord(data?: any) {
  return axois.request({
    url: `/trade/getCCexWithdrawRecord`,
    method: "get",
  });
}

export function ccrTrade(data?: any) {
  return axois.request({
    url: `/trade/ccexWithdraw`,
    method: "POST",
    data: {
      ...data,
    },
  });
} 
export function cpbTrade(data?: any) {
  return axois.request({
    url: `/trade/cpbTrade`,
    method: "POST",
    data: {
      ...data,
    },
  });
}
export function getCpbRecord(data?: any) {
  return axois.request({
    url: `/trade/getCpbRecord`,
    method: "GET",
  });
} 
export function getJhbTradeBase(data?: any) {
  return axois.request({
    url: `/trade/getJhbTradeBase`,
    method: "GET",
  });
} 
export function getJhbExchangeRecord(data?: any) {
  return axois.request({
    url: `/trade/getJhbExchangeRecord`,
    method: "GET",
  });
} 
export function jhbTrade(data?: any) {
  return axois.request({
    url: `/trade/jhbTrade`,
    method: "POST",
    data: {
      ...data,
    },
  });
} 
export function getCcexTradeBase(data?: any) {
  return axois.request({
    url: `/trade/getCcexTradeBase`,
    method: "GET",
  });
} 
export function tradeCcrTrade(data?: any) {
  return axois.request({
    url: `/trade/ccrTrade`,
    method: "POST",
    data: {
      ...data,
    },
  });
} 
export function getCcrTradeRecord(data?: any) {
  return axois.request({
    url: `/trade/getCcrTradeRecord`,
    method: "GET",
  });
}
 
export function getCCRTradeBase(data?: any) {
  return axois.request({
    url: `/trade/getCcrTradeBase`,
    method: "GET",
  });
}
