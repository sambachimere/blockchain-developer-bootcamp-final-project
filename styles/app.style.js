import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  background-color: #000;
  padding: 20px;
`;

export const Navbar = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.h1`
  font-size: 40px;
  color: #fff;
  font-style: italic;
  font-weight: bold;
`;

export const NavItems = styled.div``;

export const NavItem = styled.a`
  margin-right: 15px;
  color: #e1ae00;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`;
