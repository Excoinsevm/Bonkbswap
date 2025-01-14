import Head from "next/head";
import SwapInterface from "../src/components/swap/SwapInterface";
import Footer from "../src/components/Footer";
import styles from "../styles/Home.module.css";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>BonkbSwap</title>
        <meta name="description" content="Solana's leading token exchange!" />
        <link rel="icon§" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <SwapInterface />
        <Footer/>
      </main>
    </>
  );
};

export default Home;
