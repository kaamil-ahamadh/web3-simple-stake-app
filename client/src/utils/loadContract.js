import { ethers } from "ethers";
import { toast } from "react-toastify";
import {
  tokenAddress,
  tokenABI,
  stakingAddress,
  stakingABI,
} from "./constants";

async function loadContract(signer, chainId, setContract) {
  if (chainId !== 5) {
    toast.error(
      "Please Change your network to Goerli Network for Staking and UnStaking Tokens"
    );
    return;
  }
  const _tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);
  const _stakingContract = new ethers.Contract(
    stakingAddress,
    stakingABI,
    signer
  );
  setContract({
    token: _tokenContract,
    staking: _stakingContract,
  });
}

export default loadContract;
