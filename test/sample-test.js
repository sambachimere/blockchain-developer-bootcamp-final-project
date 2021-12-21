const { ethers } = require('hardhat');

describe('NftMarket', function () {
  let market;
  let marketAddress;
  let nft;
  let nftContractAddress;
  it('should deploy the marketplace', async function () {
    const NftMarket = await ethers.getContractFactory('NftMarket');
    market = await NftMarket.deploy();
    await market.deployed();
    marketAddress = market.address;
  });
  it('should deploy the NFT contract', async function () {
    const Nft = await ethers.getContractFactory('Nft');
    nft = await Nft.deploy(marketAddress);
    await nft.deployed();
    nftContractAddress = nft.address;
  });
  it('should create two tokens', async function () {
    await nft.createNft('https://www.mytokenlocation.com');
    await nft.createNft('https://www.mytokenlocation2.com');
  });
  it('should put both tokens for sale and execute sale to another user', async function () {
    let listingPrice = await market.getListingPrice();
    listingPrice = listingPrice.toString();

    const auctionPrice = ethers.utils.parseUnits('1', 'ether');

    await market.createMarketNft(nftContractAddress, 1, auctionPrice, { value: listingPrice });
    await market.createMarketNft(nftContractAddress, 2, auctionPrice, { value: listingPrice });

    const [_, buyerAddress] = await ethers.getSigners();

    await market
      .connect(buyerAddress)
      .createMarketSale(nftContractAddress, 1, { value: auctionPrice });
  });
  it('should query for and return the unsold nfts', async function () {
    nfts = await market.fetchMarketNfts();
    nfts = await Promise.all(
      nfts.map(async (i) => {
        const tokenUri = await nft.tokenURI(i.tokenId);
        let item = {
          price: i.price.toString(),
          tokenId: i.tokenId.toString(),
          seller: i.seller,
          owner: i.owner,
          tokenUri,
        };
        return item;
      })
    );
  });
});
