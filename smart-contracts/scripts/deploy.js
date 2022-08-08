const { ethers } = require("hardhat");

async function main() {
  //Token Deploy
  console.log("Deploying Token Contract");

  const TokenFactory = await ethers.getContractFactory("Token");
  const token = await TokenFactory.deploy("Staking Token", "STKN", 10000);

  console.log("Token Address: ", token.address);

  //Staking Deploy
  console.log("Deploying Staking Contract");

  const StakingFactory = await ethers.getContractFactory("Staking");
  const staking = await StakingFactory.deploy(token.address);

  console.log("Staking Address: ", staking.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
