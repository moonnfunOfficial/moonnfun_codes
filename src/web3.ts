import { Contract } from "web3-eth-contract";
import { provider } from "web3-core";
import Web3 from "web3";
import { abiObj, contractAddress, customNetwork_BSC, customNetwork_BSC_TEST, customNetwork_Base, customNetwork_Base_TEST, customNetwork_SEI, customNetwork_SEI_TEST, customNetwork_xLayer, customNetwork_xLayer_TEST, isMain } from "./config";
import { values } from "lodash";
import { defineChain } from "@reown/appkit/networks"; 
import store from "./store";
import { getChainConfig } from "./getChainConfig";
declare let window: any;
interface contractType {
  [propName: string]: Contract;
}
export const ChainId = {
  // BSC: "0x61",
  BSC: isMain ? "0x33450" : "0x31767",
};
 
const SCAN_ADDRESS = {
  [ChainId.BSC]: "https://juscan.io",
};
 
export const networkConf = {
  [ChainId.BSC]: { 
    chainId: isMain ? "0x38" : "0x61",
    chainName: "BSC",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: isMain
      ? ["https://bsc-dataseed.binance.org/"]
      : ["https://bsc-testnet.public.blastapi.io"],
    blockExplorerUrls: [SCAN_ADDRESS[ChainId.BSC]],
  },
};
 
 
const mathRandom = (0 * (0.0026 - 0.0016) + 0.0016).toFixed(8);
 


export class Contracts { 
  static example: Contracts;
  web3: Web3;
  contract: contractType = {};
  constructor(library: provider) {
    this.web3 = new Web3(library); 
    Contracts.example = this;
  } 
  verification(contractName: string) {
    if (!this.contract[contractName]) {
      this.contract[contractName] = new this.web3.eth.Contract(
        abiObj[contractName],
        contractAddress[contractName]
      );
    }
  } 
  verification2(contractName: string) {
    if (!this.contract[contractName]) {
      this.contract[contractName] = new this.web3.eth.Contract(
        abiObj[contractName],
        getChainConfig().memeAddress
      );
      console.info('_chainId'+getChainConfig()._chainId)
      console.info('_memeAddress'+getChainConfig().memeAddress)
      console.log(this.contract[contractName]); 
    }
  }
  // Bridge 
  verification3(contractName: string) {
    if (!this.contract[contractName]) {
      this.contract[contractName] = new this.web3.eth.Contract(
        abiObj[contractName],
        getChainConfig().BridgeAddress
      );
      console.info('_chainId'+getChainConfig()._chainId)
      console.info('_BridgeAddress'+getChainConfig().BridgeAddress)
      console.log(this.contract[contractName]); 
    }
  } 
  getBalance(addr: string) {
    return this.web3.eth.getBalance(addr);
  }
  totalSupply(addr: string) {
    this.verification("BKBK");
    return this.contract.BKBK?.methods.totalSupply().call({ from: addr });
  } 
  balanceOf(addr: string, contractName: string) {
    this.verification(contractName);
    let obj = new this.web3.eth.Contract(
      abiObj[contractName],
      contractAddress[contractName]
    );
    return obj?.methods.balanceOf(addr).call({ from: addr });
  }
  balanceOf2(addr: string, conin: string) {
    let obj = new this.web3.eth.Contract(
      abiObj['USDT'],
      conin
    );
    return obj?.methods.balanceOf(addr).call({ from: addr });
  }
  symbol(addr: string, contractName: string) {
    this.verification(contractName);
    let obj = new this.web3.eth.Contract(
      abiObj[contractName],
      contractAddress[contractName]
    );
    return obj?.methods.symbol().call({ from: addr });
  } 
  Tokenapprove(addr: string, toaddr: string, contractName: string) {
    this.verification2(contractName);
    let obj = new this.web3.eth.Contract(
      abiObj[contractName],
      contractAddress[contractName]
    );
    return obj?.methods.allowance(addr, toaddr).call({ from: addr });
  }
 async Tokenapprove1(addr: string, contractAdd?: string) {
    let obj = new this.web3.eth.Contract(
      abiObj['USDT'],
      contractAdd
    );  

    return obj?.methods.allowance(addr, 
      getChainConfig().memeAddress,
      ).call({ from: addr,
       });
  } 
  approve(addr: string, toaddr: string, contractName: string) {
    this.verification2(contractName);
    let obj = new this.web3.eth.Contract(
      abiObj[contractName],
      contractAddress[contractName]
    );
    // var amount = Web3.utils.toBN("99999999999999999999999999999999")
    var amount = Web3.utils.toWei(Number.MAX_SAFE_INTEGER + "", "ether");
    return obj?.methods
      .approve(toaddr, amount)
      .send({ from: addr, gasPrice: "5000000000" });
  }
  async approve1(addr: string,   contractAdd?: string) {
    // this.verification(contractAdd);
    let obj = new this.web3.eth.Contract(
      abiObj['USDT'],
      contractAdd
    );
    var amount = Web3.utils.toWei(Number.MAX_SAFE_INTEGER + "", "ether");

    // let estimateGas = await obj?.methods
    // .allowance(addr, getChainConfig().memeAddress).estimateGas({
    //   from: addr,
    //   gasPrice: await this.handleGetGasPrice(), 
    // })+100000  

    return obj?.methods
      .approve(getChainConfig().memeAddress, amount)
      .send({ from: addr, 
        gasPrice: await this.handleGetGasPrice(),
        // gasLimit: estimateGas,
       });
  }
 
  Sign(addr: string, msg: string) {
    return this.web3.eth.personal.sign(
      this.web3.utils.utf8ToHex(msg) as string,
      addr,
      "123"
    );
  }
 
  setApprovalForAll(addr: string, toAddr: string, isApprova: boolean) {
    this.verification("NFT");
    return this.contract.NFT?.methods
      .setApprovalForAll(toAddr, isApprova)
      .send({ from: addr, gasPrice: "5000000000" });
  }
 
  isApprovedForAll(addr: string, toAddr: string) {
    this.verification("NFT");
    return this.contract.NFT?.methods
      .isApprovedForAll(addr, toAddr)
      .call({ from: addr });
  }
 
  bound(addr: string) {
    this.verification("Entrance");
    return this.contract.Entrance?.methods.bound(addr).call({ from: addr });
  } 
  boundReferer(addr: string, toAddr: string) {
    this.verification("Entrance");
    return this.contract.Entrance?.methods
      .boundReferer(toAddr)
      .send({ from: addr, gasPrice: "5000000000" });
  }
  withdrawReward(addr: string, data: string, contractName: string = "Ido") {
    this.verification(contractName);
    let obj = new this.web3.eth.Contract(
      abiObj[contractName],
      contractAddress[contractName]
    );
    return obj?.methods.withdrawReward(data).send({
      from: addr,
      gasPrice: "5000000000",
      value: Web3.utils.toWei(mathRandom),
    });
  }
  withdrawReward1(addr: string, contractName: string) {
    this.verification(contractName);
    let obj = new this.web3.eth.Contract(
      abiObj[contractName],
      contractAddress[contractName]
    );
    return obj?.methods.withdraw().send({ from: addr, gasPrice: "5000000000" });
  }
 
  unStake(addr: string) {
    this.verification("Quantification");
    console.log(this.contract.Quantification);

    return this.contract.Quantification?.methods
      .unStake()
      .send({ from: addr, gasPrice: "5000000000" });
  }
 
  stakeNFT(addr: string, id: any) {
    let Contract = new this.web3.eth.Contract(
      abiObj.Stake,
      contractAddress.Stake
    );
    console.log(id);

    return Contract.methods
      .stake(contractAddress.PassNft, id)
      .send({ from: addr, gasPrice: "5000000000" });
  } 
  unStakeNFT(addr: string, data: any) {
    let Contract = new this.web3.eth.Contract(
      abiObj.Stake,
      contractAddress.Stake
    );
    // console.log(contractAddress.Market,tokenId)
    return Contract?.methods
      .unstake(data)
      .send({ from: addr, gasPrice: "5000000000" });
  }

  approveMarket(addr: string, addr721: string) {
    let Contract = new this.web3.eth.Contract(abiObj.PassNft, addr721);
    // console.log(contractAddress.Market,tokenId)
    return Contract.methods
      .setApprovalForAll(contractAddress.Stake, true)
      .send({ from: addr, gasPrice: "5000000000" });
  } 
  getapproveMarket(addr: string, addr721: string) {
    let Contract = new this.web3.eth.Contract(abiObj.PassNft, addr721);
    return Contract.methods
      .isApprovedForAll(addr, contractAddress.Stake)
      .call({ from: addr });
  }
 
  claimRewards(addr?: any) {
    let Contract = new this.web3.eth.Contract(abiObj.Ido, contractAddress.Ido);
    console.info("Contracts withdrawReward");
    console.info(Contract.methods); 
  }

  maxIdoTokenNum(addr: string) {
    this.verification("Ido");
    console.log(this.contract.Ido);

    return this.contract.Ido?.methods.maxIdoTokenNum().call({ from: addr });
  }
  currentIdoTokenNum(addr: string) {
    this.verification("Ido");
    console.log(this.contract.Ido);

    return this.contract.Ido?.methods.currentIdoTokenNum().call({ from: addr });
  }

  buyIdo(addr: string, amount: string) {
    this.verification("Ido");
    console.log(this.contract.Ido);
    var amounted = Web3.utils.toWei(amount + "", "ether");

    return this.contract.Ido?.methods
      .buyIdo(amounted)
      .send({ from: addr, gasPrice: "5000000000" });
  }
  userinfos(addr: string) {
    this.verification("Ido");

    return this.contract.Ido?.methods?.userInfos(addr).call({ from: addr });
  }

  ClaimIdoTokenBep(addr: string, contractName: string = "Ido") {
    this.verification(contractName);
    return this.contract.Ido?.methods.claimIdoToken().call();
  }

  async isContract(address: string) { 
    return '111' 
  }

  // meme createToken
  async createToken(addr: any, tokenId: any, name: string, symbol: string, buyAmount: string, salt: any) {
    this.verification2("Meme"); 

    let estimateGas = await this.contract.Meme?.methods
      .createToken(tokenId, name, symbol, salt).estimateGas({
        from: addr,
        gasPrice: await this.handleGetGasPrice(),
        value: Web3.utils.toWei(JSON.stringify(Number(buyAmount) + Number(getChainConfig().createTokenFee))),
    })+100000 

    console.info('estimateGas：'+estimateGas);

    console.info(Web3.utils.toWei(JSON.stringify(Number(buyAmount) + Number(getChainConfig().createTokenFee))))
    return this.contract.Meme?.methods
      .createToken(tokenId, name, symbol, salt)
      .send({
        from: addr, 
        gasLimit: estimateGas,
        gasPrice: await this.handleGetGasPrice(),
        value: Web3.utils.toWei(JSON.stringify(Number(buyAmount) + Number(getChainConfig().createTokenFee)))
      });
  }
  // meme2
  async createToken2(addr: any, tokenId: string, name: string, symbol: string, buyAmount: string) {
    this.verification("Meme2");
    console.log(this.contract.Meme2?.methods);

    console.log(Web3.utils.toWei(JSON.stringify(Number(buyAmount) + Number(getChainConfig().createTokenFee))))
    debugger
    return this.contract.Meme2?.methods
      .createToken(tokenId, name, symbol)
      .send({
        from: addr,
        gasPrice: await this.handleGetGasPrice(),
        // value: Web3.utils.toWei(JSON.stringify(Number(mathRandom) + Number(buyAmount)))
        value: Web3.utils.toWei(JSON.stringify(Number(buyAmount) + Number(getChainConfig().createTokenFee)))
      });
  }
  // SwapTokenNum
  async getSwapTokenNum(tokenIn: string, tokenInAmount: any, tokenOut: string) { 
    this.verification2("Meme");
     
    return this.contract.Meme?.methods.getAmountOut(tokenIn, tokenInAmount, tokenOut).call();
  }
  // SwapTokenNum2
  async getSwapTokenNum2(tokenIn: string, tokenInAmount: any, tokenOut: string) { 
    this.verification("Meme2");
    return this.contract.Meme2?.methods.getAmountOut(tokenIn, tokenInAmount, tokenOut).call();
  }
  // buyToken
  async buyToken(addr: any, amount: any, account: any, slippage: any) { 
    this.verification2("Meme"); 
    let estimateGas = await this.contract.Meme?.methods
    .buy(addr, slippage,0).estimateGas({
      from: account,
      gasPrice: await this.handleGetGasPrice(),
      value: amount,
    })+100000 

    return this.contract.Meme?.methods
      .buy(addr, slippage,0)
      .send({
        from: account,
        value: amount,
        gasLimit: estimateGas,
        gasPrice: await this.handleGetGasPrice(),
      })
  } 
  async buyToken2(addr: any, amount: any, account: any, slippage: any, insurancePurchase: boolean) { 
    this.verification("Meme2");
    return this.contract.Meme2?.methods
      .buy(addr, slippage,0, insurancePurchase)
      .send({
        from: account,
        value: amount,
        gasPrice: await this.handleGetGasPrice(),
      })
  } 
  async sellToken(addr: any, amount: any, account: any, slippage: any) {  
    let estimateGas = await this.contract.Meme?.methods
    .sell(addr, amount, slippage,0).estimateGas({
      from: account,
      value: 0, 
      gasPrice: await this.handleGetGasPrice(),
    })+100000 

    this.verification2("Meme");
    return this.contract.Meme?.methods
      .sell(addr, amount, slippage,0)
      .send({
        from: account,
        value: 0,
        gasLimit: estimateGas,
        gasPrice: await this.handleGetGasPrice(),
      })
  } 
  async sellToken2(addr: any, amount: any, account: any, slippage: any) {
    console.log(addr, amount, account)
    this.verification("Meme2");
    return this.contract.Meme2?.methods
      .sell(addr, amount, slippage,0)
      .send({
        from: account,
        value: 0,
        gasPrice: await this.handleGetGasPrice(),
      })
  } 
  async claimToken(addr: any, account: any) {
    this.verification("InsurancePool");
    return this.contract.InsurancePool?.methods
      .withdrawReward(addr)
      .send({
        from: account, 
        gasPrice: await this.handleGetGasPrice(),
      })
  } 
  getRemainTokenNum(tokenAdd: string) {
    this.verification("Meme");
    return this.contract.Meme?.methods.getLastBuyAmount(tokenAdd).call();
  }
 
  async Deposit(addr: any, depositAmount: any, destinationChainId: any) {     
    this.verification3("BridgeAddress"); 
    let estimateGas = await this.contract.BridgeAddress?.methods
    .deposit(destinationChainId).estimateGas({
      from: addr,
      value: Web3.utils.toWei(depositAmount),
      gasPrice: await this.handleGetGasPrice(),
    })+100000 

    return this.contract.BridgeAddress?.methods
      .deposit(destinationChainId)
      .send({
        from: addr,
        value: Web3.utils.toWei(depositAmount),
        gasLimit: estimateGas,
        gasPrice: await this.handleGetGasPrice(),
      })
  } 
  async getSwapMinDepositAmount( ) {  
    this.verification3("BridgeAddress"); 

    return this.contract.BridgeAddress?.methods.minDepositAmount().call();
  }
   
  async handleGetGasPrice() {
    if (!window?.ethereum) {
      return '6500000000'
    }
    try{
      const _isBSC = getChainConfig().isBSC
      const _isBase = getChainConfig().isBase
      const _isXLayer = getChainConfig().isXLayer 
      const _web3 = new Web3( 
        _isBSC ? 
        (isMain ? customNetwork_BSC?.rpcUrls?.default?.http[0] : 
          customNetwork_BSC_TEST?.rpcUrls?.default?.http[0])
        :
        _isXLayer ?
          (isMain ? customNetwork_xLayer?.rpcUrls?.default?.http[0] : 
            customNetwork_xLayer_TEST?.rpcUrls?.default?.http[0]) :
            _isBase ?
          (isMain ? customNetwork_Base?.rpcUrls?.default?.http[0] : 
            customNetwork_Base_TEST?.rpcUrls?.default?.http[0]) :
          (isMain ? customNetwork_SEI?.rpcUrls?.default?.http[0] : 
            customNetwork_SEI_TEST?.rpcUrls?.default?.http[0])
        )
      
      const gasPrice1 = await _web3.eth.getGasPrice()
      const gasPrice2 = Number(gasPrice1) * 1.2
      console.info("gasPrice2:",gasPrice2)
      return Math.floor(gasPrice2)
    } catch (error) {
      return '6500000000'
    }
  } 
 
  async listBannerUp(account: any, caAddress: any, hashId: any) { 
    debugger
    this.verification("MemeBanFee");
    return this.contract.MemeBanFee?.methods
      .listBanner(caAddress, hashId)
      .send({ 
        from: account,
        value: isMain ? 100000000000000000000 : 10000000000000000000,
        gasPrice: await this.handleGetGasPrice(),
      })
  } 
}
