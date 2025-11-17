import axois from "../utils/axiosExport"; 
export function getProductBaseList(data?: any) {
  return axois.request({
    url: `/product/getProductBaseList/${data}`,
    method: "GET",
  });
} 
export function buyProduct(data: any) {
  return axois.request({
    url: `/product/buyProduct`,
    method: "post",
    data: {
      ...data,
    },
  });
} 
export function getProductBuyRecord(type?: any) {
  return axois.request({
    url: `/product/getProductBuyRecord/${type}`,
    method: "GET",
  });
} 
export function getNftEarnInfo(type?: any) {
  return axois.request({
    url: `/product/getNftEarnInfo`,
    method: "GET",
  });
} 
export function getNftEarnRecord(type?: any) {
  return axois.request({
    url: `/product/getNftEarnRecord`,
    method: "GET",
  });
}
