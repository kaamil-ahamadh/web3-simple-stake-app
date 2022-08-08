import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import UserInput from "./UserInput";

const Staking = ({ contracts }) => {
  const [stakeClicked, setStakeClicked] = useState(false);
  const [unStakeClicked, setUnStakeClicked] = useState(false);

  const { stknBalance, setUserAmount } = useContext(GlobalContext);

  //UseEffectForgetting Staked Balance
  useEffect(() => {
    if (contracts) {
    }
  }, []);

  //Stake, Unstake and Back Handler
  const handleStakeClicked = async () => {
    setStakeClicked(true);
  };

  const handleUnStakeClicked = async () => {
    setUnStakeClicked(true);
  };

  const handleBack = () => {
    setStakeClicked(false);
    setUnStakeClicked(false);
    setUserAmount("");
  };

  /* Managing Staking and Unstaking UI*/
  if (stakeClicked) {
    return (
      <div className="card-container">
        <UserInput text="Stake" handleBack={handleBack} />
      </div>
    );
  } else if (unStakeClicked) {
    return (
      <div className="card-container">
        <UserInput text="UnStake" handleBack={handleBack} />
      </div>
    );
  }

  return (
    <div className="card-container">
      <div className="border-b-2 border-blue-500 m-4">Current Staking</div>
      <div>Your STKN: {stknBalance.staked ? stknBalance.staked : null}</div>
      <div>
        Total STKN Staked:{" "}
        {stknBalance.totalStaked ? stknBalance.totalStaked : null}
      </div>

      <div className="flex justify-between mt-4">
        <div className="btn m-4" onClick={handleStakeClicked}>
          Stake
        </div>
        <div className="btn m-4" onClick={handleUnStakeClicked}>
          UnStake
        </div>
      </div>
    </div>
  );
};

export default Staking;
