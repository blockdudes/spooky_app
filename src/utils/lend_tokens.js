import { pool } from "./contracts";
const { BigNumber } = require('ethers')
import { submitTransaction } from "./contracts";
import { setBorrowList, setTX } from "./setter";


export async function supply(user, amountSupply, signer, onBehalfOf, ghoAmount) {


  const txs = await pool.supply({
    user,
    reserve: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", // Goerli GHO market
    amount: amountSupply,
    onBehalfOf: onBehalfOf || user
    //   onBehalfOf: "0x16a6928Ce447Caa3b721FEb15Af06e5873BA5B78"
    // undefined,
    // referralCode,
  });
  // const extendedTxData = await txs[0].tx();
  // console.log(extendedTxData)
  for (const tx of txs) {
    await submitTransaction({ tx: tx }, signer)
  }

  // await setData('borrowList', onBehalfOf || user, data);
      //set data to backend
        await setTX(
          signer.address,
          "Lend",
          signer.address,
          "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
          ghoAmount
      ) 

      await setBorrowList(
        // signer.address,
        onBehalfOf || user,
        signer.address,
        ghoAmount
      )

}


export async function approveCreditDelegation(ghoDebtContract, signer, delegatee, amount) {
  const tx = await ghoDebtContract.connect(signer).approveDelegation(
    delegatee,
    amount
  )
  console.log(tx)
}


