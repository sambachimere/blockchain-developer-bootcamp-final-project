import React from 'react';
import { ethers } from 'ethers';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { useRouter } from 'next/router';
import Web3Modal from 'web3modal';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

import { nftaddress, nftmarketaddress } from '../config';

import Nft from '../artifacts/contracts/Nft.sol/Nft.json';
import NftMarket from '../artifacts/contracts/NftMarket.sol/NftMarket.json';

import {
  Container,
  InnerContainer,
  NftInput,
  NftTextArea,
  NftImage,
  NftButton,
} from '../styles/create-nft.style.js';

export default function CreateNft() {
  const [fileUrl, setFileUrl] = React.useState(null);
  const [formInput, updateFormInput] = React.useState({ price: '', name: '', description: '' });
  const router = useRouter();

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }

  async function createMarket() {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) return;

    // first, upload to IPFS
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;

      // after file is uploaded to IPFS, pass the URL to save it on Polygon
      createSale(url);
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }

  async function createSale(url) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    // next, create the item
    let contract = new ethers.Contract(nftaddress, Nft.abi, signer);
    let transaction = await contract.createNft(url);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();
    const price = ethers.utils.parseUnits(formInput.price, 'ether');

    // then list the item for sale on the marketplace
    contract = new ethers.Contract(nftmarketaddress, NftMarket.abi, signer);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    transaction = await contract.createMarketNft(nftaddress, tokenId, price, {
      value: listingPrice,
    });
    await transaction.wait();
    router.push('/');
  }

  return (
    <Container>
      <InnerContainer>
        <NftInput
          placeholder="Nft Name"
          onChange={(e) => updateFormInput({ ...formInput, name: e.target.value })}
        />
        <NftTextArea
          placeholder="Nft Description"
          onChange={(e) => updateFormInput({ ...formInput, description: e.target.value })}
        />
        <NftInput
          placeholder="Nft Price in Matic"
          onChange={(e) => updateFormInput({ ...formInput, price: e.target.value })}
        />
        <NftInput type="file" name="Nft" onChange={onChange} />
        {fileUrl && <NftImage width="350" src={fileUrl} />}
        <NftButton onClick={createMarket}>CREATE NFT</NftButton>
      </InnerContainer>
    </Container>
  );
}

// <div className="flex justify-center">
//   <div className="w-1/2 flex flex-col pb-12">
//     <input
//       placeholder="Nft Name"
//       className="mt-8 border rounded p-4"
//       onChange={(e) => updateFormInput({ ...formInput, name: e.target.value })}
//     />
//     <textarea
//       placeholder="Nft Description"
//       className="mt-2 border rounded p-4"
//       onChange={(e) => updateFormInput({ ...formInput, description: e.target.value })}
//     />
//     <input
//       placeholder="Nft Price in Eth"
//       className="mt-2 border rounded p-4"
//       onChange={(e) => updateFormInput({ ...formInput, price: e.target.value })}
//     />
//     <input type="file" name="Nft" className="my-4" onChange={onChange} />
//     {fileUrl && <img className="rounded mt-4" width="350" src={fileUrl} />}
//     <button
//       onClick={createMarket}
//       className="font-bold mt-4 bg-yellow-500 text-white rounded p-4 shadow-lg"
//     >
//       Create Digital Nft
//     </button>
//   </div>
// </div>
