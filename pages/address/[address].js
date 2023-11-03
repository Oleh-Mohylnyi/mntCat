import React, { useState, useEffect, useCallback, useMemo } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import Tooltip from "@material-ui/core/Tooltip";
import { useAccount } from "wagmi";
import styles from "../../styles/Home.module.scss";
import stylesAddress from "../../styles/Address.module.scss";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import InputForm from "../../components/InputForm";
import Modal from "../../components/Modal";
import SyncStepper from "../../components/SyncStepper";
import Switch from "../../components/Switch";
import { getDate } from "../../utils/tools";
import { fetchVerify } from "../../utils/api";
import { providersConstants, networksConstants } from "../../utils/constants";
import iconSyncMono from "../../public/images/icon_sync_monocolor.svg";
import iconRefresh from "../../public/images/icon_refresh_resync.svg";
import iconCalendar from "../../public/images/icon_calendar.svg";
import logoDexGuru from "../../public/images/logoDexGuru.svg";
import logoGitcoin from "../../public/images/logoGitcoin.svg";
import logoSnapshot from "../../public/images/logoSnapshot.svg";

// interface IProvider {
//   name: string;
//   symbol: string;
//   source: string;
//   timestamp: number;
//   status: string;
//   contract?: string;
//   chainId?: number;
//   result: boolean;
//   metadata: any;
//   sync: any;
// }

const Home = () => {
  const [connected, setConnected] = useState(false);
  const [waitingСonnection, setWaitingСonnection] = useState(false);
  const { address: account, isConnected } = useAccount();
  const router = useRouter();
  const { address } = router.query;
  const [loading, setLoading] = useState(false);
  const [cheshireImage, setCheshireImage] = useState("");
  const [providers, setProviders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [credentials, setCredentials] = useState([]);
  const [syncRequestData, setSyncRequestData] = useState({});
  const [openModalSync, setOpenModalSync] = useState(false);

  useEffect(() => {
    setConnected(isConnected);
    if (isConnected && waitingСonnection) {
      router.push(`/address/${account}`);
    }
  }, [isConnected]);

  async function fetchAddressData(campaign = "") {
    setLoading(true);
    setCheshireImage("");
    setProviders([]);
    setCategories([]);
    setCredentials([]);
    const response = await fetchVerify(address, campaign);

    if (response?.providers?.length) {
      response.providers.map((item) => {
        if (item.symbol === "SNAPSHOT_PROPOSER" && item.result) {
          const ind = response.providers.findIndex(
            (el) => el.symbol === "SNAPSHOT_VOTER"
          );
          response.providers[ind].name =
            response.providers[ind].name.concat(" Proposer");
        }
        if (item.symbol === "SNAPSHOT_VOTER" && item.result) {
          const ind = response.providers.findIndex(
            (el) => el.symbol === "SNAPSHOT_PROPOSER"
          );
          response.providers[ind].name =
            response.providers[ind].name.concat(" Multiple Voter");
        }
        return null;
      });
    }

    if (response?.categories?.length) {
      response?.providers?.map((item) => {
        if (item.symbol === "CHAINALYSIS_SANCTIONS") {
          return response.categories.push(item);
        }
        return null;
      });
    }

    if (response.cheshire.imageURL) {
      setCheshireImage(response.cheshire?.imageURL);
    }
    setProviders(response.providers);
    setCategories(response.categories);
    if (response?.credentials) {
      setCredentials(response.credentials);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (address) {
      fetchAddressData();
    }
  }, [address]);

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
        <h1 className={styles.title}>Explore your Mantle identity</h1>

        <InputForm loading={loading} setLoading={setLoading} />

        {providers.length ? (
          <div className={stylesAddress.grid}>
            {providers.map((provider, index) =>
              !providersConstants[provider.symbol] ||
              providersConstants[provider.symbol].group ===
                "not for rendering" ||
              provider.symbol.startsWith("DEX_GURU") ||
              provider.symbol.startsWith("GITCOIN_PASSPORT") ||
              provider.symbol.startsWith("SNAPSHOT") ||
              !provider.sync?.byChainIds.find(
                byChainId => byChainId.chainId === 5000
              ) ? null : (
                <Tooltip
                  title={providersConstants[provider.symbol]?.tooltip}
                  placement="bottom"
                  key={index}
                >
                  <div
                    key={index}
                    className={stylesAddress.card}
                    style={
                      !provider.result &&
                      provider.status !== "pending" &&
                      provider.status !== "error"
                        ? {
                            opacity: "20%",
                          }
                        : {}
                    }
                  >
                    <div className={styles.flex}>
                      {providersConstants[provider.symbol]?.logo && (
                        <Image
                          src={providersConstants[provider.symbol]?.logo}
                          alt={`logo ${provider.name}`}
                          height={36}
                          width={36}
                        />
                      )}
                      <h2 style={{ margin: "0 12px" }}>
                        {providersConstants[provider.symbol].title}
                        {provider.symbol === "AGE" && (
                          <span>
                            &nbsp;{getDate(provider.metadata?.timestamp)}
                          </span>
                        )}
                      </h2>

                      <div className="activity-table__sync">
                        {provider.result &&
                          provider.sync.enabled &&
                          provider.sync.byChainIds?.map((byChainId, index) => {
                            if (byChainId.chainId !== 5000) {
                              return null;
                            }
                            return (
                              <div key={index} className={stylesAddress.switch}>
                                <Switch
                                  synced={byChainId.timestamp !== 0}
                                  required={byChainId.required}
                                  handleSwitch={() => {
                                    if (byChainId.required) {
                                      setSyncRequestData({
                                        sourceId: provider.sync.sourceId,
                                        chainId: byChainId.chainId,
                                        address,
                                      });
                                      setOpenModalSync(true);
                                    }
                                  }}
                                />
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </Tooltip>
              )
            )}
          </div>
        ) : (
          <p
            style={{ fontSize: "16px", lineHeight: "1.3", textAlign: "center" }}
          >
            loading ...
          </p>
        )}

        <Modal
          closeHidden
          handleClose={() => setOpenModalSync(false)}
          show={openModalSync}
        >
          <SyncStepper
            syncRequestData={syncRequestData}
            afterSyncAction={() => fetchAddressData()}
          />
        </Modal>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
