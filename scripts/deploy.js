// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat');

async function main() {
  const NftMarket = await hre.ethers.getContractFactory('NftMarket');
  const nftMarket = await NftMarket.deploy();
  await nftMarket.deployed();
  console.log('nftMarket deployed to:', nftMarket.address);

  const Nft = await hre.ethers.getContractFactory('Nft');
  const nft = await Nft.deploy(nftMarket.address);
  await nft.deployed();
  console.log('nft deployed to:', nft.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
