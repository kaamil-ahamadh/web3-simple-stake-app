import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import GlobalContext from "./context/GlobalContext";
import HomeScreen from "./screens/HomeScreen";
import connectWallet from "./utils/connectWallet";
import loadContract from "./utils/loadContract";
import Loading from "./components/Loading";

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);

  const [contracts, setContracts] = useState(null);
  const [userAmount, setUserAmount] = useState("");

  const [stknBalance, setStknBalance] = useState({
    wallet: null,
    staked: null,
    totalStaked: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleConnectWallet = async () => {
    const { _provider, _signer, _address, _balance, _chainId } =
      await connectWallet();

    loadContract(_signer, _chainId, setContracts);
    setProvider(_provider);
    setSigner(_signer);
    setAccount({
      address: _address,
      balance: _balance,
      chainId: _chainId,
    });
  };

  //HandleBalances
  const handleLoadBalance = async () => {
    if (contracts) {
      let _walletBalance = await contracts.token.balanceOf(account.address);
      _walletBalance = _walletBalance.toString();

      let _stakingBalance = await contracts.staking.stakedBalanceOf(
        account.address
      );
      _stakingBalance = _stakingBalance.toString();

      let _totalStaking = await contracts.staking.stakedTotal();
      _totalStaking = _totalStaking.toString();

      setStknBalance({
        wallet: ethers.utils.formatEther(_walletBalance),
        staked: ethers.utils.formatEther(_stakingBalance),
        totalStaked: ethers.utils.formatEther(_totalStaking),
      });
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        provider,
        setProvider,
        signer,
        setSigner,
        account,
        setAccount,
        contracts,
        setContracts,
        handleConnectWallet,
        userAmount,
        setUserAmount,
        stknBalance,
        setStknBalance,
        handleLoadBalance,
      }}
    >
      <div className="app-wrapper">
        {!loading ? <HomeScreen /> : <Loading />}
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
