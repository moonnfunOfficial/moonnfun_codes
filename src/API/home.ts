import axois from "../utils/axiosExport";




 
export function getBannerList(data?: any) {
  return axois.request({
    url: `/home/getBannerList`,
    method: "GET",
    data: {
      ...data,
    },
  });
} 
export function getNoticeList(data?: any) {
  return axois.request({
    url: `/home/getNoticeList`,
    method: "GET",
    data: {
      ...data,
    },
  });
} 
export function getNoticeDetail(type?: any) {
  return axois.request({
    url: `/home/getNoticeDetail/${type}`,
    method: "GET",
  });
} 
export function getCcexValueInfo(data?: any) {
  return axois.request({
    url: `/home/getCcexValueInfo`,
    method: "GET",
    data: {
      ...data,
    },
  });
} 
export function getHotProductList(data?: any) {
  return axois.request({
    url: `/home/getHotProductList`,
    method: "GET",
    data: {
      ...data,
    },
  });
} 
export function getCoinInfo(coinName?: any) {
  return axois.request({
    url: `/home/getCoinInfo/${coinName}`,
    method: "GET",
  });
} 
export function getCcrPriceHistory(type?: any) {
  return axois.request({
    url: `/home/getCcrPriceHistory/${type}`,
    method: "GET",
  });
} 
export function getCCEXPriceHistory(type?: any) {
  return axois.request({
    url: `/home/getCcexPriceHistory/${type}`,
    method: "GET",
  });
} 
export function getTransferCoin(type?: any) {
  return axois.request({
    url: `/transfer/getTransferCoin`,
    method: "GET",
  });
} 
export function getTransferRecord(type?: any) {
  return axois.request({
    url: `/transfer/getTransferRecord`,
    method: "GET",
  });
} 
export function handleTransfer(data?: any) {
  return axois.request({
    url: `/transfer/transfer`,
    method: "POST",
    data: {
      ...data,
    },
  });
} 
export function getUserSignRecord(type?: any) {
  return axois.request({
    url: `/home/getUserSignRecord`,
    method: "GET",
  });
} 
export function isUserSign(type?: any) {
  return axois.request({
    url: `/home/isUserSign`,
    method: "GET",
  });
} 
export function handleUserSignIn(data?: any) {
  return axois.request({
    url: `/home/userSignIn`,
    method: "POST",
    data: {
      ...data,
    },
  });
} 
export function getRefereeLinkInfo(type?: any) {
  return axois.request({
    url: `/user/getRefereeLinkInfo`,
    method: "GET",
  });
} 
export function updatePlacementCode(data?: any) {
  return axois.request({
    url: `/user/updatePlacementCode`,
    method: "POST",
    data: {
      ...data,
    },
  });
}
 
export function getMintBaseList(type?: any) {
  return axois.request({
    url: `/mint/getMintBaseList`,
    method: "GET",
  });
}
export function getNftInfo(data?: any) {
  return axois.request({
    url: `/mint/mint`,
    method: "POST",
    data: {
      ...data,
    },
  });
}
