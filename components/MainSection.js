import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useContractReads } from "wagmi";
import Tooltip from "@material-ui/core/Tooltip";
import InputForm from "./InputForm";
import Modal from "./Modal";
import SyncStepper from "./SyncStepper";
import Switch from "./Switch";
import SwitchComingSoon from "./SwitchComingSoon";
import Table from "./Table";
import StatusChart from "./StatusChart";
import { fetchVerify } from "../utils/api";
import { getContracts } from "../utils/contracts";
import { providersConstants, credentialsConstants } from "../utils/constants";
import { skeletonProvidersData } from "../utils/skeleton";
// import iconSyncMono from "../public/images/icon_sync_monocolor.svg";
// import iconRefresh from "../public/images/icon_refresh_resync.svg";
// import iconCalendar from "../public/images/icon_calendar.svg";
// import logoDexGuru from "../public/images/logoDexGuru.svg";
// import logoGitcoin from "../public/images/logoGitcoin.svg";
// import logoSnapshot from "../public/images/logoSnapshot.svg";
import defaultCat from "../public/images/defaultCat.png";
import styles from "../styles/Home.module.scss";
import stylesAddress from "../styles/Address.module.scss";

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

const MainSection = () => {
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState(skeletonProvidersData);
  const [cheshireImage, setCheshireImage] = useState("");
  const [syncRequestData, setSyncRequestData] = useState({});
  const [openModalSync, setOpenModalSync] = useState(false);
  const [mantleJourney, setMantleJourney] = useState({});
  const router = useRouter();
  const { address } = router.query;

  const providersReducer = (dataArray) => {
    console.log("oldProviders", providers);
    const newProviders = providers
      .map((provider) => {
        const dataItem = dataArray.find(
          (item) => item.symbol === provider.symbol
        );
        if (
          dataItem &&
          (dataItem.status !== "error" || provider.status === "error")
        ) {
          console.log("provider updated item", {
            ...provider,
            ...dataItem,
          });
          return {
            ...provider,
            ...dataItem,
          };
        }
        return provider;
      })
      .sort((a, b) => {
        if (
          a.sync?.byChainIds?.find((byChainId) => byChainId.chainId === 5000) &&
          !b.sync?.byChainIds?.find((byChainId) => byChainId.chainId === 5000)
        )
          return -1;
        if (
          b.sync?.byChainIds?.find((byChainId) => byChainId.chainId === 5000) &&
          !a.sync?.byChainIds?.find((byChainId) => byChainId.chainId === 5000)
        )
          return 1;
        if (a.result === true && b.result !== true) return -1;
        if (b.result === true && a.result !== true) return 1;
      });
    console.log("newProviders", newProviders);
    setProviders(newProviders);
  };

  const providerDataProcessing = (response) => {
    let resultDEX_GURU = false;
    if (response?.providers?.length) {
      response.providers.map((item, index) => {
        if (item.symbol === "SNAPSHOT_VOTER" && item.result) {
          const ind = response.providers.findIndex(
            (el) => el.symbol === "SNAPSHOT_PROPOSER"
          );
          response.providers[ind].result = true;
        }
        if (item.symbol.startsWith("DEX_GURU") && !resultDEX_GURU) {
          resultDEX_GURU = true;
          response.providers[index].symbol = "_DEX_GURU";
        }
        if (
          item.symbol.startsWith("DEX_GURU") &&
          resultDEX_GURU &&
          item.result
        ) {
          const ind = response.providers.findIndex(
            (el) => el.symbol === "_DEX_GURU"
          );
          response.providers[ind].result = true;
        }
        return null;
      });
    }
    if (response.cheshire.imageURL) {
      setCheshireImage(response.cheshire?.imageURL);
    }
    if (response?.providers) {
      response.credentials.map((credential) => {
        if (credential.hasOwnProperty("provider")) {
          credential.symbol = credential.provider;
          delete credential.provider;
        }
        return credential;
      });
      response.providers.push(...response.credentials);
      const mappedProviders = response.providers;
      // .filter(
      //   (provider) =>
      //     provider.issuer !== "Cheshire" &&
      //     provider.symbol !== "CHAINALYSIS_SANCTIONS" &&
      //     provider.symbol !== "OPIUM_API" &&
      //     provider.symbol !== "OPIUM_ID" &&
      //     provider.symbol !== "AGE" &&
      //     provider.symbol !== "SNAPSHOT_VOTER" &&
      //     !provider.symbol.startsWith("DEX_GURU") &&
      //     !!providersConstants[provider.symbol] &&
      //     providersConstants[provider.symbol].group !== "not for rendering"
      // );
      console.log("!!apiMappingData", mappedProviders);
      providersReducer(mappedProviders);
    }
    setLoading(false);
  };

  async function fetchAddressData(campaign = "") {
    setLoading(true);
    fetchVerify(address, campaign)
      .then((data) => {
        console.log("!!!get new api data");
        providerDataProcessing(data);
      })
      .catch((error) => {
        console.error(error.message);
        // fetchAddressData();
        setLoading(false);
      });
  }

  async function getAccountInfoMantle(address) {
    if (!address) return;
    setMantleJourney({});
    try {
      const response = await fetch(`/api/mantlejourney/${address}`);
      const data = await response.json();
      if (Object.keys(data).length !== 0) {
        setMantleJourney(data);
      }
    } catch {
      return 0;
    }
  }

  useEffect(() => {
    if (address) {
      setProviders(skeletonProvidersData);
      setCheshireImage("");
      fetchAddressData();
      getAccountInfoMantle(address);
    }
  }, [address]);

  const { data } = useContractReads({
    contracts: getContracts(address),
    onSuccess() {
      console.log("!!!get new contracts data");
      const contractsData = getContracts(address);
      const mappingData = data.map((response, index) => {
        const resultСonverted =
          !response.result ||
          Number(response.result).isNaN ||
          Number(response.result) === 0
            ? false
            : true;
        const statusConverted =
          response.status === "success"
            ? "ok"
            : response.status === "failure"
            ? "error"
            : response.status;
        return {
          ...response,
          result: resultСonverted,
          status: statusConverted,
          symbol: contractsData[index].SYMBOL,
        };
      });
      console.log("!!contractsMappingData", mappingData);
      providersReducer(mappingData, providers);
    },
    onSettled() {},
  });

  function getProvidersUpdatedSyncStatus(provider, providerSymbol, chainId) {
    return provider.map((item) => {
      if (item.symbol === providerSymbol) {
        const updatedItem = { ...item };
        updatedItem.sync.byChainIds = updatedItem.sync.byChainIds.map(
          (chain) => {
            if (chain.chainId === chainId) {
              chain.required = false;
            }
            return chain;
          }
        );
        return updatedItem;
      }
      return item;
    });
  }
  console.log("providers", providers);

  return (
    <>
      <h1 className={styles.title}>Bridge your identity into Mantle</h1>

      <InputForm loading={loading} setLoading={setLoading} />

      <div className={styles.section}>
        <h2 className={stylesAddress.title}>
          Bridge attestation proofs from other from other chain with you
        </h2>
        <div className={stylesAddress.block}>
          <div className={stylesAddress.block_left}>
            <div className={stylesAddress.grid}>
              {providers.map((provider, index) => (
                <Tooltip
                  title={
                    <>
                      {provider.sync ||
                        (provider.issuer && (
                          <p>
                            {provider.result &&
                            provider.status !== "pending" &&
                            provider.status !== "error"
                              ? providersConstants[provider.symbol]
                                  ?.positiveResponse
                              : providersConstants[provider.symbol]
                                  ?.negativeResponse}
                          </p>
                        ))}{" "}
                      <p>{providersConstants[provider.symbol]?.tooltip}</p>
                    </>
                  }
                  placement="bottom"
                  key={index}
                >
                  <div
                    key={index}
                    className={stylesAddress.card}
                    style={
                      !provider.result ||
                      provider.status === "pending" ||
                      provider.status === "error"
                        ? {
                            opacity: "20%",
                          }
                        : {}
                    }
                  >
                    <div className={stylesAddress.card_flex}>
                      <Link
                        href={providersConstants[provider.symbol]?.baseURL}
                        rel="loosener noreferrer"
                        target="_blank"
                        className={stylesAddress.card_link}
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
                          <h2 style={{ margin: "0 6px" }}>
                            {providersConstants[provider.symbol].title}
                          </h2>
                        </div>
                      </Link>

                      <div>
                        {provider.sync?.enabled ? (
                          provider.sync.byChainIds?.map((byChainId, index) => {
                            if (byChainId.chainId !== 5000) {
                              return null;
                            }
                            return (
                              <div key={index} className={stylesAddress.switch}>
                                <Switch
                                  result={provider.result}
                                  synced={byChainId.timestamp !== 0}
                                  required={byChainId.required}
                                  handleSwitch={() => {
                                    if (byChainId.required) {
                                      setSyncRequestData({
                                        sourceId: provider.sync.sourceId,
                                        chainId: byChainId.chainId,
                                        address,
                                        providerSymbol: provider.symbol,
                                      });
                                      setOpenModalSync(true);
                                    }
                                  }}
                                />
                              </div>
                            );
                          })
                        ) : (
                          <SwitchComingSoon
                            preview={
                              provider.status || provider.issuer ? false : true
                            }
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </Tooltip>
              ))}
            </div>
          </div>

          <div className={stylesAddress.block_right}>
            <div className={stylesAddress.thumb}>
              <Image
                src={cheshireImage ? cheshireImage : defaultCat}
                alt="kyCat image"
                priority={true}
                width={1000}
                height={1000}
              />
              <div
                className={cheshireImage ? "" : stylesAddress.gradient}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {!!Object.keys(mantleJourney).length &&
      mantleJourney?.miles?.milesGroups?.length ? (
        <div className={styles.section}>
          <h2 className={stylesAddress.title}>Mantle Journey Miles</h2>
          <div className={stylesAddress.block_miles}>
            <div className={stylesAddress.block_miles_chart}>
              <StatusChart
                data={mantleJourney.miles.milesGroups
                  .map((group) => {
                    const name = group.desc;
                    const value = group.miles;
                    return { name, value };
                  })
                  .sort((a, b) => {
                    if (a.value > b.value) return -1;
                    if (b.value <= a.value) return 1;
                  })}
              />
            </div>
            <div className={stylesAddress.block_miles_table}>
              <Table data={mantleJourney} />
            </div>
          </div>
        </div>
      ) : null}

      <Modal
        closeHidden
        handleClose={() => setOpenModalSync(false)}
        show={openModalSync}
      >
        <SyncStepper
          syncRequestData={syncRequestData}
          afterSyncAction={(providerSymbol, chainId) => {
            setProviders(
              getProvidersUpdatedSyncStatus(providers, providerSymbol, chainId)
            );
            // fetchAddressData();
          }}
        />
      </Modal>
    </>
  );
};

export default MainSection;
