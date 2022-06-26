require("@nomiclabs/hardhat-waffle");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");
require("dotenv").config();

// If you are using MetaMask, be sure to change the chainId to 1337
module.exports = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/a84b538abf714818b3662cd1fcd7c530",
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
      chainId: 4,
    },
    polygon: {
      url: "https://polygon-mainnet.infura.io/v3/a84b538abf714818b3662cd1fcd7c530",
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
      chainId: 137,
    },
  },
};
