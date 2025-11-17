export const SETADDRESS = "SETADDRESS";
export const SAVEPRICE = "SAVEPRICE";

export const LOGINSUCCESS = "LOGINSUCCESS";
export const SAVEChainId = "SAVEChainId";
export const SAVEisSelectAll = "SAVEisSelectAll"; 
export interface loginSuccess {
  type: typeof LOGINSUCCESS;
  value: {
    address: string;
    token: string;
  };
} 
export const createLoginSuccessAction = (
  address: string,
  token: string
): loginSuccess => ({
  type: LOGINSUCCESS,
  value: {
    address,
    token,
  },
}); 
export const savePriceAction = (price: string): savePrice => ({
  type: SAVEPRICE,
  value: price,
}); 
export const saveSelectAll = (price: any): any => ({
  type: SAVEisSelectAll,
  value: price,
}); 
export const saveChainId = (price: any): any => ({
  type: SAVEChainId,
  value: price,
});
 
export const ADDMESSAGE = "ADDMESSAGE";
export const BEFOREADDMESSAGE = "BEFOREADDMESSAGE";
export interface message {
  message: string;
  index: number;
}
export interface beforeAddMessage {
  type: typeof BEFOREADDMESSAGE;
  value: message;
}
export interface addMessage {
  type: typeof ADDMESSAGE;
  value: message;
}
export interface savePrice {
  type: typeof SAVEPRICE;
  value: string;
}
export interface saveChainId {
  type: any;
  value: any;
}
export interface saveSelectAll {
  type: any;
  value: any;
}

 
export const createAddMessageAction = (message: message): beforeAddMessage => ({
  type: BEFOREADDMESSAGE,
  value: message,
});
 
export const DELMESSAGE = "DELMESSAGE";
export interface delMessage {
  type: typeof DELMESSAGE;
  value: number;
} 
export const createDelMessageAction = (index: number): delMessage => ({
  type: DELMESSAGE,
  value: index,
}); 
export const SETLODING = "SETLODING";
export interface setLodingAction {
  type: typeof SETLODING;
  value: Boolean;
} 
export const createSetLodingAction = (
  showLoding: Boolean
): setLodingAction => ({
  type: SETLODING,
  value: showLoding,
}); 
export type reducerParameterType =
  | loginSuccess
  | beforeAddMessage
  | addMessage
  | delMessage
  | setLodingAction
  | savePrice|saveChainId
  | saveSelectAll;
