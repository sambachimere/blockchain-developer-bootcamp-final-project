# Contract security measures

## Using Specific Compiler Pragma

Specific compiler pragma `0.8.4` used in contracts.

## Proper Use of Require

`require` is used in `NftContract.sol` to check that during the nft creation, the price set by the creator is > 0; and to check that during a buying, the listing price is included in the total price.
