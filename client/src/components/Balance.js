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
      {stknBalance.wallet ? (
        <>
          <div>STKN: {stknBalance.wallet}</div>
          <div className="border-b-2 border-blue-500 mt-8"></div>
        </>
      ) : null}
    </div>
  );
};

export default Balance;
