// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// OpenZeppelin contracts
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Nft is ERC721URIStorage {
    using Counters for Counters.Counter;

    //* increment an unique identifier for each nft
    Counters.Counter private _tokenIds;
    
    //* address of the marketplace 
    address contractAddress;

    constructor(address marketplaceAddress) ERC721("AfricanItem", "AITM") {
        contractAddress = marketplaceAddress;
    }
    
    //* allow to mint new nft
    function createNft(string memory tokenURI) public returns (uint) {
        // increment nft id (starting from zero)
        _tokenIds.increment();
    
        // new nft id is assigned to variable 'newItemId'
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
      
        // allow the marketplace to transact nft between users
        setApprovalForAll(contractAddress, true);
      
        // returning the nft id is mandatory if we want to interact with it in the front end 
        return newItemId;
    }
}