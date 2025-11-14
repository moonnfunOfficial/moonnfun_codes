import * as ethers from "ethers";
// import * as evm from "./evm.js"; 
import { provider } from "web3-core";

const c_contract_token_manage = "0x73eccD6288e117cAcA738BDAD4FEC51312166C1A"

function numberToBytes32Buffer(num) {
    const bigIntValue = BigInt(num); 
    const buf = Buffer.alloc(32);
    const hex = bigIntValue.toString(16).padStart(64, "0");
    buf.write(hex, "hex");
    return "0x" + buf.toString("hex");
  }

/**
 *  
 */
class SaltCalculator {
    constructor(factoryAddress, initCode) {
        this.factoryAddress = factoryAddress;
        this.initCode = initCode;  
    }

    /**
     *   CREATE2 address
     */
    computeCreate2Address(salt) {
        console.debug('salt', salt, "hexSalt", numberToBytes32Buffer(salt))
 
        const saltBytes = numberToBytes32Buffer(salt);

        const initCodeHash = ethers.keccak256(this.initCode);
 
        const create2Input = ethers.solidityPacked(
            ["bytes1", "address", "bytes32", "bytes32"],
            ["0xff", this.factoryAddress, saltBytes, initCodeHash]
        );

        const hash = ethers.keccak256(create2Input);
        return ethers.getAddress("0x" + hash.slice(-40));
    }

    /**
     *  
     */
    async findValidSalt(maxAttempts = 100000) { 

        const startTime = Date.now();
        const startSalt = Math.floor(Math.random() * 1000000);

        for (let i = 0; i < maxAttempts; i++) {
            const salt = startSalt + i;
            const address = this.computeCreate2Address(salt);

            if (address.toLowerCase().endsWith("888")) {
                const endTime = Date.now();
                const duration = (endTime - startTime) / 1000;
 

                return {
                    salt: salt,
                    address: address,
                    attempts: i + 1,
                    duration: duration,
                };
            }

            if ((i + 1) % 10000 === 0) {
                console.debug(`  ${i + 1} ...`);
            }
        }

        console.debug(`❌   ${maxAttempts} `);
        return null;
    }
}

export async function GetSalt(tokenId, name, symbol, contractAddress) {
    const TokenManage_V1_abi = [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "internalPool",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "symbol",
                    "type": "string"
                }
            ],
            "name": "getDeploymentParams",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "factory",
                    "type": "address"
                },
                {
                    "internalType": "bytes32",
                    "name": "bytecodeHash",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes",
                    "name": "initCode",
                    "type": "bytes"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
    ];
    const wallet = new ethers.Wallet("0x2e82ea28d06f7d47014196bf1cc6724cdb488295688a3d74bd8f7d5126301830", provider);
    const TokenManage_V1 = new ethers.Contract(c_contract_token_manage, TokenManage_V1_abi, wallet);

    console.debug(wallet, TokenManage_V1)
 
    const [factory, bytecodeHash, initCode] = await TokenManage_V1.getDeploymentParams(
        contractAddress,
        tokenId,  // tokenId
        name,     // name  
        symbol   // symbol
    );
    console.debug(factory, bytecodeHash, initCode)
 
    const calculator = new SaltCalculator(factory, initCode);

    try {  
        const result = await calculator.findValidSalt(100000);

        if (result) {
            return result.salt;
        }
    } catch (error) {
        return { 'Error': `${error}` };
    }
}