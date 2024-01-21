const { ethers } = require('ethers');
const {sponser, provider} = require('./contracts')
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

async function sendEth(signer, to, amount) {
    
        const nonce = await provider.getTransactionCount(signer.getAddress())
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
        
        return receipt
    
}

async function sendGho(signer, ghoContract, to, amount) {
    console.log(API_URL)
    try {
        
        if ( !to || !amount) {
            throw new Error('All parameters must be provided');
        }

        const amountWei = ethers.utils.parseUnits(amount, 'ether'); // Adjust this if your token has a different number of decimals
        const deadline = Math.floor(Date.now() / 1000) + 60 * 60 * 24;  // 24 hours from now

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

        
        const response = await fetch(`${API_URL}/api/sponserGas`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              signerAddress: signer.address,
              amountWei,
              deadline,
              v,
              r,
              s,
              gasPrice,
              to
            })
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const receipt = await response.json();
          return receipt;

        // // Permit the sponser to spend tokens on behalf of the signer
        // const permit = await ghoContract.connect(sponser).permit(
        //     signer.address,
        //     sponser.address,
        //     amountWei,
        //     deadline,
        //     v,
        //     r,
        //     s, {
        //     gasPrice: gasPrice,
        //     gasLimit: 80000 //hardcoded gas limit; change if needed
        // }
        // );
        // console.log(permit)
        // await permit.wait(2) //wait 2 blocks after tx is confirmed

        // // Now the provider can send the transaction
        // console.log("permit given to",sponser.address,"to pay gas fees of our token transfer")
        // const transaction = {
        //     to: ghoContract.address,
        //     data: ghoContract.interface.encodeFunctionData('transferFrom', [signer.address, to, amountWei]),
        //     gasLimit: 80000,
        //     gasPrice
        // };
        // console.log("enter")

        // const tx = await sponser.sendTransaction(transaction);
        // const receipt = await tx.wait();
        // console.log(`Transaction executed with hash: ${receipt.transactionHash}`);
        
        // return receipt;
    } catch (error) {
        console.error("Error sending GHO:", error);
    }
}

export { sendEth, sendGho }