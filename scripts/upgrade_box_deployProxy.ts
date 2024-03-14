import { formatEther, parseEther } from "viem";
import hre from "hardhat";
import { ethers ,upgrades} from "hardhat";
import * as timers from "timers";
import {wait} from "viem/_types/utils/wait";

async function main() {
    console.log("Start");
    const BoxV2 = await ethers.getContractFactory('BoxV2');
    console.log('Deploying Box...');
    const box=await upgrades.upgradeProxy('0xc56D9F8d6fbBded0A309A15AfBd1F238042B9706', BoxV2);
    console.log('Box upgraded');
    console.log('Box deployed to:', await box.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
