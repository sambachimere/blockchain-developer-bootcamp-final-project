# Final project - Ankh

## Project description

This project is a nft marketplace specialized in african arts, build with [Next.js](https://nextjs.org/) and [Hardhat](https://hardhat.org/).

## Features

You can:

1. Browse nfts
2. Buy nfts
3. Create nfts
4. Access to your nfts (bought and created)

## Screencast link

## Deployed version url:

I encountered some issues, it will be deployed soon

## Directory structure

- `pages`: Project's frontend.
- `contracts`: Smart contracts that are deployed in the Mumbai (Polygon testnet).
- `test`: Tests for smart contracts.

## Running this project

### Prerequisites

- Node.js = v14.15.0
- Hardhat
- `git checkout main`

### Local setup

To run this project locally, follow these steps.

1. Clone the project locally, change into the directory, and install the dependencies:

```sh
git clone https://github.com/sambachimere/blockchain-developer-bootcamp-final-project.git

cd blockchain-developer-bootcamp-final-project

npm install
```

2. Not mandatory, but you can run some tests at this stage:

`npx hardhat test`

3. Start the local Hardhat node:

```sh
npx hardhat node
```

4. With the network running, deploy the contracts to the local network in a separate terminal window:

```sh
npx hardhat run scripts/deploy.js --network localhost
```

5. When the deployment is complete, the CLI should print out the addresses of the contracts that were deployed:

```sh
 nftMarket deployed to: // nftMarket contract address
 nft deployed to: // ntf contract address
```

6. Using these addresses, create a new file at the root of the project named config.js and add the following code, replacing the placeholder with the contract addresses printed out by the CLI:

```javascript
export const nftmarketaddress = 'nftmarket-contract-address';
export const nftaddress = 'nft-contract-address';
```

7. Switch your MetaMask wallet network to `Localhost 8545` and import some of the accounts created by the node to try out in the app :

[How to import an Account - Metamask](https://metamask.zendesk.com/hc/en-us/articles/360015489331-How-to-import-an-Account)

8. Start the app

```sh
npm run dev
```

9. Go to `http://localhost:3000`

### Deploying to mumbai (Polygon testnet)

1. To deploy to Polygon test network (mumbai), update the configurations located in **hardhat.config.js** to use a private key. You should create a `.secret` file at the root directory. In this file, add one of the private keys given by hardhat after you run your local node, without the first two char `Ox`. You can also export this private key from one of the accounts that you imported to your metamask:

```javascript
require('@nomiclabs/hardhat-waffle');
const fs = require('fs');
// const privateKey = fs.readFileSync('.secret').toString().trim();

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 1337,
    },
    // mumbai: {
    //   url: 'https://matic-mumbai.chainstacklabs.com',
    //   accounts: [`0x${privateKey}`],
    //   // accounts: [process.env.PRIVATE_KEY],
    //   gasPrice: 8000000000,
    // },
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
```

2. Next, you need to switch from the local test network to the Mumbai Testnet. To do so, you need to create and set the network configuration. Open Metamask > Settings > Networks > Add Network > Enter configurations below:

```
Network Name: Polygon Testnet
New RPC URL: https://matic-mumbai.chainstacklabs.com/
Chain ID: 80001
```

3. Get some testnet Matic tokens here: https://faucet.matic.network/

4. Deploy to mumbai using this command:

```sh
npx hardhat run scripts/deploy.js --network mumbai
```

5. Update the contract addresses in your `config.js` file, and test the app on the new network:

```sh
npm run dev
```

## Public Ethereum wallet for certification:

`0x75f3769bBA94eC593dc5935d07E51B121820D1C0`
