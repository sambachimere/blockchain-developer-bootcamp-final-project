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

export default function CreatorDashboard() {
  const [nfts, setNfts] = useState([]);
  const [sold, setSold] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadNfts();
  }, []);

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
    const data = await marketContract.fetchNftsCreated();

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
          sold: i.sold,
          image: meta.data.image,
        };
        return item;
      })
    );
    /* create a filtered array of items that have been sold */
    const soldItems = items.filter((i) => i.sold);
    setSold(soldItems);
    setNfts(items);
    setIsLoading('loaded');
  }

  return (
    <Container>
      {isLoading && !nfts.length ? (
        <NoNftText>No nfts created</NoNftText>
      ) : (
        <>
          <div>
            <h2 style={{ color: 'white' }}>Items Created</h2>
            <Grid>
              {nfts.map((nft, i) => (
                <NftCard key={i}>
                  <NftImage src={nft.image} />
                  <NftNameAndDescription>
                    <NftName style={{ height: '64px' }}>{nft.name}</NftName>
                    <NftDescriptionBlock style={{ height: '70px', overflow: 'hidden' }}>
                      <NftDescription>{nft.description}</NftDescription>
                    </NftDescriptionBlock>
                  </NftNameAndDescription>
                  <NftPriceAndButton>
                    <NftPrice>Price - {nft.price} Eth</NftPrice>
                  </NftPriceAndButton>
                </NftCard>
              ))}
            </Grid>
          </div>
          <div>
            {Boolean(sold.length) && (
              <div>
                <h2 style={{ color: 'white' }}>Items sold</h2>
                <Grid>
                  {sold.map((nft, i) => (
                    <NftCard key={i}>
                      <NftImage src={nft.image} />
                      <NftNameAndDescription>
                        <NftName style={{ height: '64px' }}>{nft.name}</NftName>
                        <NftDescriptionBlock style={{ height: '70px', overflow: 'hidden' }}>
                          <NftDescription>{nft.description}</NftDescription>
                        </NftDescriptionBlock>
                      </NftNameAndDescription>
                      <NftPriceAndButton>
                        <NftPrice>Price - {nft.price} Eth</NftPrice>
                      </NftPriceAndButton>
                    </NftCard>
                  ))}
                </Grid>
              </div>
            )}
          </div>
        </>
      )}
    </Container>
  );
}
