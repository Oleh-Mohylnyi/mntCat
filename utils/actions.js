import { fetchVerify } from "../../utils/api";
import store from "../../utils/store";

function clearPending() {
  if (store.refreshTimeoutIds.length) {
    store.refreshTimeoutIds.map((id) => clearTimeout(id));
    store.deleteRefreshTimeoutIds();
  }
  return;
}
function refreshPending() {
  const refreshPendingId = setTimeout(fetchAddressData, 150000);
  store.setRefreshTimeoutIds(refreshPendingId);
}

export async function fetchAddressData(campaign) {
  clearPending();

  const response = await fetchVerify(store.address, campaign);

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

    // delete after adding Coinbase to API
    // if (
    //   !response.providers.find((provider) => provider.symbol === "VC_COINBASE")
    // ) {
    //   response.providers.push({
    //     name: "Verifiable Credentials: Coinbase",
    //     symbol: "VC_COINBASE",
    //     source: "api",
    //     timestamp: 0,
    //     status: "pending",
    //     result: false,
    //     sync: {
    //       enabled: false,
    //       sourceId: "",
    //       byChainIds: [],
    //     },
    //   });
    // }
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
    store.setCheshireImage(response.cheshire?.imageURL);
  }
  store.setAddress(response.address);
  store.setProviders(response.providers);
  store.setCategories(response.categories);
  if (response?.credentials) {
    store.setCredentials(response.credentials);
  }

  if (response?.providers?.find((item) => item.status === "pending")) {
    refreshPending();
  }
}

export async function getAddressData(targetAddress, campaign = false) {
  store.setLoading(true);
  try {
    if (targetAddress !== store.address) {
      store.setCheshireImage("");
    }
    store.setAddress(targetAddress);
    await fetchAddressData(campaign);
    store.setLoading(false);
  } catch (err) {
    store.setLoading(false);
  }
}
