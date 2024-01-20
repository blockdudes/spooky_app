const {  InterestRate } = require('@aave/contract-helpers')
import { pool } from "./contracts";
import { submitTransaction } from "./contracts";


export const repayTx = async (user, amount, signer)=> {
    const txs = await pool.repay({
      user: user,
      reserve: "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60", // Goerli GHO market
      amount: amount.toString(),
      interestRateMode: InterestRate.Variable,
      // onBehalfOf,
    });
  
    for (const tx of txs) {
      const txn=await submitTransaction({ tx: tx }, signer)
      console.log()
    }
  }