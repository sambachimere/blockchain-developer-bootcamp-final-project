import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 20px;
  height: 100vh;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

export const NftInput = styled.input`
  margin-bottom: 10px;
  height: 1.5rem;
  padding: 0.5rem;
  border-width: 2px;
  border-color: #e1ae00;
  background-color: #000;
  color: #fff;
`;

export const NftTextArea = styled.textarea`
  margin-bottom: 10px;
  height: 4rem;
  padding: 0.5rem;
  border-width: 2px;
  border-color: #e1ae00;
  background-color: #000;
  color: #fff;
`;

export const NftImage = styled.image`
  margin-bottom: 10px;
`;

export const NftButton = styled.button`
  height: 2rem;
  font-size: 15px;
  font-weight: bold;
  background-color: #e1ae00;
  border-width: 2px;
  border-color: #e1ae00;
  color: #fff;
`;
