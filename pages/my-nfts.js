import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Web3Modal from 'web3modal';

import { nftmarketaddress, nftaddress } from '../config';

import NftMarket from '../artifacts/contracts/NftMarket.sol/NftMarket.json';
import Nft from '../artifacts/contracts/Nft.sol/Nft.json';

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
} from '../styles/style.js';

export default function MyAssets() {
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadNfts();
    console.log('My nfts: ', nfts);
  }, [nfts]);

  async function loadNfts() {
    const web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: true,
    });
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const marketContract = new ethers.Contract(nftmarketaddress, NftMarket.abi, signer);
    const tokenContract = new ethers.Contract(nftaddress, Nft.abi, provider);
    const data = await marketContract.fetchMyNfts();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
        };
        return item;
      })
    );
    setNfts(items);
    setIsLoading(true);
  }

  return (
    <Container>
      {isLoading && !nfts.length ? <NoNftText>No nfts owned</NoNftText> : null}
      <Grid>
        {nfts.map((nft, i) => (
          <NftCard key={i}>
            <NftImage src={nft.image} />
            <NftPriceAndButton>
              <NftPrice>{nft.price} Matic</NftPrice>
            </NftPriceAndButton>
          </NftCard>
        ))}
      </Grid>
    </Container>
  );
}
