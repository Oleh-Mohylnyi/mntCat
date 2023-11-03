export async function fetchVerify(address, campaign) {
  const response = await fetch(
    `https://api.knowyourcat.id/v1/${address}${
      campaign ? `?campaign=${campaign}` : ""
    } `,
    { headers: { "X-NO-CACHE": true } }
  );
  return response.ok
    ? await response.json()
    : Promise.reject(new Error("Not found"));
}

export async function fetchCategoryByName(address, category) {
  const response = await fetch(
    `https://api.knowyourcat.id/v1/${address}/categories?category=${category}`
  );
  return response.ok
    ? await response.json()
    : Promise.reject(new Error("Not found"));
}
export async function fetchCategoryByAddress(address, category, chain) {
  const chainId = chain ? chain : "11155111";
  const response = await fetch(
    `https://api.knowyourcat.id/v1/${address}/categories/${chainId}/${category}`
  );
  return response.ok
    ? await response.json()
    : Promise.reject(new Error("Not found"));
}

export async function fetchCatImgUrl(address, campaign) {
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
  chainId,
  campaign,
}) {
  const campaignValue = campaign ? campaign : "";
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
      campaign: campaignValue,
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

// export async function requestSignMessage() {
//   const response = await fetch(
//     `${process.env.REACT_APP_API_BASE_URL}/v1/nfts/messageToSign`
//   );

//   if (response.ok) {
//     return await response.json();
//   }

//   return Promise.reject(response.error);
// }

export async function requestSyncData(address, sourceId, chainId) {
  const response = await fetch(
    `https://api.knowyourcat.id/v1/syncs/calldata?address=${address}&sourceId=${sourceId}&chainId=${chainId}`
  );

  if (response.ok) {
    return await response.json();
  }

  return Promise.reject(response.error);
}

export async function requestVCData(address, claim) {
  const response = await fetch(
    `https://api.knowyourcat.id/v1/credentials/issue`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address,
        claim,
      }),
    }
  );

  if (response.ok) {
    return await response.json();
  }

  return Promise.reject(response.error);
}

export async function requestVCCallData(address, sourceId, chainId) {
  const response = await fetch(
    `https://api.knowyourcat.id/v1/credentials/calldata?address=${address}&sourceId=${sourceId}&chainId=${chainId}`
  );

  if (response.ok) {
    return await response.json();
  }

  return Promise.reject(response.error);
}
