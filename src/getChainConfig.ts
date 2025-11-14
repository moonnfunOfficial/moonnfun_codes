import { isMain } from "./config";
import store from "./store";

export const getChainConfig = () => {
  const state = store.getState();
  const _chainId = state.chainId ? Number(state.chainId) : Number(localStorage.getItem("chainId"));
  const isBSC: any = (_chainId === 56 || _chainId === 97) ? true : false;
  const isXLayer: any = (_chainId === 196 || _chainId === 11952) ? true : false;
  const isBase: any = (_chainId === 84532 || _chainId === 8453) ? true : false;
  
  return {
    isBSC,
    isXLayer,
    isBase,
    //  
    createTokenFee: isBSC ? 
      (isMain ? 0.01 : 0.01) 
      : isXLayer ? 
      (isMain ? 0.2 : 0.0005)
      : isBase ? 
      (isMain ? 0.001 : 0.001)
      : (isMain ? 30 : 0.1), 
    memeAddress: isBSC ? 
      (isMain ? '0x953C65358a8666617C66327cb18AD02126b2AAA5' : '0x953C65358a8666617C66327cb18AD02126b2AAA5') : 
      isXLayer ? 
      (isMain ? '0x81A1D0d3a6c141C9206008671D90C79484c5D979' : '0x81A1D0d3a6c141C9206008671D90C79484c5D979') :
      isBase ?
      (isMain ? '0xACE40c75AC55D4D9A6BCaB32Ecb90DcB5e55D83a' : '0xACE40c75AC55D4D9A6BCaB32Ecb90DcB5e55D83a') :
      (isMain ? '0x7FB4fb77E3f43a5db49A300188311d2B4D62B5e8' : '0x7FB4fb77E3f43a5db49A300188311d2B4D62B5e8'),
      _chainId:_chainId, 
    BridgeAddress:  isBSC ? 
      (isMain ? '0x7FB4fb77E3f43a5db49A300188311d2B4D62B5e8' : '0x7FB4fb77E3f43a5db49A300188311d2B4D62B5e8') : 
      (isMain ? '0x7FB4fb77E3f43a5db49A300188311d2B4D62B5e8' : '0x7FB4fb77E3f43a5db49A300188311d2B4D62B5e8'), 
    buyNunber: isBSC ? [2,5,7.5,10]:[20,50,75,100],  
    buyGasFee: isBSC ? 0.0001 : isBase ? 0.00001 : 0.03
  };
};