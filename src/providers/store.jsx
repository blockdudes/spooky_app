import React, { createContext, useEffect, useRef, useState } from "react";
import "react-native-get-random-values"
import "@ethersproject/shims"
import { ethers } from "ethers";
import axios from "axios"

export const ContextApi = createContext();


export const supportedTokens=[
  {
    name:"Ethereum",
    symbol:"ETH",
    logo:"https://logowik.com/content/uploads/images/ethereum3649.jpg",
  },
  {
    name:"Aave GHO",
    symbol:"GHO",
    logo:"https://d23exngyjlavgo.cloudfront.net/0x1_0x40d16fc0246ad3160ccc09b8d0d3a2cd28ae6c2f",
  }
]

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(10);
  const [borrowModalVisible,setBorrowModalVisible] = useState(false);
  const [selectedPayToken,setSelectedPayToken] = useState(supportedTokens[0]);
  const [selectedRecieveToken,setSelectedRecieveToken] = useState(supportedTokens[1]);
  const [selectedLendToken,setSelectedLendToken] = useState(supportedTokens[0]);
  const [selectedSendToken,setSelectedSendToken] = useState(supportedTokens[0]);
  const [selectedRepayToken,setSelectedRepayToken] = useState(supportedTokens[0]);
  const [activeTask,setActiveTask]=useState('')
  const [createWalletLoading,setCreateWalletLoading] = useState(false)
  const [ethPrice,setEthPrice] = useState(0)
  const[ghoPrice,setGhoPrice] = useState(0)
  const [sendTokenData,setSendTokenData] = useState({
    amount:"0",
    tokenName:selectedSendToken.symbol,
    sendTo:""
  })
  const [swapData,setSwapData] = useState({
    amountToPay:"0",
    amountToReceive:"0",
    payToken:selectedPayToken.symbol,
    receiveToken:selectedRecieveToken.symbol
  })

  const [lendData,setLendData] = useState({
    amount:"0",
    tokenName:selectedLendToken.symbol,
    optionalAddress:""
  })

  const [userWalletData,setUserWalletData]=useState({
    publicAddress:"",
    privateKey:""

  })
  const [repayData,setRepayData] = useState({
    amount:"0",
    tokenName:selectedRepayToken.symbol
  })

  const panelRef = useRef(null);

  useEffect(()=>{
    const getGhoPrice = async () => {
      const {data}=await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=gho&vs_currencies=usd",{
          headers:{
            "Content-Type":"application/json",
            "x_cg_api_key":"CG-UwDPzT2FrFXbPgvA51BF9uiW"
          }
        })
        console.log(data)
        setGhoPrice(data.gho.usd)
    }
    getGhoPrice()
    

    
    
  },[])

  useEffect(()=>{
    const getEthPrice = async () => {
      const {data}=await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",{
          headers:{
            "Content-Type":"application/json",
            "x_cg_api_key":"CG-UwDPzT2FrFXbPgvA51BF9uiW"
          }
        })
        console.log(data)
        setEthPrice(data.ethereum.usd)
    }
    getEthPrice()
    
  },[])


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
      ghoPrice
      
      }}>
      {children}
    </ContextApi.Provider>
  );
};

export default AppProvider;
