// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

/// @title Contract for nft creation
/// @author Samba Diaw
/// @notice Allows a user to create nfts
contract Nft is ERC721URIStorage {
    using Counters for Counters.Counter;
    /// @dev Increment an unique identifier for each nft
    Counters.Counter private _tokenIds;

    /// @dev Address of the marketplace 
    address contractAddress;

    /// @param marketplaceAddress Nft marketplace address
    constructor(address marketplaceAddress) ERC721("Ankh Marketplace", "AM") {
        contractAddress = marketplaceAddress;
    }
    
    /// @notice Allow to mint new nft
    /// @param tokenURI returned after file is uploaded to ipfs
    /// @return nft id
    function createNft(string memory tokenURI) public returns (uint) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

         // allow the marketplace to transact nft between users
        setApprovalForAll(contractAddress, true);
        
        return newItemId;
    }
}