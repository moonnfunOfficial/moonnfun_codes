import axois from "../utils/axiosExport";
import qs from "qs";
interface LoginData {
  password: string;
  refereeUserAddress: string;
  userAddress: string;
  userPower: number;
}

export function Login(data: LoginData) {
  return axois.request({
    url: "/user/login",
    method: "post",
    // data: {
    //   ...data,
    //   // Encrypt: true,
    // },
    data: qs.stringify({
      ...data,
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
export function tokenList(data: any) {
  return axois.request({
    url: "/token/list",
    method: "GET",
    params: {
      ...data,
    },
  });
}
export function tokenDetail(data?: any) {
  return axois.request({
    url: "/token/detail?address=" + data?.address,
    method: "GET",
    data: {
      ...data,
    },
  });
}
// hot 
export function hotList(data?: any) {
  return axois.request({
    url: "/trade/hot",
    method: "GET",
    params: {
      ...data,
    },
  });
}
// /token/price
export function tokenPrice(data?: any) {
  return axois.request({
    url: "/token/price",
    method: "GET",
    params: {
      ...data,
    },
  });
}
 
export function logout() {
  return axois.request({
    url: "/user/logout",
    method: "GET",
  });
}
 
export function createToken(data: any) {
  return axois.request({
    url: "/token/create",
    method: "post",
    data: {
      ...data,
    },
  });
} 
export function createCoinSuccess(data: any) {
  return axois.request({
    url: `/token/create/ok?tokenID=${data?.okenID}&txhash=${data?.txhash} `,
    method: "GET",
  });
} 
export function submitSupport(data: any) {
  return axois.request({
    url: "/user/support",
    method: "post",
    data: {
      ...data,
    },
  });
} 
export function bannerList(data?: any) {
  return axois.request({
    url: "/system/banner",
    method: "GET",
    params: {
      ...data,
    },
  });
} 
export function uploadBanner(data: any) { 
  const formData: any = new FormData();

  for (const key in data) {
    if (data[key] instanceof File) {
      formData.append(key, data[key]);  
    } else if (Array.isArray(data[key])) {
      if (data[key].every((item: any) => item instanceof File)) { 
        data[key].forEach((file: any, index: number) => {
          formData.append(`${key}[${index}]`, file);
        });
      } else { 
        formData.append(key, JSON.stringify(data[key]));
      }
    } else if (typeof data[key] === "object") { 
      formData.append(key, JSON.stringify(data[key]));
    } else {
      formData.append(key, data[key]);  
    }
  }

  return axois.request({
    url: "/system/image/upload",
    method: "post",
    headers: {
      'content-type': "multipart/form-data",
    },
    data: formData,
  });
} 
export function submitBanner(data: any) {
  return axois.request({
    url: "/system/listing",
    method: "post",
    data: {
      ...data,
    },
  });
} 
export function ApplyBannerList(data?: any) {
  return  axois.request({
    url: "/system/orders?address=" + data?.address,
    method: "get", 
  }); 
} 
export function bannerTime(data?: any) {
  return axois.request({
    url: "/system/listing/wait?tokenAddress=" + data?.tokenAddress || '',
    method: "get",
    data: {
      ...data,
    },
  });
} 
export function bannerPrepare(data?: any) { 
  return axois.request({
    url: `/system/listing/prepare?tokenAddress=${data?.tokenAddress|| ''}&cancel=${data?.cancel|| ''}`,
    method: "get",
    data: {
      ...data,
    },
  }); 
} 
export function uploadFile(data: any) {
  const formData: any = new FormData();

  for (const key in data) {
    if (data[key] instanceof File) {
      formData.append(key, data[key]);  
    } else if (Array.isArray(data[key])) {
      if (data[key].every((item: any) => item instanceof File)) { 
        data[key].forEach((file: any, index: number) => {
          formData.append(`${key}[${index}]`, file);
        });
      } else { 
        formData.append(key, JSON.stringify(data[key]));
      }
    } else if (typeof data[key] === "object") {  
      formData.append(key, JSON.stringify(data[key]));
    } else {
      formData.append(key, data[key]);  
    }
  }

  return axois.request({
    url: "/token/image/upload",
    method: "post",
    headers: {
      'content-type': "multipart/form-data",
    },
    data: formData,
  });
} 
export function WSstatus(data?: any) {
  return  axois.request({
    url: "/system/ws/status",
    method: "get", 
  }); 
}  
export function tokenHolders(data: any) {
  return axois.request({
    url: "/token/holders",
    method: "GET",
    params: {
      ...data,
    },
  });
}
// /token/comment
export function tokenComment(data: any) {
  return axois.request({
    url: "/token/comment",
    method: "post",
    data: {
      ...data,
    },
  });
}
// /trade/list
export function tradeList(data: any) {
  return axois.request({
    url: "/trade/list",
    method: "GET",
    params: {
      ...data,
    },
  });
}
// /token/hot
export function tokenHot(data?: any) {
  return axois.request({
    url: "/token/hot",
    method: "GET",
    params: {
      ...data,
    },
  });
}
// /uesr/tokens
export function userTokensList(data: any) {
  return axois.request({
    url: "/user/holders",
    method: "GET",
    params: {
      ...data,
    },
  });
}
// /user/follows
export function userTokensListFollows(data: any) {
  return axois.request({
    url: "/user/follows",
    method: "GET",
    params: {
      ...data,
    },
  });
}
// /user/detail
export function userDetail(data?: any) {
  return axois.request({
    url: "/user/detail",
    method: "GET",
    params: {
      ...data,
    },
  });
}
// /user/statistics
export function userStatistics(data?: any) {
  return axois.request({
    url: "/user/statistics",
    method: "GET",
    params: {
      ...data,
    },
  });
}
// /token/search
export function tokenSearch(data: any) {
  return axois.request({
    url: "/token/search",
    method: "GET",
    params: {
      ...data,
    },
  });
}
// /user/follow
export function userFollow(data: any) {  
  const formData: any = new FormData();

  for (const key in data) {
    if (data[key] instanceof File) {
      formData.append(key, data[key]);  
    } else if (Array.isArray(data[key])) {
      if (data[key].every((item: any) => item instanceof File)) { 
        data[key].forEach((file: any, index: number) => {
          formData.append(`${key}[${index}]`, file);
        });
      } else { 
        formData.append(key, JSON.stringify(data[key]));
      }
    } else if (typeof data[key] === "object") { 
      formData.append(key, JSON.stringify(data[key]));
    } else {
      formData.append(key, data[key]);  
    }
  }

  return axois.request({
    url: "/user/follow",
    method: "post",
    headers: {
      'content-type': "multipart/form-data",
    },
    data: formData,
  });
}
// /user/bind
export function userBind(data: any) {
  // return axois.request({
  //   url: "/user/bind",
  //   method: "post",
  //   data: {
  //     ...data,
  //   },
  // });
  
  const formData: any = new FormData();

  for (const key in data) {
    if (data[key] instanceof File) {
      formData.append(key, data[key]);  
    } else if (Array.isArray(data[key])) {
      if (data[key].every((item: any) => item instanceof File)) { 
        data[key].forEach((file: any, index: number) => {
          formData.append(`${key}[${index}]`, file);
        });
      } else { 
        formData.append(key, JSON.stringify(data[key]));
      }
    } else if (typeof data[key] === "object") { 
      formData.append(key, JSON.stringify(data[key]));
    } else {
      formData.append(key, data[key]);  
    }
  }

  return axois.request({
    url: "/user/bind",
    method: "post",
    headers: {
      'content-type': "multipart/form-data",
    },
    data: formData,
  });
}
// /token/subscribe
export function tokenSubscribe(data: any) {
  return axois.request({
    url: "/token/subscribe",
    method: "GET",
    params: {
      ...data,
    },
  });
} 
export function getInviteList(data?: any) {
  return axois.request({
    url: "/user/referrals",
    method: "GET",
    params: {
      ...data,
    },
  });
} 
export function getIsMainnet() {
  return axois.request({
    url: "/system/mainnet",
    method: "GET",
  });
} 
export function getInsureDetail(data?: any) {
  return axois.request({
    url: `/insure/detail?tokenAddress=${data?.tokenAddress || ''}&address=${data?.address|| ''}`,
    method: "GET",
    params: {
      // ...data,
    },
  });
} 
export function getInsureList(data?: any) {
  return axois.request({
    url: "/insure/list",
    method: "GET",
    params: {
      ...data,
    },
  });
} 
export function getInsureClaim(data?: any) {
  return axois.request({
    url: "/insure/claim",
    method: "GET",
    params: {
      ...data,
    },
  });
}
 
export function GetRefereeList(data?: any) {
  return axois.request({
    url: `/user/getRefereeList`,
    method: "GET",
    data: {
      ...data,
    },
  });
}

export function drawAward(data: any) {
  return axois.request({
    url: `/user/drawAward`,
    method: "post",
    data: {
      ...data,
    },
  });
} 