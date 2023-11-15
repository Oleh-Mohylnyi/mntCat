import { erc721ABI } from "wagmi";

export function getContracts(account) {
  return [
    {
      SYMBOL: "BABT",
      address: "0x2B09d47D550061f995A3b5C6F0Fd58005215D7c8",
      abi: erc721ABI,
      chainId: 56,
      functionName: "balanceOf",
      args: [account],
    },
    {
      SYMBOL: "REALT",
      address: "0xc2ce4123C8A4A8519C84541D668E743B98B6fCe1",
      abi: erc721ABI,
      chainId: 1,
      functionName: "balanceOf",
      args: [account],
    },
    {
      SYMBOL: "ENS",
      address: "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85",
      abi: erc721ABI,
      chainId: 1,
      functionName: "balanceOf",
      args: [account],
    },
    {
      SYMBOL: "LPP",
      address: "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d",
      abi: erc721ABI,
      chainId: 137,
      functionName: "balanceOf",
      args: [account],
    },
    {
      SYMBOL: "LOBS",
      address: "0x026224A2940bFE258D0dbE947919B62fE321F042",
      abi: erc721ABI,
      chainId: 1,
      functionName: "balanceOf",
      args: [account],
    },
    {
      SYMBOL: "DNA",
      address: "0x932261f9Fc8DA46C4a22e31B45c4De60623848bF",
      abi: erc721ABI,
      chainId: 1,
      functionName: "balanceOf",
      args: [account],
    },
    {
      SYMBOL: "UD",
      address: "0x578853aa776Eef10CeE6c4dd2B5862bdcE767A8B",
      abi: erc721ABI,
      chainId: 1,
      functionName: "balanceOf",
      args: [account],
    },
    {
      SYMBOL: "ODYSSEY",
      address: "0xfAe39eC09730CA0F14262A636D2d7C5539353752",
      abi: erc721ABI,
      chainId: 42161,
      functionName: "balanceOf",
      args: [account],
    },
  ];
}
