const { Pool, InterestRate } = require('@aave/contract-helpers')
const { ethers , BigNumber} = require('ethers');
const { GHO_ABI } = require('../Abis/gho_token_abi');
const { GHO_DEPT_TOKEN_ABI } = require('../Abis/gho_debtToken_abi');
const { UNISWAP_ROUTER_ABI } = require('../Abis/uniswap_v2_router');


const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/JNgaZvSjgBZOpigPGkLeXEBlYf820_pA');


const pool = new Pool(provider, {
    POOL: "0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951", // Goerli GHO market (on sepolia network)
    WETH_GATEWAY: "0x387d311e47e80b498169e6fb51d3193167d89F7D", // WETH_GATEWAY
});

const sponser_pvt_key = '58b0b8ee887bfd9ce2db2d4c5fb878f8d1ea0a4b4705d8b8e1883e0ab9306327'
const sponser_address = '0x7962eBE98550d53A3608f9caADaCe72ef30De68C'
const sponser = new ethers.Wallet(sponser_pvt_key, provider);



// const user_pvt_key = wallet_data?.privateKey;
// const user_address = wallet_data?.publicAddress;
// const signer = new ethers.Wallet(user_pvt_key, provider);
const ghoToken = "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60";
// const ghoContract = new ethers.Contract(ghoToken, GHO_ABI, signer);

const ghoDebtToken = "0x67ae46EF043F7A4508BD1d6B94DB6c33F0915844";
// const ghoDebtContract = new ethers.Contract(ghoDebtToken, GHO_DEPT_TOKEN_ABI, signer);

const routerAddress = "0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008";
// const routerContract = new ethers.Contract(routerAddress, UNISWAP_ROUTER_ABI, signer);

const wethAddress = "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9";

async function submitTransaction({
    tx
  },signer) {
    const extendedTxData = await tx.tx();
    const { from, ...txData } = extendedTxData;
    const txResponse = await signer.sendTransaction({
      ...txData,
      value: txData.value ? BigNumber.from(txData.value) : undefined
  
    });
    console.log(txResponse)
    await txResponse.wait(1)
  }


export { provider, sponser, pool, wethAddress, sponser_address, ghoToken, ghoDebtToken, routerAddress , submitTransaction}
