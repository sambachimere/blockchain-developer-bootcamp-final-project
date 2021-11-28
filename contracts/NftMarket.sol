// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "hardhat/console.sol";

contract NftMarket is ReentrancyGuard {
  using Counters for Counters.Counter;

  // counter for each individual created market item 
  Counters.Counter private _itemIds;
  
  // counter for the number of items sold
  Counters.Counter private _itemsSold;

  address payable owner;
  uint256 listingPrice = 0.025 ether;

  constructor() {
    // the owner of this marketplace is the person deploying it
    owner = payable(msg.sender);
  }

  /*
   * equivalent to an object in javascript
   * it is an abstraction of what a market item will be
  */
  struct MarketNft {
    uint itemId;
    address nftContract;
    uint256 tokenId;
    address payable seller;
    address payable owner;
    uint256 price;
    bool sold;
  }

  // allow us to retrieve the ids of all of the nfts being created
  mapping(uint256 => MarketNft) private idToMarketNft;

  // we want to be noticed anytime someone create a new nft
  event MarketNftCreated (
    uint indexed itemId,
    address indexed nftContract,
    uint256 indexed tokenId,
    address seller,
    address owner,
    uint256 price,
    bool sold
  );
  
  /* 
   * returns the listing price of the contract
   * more convenient to get it from a function than from the variable
  */
  function getListingPrice() public view returns (uint256) {
    return listingPrice;
  }

  //* places an nft for sale on the marketplace
  function createMarketNft(
    address nftContract,
    uint256 tokenId,
    uint256 price
  ) public payable nonReentrant {
    require(price > 0, "Price must be at least 1 wei");
    require(msg.value == listingPrice, "Price must be equal to listing price");

    _itemIds.increment();
    uint256 itemId = _itemIds.current();

    idToMarketNft[itemId] = MarketNft(
      itemId,
      nftContract,
      tokenId,
      payable(msg.sender),
      payable(address(0)),
      price,
      false
    );

    // transfer the ownership of the nft to the contract
    IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

    emit MarketNftCreated(
      itemId,
      nftContract,
      tokenId,
      msg.sender,
      address(0),
      price,
      false
    );
  }

  /* 
   * creates the sale of a marketplace nft
   * transfers ownership of the nft, as well as funds between parties
  */
  function createMarketSale(
    address nftContract,
    uint256 itemId
    ) public payable nonReentrant {
    uint price = idToMarketNft[itemId].price;
    uint tokenId = idToMarketNft[itemId].tokenId;
    require(msg.value == price, "Please submit the asking price in order to complete the purchase");

    // transfer value of the transaction to the seller
    idToMarketNft[itemId].seller.transfer(msg.value);

    // transfer ownership of the nft to the buyer
    IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
  
    // update locally the owner & sold attributes of the nft
    idToMarketNft[itemId].owner = payable(msg.sender);
    idToMarketNft[itemId].sold = true;

    // increment the number of item sold
    _itemsSold.increment();

    // pay the listing price to the owner of the contract
    payable(owner).transfer(listingPrice);
  }

  //* returns all unsold market nfts
  function fetchMarketNfts() public view returns (MarketNft[] memory) {
    // total number of nfts that we have currently created
    uint nftCount = _itemIds.current();

    // number of unsold nfts
    uint unsoldNftCount = _itemIds.current() - _itemsSold.current();
    
    uint currentIndex = 0;

    /* 
     * create an array of empty MarketNft instance
     * X the number of unsold nft
    */ 
    MarketNft[] memory nfts = new MarketNft[](unsoldNftCount);

    // Loop over the number of nfts that have been created
    for (uint i = 0; i < nftCount; i++) {
      // check if nft is unsold 
      if (idToMarketNft[i + 1].owner == address(0)) {
        // id of the nft we are interacting with
        // uint currentId = i + 1;
        uint currentId = idToMarketNft[i + 1].itemId;
        
        MarketNft storage currentNft = idToMarketNft[currentId];
        nfts[currentIndex] = currentNft;
        currentIndex += 1;
      }
    }
    return nfts;
  }

  //* Returns only items that a user has purchased
  function fetchMyNfts() public view returns (MarketNft[] memory) {
    uint totalItemCount = _itemIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;

    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketNft[i + 1].owner == msg.sender) {
        itemCount += 1;
      }
    }

    MarketNft[] memory nfts = new MarketNft[](itemCount);

    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketNft[i + 1].owner == msg.sender) {
        // uint currentId = i + 1;
        uint currentId = idToMarketNft[i + 1].itemId;
        MarketNft storage currentNft = idToMarketNft[currentId];
        nfts[currentIndex] = currentNft;
        currentIndex += 1;
      }
    }
    return nfts;
  }

  //* Returns only items a user has created
  function fetchNftsCreated() public view returns (MarketNft[] memory) {
    uint totalItemCount = _itemIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;

    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketNft[i + 1].seller == msg.sender) {
        itemCount += 1;
      }
    }

    MarketNft[] memory nfts = new MarketNft[](itemCount);
    
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketNft[i + 1].seller == msg.sender) {
        uint currentId = i + 1;
        MarketNft storage currentNft = idToMarketNft[currentId];
        nfts[currentIndex] = currentNft;
        currentIndex += 1;
      }
    }
    return nfts;
  }
}