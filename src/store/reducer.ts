import {
  LOGINSUCCESS,
  reducerParameterType,
  message,
  ADDMESSAGE,
  DELMESSAGE,
  SETLODING,
  SAVEPRICE,
  SAVEChainId,
  SAVEisSelectAll
} from "./actions"; 
export interface stateType {
  address: string;
  message: Array<message>;
  token: string;
  qbToken: string;
  price: string;
  showLoding: Boolean;
  chainId: string;
  isSelectAll: Boolean;
} 
const initialState: stateType = {
  address: "",
  message: [],
  token: "",
  qbToken: "",
  showLoding: false,
  price: "",
  chainId: '',
  isSelectAll: true,
};
let reducer = (state = initialState, action: reducerParameterType) => {
  switch (action.type) { 
    case LOGINSUCCESS:
      return { ...state, ...action.value };
    case SAVEPRICE:
      return { ...state, price: action.value }; 
    case SAVEChainId:
        return { ...state, chainId: action.value };
    case SAVEisSelectAll:
          return { ...state, isSelectAll: action.value };
    case ADDMESSAGE:
      return { ...state, message: [...state.message, action.value] };
    case DELMESSAGE:
      return {
        ...state,
        message: state.message.filter((item) => {
          return item.index !== action.value;
        }),
      };
    case SETLODING:
      return { ...state, showLoding: action.value };
    default:
      return state;
  }
};

export default reducer;
