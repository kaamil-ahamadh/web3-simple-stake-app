import React from "react";

const Header = ({ provider, account, handleConnectWallet }) => {
  return (
    <div className="flex justify-between">
      <div className="font-poppins font-bold text-[21px] hover:scale-105">
        Simple Stake App
      </div>
      <div className="btn " onClick={!provider ? handleConnectWallet : null}>
        {provider
          ? `${account.address.substring(
              0,
              6
            )}......${account.address.substring(36, 42)}`
          : "Connect"}
      </div>
    </div>
  );
};

export default Header;
