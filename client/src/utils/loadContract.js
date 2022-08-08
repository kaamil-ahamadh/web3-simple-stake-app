import { ethers } from "ethers";
import {
  tokenAddress,
  tokenABI,
  stakingAddress,
  stakingABI,
} from "./constants";

async function loadContract(signer, chainId, setContract) {
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
