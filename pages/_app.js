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
            <NavItem>SELL DIGITAL ASSET</NavItem>
          </Link>
          <Link href="/my-assets">
            <NavItem>MY DIGITAL ASSETS</NavItem>
          </Link>
          <Link href="/creator-dashboard">
            <NavItem>CREATOR DASHBOARD</NavItem>
          </Link>
        </NavItems>
      </Navbar>
      <Component className="bg-black" {...pageProps} />
    </Container>
  );
}

export default MyApp;
