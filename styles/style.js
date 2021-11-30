import styled from 'styled-components';

export const Container = styled.div`
  background-color: #000;
  height: 100vh;
`;

export const NoNftText = styled.h1`
  font-size: 20px;
  font-weight: bold;
  padding: 20px 0px 0px 20px;
  color: #fff;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  padding: 20px;
`;

export const NftCard = styled.div`
  border: 1px solid #e1ae00;
  padding: 10px;
`;

export const NftImage = styled.img`
  height: 10rem;
  width: 100%;
`;

export const NftNameAndDescription = styled.div``;

export const NftName = styled.p`
  margin: 0px;
  color: #fff;
  font-size: 20px;
  font-weight: 500;
`;

export const NftDescriptionBlock = styled.div``;

export const NftDescription = styled.p`
  color: #fff;
`;

export const NftPriceAndButton = styled.div``;

export const NftPrice = styled.p`
  color: #e1ae00;
  margin: 5px 0px 0px 0px;
`;

export const NftButton = styled.button`
  color: #fff;
  width: 100%;
  background-color: #e1ae00;
  border: 0px;
  padding: 10px;
  margin-top: 10px;
`;
