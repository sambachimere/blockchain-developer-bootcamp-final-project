import '../styles/globals.css';
import Link from 'next/link';

import { Container, Navbar, Title, NavItems, NavItem } from '../styles/app.style';

function MyApp({ Component, pageProps }) {
  return (
    <Container>
      <Navbar>
        <Link href="/">
          <Title>ankh</Title>
        </Link>
        <NavItems>
          <Link href="/create-nft">
            <NavItem>SELL NFTS</NavItem>
          </Link>
          <Link href="/my-nfts">
            <NavItem>MY NFTS</NavItem>
          </Link>
          <Link href="/creator-dashboard">
            <NavItem>DASHBOARD</NavItem>
          </Link>
        </NavItems>
      </Navbar>
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
