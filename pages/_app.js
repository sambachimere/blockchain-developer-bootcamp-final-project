import '../styles/globals.css';
import Link from 'next/link';

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-black">
      <nav className="border-b p-6">
        <p className="text-4xl text-white font-bold">kem marketplace</p>
        <div className="flex mt-4">
          <Link href="/">
            <a className="mr-4 text-yellow-500">HOME</a>
          </Link>
          <Link href="/create-item">
            <a className="mr-6 text-yellow-500">SELL DIGITAL ASSET</a>
          </Link>
          <Link href="/my-assets">
            <a className="mr-6 text-yellow-500">MY DIGITAL ASSETS</a>
          </Link>
          <Link href="/creator-dashboard">
            <a className="mr-6 text-yellow-500">CREATOR DASHBOARD</a>
          </Link>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
