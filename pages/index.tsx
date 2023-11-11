import React from "react";
import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MainSection from '../components/MainSection';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {

  return (
    <div className={styles.container}>
      <Head>
        <title>mntCat</title>
        <meta
          content="MntCat aggregator is activity, verification, reputation, and other credentials Mantle that you have completed on applications and web3 platforms."
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <Header />
        <MainSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
