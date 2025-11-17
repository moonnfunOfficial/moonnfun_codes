


export const chainCoinName = (chainId: any) => {
  let _name = ''
  if (chainId === 1328 || chainId === 1329 || chainId === 113329) {
    _name = "SEI";
  } else if (chainId === 56 || chainId === 97) {
    _name = "BNB";
  }  else if (chainId === 84532 || chainId === 8453) {
    _name = "Base";
  }
  else {
    _name = "OKB";
  }
  return _name
};  