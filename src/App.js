import React, {useEffect, useState} from "react";
import {ethers} from "ethers";
import './App.css';
import abi from "./utils/WavePortal.json";

const App = () => {

const [currentAccount, setCurrentAccount] = useState("");

const [allWaves, setAllWaves] = useState([]);
const contractAddress = "0xe83Be76289C8310E30e29DCBb6322E8921d7322D";

const getAllWaves = async () => {
  try {
    const {ethereum} = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

      const waves = await wavePortalContract.getAllWaves();

      let wavesCleaned = [];
      waves.forEach(wave => {
        wavesCleaned.push({
          address: wave.waver,
          timestamp: new Date(wave.timestamp * 1000),
          message: wave.message
        });
      });

      setAllWaves(wavesCleaned);
    } else {
      console.log("Ethereum object doesn't exist!")
    }
  } catch (error) {
    console.log(error);
  }
}

const contractABI = abi.abi;

  const checkIfWalletIsConnected = async () => {
    try {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return getAllWaves;
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

    const accounts = await ethereum.request({method: "eth_requestAccounts"});
    console.log("Connected", accounts[0]);
    setCurrentAccount(accounts[0]);
  } catch (error) {
    console.log(error)
  }
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
        
        const waveTxn = await wavePortalContract.wave("this is a message");
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined --", waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
        
        } else {
          console.log("Ethereum object doesn't exist!");
        }
        } catch (error) {
          console.log(error);
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
        I am Jolade and I am a solidity developer, that's pretty cool right? Connect your Ethereum wallet and wave at me! <br />
        Please ensure your Metamask wallet is on Rinkeby Test Network.
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>

        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}

        {allWaves.map((wave, index) => {
          return (
            <div key={index} style={{backgroundColor: "OldLace", marginTop: "16px", padding: "8px" }}>
              <div>Address: {wave.address}</div>
              <div>Time: {wave.timestamp.toString()}</div>
              <div>Message: {wave.message}</div>
            </div>)
        })}
        <div className="text">
          <form action="" id="foom">
        <textarea placeholder="Start typing your message..." name="message" id="message" cols="30" rows="10"></textarea>

          <button className="sumbtn" type="submit" onClick= "submit">Submit</button>
          </form>
        </div>
      </div>
     
    </div>
    
  );
}

export default App