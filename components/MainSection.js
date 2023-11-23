import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useContractReads } from "wagmi";
import { useQuery } from "@apollo/client";
import { client, snapshotQuery } from "../utils/graphql";
import InputForm from "./InputForm";
import Modal from "./Modal";
import SyncStepper from "./SyncStepper";
import Card from "./Card";
import Table from "./Table";
import StatusChart from "./StatusChart";
import { fetchKyCatData } from "../utils/api";
import { getContracts } from "../utils/contracts";
import { providersConstants } from "../utils/constants";
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

  const kyCatDataUpdate = (kyCatData) => {
    kyCatData.providers.map((item, index) => {
      // if (item.symbol === "SNAPSHOT_VOTER" && item.result) {
      //   const ind = response.providers.findIndex(
      //     (el) => el.symbol === "SNAPSHOT_PROPOSER"
      //   );
      //   response.providers[ind].result = true;
      // }
      let resultDEX_GURU = false;
      if (item.symbol.startsWith("DEX_GURU") && !resultDEX_GURU) {
        resultDEX_GURU = true;
        kyCatData.providers[index].symbol = "_DEX_GURU";
      }
      if (item.symbol.startsWith("DEX_GURU") && resultDEX_GURU && item.result) {
        const ind = kyCatData.providers.findIndex(
          (el) => el.symbol === "_DEX_GURU"
        );
        kyCatData.providers[ind].result = true;
      }
      return null;
    });
    kyCatData.credentials.map((credential) => {
      if (credential.hasOwnProperty("provider")) {
        credential.symbol = credential.provider;
        credential.status = "ok";
        delete credential.provider;
      }
      return credential;
    });
    kyCatData.providers.push(...kyCatData.credentials);
    kyCatData.providers.filter(
      (provider) =>
        provider.issuer !== "Cheshire" &&
        provider.symbol !== "CHAINALYSIS_SANCTIONS" &&
        provider.symbol !== "OPIUM_API" &&
        provider.symbol !== "OPIUM_ID" &&
        provider.symbol !== "AGE" &&
        provider.symbol !== "SNAPSHOT_VOTER" &&
        provider.symbol !== "SNAPSHOT_PROPOSER" &&
        !provider.symbol.startsWith("DEX_GURU") &&
        !!providersConstants[provider.symbol] &&
        providersConstants[provider.symbol].group !== "not for rendering"
    );
    setProviders((prev) =>
      prev
        .map((provider) => {
          const dataItem = kyCatData.providers.find(
            (item) => item.symbol === provider.symbol
          );
          return dataItem &&
            (dataItem.status !== "error" || provider.status === "error")
            ? {
                ...provider,
                ...dataItem,
              }
            : provider;
        })
        // .sort((a, b) => {
        //   if (
        //     a.sync?.byChainIds?.find(
        //       (byChainId) => byChainId.chainId === 5000
        //     ) &&
        //     !b.sync?.byChainIds?.find((byChainId) => byChainId.chainId === 5000)
        //   )
        //     return -1;
        //   if (
        //     b.sync?.byChainIds?.find(
        //       (byChainId) => byChainId.chainId === 5000
        //     ) &&
        //     !a.sync?.byChainIds?.find((byChainId) => byChainId.chainId === 5000)
        //   )
        //     return 1;
        //   if (a.result === true && b.result !== true) return -1;
        //   if (b.result === true && a.result !== true) return 1;
        // })
    );
  };

  async function getKyCatData() {
    setLoading(true);
    fetchKyCatData(address)
      .then((data) => {
        if (data.cheshire?.imageURL) {
          setCheshireImage(data.cheshire?.imageURL);
        }
        if (data.providers) {
          return data;
        }
      })
      .then((data) => {
        if (data.providers.length) {
          console.log("!!!get kyCat api data:", data);
          kyCatDataUpdate(data);
        }
      })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log("error fetch", error);
        // getKyCatData();
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
      getKyCatData();
      getAccountInfoMantle(address);
    }
  }, [address]);

  const { data: contractsData } = useContractReads({
    contracts: getContracts(address),
    onSuccess() {
      console.log("!!!get contracts data:", contractsData);
      const contracts = getContracts(address);
      let mappingData = [];
      if (contractsData) {
        mappingData = contractsData.map((response, index) => {
          const resultUpdated =
            !response.result ||
            Number(response.result).isNaN ||
            Number(response.result) === 0
              ? false
              : true;
          const statusUpdated =
            response.status === "success"
              ? "ok"
              : response.status === "failure"
              ? "error"
              : response.status;
          return {
            ...response,
            result: resultUpdated,
            status: statusUpdated,
            symbol: contracts[index].SYMBOL,
          };
        });
      }
      setProviders((prev) =>
        prev.map((provider) => {
          const dataItem = mappingData.find(
            (item) => item.symbol === provider.symbol
          );
          return dataItem
            ? {
                ...provider,
                ...dataItem,
              }
            : provider;
        })
      );
    },
    onSettled() {},
  });

  const { data: snapshotData } = useQuery(snapshotQuery(address), { client });
  if (
    snapshotData &&
    (snapshotData.proposals.length || snapshotData.votes.length)
  ) {
    if (
      providers.find((provider) => provider.symbol === "SNAPSHOT_PROPOSER") &&
      !providers.find((provider) => provider.symbol === "SNAPSHOT_PROPOSER")
        .result
    ) {
      console.log("!!!get snapshot data:", snapshotData);
      const snapshotDataPrepared = [
        {
          name: "Snapshot: Proposer",
          symbol: "SNAPSHOT_PROPOSER",
          result: true,
          status: "ok",
        },
      ];
      setProviders((prev) =>
        prev.map((provider) =>
          provider.symbol === snapshotDataPrepared[0].symbol
            ? {
                ...provider,
                ...snapshotDataPrepared[0],
              }
            : provider
        )
      );
    }
  }

  function updateSyncStatus(providerSymbol, chainId) {
    setProviders((prev) =>
      prev.map((provider) =>
        provider.symbol === providerSymbol
          ? {
              ...provider,
              sync: {
                ...provider.sync,
                byChainIds: provider.sync.byChainIds.map((chain) =>
                  chain.chainId === chainId
                    ? {
                        ...chain,
                        required: false,
                      }
                    : chain
                ),
              },
            }
          : provider
      )
    );
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
              {providers?.map((provider, index) => (
                <Card
                  key={index}
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
          afterSyncAction={updateSyncStatus}
        />
      </Modal>
    </>
  );
};

export default MainSection;
