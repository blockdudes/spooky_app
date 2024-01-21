import { routerAddress } from "./contracts";
import { ethers } from 'ethers';
import { ghoToken, wethAddress } from './contracts';
export async function swapTokensForEth(
  ghoContract,
  routerContract,
  amount_in_max,
  amount_out,
  to
) {
  // const amountInMax = ethers.utils.parseUnits('0.0001', 18); 
  // const amountOut = ethers.utils.parseUnits('0.000000039', 18); 
  const path = [ghoToken, wethAddress]; // The token swap path from GHO to WETH
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current time
  const amountInMax = ethers.utils.parseUnits(amount_in_max, 18); // The maximum amount of input tokens you are willing to spend
  const amountOut = ethers.utils.parseUnits(amount_out, 18);
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

  console.log(tx)
  const receipt = await tx.wait();
  return receipt;
}

export async function swapETHForExactTokens(
  routerContract,
  amountIn,
  amount_out,
  to
) {

  // const amountOut = ethers.utils.parseUnits('0.0001', 18); // The exact amount of tokens you want to receive
  const amountOut = ethers.utils.parseUnits(amount_out, 18); // The exact amount of tokens you want to receive
  // const to = signer.address; // The address receiving the output tokens
  const path = [wethAddress, ghoToken]; // The token swap path from WETH to GHO
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current time


  const tx = await routerContract.swapETHForExactTokens(
    amountOut,
    path,
    to,
    deadline,
    { value: ethers.utils.parseUnits(amountIn, 18), gasLimit: ethers.utils.hexlify(610000) } // Optional: limit the gas used
  );

  console.log(tx)
  const receipt = await tx.wait();
  return receipt;
}


export async function getOut(
  routerContract,
  amountIn,
  path
) {

  const tx = await routerContract.getAmountsOut(
    amountIn,
    path
  )
  return tx;

}