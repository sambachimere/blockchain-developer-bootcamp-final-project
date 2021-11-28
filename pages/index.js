//* Libraries
import React from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import Web3Modal from 'web3modal';

//* Config
import { nftaddress, nftmarketaddress } from '../config';

//* Contracts abi
import Nft from '../artifacts/contracts/Nft.sol/Nft.json';
import NftMarket from '../artifacts/contracts/NftMarket.sol/NftMarket.json';

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
  //* states
  const [nfts, setNfts] = React.useState([]);
  const [loadingState, setLoadingState] = React.useState('not-loaded');

  React.useEffect(() => {
    loadNfts();
  }, []);

  async function loadNfts() {
    // create a generic provider and query for unsold market nfts
    const provider = new ethers.providers.JsonRpcProvider();
    const nftContract = new ethers.Contract(nftaddress, Nft.abi, provider);
    const nftMarketContract = new ethers.Contract(nftmarketaddress, NftMarket.abi, provider);
    const data = await nftMarketContract.fetchMarketNfts();

    /*
     *  map over nfts returned from smart contract and format
     *  them as well as fetch their token metadata
     */
    const nfts = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await nftContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let nft = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return nft;
      })
    );
    setNfts(nfts);
    setLoadingState('loaded');
  }

  async function buyNft(nft) {
    // needs the user to sign the transaction, so will use Web3Provider and sign it
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();
    const nftMarketContract = new ethers.Contract(nftmarketaddress, NftMarket.abi, signer);

    // user will be prompted to pay the asking proces to complete the transaction
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');

    const transaction = await nftMarketContract.createMarketSale(nftaddress, nft.tokenId, {
      value: price,
    });
    await transaction.wait();

    loadNfts();
  }

  return (
    <Container>
      {loadingState === 'loaded' && !nfts.length ? (
        <NoNftText>Currently no nfts here</NoNftText>
      ) : null}
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
              <NftPrice>{nft.price} Matic</NftPrice>
              <NftButton onClick={() => buyNft(nft)}>Buy</NftButton>
            </NftPriceAndButton>
          </NftCard>
        ))}
      </Grid>
    </Container>
  );
}

// <div className="flex justify-center">
//   <div className="px-4" style={{ maxWidth: '1600px' }}>
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 pb-4">
//       {nfts.map((nft, i) => (
//         <div key={i} className="border shadow rounded-xl overflow-hidden">
//           <img src={nft.image} />
//           <div className="p-4">
//             <p style={{ height: '64px' }} className="text-2xl text-white font-semibold">
//               {nft.name}
//             </p>
//             <div style={{ height: '70px', overflow: 'hidden' }}>
//               <p className="text-gray-400">{nft.description}</p>
//             </div>
//           </div>
//           <div className="p-4 bg-black">
//             <p className="text-2xl mb-4 font-bold text-white">{nft.price} Matic</p>
//             <button
//               className="w-full bg-yellow-500 text-white font-bold py-2 px-12 rounded"
//               onClick={() => buyNft(nft)}
//             >
//               Buy
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// </div>
