import React, {useEffect, useState} from "react";
import {ethers} from "ethers";
import './App.css';

const App = () => {

  /*
  *just a state variable we use to store our user's public wallet"
  */
const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    try {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }
  
    const accounts = await ethereum.request({method: "eth_accounts"});

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account)
    } else {
      console.log("No authorized account found")
    }
  } catch (error) {
    console.log(error);
  }
}

const connectWallet = async () => {
  try {
    const {ethereum} = window;
    if (!ethereum) {
      alert("Get MetaMask");
      return;
    }

    const wave = async () => {
      try {
        const {ethereum} = window;
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

          let count = await wavePortalContract.getTotalWaves();
          console.log("Retrieved total wave count...", count.toNumber());
        } else {
          console.log("Ethereum object doesn't exist!");
        }
        } catch (error) {
          console.log(error);
        }
    }

    const accounts = await ethereum.request({method: "eth_requestAccounts"});
    console.log("Connected", accounts[0]);
    setCurrentAccount(accounts[0]);
  } catch (error) {
    console.log(error)
  }
  }

  useEffect (() => {
    checkIfWalletIsConnected();
  }, [])
    
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        👋 Hey there!
        </div>

        <div className="bio">
        I am Jolade and I am a solidity developer, that's pretty cool right? Connect your Ethereum wallet and wave at me!
        </div>

        <button className="waveButton" onClick={null}>
          Wave at Me
        </button>

        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}

export default App