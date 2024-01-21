const { Pool, InterestRate } = require('@aave/contract-helpers')
const { ethers } = require('ethers');
const { BigNumber } = require('ethers')
const { GHO_ABI } = require('./Abis/gho_token_abi');
const { GHO_DEPT_TOKEN_ABI } = require('./Abis/gho_debtToken_abi');
const { UNISWAP_ROUTER_ABI } = require('./Abis/uniswap_v2_router');
const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/JNgaZvSjgBZOpigPGkLeXEBlYf820_pA');
// const provider = new ethers.providers.JsonRpcProvider( "https://sepolia.infura.io/v3/e78ee7de61cc472aa36de5c2e4b8f2f6");

const pool = new Pool(provider, {
  //   POOL: "0x5b071b590a59395fE4025A0Ccc1FcC931AAc1830", // Goerli GHO market
  POOL: "0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951", // Goerli GHO market
  WETH_GATEWAY: "0x387d311e47e80b498169e6fb51d3193167d89F7D", // Goerli GHO market
});


const pKey = '78ea240e56ccb359b1215afa98f37d8d95d4d06647632ba87e69438293e95ecf'
const user = '0x8962752Cea41a6fad429372398c947B7F2002085'

const sponser_pvt_key = '5ad6146d0367cc217062c917f14b8c5b95322a67f50b106645bf4034a88dfde3'
const sponser_address = '0x3f6A340e002022a0a13Cd89E07c7209b3E2CB577'

const interestRateMode = InterestRate.Variable
const amountBorrow = '2.5'
const amountSupply = '0.01'

const signer = new ethers.Wallet(pKey, provider);
const sponser = new ethers.Wallet(sponser_pvt_key, provider);


const ghoToken = "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60";
const ghoContract = new ethers.Contract(ghoToken, GHO_ABI, signer);


const ghoDebtToken = "0x67ae46EF043F7A4508BD1d6B94DB6c33F0915844";
const ghoDebtContract = new ethers.Contract(ghoDebtToken, GHO_DEPT_TOKEN_ABI, signer);

const routerAddress = "0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008";
const routerContract = new ethers.Contract(routerAddress, UNISWAP_ROUTER_ABI, signer);

const wethAddress = "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9";

export async function submitTransaction({
  tx
}) {
  const extendedTxData = await tx.tx();
  const { from, ...txData } = extendedTxData;
  const txResponse = await signer.sendTransaction({
    ...txData,
    value: txData.value ? BigNumber.from(txData.value) : undefined

  });
  console.log(txResponse)
  await txResponse.wait(1)
}

async function sendEth(signer, provider, to, amount) {
  try {
    const nonce = await provider.getTransactionCount(signer.getAddress())
    // Estimate gas limit before creating the transaction object
    const gasPrice = await signer.getGasPrice()
    const gasLimit = await signer.estimateGas({
      to,
      value: ethers.utils.parseEther(amount),
    });

    const transaction = {
      to,
      value: ethers.utils.parseEther(amount),
      gasLimit,
      nonce,
      gasPrice
    };

    const tx = await signer.sendTransaction(transaction);
    const receipt = await tx.wait();
    console.log(`Transaction hash: ${receipt.transactionHash}`);

    //set data to backend
    const data = {
      type:"sendEth",
      from:signer.address,
      to,
      amount,
    }

    return receipt
  } catch (error) {
    console.error("Error sending ETH:", error);
  }
}

async function sendGho(signer, provider, to, amount) {
  try {


    const amountWei = ethers.utils.parseUnits(amount, 'ether'); // Adjust this if your token has a different number of decimals
        // const deadline = Math.floor(Date.now() / 1000) + 60 * 60 * 24; // 24 hours from now
        const deadline = 1705668153 ; // 24 hours from now

        const gasPrice = await provider.getGasPrice();
        const nonce = await ghoContract.nonces(signer.address);

        // Define the EIP-712 type data
        const domain = {
          name: await ghoContract.name(),
          version: '1',
          chainId: (await provider.getNetwork()).chainId,
          verifyingContract: ghoContract.address
        };

        const types = {
          Permit: [{
            name: "owner",
            type: "address"
          },
          {
            name: "spender",
            type: "address"
          },
          {
            name: "value",
            type: "uint256"
          },
          {
            name: "nonce",
            type: "uint256"
          },
          {
            name: "deadline",
            type: "uint256"
          },
          ],
        };

        const value = {
          owner: signer.address.toLowerCase(),
          spender: sponser.address.toLowerCase(),
          value: amountWei,
          nonce: nonce,
          deadline,
        };

        // Sign the EIP-712 type data
        const signature = await signer._signTypedData(domain, types, value);
        const { v, r, s } = ethers.utils.splitSignature(signature);


    //     const signature = {
    //       v: 27,
    //       r: "0xc8210e0910749aa42c690736d182d3ab463c9ae4103366918028d4adfdef5a81",
    //       s: "0x4eb08671493b7c9505f493d80b17536dc04d5b041817ce7d4b4f70ca1997703a"
    //     };
    //     {
    // }

    //     const checkk = ethers.utils.verifyTypedData(domain, types, value, signature);
    //     console.log(`Recovered signer: ${checkk}`);


        // Permit the contract to spend tokens on behalf of the signer
        const permit = await ghoContract.connect(sponser).permit(
          signer.address,
          sponser.address,
          amountWei,
          deadline,
          v,
          r,
          s, {
          gasPrice: gasPrice,
          gasLimit: 80000 //hardcoded gas limit; change if needed
        }
        );

        // await permit.wait(2) //wait 2 blocks after tx is confirmed
        console.log(permit)




    // Now the provider can send the transaction
    // const gasLimit = await provider.estimateGas({
    //   to: ghoContract.address,
    //   data: ghoContract.interface.encodeFunctionData('transferFrom', [signer.address, to, amountWei]),
    // });

    const transaction = {
      to: ghoContract.address,
      data: ghoContract.interface.encodeFunctionData('transferFrom', [signer.address, to, amountWei]),
      gasLimit: 80000,
      gasPrice
    };

    const tx = await sponser.sendTransaction(transaction);
    const receipt = await tx.wait();
    console.log(`Transaction hash: ${receipt.transactionHash}`);

    //set data to backend
    const data = {
      type:"sendGho",
      from:signer.address,
      to,
      amount,
    }

    return receipt;
  } catch (error) {
    console.error("Error sending GHO:", error);
  }
}


async function checkAllowance() {
  const check = await ghoContract.allowance(signer.address, sponser_address)
  console.log(check)

}
// async function supply() {
//   const txs = await pool.supply({
//     user,
//     reserve: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", // Goerli GHO market
//     amount: amountSupply,
//     // onBehalfOf: "0x16a6928Ce447Caa3b721FEb15Af06e5873BA5B78"
//     // undefined,
//     // referralCode,
//   });
//   // const extendedTxData = await txs[0].tx();
//   // console.log(extendedTxData)
//   for (const tx of txs) {
//     await submitTransaction({ tx: tx })
//   }
// }

// async function supply() {
//   const amountToApprove = ethers.utils.parseUnits('0.01', 18); // The amount you want to approve for supplying

//   // try {
//   //   const approvalTx = await ghoContract.approve("0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951", amountToApprove);
//   //   await approvalTx.wait();
//   //   console.log(approvalTx)
//   // } catch (error) {
//   //   console.error('Approval transaction failed:', error);
//   //   return;
//   // }


//   const txs = await pool.supply({
//     user,
//     reserve: "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60", // Goerli GHO market
//     amount: "0.001",
//     // onBehalfOf: "0x16a6928Ce447Caa3b721FEb15Af06e5873BA5B78"
//     // undefined,
//     // referralCode,
//   });
//   // const extendedTxData = await txs[0].tx();
//   // console.log(extendedTxData)
//   for (const tx of txs) {
//     await submitTransaction({ tx: tx })
//   }
// }


async function borrow() {
  const txs = await pool.borrow({
    user: sponser_address,
    reserve: "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60", // Goerli GHO market
    amount: "0.1",
    interestRateMode,
    debtTokenAddress: "0x67ae46EF043F7A4508BD1d6B94DB6c33F0915844", // Goerli GHO market
    onBehalfOf: user
    // undefined,
    // referralCode,
  });

  for (const tx of txs) {
    await submitTransaction({ tx: tx })
  }
}


async function repayTx() {
  const txs = await pool.repay({
    user: signer.address,
    reserve: "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60", // Goerli GHO market
    amount: "0.00000001",
    interestRateMode: InterestRate.Variable,
    // onBehalfOf,
  });

  for (const tx of txs) {
    await submitTransaction({ tx: tx })
  }
  const data ={
    type: "repay",
    from:signer.address,
    to:"0xc4bF5CbDaBE595361438F8c6a187bDc330539c60"
    amou
  }
}

async function repayWithPermit() {

  const deadlineInSeconds = Math.floor(Date.now() / 1000) + 60 * 60; // 1 hour from now
  console.log(deadlineInSeconds)

  // Generate payload to be signed by user
  // const data = await pool.signERC20Approval({
  //   user: "0x78777B174f4591330c354732935094250167C2AF",
  //   reserve: "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60",
  //   amount: "0.00000001",
  //   deadline: "1705564739",

  // })


  // const signature = await provider.send('eth_signTypedData_v4', [
  //   signer.address,
  //   dataToSign,
  // ]);

  // if (data) {
  //   const dataToSign = JSON.parse(data);

  //   const signature = await signer._signTypedData(
  //     dataToSign.domain,
  //     dataToSign.types,
  //     dataToSign.message
  //   );
  //   console.log(signature)
  // } else {
  //   console.error('dataToSign or dataToSign.types is undefined');
  // }

  const dataToSign = {
    types: {
      Permit: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' },
      ],
      Permit: [
        { name: 'owner', type: 'address' },
        { name: 'spender', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'nonce', type: 'uint256' },
      ],
    },
    primaryType: 'Permit',
    domain: {
      name: 'Gho Token',
      version: '1',
      chainId: 11155111,
      verifyingContract: "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60",
    },
    message: {
      owner: "0x78777B174f4591330c354732935094250167C2AF",
      spender: "0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951",
      value: "10000000000",
      nonce: 0,
      deadline: "1705564739",
    },
  };

  //  const signature = await provider.send('eth_signTypedData_v4', [
  //     signer.address,
  //     dataToSign,
  //   ]);


  const signatureString = await signer._signTypedData(
    dataToSign.domain,
    dataToSign.types,
    dataToSign.message
  );
  const r = '0x' + signatureString.slice(2, 66);
  const s = '0x' + signatureString.slice(66, 130);
  const v = parseInt(signatureString.slice(130, 132), 16);

  const signature = { r, s, v };


  /*
  - @param `user` The ethereum address that will make the deposit
  - @param `reserve` The ethereum address of the reserve
  - @param `amount` The amount to be deposited
  - @param `interestRateMode` // Whether stable (InterestRate.Stable) or variable (InterestRate.Variable) debt will be repaid
  - @param @optional `onBehalfOf` The ethereum address for which user is depositing. It will default to the user address
  */
  const txs = await pool.repayWithPermit({
    user: "0x78777B174f4591330c354732935094250167C2AF",
    reserve: '0xc4bF5CbDaBE595361438F8c6a187bDc330539c60', // Goerli GHO market
    amount: "0.00000001",
    interestRateMode: InterestRate.Variable,
    //  onBehalfOf: ,
    signature: signature,
  });

  const extendedTxData = await txs[0].tx();

  // for (const tx of txs) {
  //   await submitTransaction({ tx: tx })
  // }
}

async function approveCreditDelegation(delegatee, amount) {
  const tx = await ghoDebtContract.connect(signer).approveDelegation(
    delegatee,
    amount
  )
  console.log(tx)
}


async function addLiquidity() {
  const approveTx = await ghoContract.connect(signer).approve(routerAddress, ethers.utils.parseUnits('2.03', 18)); // 1 GHO
  await approveTx.wait();

  const addLiquidity = await routerContract.addLiquidityETH(
    ghoToken,
    ethers.utils.parseUnits('2.024', 18),
    ethers.utils.parseUnits('2', 18), // at least 1 GHO
    ethers.utils.parseUnits('0.00075', 18), // at least 0.1 ETH
    signer.address,
    Math.floor(Date.now() / 1000) + 60 * 20,
    { value: ethers.utils.parseUnits('0.0008', 18) }

  )
}

async function swapTokensForEth() {
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current time
  const path = [ghoToken, wethAddress]; // The token swap path from GHO to WETH
  const to = signer.address; // The address receiving the output ETH
  const amountInMax = ethers.utils.parseUnits('0.0001', 18); // The maximum amount of input tokens you are willing to spend
  const amountOut = ethers.utils.parseUnits('0.000000039', 18); // The exact amount of ETH you want to receive
  const spender = routerAddress; // The address of the contract that will spend the tokens (Uniswap router)



  try {
    const approvalTx = await ghoContract.approve(spender, amountInMax);
    await approvalTx.wait();
  } catch (error) {
    console.error('Approval transaction failed:', error);
    return;
  }

  const tx = await routerContract.swapTokensForExactETH(
    amountOut,
    amountInMax,
    path,
    to,
    deadline,
    { gasLimit: ethers.utils.hexlify(210000) } // Optional: limit the gas used
  );

  const receipt = await tx.wait();
  return receipt;
}

async function swapETHForExactTokens() {
  const amountOut = ethers.utils.parseUnits('0.0001', 18); // The exact amount of tokens you want to receive
  const path = [wethAddress, ghoToken]; // The token swap path from WETH to GHO
  const to = signer.address; // The address receiving the output tokens
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current time

  const tx = await routerContract.swapETHForExactTokens(
    amountOut,
    path,
    to,
    deadline,
    { value: ethers.utils.parseUnits('0.00000004', 18), gasLimit: ethers.utils.hexlify(610000) } // Optional: limit the gas used
  );

  console.log(tx)
  // const receipt = await tx.wait();
  // return receipt;
}



// function Calling

// supply()
// borrow()
// repayTx()
// repayWithPermit()
// sendEth(signer, provider, '0x55f33996C155aD2181F5CE604856b697e6b0C22a', '0.00001');
// sendGho(signer, provider, '0x55f33996C155aD2181F5CE604856b697e6b0C22a', '0.000002');
checkAllowance()
approveCreditDelegation(sponser_address,ethers.utils.parseEther("0.2"))
// addLiquidity()
// swapETHForExactTokens()
// swapTokensForEth()
