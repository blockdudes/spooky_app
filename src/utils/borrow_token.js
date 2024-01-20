const {  InterestRate } = require('@aave/contract-helpers')
import { pool } from "./contracts";
const { BigNumber } = require('ethers')
import { submitTransaction } from "./contracts";


export async function borrow(user, amountToBorrow, signer, onBehalfOf ) {
    const txs = await pool.borrow({
      user: user,
      reserve: "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60", // Goerli GHO market
      amount: amountToBorrow,
      interestRateMode: InterestRate.Variable,
      debtTokenAddress: "0x67ae46EF043F7A4508BD1d6B94DB6c33F0915844", // Goerli GHO market
      onBehalfOf: onBehalfOf || user
      // undefined,
      // referralCode,
    });
  
    for (const tx of txs) {
      const txn=await submitTransaction({ tx: tx }, signer)
      console.log(txn)
    }
  }

