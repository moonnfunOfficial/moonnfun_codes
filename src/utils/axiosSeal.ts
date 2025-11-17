import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosPromise,
  AxiosResponse,
} from "axios";  
import { Decrypt, Encrypt } from "../utils/encryption";
import i18n, { t } from "i18next";
import store from "../store";
import { json } from "stream/consumers";
import { addMessage } from "./tool";
import { notification } from "antd";
import { wsBus } from "./wsBus";
class HttpRequest { 
  constructor(public baseUrl: string) { 
    this.baseUrl = baseUrl;
  }
  public request(options: AxiosRequestConfig): AxiosPromise { 
    const instance: AxiosInstance = axios.create(); 
    options = this.mergeConfig(options);  
    this.interceptors(instance, options.url); 
    return instance(options);  
  }
  private interceptors(instance: AxiosInstance, url?: string) { 
    instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // config.headers.lang = 'en'
        if (
          (config.method === "POST" || config.method === "post") &&
          config?.data?.Encrypt
        ) {
          config.data = Encrypt(JSON.stringify(config.data));
        }


        // config.data=Encrypt(JSON.stringify(config.data)) 
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    instance.interceptors.response.use(
      (res: AxiosResponse) => { 
        if (typeof res.data === "string") {
          return Decrypt(res.data as unknown as string);  
        } else {
          return res.data;
        }
      },
      (error) => {  
        if(error?.message && error?.message.includes("403")) { 
          var _text: any = t("135")
          notification.open({
            message: _text,
            key: '135',
          }); 
          wsBus.emit('LoginOut', 0); 
        } 
        else if(error?.message && error?.message.includes("503")) { 
          notification.open({
            message: error?.response?.data?.error || error?.message,
            key: '503',
          });  
        } 
        return Promise.reject(error);
      }
    );
  }
  private mergeConfig(options: AxiosRequestConfig): AxiosRequestConfig { 
    let state: any = store.getState();
    let _chainId = state.chainId ? state.chainId : Number(localStorage.getItem("chainId")); 
     
    let _baseUrl = this.baseUrl + `${_chainId === 56 || _chainId === 97 ? 
      'bsc' :
      (_chainId === 11952 || _chainId === 196) ?
      'xlayer' :
      (_chainId === 84532 || _chainId === 8453) ?
      'base'
       : 'sei'}/api/v1`
      
    return Object.assign(
      {
        // baseURL: this.baseUrl,
        baseURL: _baseUrl,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json;charset=UTF-8",
          token: state.token,
          lang: i18n.language ? i18n.language : "en",
          chainId: state.isSelectAll
            ? "sei,bsc,xlayer,base" : 
            ([56, 97].includes(Number(_chainId)) ? 'bsc' : 
            [11952, 196].includes(Number(_chainId)) ? 'xlayer': 
            [1329, 1328, 113329].includes(Number(_chainId)) ? 'sei': 
            [8453, 84532].includes(Number(_chainId)) ? 'base': 
            'sei,bsc,xlayer,base'),  
        },
      },
      options
    );
  }
}
export default HttpRequest;
