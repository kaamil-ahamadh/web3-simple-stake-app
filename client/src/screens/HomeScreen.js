import React, { useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../components/Header";
import GlobalContext from "../context/GlobalContext";
import Balance from "../components/Balance";
import Staking from "../components/Staking";

const HomeScreen = () => {
  const { provider, account, handleConnectWallet, contracts } =
    useContext(GlobalContext);

  useEffect(() => {
    if (provider) {
      notify();
    }

    if (localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER")) {
      handleConnectWallet();
    }
  }, []);

  const notify = () => toast.success("Wallet Successfully Connected");
  return (
    <div className="screen-wrapper">
      <div>
        <Header
          provider={provider}
          account={account}
          handleConnectWallet={handleConnectWallet}
        />
        <div className="flex justify-center items-center h-full mt-24">
          <div className="">
            {!provider ? (
              <div className="card">
                <div className="flex flex-col justify-center items-center h-[370px] text-center">
                  Please, connect your wallet to see your Balance, Staking,
                  Unstaking.
                  <div className="btn mt-6" onClick={handleConnectWallet}>
                    Connect
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="card">
                  <Balance account={account} contracts={contracts} />
                </div>
                <div className="card">
                  <Staking contracts={contracts} />
                </div>
              </>
            )}
          </div>
        </div>

        <ToastContainer
          position="top-center"
          theme="dark"
          toastStyle={{
            backgroundColor: "#1e40af",
            fontWeight: "bold",
            fontFamily: "poppins",
            borderRadius: "5rem",
          }}
        />
      </div>
    </div>
  );
};

export default HomeScreen;
