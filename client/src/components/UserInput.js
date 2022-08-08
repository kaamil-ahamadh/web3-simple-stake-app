import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import GlobalContext from "../context/GlobalContext";
import { stakingAddress } from "../utils/constants";
import handleError from "../utils/handleError";

const UserInput = ({ text, handleBack }) => {
  const {
    userAmount,
    setUserAmount,
    contracts,
    account,
    handleLoadBalance,
    stknBalance,
  } = useContext(GlobalContext);

  const [allowance, setAllowance] = useState(0);

  useEffect(() => {
    handleAllowance();
  }, []);

  //Approve Allowance
  const handleAllowance = async () => {
    //Check Allowance
    let _allowance = await contracts.token.allowance(
      account.address,
      stakingAddress
    );
    _allowance = _allowance.toString();

    setAllowance(_allowance);
  };

  const handleApproveAndStake = async () => {
    //If Allowance is 0 then call Approve
    if (allowance === "0") {
      try {
        const tx = await contracts.token.approve(
          stakingAddress,
          ethers.constants.MaxUint256
        );
        await tx.wait();
        console.log(tx);

        handleAllowance();
        toast.success(
          "STKN Token is Approved Successfully for your wallet. From Now On You can Stake STKN Without Approval"
        );
      } catch (error) {
        handleError(error);
      }
    } else if (userAmount === "0") {
      toast.error("Stake Amount Should not be zero");
    } else {
      try {
        const tx = await contracts.staking.stake(
          ethers.utils.parseEther(userAmount)
        );
        await tx.wait();

        handleLoadBalance();
        toast.success(`${userAmount} STKN Tokens Successfully Staked`);
        setUserAmount("");
        handleBack();
      } catch (error) {
        handleError(error, "Stake");
      }
    }
  };

  // //UnStake
  const handleUnStake = async () => {
    try {
      if (userAmount === "0") {
        toast.error("UnStake Amount Should not be zero");
      } else {
        const tx = await contracts.staking.unStake(
          ethers.utils.parseEther(userAmount)
        );
        await tx.wait();

        handleLoadBalance();
        toast.success(`${userAmount} STKN Tokens Successfully UnStaked`);
        setUserAmount("");
        handleBack();
      }
    } catch (error) {
      handleError(error, "UnStake");
    }
  };
  return (
    <>
      <div className="mb-4">{text}</div>
      <input
        placeholder={
          text === "Stake" ? "Your Stake Amount..." : "Your UnStake Amount..."
        }
        className="input"
        type={"number"}
        value={userAmount}
        min="1"
        onChange={(e) => setUserAmount(e.target.value)}
      />

      <div className="flex justify-center items-center">
        <div
          className="btn m-2"
          onClick={text === "Stake" ? handleApproveAndStake : handleUnStake}
        >
          {allowance === "0" ? "Approve" : text}
        </div>
        <div className="btn m-2" onClick={handleBack}>
          Back
        </div>
      </div>
      {allowance === "0" ? (
        <div className="text-sm">
          * Approval is Neccessary only for the first time before Staking
        </div>
      ) : null}
    </>
  );
};

export default UserInput;
