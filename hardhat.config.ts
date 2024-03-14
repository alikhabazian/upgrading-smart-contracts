import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@openzeppelin/hardhat-upgrades";

import "@nomicfoundation/hardhat-toolbox";
import {resolve} from "path";
import { config as dotenvConfig } from "dotenv";
import type { NetworkUserConfig } from "hardhat/types";

const dotenvConfigPath: string = process.env.DOTENV_CONFIG_PATH || "./.env";
dotenvConfig({ path: resolve(__dirname, dotenvConfigPath) });

if (!process.env.ALCHEMY_API_KEY) {
  throw new Error("INFURA_API_KEY in .env not set");
}
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

export const networks: { [index: string]: NetworkUserConfig } = {
  arbitrum_sepolia: {
    chainId: 421614,
    url: `https://arb-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
  },
};

const accounts = process.env.PRIVATE_KEY
    ? process.env.PRIVATE_KEY.split(",")
    : ["0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"];

for (const network in networks) {
  // special treatement for hardhat
  if (network.startsWith("hardhat")) {
    networks[network].accounts = {
      mnemonic: "test test test test test test test test test test test junk",
    };
    continue;
  }
  networks[network].accounts = accounts;
}


const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  networks,
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
    customChains: [
      {
        network: "Arbitrum Sepolia",
        chainId: 421614,
        urls: {
          apiURL: "https://api-sepolia.arbiscan.io/api",
          browserURL: "https://sepolia.arbiscan.io/"
        }
      }
    ]
  },
};

export default config;

