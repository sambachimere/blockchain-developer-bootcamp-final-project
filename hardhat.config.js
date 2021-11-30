require('@nomiclabs/hardhat-waffle');
const fs = require('fs');
const privateKey = fs.readFileSync('.secret').toString().trim();

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: 'https://matic-mumbai.chainstacklabs.com',
      accounts: [`0x${privateKey}`],
      // accounts: [process.env.PRIVATE_KEY],
      gasPrice: 8000000000,
    },
  },
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
