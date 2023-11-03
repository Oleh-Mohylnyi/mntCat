import React, { useState, useEffect, useCallback, useMemo } from "react";
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import styles from '../styles/Home.module.scss';
import Header from '../components/Header';
import Footer from '../components/Footer';
import InputForm from '../components/InputForm';
import CustomConnectButton from '../components/CustomConnectButton';

const getShortAddress = (
  addressString = "",
  quantityLeave = 8,
  quantityTrim = 26
) => {
  const newAddressString = [...addressString];
  newAddressString.splice(quantityLeave, quantityTrim, " ", ".", ".", ".", " ");
  return newAddressString.join("");
};

const Home: NextPage = () => {
  const [connected, setConnected] = useState(false);
  const [waitingСonnection, setWaitingСonnection] = useState(false);
  const [loading, setLoading] = useState(false);
  const { address: account, isConnected } = useAccount();
  const router = useRouter();
  // const { address } = router.query;

  useEffect(() => {
    setConnected(isConnected);
    if (isConnected && waitingСonnection) {
      router.push(`/address/${account}`);
    }
  }, [isConnected]);

  return (
    <div className={styles.container}>
      <Head>
        <title>mntCat</title>
        <meta
          content="MntCat verification, reputation, and other credentials Mantle that you have completed on applications and web3 platforms."
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <Header />

        <h1 className={styles.title}>
          Explore your Mantle identity
        </h1>

        <InputForm loading={loading} setLoading={setLoading} />

        <div className={styles.flex} style={{ margin: "18px" }}>
          <div style={{ color: "rgba(255, 255, 255, 0.5)" }}>{connected ? "" : "or"}</div>
          {connected ? (
            <div
              className={styles.link}
              onClick={() => router.push(`/address/${account}`)}
              style={{ color: "rgba(255, 255, 255, 0.5)" }}
            >
              use your wallet address {getShortAddress(account, 4, 34)}
            </div>
          ) : (
            <div
              onClick={() => setWaitingСonnection(true)}
            >
              <CustomConnectButton
                typeStyle="link"
              />
            </div>
          )}
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default Home;
