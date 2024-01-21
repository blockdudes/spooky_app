import React, { createContext, useEffect, useRef, useState } from "react";
import "react-native-get-random-values"
import "@ethersproject/shims"
import { ethers } from "ethers";
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { provider } from "../utils/contracts";
import { ghoToken, routerAddress, ghoDebtToken } from "../utils/contracts";
import { GHO_ABI } from "../Abis/gho_token_abi";
import { UNISWAP_ROUTER_ABI } from "../Abis/uniswap_v2_router";
import { GHO_DEPT_TOKEN_ABI } from "../Abis/gho_debtToken_abi";
export const ContextApi = createContext();


export const supportedTokens = [
  {
    name: "Ethereum",
    symbol: "ETH",
    logo: "https://logowik.com/content/uploads/images/ethereum3649.jpg",
  },
  {
    name: "Aave GHO",
    symbol: "GHO",
    logo: "https://d23exngyjlavgo.cloudfront.net/0x1_0x40d16fc0246ad3160ccc09b8d0d3a2cd28ae6c2f",
  }
]

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(10);
  const [borrowModalVisible, setBorrowModalVisible] = useState(false);
  const [selectedPayToken, setSelectedPayToken] = useState(supportedTokens[0]);
  const [selectedRecieveToken, setSelectedRecieveToken] = useState(supportedTokens[1]);
  const [selectedLendToken, setSelectedLendToken] = useState(supportedTokens[1]);
  const [selectedSendToken, setSelectedSendToken] = useState(supportedTokens[0]);
  const [selectedRepayToken, setSelectedRepayToken] = useState(supportedTokens[0]);
  const [activeTask, setActiveTask] = useState('')
  const [createWalletLoading, setCreateWalletLoading] = useState(false)
  const [ethPrice, setEthPrice] = useState(0)
  const [signer, setSigner] = useState(null)
  const [ghoPrice, setGhoPrice] = useState(0)
  const [ghoPriceEth, setGhoPriceEth] = useState(0)
  const ghoContract = new ethers.Contract(ghoToken, GHO_ABI, signer);
  const ghoDebtContract = new ethers.Contract(ghoDebtToken, GHO_DEPT_TOKEN_ABI, signer)
  const routerContract = new ethers.Contract(routerAddress, UNISWAP_ROUTER_ABI, signer);
  const [sendTokenData, setSendTokenData] = useState({
    amount: "0",
    tokenName: selectedSendToken.symbol,
    sendTo: ""
  })
  const [currBorrowData, setCurrBorrowData] = useState({
    lender: "",
    amount: ""
  })


  const [swapData, setSwapData] = useState({
    amountToPay: "0",
    amountToReceive: "0",
    payToken: selectedPayToken.symbol,
    receiveToken: selectedRecieveToken.symbol
  })

  const [lendData, setLendData] = useState({
    amount: "0",
    tokenName: selectedLendToken.symbol,
    optionalAddress: ""
  })

  const [userWalletData, setUserWalletData] = useState({
    publicAddress: "",
    privateKey: ""

  })
  const [repayData, setRepayData] = useState({
    amount: "0",
    tokenName: selectedRepayToken.symbol
  })
  const [creditData, setCreditData] = useState({
    amount: "0",
    delegeteeAddress: ""
  })

  const panelRef = useRef(null);

  const getSigner = async () => {
    const wallet_data = JSON.parse(await AsyncStorage.getItem('walletData'));
    console.log("walletData--->", wallet_data)
    const signer = new ethers.Wallet(wallet_data.privateKey, provider);
    setSigner(signer)
    setUserWalletData(wallet_data)
  }
  console.log("pub key", userWalletData.publicAddress)

  useEffect(() => {
    getSigner()
  }, [])


  useEffect(() => {
    const getGhoPrice = async () => {


      const { data } = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=gho&vs_currencies=usd", {
        headers: {
          "Content-Type": "application/json",
          "x_cg_api_key": "CG-UwDPzT2FrFXbPgvA51BF9uiW"
        }
      })

        setGhoPrice(Number(data.gho.usd).toFixed(2))

    }

    getGhoPrice()




  }, [])


  useEffect(() => {
    const getEthPrice = async () => {
      const { data } = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd", {
        headers: {
          "Content-Type": "application/json",
          "x_cg_api_key": "CG-UwDPzT2FrFXbPgvA51BF9uiW"
        }
      })
      setEthPrice(Number(data.ethereum.usd).toFixed(2))

    }
    getEthPrice()

  }, [])

  useEffect(() => {
    const getGhoPriceEth = async () => {
      const { data } = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=gho&vs_currencies=eth", {
        headers: {
          "Content-Type": "application/json",
          "x_cg_api_key": "CG-UwDPzT2FrFXbPgvA51BF9uiW"
        }
      })
      console.log("newPrice--->", data)
        setGhoPriceEth(Number(data.gho.eth).toFixed(4))
    }
    getGhoPriceEth()

  }, [])


  return (
    <ContextApi.Provider value={{
      user,
      setUser,
      borrowModalVisible,
      setBorrowModalVisible,
      selectedPayToken,
      setSelectedPayToken,
      selectedRecieveToken,
      setSelectedRecieveToken,
      activeTask,
      setActiveTask,
      selectedLendToken,
      setSelectedLendToken,
      panelRef,
      selectedSendToken,
      setSelectedSendToken,
      sendTokenData,
      setSendTokenData,
      swapData,
      setSwapData,
      createWalletLoading,
      setCreateWalletLoading,
      userWalletData,
      setUserWalletData,
      lendData,
      setLendData,
      selectedRepayToken,
      setSelectedRepayToken,
      repayData,
      setRepayData,
      ethPrice,
      ghoPrice,
      signer,
      setSigner,
      ghoContract,
      routerContract,
      creditData,
      setCreditData,
      ghoPriceEth,
      ghoDebtContract,
      currBorrowData, 
      setCurrBorrowData

    }}>
      {children}
    </ContextApi.Provider>
  );
};

export default AppProvider;
