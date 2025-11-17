import axois from "../utils/axiosExport";
 
export function getTeamInfoDetail(type?: any) {
  return axois.request({
    url: `/earn/getTeamInfoDetail`,
    method: "GET",
  });
} 
export function getTeamEarnRecord(type?: any) {
  return axois.request({
    url: `/earn/getTeamEarnRecord`,
    method: "GET",
  });
} 
export function getRefereeEarnRecord(type?: any) {
  return axois.request({
    url: `/earn/getRefereeEarnRecord`,
    method: "GET",
  });
} 
export function getDynamicValue(type?: any) {
  return axois.request({
    url: `/product/getDynamicValue`,
    method: "GET",
  });
}
