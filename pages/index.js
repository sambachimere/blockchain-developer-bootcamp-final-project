import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Web3Modal from 'web3modal';

import { nftaddress, nftmarketaddress } from '../config';

// import Nft from '../artifacts/contracts/Nft.sol/Nft.json';
import Nft from '../abi/Nft.json';
// import NftMarket from '../artifacts/contracts/NftMarket.sol/NftMarket.json';
import NftMarket from '../abi/NftMarket.json';

//* Styles
import {
  Container,
  NoNftText,
  Grid,
  NftCard,
  NftImage,
  NftNameAndDescription,
  NftName,
  NftDescriptionBlock,
  NftDescription,
  NftPriceAndButton,
  NftPrice,
  NftButton,
} from '../styles/style.js';

export default function Home() {
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    loadNFTs();
  }, []);
  async function loadNFTs() {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider();
    const nftContract = new ethers.Contract(nftaddress, Nft.abi, provider);
    const nftMarketContract = new ethers.Contract(nftmarketaddress, NftMarket.abi, provider);
    const data = await nftMarketContract.fetchMarketNfts();

    /*
     *  map over items returned from smart contract and format
     *  them as well as fetch their token metadata
     */
    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await nftContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    setNfts(items);
    setIsLoading(true);
  }
  async function buyNft(nft) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftmarketaddress, NftMarket.abi, signer);

    /* user will be prompted to pay the asking proces to complete the transaction */
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');
    const transaction = await contract.createMarketSale(nftaddress, nft.tokenId, {
      value: price,
    });
    await transaction.wait();
    loadNFTs();
  }

  return (
    <Container>
      {isLoading && !nfts.length ? <NoNftText>Currently no nfts here</NoNftText> : null}
      <Grid>
        {nfts.map((nft, i) => (
          <NftCard key={i}>
            <NftImage src={nft.image} />
            <NftNameAndDescription>
              <NftName>{nft.name}</NftName>
              <NftDescriptionBlock style={{ height: '70px', overflow: 'hidden' }}>
                <NftDescription>{nft.description}</NftDescription>
              </NftDescriptionBlock>
            </NftNameAndDescription>
            <NftPriceAndButton>
              <NftPrice>{nft.price} Matic</NftPrice>
              <NftButton onClick={() => buyNft(nft)}>Buy</NftButton>
            </NftPriceAndButton>
          </NftCard>
        ))}
      </Grid>
    </Container>
  );
}
