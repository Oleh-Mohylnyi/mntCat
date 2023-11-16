import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useContractReads } from "wagmi";
import InputForm from "./InputForm";
import Modal from "./Modal";
import SyncStepper from "./SyncStepper";
import Card from "./Card";
import Table from "./Table";
import StatusChart from "./StatusChart";
import { fetchVerify } from "../utils/api";
import { getContracts } from "../utils/contracts";
import { skeletonProvidersData } from "../utils/skeleton";
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
  const [mantleJourney, setMantleJourney] = useState({});
  const [syncRequestData, setSyncRequestData] = useState({});
  const [openModalSync, setOpenModalSync] = useState(false);
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
  // console.log("contractsData", getContracts(address));
  const { data } = useContractReads({
    contracts: getContracts(address),
    onSuccess() {
      console.log("!!!get new contracts data");
      const contractsData = getContracts(address);
      let mappingData = [];
      if (data) {
        mappingData = data.map((response, index) => {
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
      }
      console.log("!!contractsMappingData", mappingData);
      providersReducer(mappingData);
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
                <Card
                  provider={provider}
                  index={index}
                  address={address}
                  setOpenModalSync={(data) => setOpenModalSync(data)}
                  setSyncRequestData={(data) => setSyncRequestData(data)}
                />
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
