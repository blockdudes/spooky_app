import ethers from 'ethers';
import { submitTransaction } from "./contracts";
import { supply } from './lend_tokens';
import { borrow } from './borrow_token';
export async function stablizeTokens(user, amountSupply, amountToBorrow, signer) {

      const txn1 = await supply(user, amountSupply, signer);
      console.log(txn1)
      const txn2 = await borrow(user, amountToBorrow, signer);
      console.log(txn2)
      await setTX(
            signer.address,
            "stablizeTokens",
            signer.address,
            signer.address,
            amountToBorrow
        )
    
      
}