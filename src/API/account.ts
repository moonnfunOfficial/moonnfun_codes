import axois from "../utils/axiosExport";
 
export function getRefereeList(type?: any) {
  return axois.request({
    url: `/user/getRefereeList`,
    method: "GET",
  });
} 
export function getUserAccountInfo(name?: any) {
  return axois.request({
    url: `/user/getUserAccountInfo/${name}`,
    method: "GET",
  });
} 
export function getUserInfo(type?: any) {
  return axois.request({
    url: `/user/getUserInfo`,
    method: "GET",
  });
} 
export function getUserAccountList(data?: any) {
  return axois.request({
    url: `/user/getFriendList`,
    method: "POST",
    data: {
      ...data,
    },
  });
} 
export function getSubscriptionRecord(type?: any) {
  return axois.request({
    url: `/user/getSubscriptionRecord`,
    method: "GET",
  });
} 
export function getRefereeEarnInfo(type?: any) {
  return axois.request({
    url: `/earn/getRefereeEarnInfo`,
    method: "GET",
  });
} 
export function getTeamEarnInfo(type?: any) {
  return axois.request({
    url: `/earn/getTeamEarnInfo`,
    method: "GET",
  });
} 
export function getProductEarnRecord(type?: any) {
  return axois.request({
    url: `/earn/getProductEarnRecord`,
    method: "GET",
  });
} 
export function getRefereeEarnRecord(type?: any) {
  return axois.request({
    url: `/earn/getRefereeEarnRecord`,
    method: "GET",
  });
} 
export function getTeamEarnRecord(type?: any) {
  return axois.request({
    url: `/earn/getTeamEarnRecord`,
    method: "GET",
  });
}
 
export function getWithdrawCoin(type?: any) {
  return axois.request({
    url: `/trade/getWithdrawCoin`,
    method: "GET",
  });
} 
export function handleTransfer(data?: any) {
  return axois.request({
    url: `/trade/userWithdraw`,
    method: "POST",
    data: {
      ...data,
    },
  });
} 
export function getUserAccountDetail(name?: any) {
  return axois.request({
    url: `/user/getUserAccountDetail/${name}`,
    method: "GET",
  });
}
 
export function getAwardUserAccountList(name?: any) {
  return axois.request({
    url: `/user/getAwardUserAccountList`,
    method: "GET",
  });
} 
export function getAwardUserAccountInfo(name?: any) {
  return axois.request({
    url: `/user/getAwardUserAccountInfo/${name}`,
    method: "GET",
  });
} 
export function getUserAccountRecord(data?: any) {
  return axois.request({
    url: `/user/getUserAccountRecord`,
    method: "POST",
    data: {
      ...data,
    },
  });
} 
export function handleDrawAward(data?: any) {
  return axois.request({
    url: `/user/drawAward`,
    method: "POST",
    data: {
      ...data,
    },
  });
}
