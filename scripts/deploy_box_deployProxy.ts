import { formatEther, parseEther } from "viem";
import hre from "hardhat";
import { ethers ,upgrades} from "hardhat";
import * as timers from "timers";
import {wait} from "viem/_types/utils/wait";

async function main() {
  console.log("Start");
  const Box = await ethers.getContractFactory("Box");
  console.log('Deploying Box...');
  const box = await upgrades.deployProxy(Box, [42], { initializer: 'store' });
  await box.waitForDeployment();
  console.log('Box deployed to:', await box.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
