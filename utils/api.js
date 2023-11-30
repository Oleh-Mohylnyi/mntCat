export async function fetchKyCatData(address) {
  try {
    const response = await fetch(
      `https://api.knowyourcat.id/v1/${address}`,
      { headers: { "X-NO-CACHE": true } }
    );

    if (!response.ok) {
      throw new Error("Not found");
    }

    return await response.json();
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function fetchGitcoinData(address) {
  try {
    const response = await fetch(
      `https://api.scorer.gitcoin.co/registry/stamps/${address}`,
      {
        method: "GET",
        headers: {
          "X-API-Key": process.env.GITCOIN_API_KEY,
          accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Not found");
    }

    return await response.json();
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function fetchDexGuruData(address) {
  try {
    const response = await fetch(
      `https://api.dev.dex.guru/v1/chain/wallets/${address}`,
      {
        method: "GET",
        headers: {
          "api-key": process.env.DEX_GURU_API_KEY,
          accept: "application/json",
          "User-Agent": "JavaScript DexGuru SDK v1.0.8",
        },
      }
    );

    if (!response.ok && response.detail === "Wallet not found") {
      throw new Error("Not found");
    }

    return await response.json();
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function fetchKyCatNft(address, campaign) {
  const response = await fetch(
    `https://api.knowyourcat.id/v1/${address}/cheshire${
      campaign ? `?campaign=${campaign}` : ""
    }`
  );

  return response.ok
    ? await response.json()
    : Promise.reject(new Error("Not found"));
}

export async function fetchVerifyPicture(address) {
  const response = await fetch(
    `https://utils-server.opium.finance/v1/kyc/profile?address=${address}`
  );

  return response.ok
    ? await response.json()
    : Promise.reject(new Error("Not found"));
}

// Возвращает: 200 (успех), 403 (если нет подписи), 409 (если уже сминчен кот), 412 (если не передали адрес), 500 (внутренняя ошибка)
export async function fetchMintData(address) {
  const response = await fetch(
    `https://utils-server.opium.finance/v1/kyc/nft/mintPermission?address=${address}`
  );

  if (response.ok) {
    return await response.json();
  }

  let error;
  switch (response.status) {
    case 403: {
      error = "Signature required";
      break;
    }
    case 409: {
      error = "NFT already minted";
      break;
    }
    case 412: {
      error = "Address required";
      break;
    }
    default: {
      error = "Server error";
    }
  }

  return Promise.reject(new Error(error));
}

export async function requestMint({
  address,
  // signature,
  selfMint,
  chainId
}) {
  const response = await fetch(`https://api.knowyourcat.id/v1/nfts/mint`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address,
      // signature,
      selfMint,
      chainId,
      campaign: "",
    }),
  });

  if (response.ok) {
    return await response.json();
  }

  return Promise.reject(response);
}

export async function requestTaskMint(taskId) {
  const response = await fetch(
    `https://api.knowyourcat.id/v1/nfts/tasks/${taskId}`
  );

  if (response.ok) {
    return await response.json();
  }

  return Promise.reject(response.error);
}

export async function requestMintSpecialNft({ address, chainId, campaign }) {
  const response = await fetch(
    `https://api.knowyourcat.id/v1/nfts/free-mint?address=${address}&chainId=${chainId}${
      campaign ? `&campaign=${campaign}` : ""
    }`
  );

  if (response) {
    return response.json();
  }
  return Promise.reject(response.json());
}

export async function requestSyncData(address, sourceId, chainId) {
  const response = await fetch(
    `https://api.knowyourcat.id/v1/syncs/calldata?address=${address}&sourceId=${sourceId}&chainId=${chainId}`
  );

  if (response.ok) {
    return await response.json();
  }

  return Promise.reject(response.error);
}

