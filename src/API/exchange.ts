import axois from "../utils/axiosExport";
 
export function kline(data?: any) {
  return axois.request({
    url: `https://dapp-test.gamon.fun/user/exchequerTradeInfo/kline`,
    method: "POST",
    data: {
      ...data,
    },
  });
}