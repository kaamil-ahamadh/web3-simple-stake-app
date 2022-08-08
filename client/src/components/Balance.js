import React, { useContext, useEffect } from "react";
import millify from "millify";

import GlobalContext from "../context/GlobalContext";

const Balance = ({ account, contracts }) => {
  const { stknBalance, handleLoadBalance } = useContext(GlobalContext);

  useEffect(() => {
    if (contracts) {
      handleLoadBalance();
    }
  }, []);

  return (
    <div className="card-container">
      <div className="border-b-2 border-blue-500 mb-4">Balance</div>
      <div>
        Ether:{" "}
        {millify(account.balance, {
          precision: 4,
        })}
      </div>
      <div>STKN: {stknBalance.wallet ? stknBalance.wallet : null}</div>
      <div className="border-b-2 border-blue-500 mt-8"></div>
    </div>
  );
};

export default Balance;
