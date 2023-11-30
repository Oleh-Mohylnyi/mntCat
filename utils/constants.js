import logoBABT from "../public/images/logoBab.svg";
import logoOPIUM_API from "../public/images/logoOpium.svg";
import logoREALT from "../public/images/logoRealt.svg";
import logoCHAINALYSIS_SANCTIONS from "../public/images/logoChainalysis.svg";
import logoENS from "../public/images/logoENS.svg";
import logoLPP from "../public/images/logoLPP.png";
import logoLOBS from "../public/images/logoLOBS.png";
import logoZerion from "../public/images/logoZerion.svg";
import logoUD from "../public/images/logoUD.svg";
import logoPOAP from "../public/images/logoPOAP.svg";
import logoZAPPER from "../public/images/logoZapper.svg";
import logoDEBANK from "../public/images/logoDeBank.svg";
// import iconNotNonUS from "../assets/images/icon_not_nonUS.svg";
// import iconNotHuman from "../assets/images/icon_not_human.svg";
// import iconNotCommunity from "../assets/images/icon_not_community.svg";
// import iconNotSanctions from "../assets/images/icon_not_sanctions.svg";
// import iconOk from "../assets/images/icon_ok.svg";
// import iconStop from "../assets/images/icon_stop.svg";
import logoGitcoin from "../public/images/logoGitcoin.svg";
import logoTwitter from "../public/images/twitterColor.svg";
import logoGoogle from "../public/images/google.svg";
import logoGitHub from "../public/images/githubColor.svg";
import logoFacebook from "../public/images/facebook.svg";
import logoBrightID from "../public/images/brightid.svg";
import logoDiscord from "../public/images/discordColor.svg";
import logoLinkedIn from "../public/images/linkedin.svg";
import logoEth from "../public/images/logoETH.svg";
// import logoOptimism from "../assets/images/logoOptimism.svg";
// import logoBSC from "../assets/images/logoBSC.svg";
// import logoGnosis from "../public/images/logoGnosis.svg";
import logoGoerli from "../public/images/logoGoerli.svg";
import logoPolygon from "../public/images/logoPolygon.svg";
// import logoFantom from "../assets/images/logoFantom.svg";
import logoArbitrum from "../public/images/logoArbitrum.svg";
// import logoCelo from "../assets/images/logoCELO.svg";
// import logoAvalanche from "../assets/images/logoAvalanche.svg";
import logoDexGuru from "../public/images/logoDexGuru.svg";
// import iconDexGuruMedium from "../assets/images/iconDexGuruMedium.svg";
// import iconDexGuruCasual from "../assets/images/iconDexGuruCasual.svg";
// import iconDexGuruHeavy from "../assets/images/iconDexGuruHeavy.svg";
// import iconDexGuruBot from "../assets/images/iconDexGuruBot.svg";
import iconAge from "../public/images/icon_age.svg";
import iconSkeleton from "../public/images/icon_skeleton.svg";
import logoSnapshot from "../public/images/logoSnapshot.svg";
// import iconVoter from "../assets/images/icon_voter.svg";
// import iconProposer from "../assets/images/icon_proposer.svg";
import logoSepolia from "../public/images/logoSepolia.svg";
// import imageZkBob from "../assets/images/imageZkBob.svg";
// import iconZkBob from "../assets/images/iconZkBob.svg";
// import logoGnosisMonochrome from "../assets/images/Gnosis.svg";
// import logoEthMonochrome from "../assets/images/eth.svg";
// import logoPolygonMonochrome from "../assets/images/polygon.svg";
// import logoGoerliMonochrome from "../assets/images/goerli.svg";
// import logoSepoliaMonochrome from "../assets/images/sepolia.svg";
// import logoOptimismMonochrome from "../assets/images/optimism.svg";
import logoTelegram from "../public/images/logo_telegram.svg";
import logoCoinbase from "../public/images/logoCoinbase.svg";
import logoKyCat from "../public/images/logo_knowyourcat.svg";
// import logoZkSync from "../public/images/logoZkSync.svg";
import logoMantleTestnet from "../public/images/logoMantle.svg";
import logoMantle from "../public/images/logoMantle.svg";

export const providersConstants = {
  SKELETON: {
    symbol: "SKELETON",
    logo: iconSkeleton,
    title: "SKELETON",
    group: "none",
    tooltip: "loading...",
  },
  CHAINALYSIS_SANCTIONS: {
    symbol: "CHAINALYSIS_SANCTIONS",
    logo: logoCHAINALYSIS_SANCTIONS,
    title: "Chainalysis",
    positiveResponse: "Clear",
    negativeResponse: "Sanctioned",
    group: "not for rendering",
  },
  BABT: {
    symbol: "BABT",
    logo: logoBABT,
    title: "BAB token",
    positiveResponse: "Verified",
    negativeResponse: "No BAB token",
    baseURL:
      "https://www.binance.com/en/support/faq/bacaf9595b52440ea2b023195ba4a09c",
    getUrl: (_, providers) => {
      const babtData = providers.find((item) => item.symbol === "BABT");
      return `https://bscscan.com/address/${babtData.contract}`;
    },
    tooltip:
      "Holders of Binance Account Bound (BAB) have completed Identity Verification on Binance. As the exchange is not available for customers from the US and some other jurisdictions,  owning this treat may imply a non-US customer. Click on the icon to learn how to mint BAB",
    getButtonsTitle: "Pass KYC on Binance",
    group: "none",
  },
  OPIUM_API: {
    symbol: "OPIUM_API",
    logo: logoOPIUM_API,
    title: "Opium",
    positiveResponse: "Terms signed",
    negativeResponse: "No signature",
    baseURL: "https://app.opium.finance/",
    getUrl: (_, providers) => {
      const protocolData = providers.find((item) => item.symbol === "OPIUM_ID");
      if (protocolData?.metadata?.tokenId?.length > 1) {
        return `https://opensea.io/assets/ethereum/${protocolData.contract}/${protocolData.metadata.tokenId}`;
      }
      return "https://opensea.io/collection/opium-wonderland";
    },
    tooltip:
      "Users who signed the Terms of Service of Opium Finance, declaring they are not US, Canada and Japan customers.",
    group: "none",
  },
  OPIUM_ID: {
    group: "not for rendering",
  },
  REALT: {
    symbol: "REALT",
    logo: logoREALT,
    title: "RealT KYC",
    positiveResponse: "Verified",
    negativeResponse: "No verification",
    baseURL: "https://dashboard.realt.community",
    getUrl: (address) => {
      return `https://dashboard.realt.community/portfolio/${address}`;
    },
    tooltip:
      "Users who passed KYC checks by the US-based KYC provider. As RealT is only available to accredited U.S. investors and non-US customers, owning this trait may imply a non-US customer.",
    group: "none",
  },
  ENS: {
    symbol: "ENS",
    logo: logoENS,
    title: "ENS",
    positiveResponse: "Has name",
    negativeResponse: "No name",
    baseURL: "https://ens.domains/",
    getUrl: (address) => {
      return `https://app.ens.domains/address/${address}`;
    },
    tooltip:
      "Users who are members of the ENS community and have a paid subscription to the Ethereum domain name. In some cases, this trait can be used as an anti-bot measure. It may also identify the user.",
    group: "none",
  },
  LPP: {
    symbol: "LPP",
    logo: logoLPP,
    title: "Lens",
    positiveResponse: "Has handle",
    negativeResponse: "No handle",
    baseURL: "https://lens.xyz/",
    getUrl: (address) => {
      return `https://opensea.io/${address}/lens-protocol-profiles`;
    },
    tooltip:
      "Users who are members of Lens community, and thus are less likely to be bots or anonymous accounts. In some cases, this trait can prove humanity.",
    group: "none",
  },
  LOBS: {
    symbol: "LOBS",
    logo: logoLOBS,
    title: "Lobster",
    positiveResponse: "Has NFT",
    negativeResponse: "No NFT",
    baseURL: "https://opensea.io/collection/lobsterdao",
    getUrl: (address) => {
      return `https://opensea.io/${address}/lobsterdao`;
    },
    tooltip:
      "Users who are members of Lobster community, and thus are less likely to be bots or anonymous accounts. In some cases, this trait can prove humanity.",
    group: "none",
  },
  DNA: {
    symbol: "Zerion DNA",
    logo: logoZerion,
    // title: "Zerion DNA 1.0",
    title: "Zerion DNA",
    positiveResponse: "Has NFT",
    negativeResponse: "No NFT",
    baseURL: "https://opensea.io/collection/zerion-dna-onepointo",
    getUrl: (address) => {
      return `https://opensea.io/${address}/zerion-dna-onepointo`;
    },
    tooltip:
      "Users who are members of Zerion community, and thus are less likely to be bots or anonymous accounts. In some cases, this trait can prove humanity.",
    group: "none",
  },
  UD: {
    symbol: "UD",
    logo: logoUD,
    title: "UD",
    positiveResponse: "Has NFT domain",
    negativeResponse: "No NFT domain",
    baseURL: "https://unstoppabledomains.com/",
    getUrl: (address, providers) => {
      const { chainId } = providers.find((item) => item.symbol === "UD");
      return `https://opensea.io/${address}/unstoppable-domains${
        chainId === 1 ? "" : "-polygon"
      }`;
    },
    tooltip:
      "Users who are members of the Unstoppable Domains community and have a paid subscription to the Ethereum domain name. In some cases, this trait can be used as an anti-bot measure. It may also identify the user.",
    group: "none",
  },
  POAP: {
    symbol: "POAP",
    logo: logoPOAP,
    title: "POAP",
    positiveResponse: "Has POAP",
    negativeResponse: "No POAP",
    baseURL: "https://poap.xyz/",
    getUrl: (address) => {
      return `https://app.poap.xyz/scan/${address}`;
    },
    tooltip:
      "Holders of a POAP. Each POAP is a gift from an issuer to collectors, in celebration of a special shared memory. By minting these memories to the blockchain, collectors build a rich tapestry of tokenized experiences which unlock a world of possibilities.",
    group: "none",
  },
  DEBANK: {
    symbol: "DEBANK",
    logo: logoDEBANK,
    title: "DeBank",
    positiveResponse: "Has ID",
    negativeResponse: "No ID",
    baseURL: "https://debank.com/",
    getUrl: (address) => {
      return `https://debank.com/profile/${address}`;
    },
    tooltip:
      "Holders of DeBank ID are less likely to be bots or anonymous accounts. In some cases, this trait can be used as humanity proof.",
    group: "none",
  },
  ZAPPER: {
    symbol: "ZAPPER",
    logo: logoZAPPER,
    title: "Zapper",
    positiveResponse: "Has NFT",
    negativeResponse: "No NFT",
    baseURL: "https://zapper.fi/",
    getUrl: (address) => {
      return `https://zapper.fi/nft/`;
    },
    tooltip:
      "Users who are members of Zapper community are less likely to be bots or anonymous account. In some cases, this trait can be used as humanity proof.",
    group: "none",
  },
  ODYSSEY: {
    symbol: "ODYSSEY",
    logo: logoArbitrum,
    title: "Odyssey",
    positiveResponse: "Has NFT",
    negativeResponse: "No NFT",
    baseURL: "https://opensea.io/collection/arbitrum-odyssey-nft",
    getUrl: (address) => {
      return `https://opensea.io/collection/arbitrum-odyssey-nft`;
    },
    tooltip:
      "Users who are members of Arbitrum Oddysey community are less likely to be bots or anonymous account. In some cases, this trait can be used as humanity proof.",
    group: "none",
  },
  GITCOIN_PASSPORT: {
    symbol: "GITCOIN_PASSPORT",
    logo: logoGitcoin,
    title: "GITCOIN PASSPORT",
    positiveResponse: "Has attestation from this issuer",
    negativeResponse: "No attestation from this issuer",
    baseURL: "https://passport.gitcoin.co/",
    tooltip:
      "Verified Twitter account on Gitcoin Passport. Proof of ownership of data is provided using cryptography, while keeping the data private.",
    group: "Verifications",
  },
  GITCOIN_PASSPORT_TWITTER: {
    symbol: "GITCOIN_PASSPORT_TWITTER",
    logo: logoTwitter,
    title: "TWITTER",
    positiveResponse: "Has passport",
    negativeResponse: "No passport",
    baseURL: "https://passport.gitcoin.co/",
    tooltip:
      "Verified Twitter account on Gitcoin Passport. Proof of ownership of data is provided using cryptography, while keeping the data private.",
    labelUp: logoGitcoin,
    group: "Verifications",
  },
  GITCOIN_PASSPORT_GOOGLE: {
    symbol: "GITCOIN_PASSPORT_GOOGLE",
    logo: logoGoogle,
    title: "GOOGLE",
    positiveResponse: "Has passport",
    negativeResponse: "No passport",
    baseURL: "https://passport.gitcoin.co/",
    tooltip:
      "Verified Google account on Gitcoin Passport. Proof of ownership of data is provided using cryptography, while keeping the data private.",
    labelUp: logoGitcoin,
    group: "Verifications",
  },
  GITCOIN_PASSPORT_GITHUB: {
    symbol: "GITCOIN_PASSPORT_GITHUB",
    logo: logoGitHub,
    title: "GITHUB",
    positiveResponse: "Has passport",
    negativeResponse: "No passport",
    baseURL: "https://passport.gitcoin.co/",
    tooltip:
      "Verified GitHub account on Gitcoin Passport. Proof of ownership of data is provided using cryptography, while keeping the data private.",
    labelUp: logoGitcoin,
    group: "Verifications",
  },
  GITCOIN_PASSPORT_FACEBOOK: {
    symbol: "GITCOIN_PASSPORT_FACEBOOK",
    logo: logoFacebook,
    title: "FACEBOOK",
    positiveResponse: "Has passport",
    negativeResponse: "No passport",
    baseURL: "https://passport.gitcoin.co/",
    tooltip:
      "Verified Facebook account on Gitcoin Passport. Proof of ownership of data is provided using cryptography, while keeping the data private.",
    labelUp: logoGitcoin,
    group: "Verifications",
  },
  GITCOIN_PASSPORT_BRIGHTID: {
    symbol: "GITCOIN_PASSPORT_BRIGHTID",
    logo: logoBrightID,
    title: "BRIGHTID",
    positiveResponse: "Has passport",
    negativeResponse: "No passport",
    baseURL: "https://passport.gitcoin.co/",
    tooltip:
      "Verified BrightID account on Gitcoin Passport. Proof of ownership of data is provided using cryptography, while keeping the data private.",
    labelUp: logoGitcoin,
    group: "Verifications",
  },
  GITCOIN_PASSPORT_DISCORD: {
    symbol: "GITCOIN_PASSPORT_DISCORD",
    logo: logoDiscord,
    title: "DISCORD",
    positiveResponse: "Has passport",
    negativeResponse: "No passport",
    baseURL: "https://passport.gitcoin.co/",
    tooltip:
      "Verified Discord account on Gitcoin Passport. Proof of ownership of data is provided using cryptography, while keeping the data private.",
    labelUp: logoGitcoin,
    group: "Verifications",
  },
  GITCOIN_PASSPORT_LINKEDIN: {
    symbol: "GITCOIN_PASSPORT_LINKEDIN",
    logo: logoLinkedIn,
    title: "LINKEDIN",
    positiveResponse: "Has passport",
    negativeResponse: "No passport",
    baseURL: "https://passport.gitcoin.co/",
    labelUp: logoGitcoin,
    group: "Verifications",
  },
  AGE: {
    symbol: "AGE",
    logo: iconAge,
    title: "Active since",
    tooltip: "When was the first transaction made",
    group: "Address features",
  },
  _DEX_GURU: {
    symbol: "_DEX_GURU",
    logo: logoDexGuru,
    title: "Dex.guru",
    baseURL: "https://dex.guru/",
    positiveResponse: "Has activity on trading platform",
    negativeResponse: "No activity on trading platform",
    getUrl: (address) => {
      return `https://dex.guru/token/eth/${address}`;
    },
    tooltip:
      "The DexGuru platform offers users tools that reflect portfolios and trading activity across multiple decentralized exchanges.",
    group: "Trading activity",
  },

  SNAPSHOT_PROPOSER: {
    symbol: "SNAPSHOT_PROPOSER",
    logo: logoSnapshot,
    title: "Snapshot",
    baseURL: "https://snapshot.org/",
    positiveResponse: "Has social title",
    negativeResponse: "No social title proposer or voter",
    getUrl: (address) => {
      return `https://snapshot.org/`;
    },
    tooltip:
      "Snapshot is a platform that allows users to create and vote on proposals, allowing communities to make decisions in a transparent and decentralized manner.",
    labelUp: logoSnapshot,
    group: "none",
  },
  SNAPSHOT_VOTER: {
    symbol: "SNAPSHOT_VOTER",
    logo: logoSnapshot,
    title: "Snapshot",
    baseURL: "https://snapshot.org/",
    getUrl: (address) => {
      return `https://snapshot.org/`;
    },
    tooltip:
      "Snapshot is a platform that allows users to create and vote on proposals, allowing communities to make decisions in a transparent and decentralized manner.",
    labelUp: logoSnapshot,
    group: "none",
  },
  VC_TELEGRAM: {
    symbol: "VC_TELEGRAM",
    logo: logoTelegram,
    title: "TELEGRAM",
    baseURL: "https://telegram.org",
    getUrl: (address) => {
      return `https://telegram.org`;
    },
    // labelUp: logoKyCat,
    tooltip:
      "Verified Telegram account on KnowYorCat. Proof of ownership of data is provided using cryptography, while keeping the data private.",
    group: "Verifications",
  },
  VC_GOOGLE: {
    symbol: "VC_GOOGLE",
    logo: logoGoogle,
    title: "GOOGLE",
    baseURL: "https://www.google.com/",
    getUrl: (address) => {
      return `https://www.google.com/`;
    },
    // labelUp: logoKyCat,
    tooltip:
      "Verified Google account on KnowYorCat. Proof of ownership of data is provided using cryptography, while keeping the data private.",
    group: "Verifications",
  },
  VC_TWITTER: {
    symbol: "VC_TWITTER",
    logo: logoTwitter,
    title: "TWITTER",
    baseURL: "https://twitter.com/",
    getUrl: (address) => {
      return `https://twitter.com/`;
    },
    // labelUp: logoKyCat,
    tooltip:
      "Verified Twitter account on KnowYorCat. Proof of ownership of data is provided using cryptography, while keeping the data private.",
    group: "Verifications",
  },
  VC_COINBASE: {
    symbol: "VC_COINBASE",
    logo: logoCoinbase,
    title: "COINBASE",
    baseURL: "https://www.coinbase.com/",
    getUrl: (address) => {
      return `https://www.coinbase.com/`;
    },
    // labelUp: logoKyCat,
    tooltip:
      "Verified Coinbase account on KnowYorCat. Proof of ownership of data is provided using cryptography, while keeping the data private.",
    group: "Verifications",
  },
  Telegram: {
    symbol: "Telegram",
    logo: logoTelegram,
    title: "TELEGRAM",
    positiveResponse: " Has attestation from Telegram",
    negativeResponse: " Does not have attestation from Telegram",
    baseURL: "https://telegram.org",
    getUrl: (address) => {
      return `https://telegram.org`;
    },
    tooltip:
      "Verified Telegram account. Proof of ownership of data is provided using cryptography, while keeping the data private.",
    group: "Verifications",
  },
  Google: {
    symbol: "Google",
    logo: logoGoogle,
    title: "GOOGLE",
    positiveResponse: " Has attestation from Google",
    negativeResponse: " Does not have attestation from Google",
    baseURL: "https://www.google.com/",
    getUrl: (address) => {
      return `https://www.google.com/`;
    },
    tooltip:
      "Verified Google account. Proof of ownership of data is provided using cryptography, while keeping the data private.",
    group: "Verifications",
  },
  Twitter: {
    symbol: "Twitter",
    logo: logoTwitter,
    title: "TWITTER",
    positiveResponse: " Has attestation from Twitter",
    negativeResponse: " Does not have attestation from Twitter",
    baseURL: "https://twitter.com/",
    getUrl: (address) => {
      return `https://twitter.com/`;
    },
    tooltip:
      "Verified Twitter account. Proof of ownership of data is provided using cryptography, while keeping the data private.",
    group: "Verifications",
  },
  Github: {
    symbol: "Github",
    logo: logoGitHub,
    title: "GITHUB",
    positiveResponse: " Has attestation from Github",
    negativeResponse: " Does not have attestation from Github",
    baseURL: "https://passport.gitcoin.co/",
    tooltip:
      "Verified GitHub account. Proof of ownership of data is provided using cryptography, while keeping the data private.",
    group: "Verifications",
  },
  Facebook: {
    symbol: "Facebook",
    logo: logoFacebook,
    title: "FACEBOOK",
    positiveResponse: " Has attestation from Facebook",
    negativeResponse: " Does not have attestation from Facebook",
    baseURL: "https://passport.gitcoin.co/",
    tooltip:
      "Verified Facebook account. Proof of ownership of data is provided using cryptography, while keeping the data private.",
    group: "Verifications",
  },
  Brightid: {
    symbol: "Brightid",
    logo: logoBrightID,
    title: "BRIGHTID",
    positiveResponse: " Has attestation from Brightid",
    negativeResponse: " Does not have attestation from Brightid",
    baseURL: "https://passport.gitcoin.co/",
    tooltip:
      "Verified BrightID account. Proof of ownership of data is provided using cryptography, while keeping the data private.",
    group: "Verifications",
  },
  Discord: {
    symbol: "Discord",
    logo: logoDiscord,
    title: "DISCORD",
    positiveResponse: " Has attestation from Discord",
    negativeResponse: " Does not have attestation from Discord",
    baseURL: "https://passport.gitcoin.co/",
    tooltip:
      "Verified Discord account. Proof of ownership of data is provided using cryptography, while keeping the data private.",
    group: "Verifications",
  },
  Linkedin: {
    symbol: "Linkedin",
    logo: logoLinkedIn,
    title: "LINKEDIN",
    positiveResponse: " Has attestation from Linkedin",
    negativeResponse: " Does not have attestation from Linkedin",
    baseURL: "https://passport.gitcoin.co/",
    tooltip:
      "Verified Linkedin account. Proof of ownership of data is provided using cryptography, while keeping the data private.",
    group: "Verifications",
  },
};

export const issuersCredentialConstants = {
  Cheshire: {
    logo: logoKyCat,
    title: "KyCat",
  },
  Gitcoin: {
    logo: logoGitcoin,
    title: "Gitcoin Passport",
  },
};

export const credentialsConstants = {
  Telegram: {
    symbol: "Telegram",
    logo: logoTelegram,
    title: "TELEGRAM",
    positiveResponse: " Has attestation from Telegram",
    negativeResponse: " Does not have attestation from Telegram",
    baseURL: "https://telegram.org",
    getUrl: (address) => {
      return `https://telegram.org`;
    },
    tooltip:
      "Verified Telegram account. Proof of ownership of data is provided using cryptography, while keeping the data private.",
    group: "Verifications",
  },
  Google: {
    symbol: "Google",
    logo: logoGoogle,
    title: "GOOGLE",
    positiveResponse: " Has attestation from Google",
    negativeResponse: " Does not have attestation from Google",
    baseURL: "https://www.google.com/",
    getUrl: (address) => {
      return `https://www.google.com/`;
    },
    tooltip:
      "Verified Google account. Proof of ownership of data is provided using cryptography, while keeping the data private.",
    group: "Verifications",
  },
  Twitter: {
    symbol: "Twitter",
    logo: logoTwitter,
    title: "TWITTER",
    positiveResponse: " Has attestation from Twitter",
    negativeResponse: " Does not have attestation from Twitter",
    baseURL: "https://twitter.com/",
    getUrl: (address) => {
      return `https://twitter.com/`;
    },
    tooltip:
      "Verified Twitter account. Proof of ownership of data is provided using cryptography, while keeping the data private.",
    group: "Verifications",
  },
  Github: {
    symbol: "Github",
    logo: logoGitHub,
    title: "GITHUB",
    positiveResponse: " Has attestation from Github",
    negativeResponse: " Does not have attestation from Github",
    baseURL: "https://passport.gitcoin.co/",
    tooltip:
      "Verified GitHub account. Proof of ownership of data is provided using cryptography, while keeping the data private.",
    group: "Verifications",
  },
  Facebook: {
    symbol: "Facebook",
    logo: logoFacebook,
    title: "FACEBOOK",
    positiveResponse: " Has attestation from Facebook",
    negativeResponse: " Does not have attestation from Facebook",
    baseURL: "https://passport.gitcoin.co/",
    tooltip:
      "Verified Facebook account. Proof of ownership of data is provided using cryptography, while keeping the data private.",
    group: "Verifications",
  },
  Brightid: {
    symbol: "Brightid",
    logo: logoBrightID,
    title: "BRIGHTID",
    positiveResponse: " Has attestation from Brightid",
    negativeResponse: " Does not have attestation from Brightid",
    baseURL: "https://passport.gitcoin.co/",
    tooltip:
      "Verified BrightID account. Proof of ownership of data is provided using cryptography, while keeping the data private.",
    group: "Verifications",
  },
  Discord: {
    symbol: "Discord",
    logo: logoDiscord,
    title: "DISCORD",
    positiveResponse: " Has attestation from Discord",
    negativeResponse: " Does not have attestation from Discord",
    baseURL: "https://passport.gitcoin.co/",
    tooltip:
      "Verified Discord account. Proof of ownership of data is provided using cryptography, while keeping the data private.",
    group: "Verifications",
  },
  Linkedin: {
    symbol: "Linkedin",
    logo: logoLinkedIn,
    title: "LINKEDIN",
    positiveResponse: " Has attestation from Linkedin",
    negativeResponse: " Does not have attestation from Linkedin",
    baseURL: "https://passport.gitcoin.co/",
    tooltip:
      "Verified Linkedin account. Proof of ownership of data is provided using cryptography, while keeping the data private.",
    group: "Verifications",
  },
};

export const categoriesConstants = {
  VerifiedNonUS: {
    name: "VerifiedNonUS",
    title: "BAB & RealT",
    // logo: iconNotNonUS,
    // logoNot: iconNotNonUS,
    // iconMark: iconOk,
    colorPalette: "success",
    positiveTooltip:
      "It is very likely that the user is not from the United States, based at least on one of the verification traits.",
    negativeTooltip:
      "It is not possible to assess a person's status: if they are not from the United States.",
    address: {
      1115111: "0xF343EE410b7a313511845e964a9f6E4adBDF0398",
      137: "0x42D164151B610f35CECA24Dfa52Cd47bd1644F68",
      5: "0xBb17258487571828f4d79F750901CFBCCd0e2481",
      10: "0x1401F26774E27E711d4819c46b1bBed00A6f6Bbc",
      324: "0xfcc9b8d741b13137a53abe1fc4144c8d099a83bd",
      5001: "0x0cE1f283ca59C4F7fE7581DDb94e08eBff17869E",
    },
    getUrl: (address, category) => {
      return `${
        networksConstants[category?.data?.chainId].explorerURL
      }address/${category?.data?.contract}`;
    },
  },
  Human: {
    name: "Human",
    title: "Proof of humanity",
    // logo: iconNotHuman,
    // logoNot: iconNotHuman,
    // iconMark: iconOk,
    colorPalette: "success",
    positiveTooltip:
      "Address belongs to a person, considering the traits and activity.",
    negativeTooltip:
      "We do not have any information to evaluate the condition of humanity.",
    address: {},
  },
  CommunityMember: {
    name: "CommunityMember",
    title: "Community member",
    // logo: iconNotCommunity,
    // logoNot: iconNotCommunity,
    // iconMark: iconOk,
    colorPalette: "neutral",
    positiveTooltip:
      "The owner is a member of the community who has earned a reputation.",
    negativeTooltip:
      "We do not have any information about being part of the community.",
    address: {},
  },
  CHAINALYSIS_SANCTIONS: {
    name: "Chainalysis sanctions oracle",
    symbol: "CHAINALYSIS_SANCTIONS",
    // logo: iconNotSanctions,
    // logoNot: iconNotSanctions,
    title: "Sanctions",
    positiveResponse: "Clear",
    negativeResponse: "Sanctioned",
    // iconMark: iconStop,
    colorPalette: "warning",
    positiveTooltip: "Warning! The address is on a sanctions list!",
    negativeTooltip: "Not listed on known sanctions lists.",
    address: {},
  },
  BABTokenWeek: {
    name: "BABTokenWeek",
    // titleImage: imageZkBob,
    title: "BAB one week",
    // logo: iconZkBob,
    // logoNot: iconZkBob,
    // iconMark: iconOk,
    colorPalette: "success",
    positiveTooltip: "The owner can use zkBob service with advanced limits.",
    negativeTooltip:
      "The owner qualifing to this category can use zkBob service with advanced limits.",
    address: {
      1115111: "0x6137B159970e8c9C26f12235Fb6609CfBC6EE357",
      137: "0xE3c6Fd631043A0a1927c4681C736b778aA8F8feF",
      10: "0xDA0849088D63e1e708a469e11724c1Bd2f22C49D",
    },
    freeMintCampaign: "zkBob-special",
    getUrl: (address, category) => {
      return `${
        networksConstants[category?.data?.chainId].explorerURL
      }address/${category?.data?.contract}`;
    },
  },
  BABTokenBOB: {
    name: "BABTokenBOB",
    // titleImage: imageZkBob,
    title: "BAB token",
    // logo: iconZkBob,
    // logoNot: iconZkBob,
    // iconMark: iconOk,
    colorPalette: "success",
    positiveTooltip: "The owner can use zkBob service with advanced limits.",
    negativeTooltip:
      "The owner qualifing to this category can use zkBob service with advanced limits.",
    address: {
      1115111: "0x6137B159970e8c9C26f12235Fb6609CfBC6EE357",
      137: "0xE3c6Fd631043A0a1927c4681C736b778aA8F8feF",
      10: "0xDA0849088D63e1e708a469e11724c1Bd2f22C49D",
    },
    freeMintCampaign: "zkBob-special",
    getUrl: (address, category) => {
      return `${
        networksConstants[category?.data?.chainId].explorerURL
      }address/${category?.data?.contract}`;
    },
  },
};

export const networksConstants = {
  // 1: {
  //   id: 1,
  //   name: "Ethereum",
  //   explorerURL: "https://etherscan.io/",
  //   openSeaNftViewURL:
  //     "https://opensea.io/assets/ethereum/0x276086a6987d3b27c3e8b693a6b295ebe4bec843/",
  //   getNftUrl: (tokenID) => {
  //     return `https://etherscan.io/nft/0x276086a6987d3b27c3e8b693a6b295ebe4bec843/${tokenID}`;
  //   },
  //   logo: logoEth,
  // },
  // 100: {
  //   id: 100,
  //   name: "Gnosis",
  //   explorerURL: "https://gnosisscan.io/",
  //   getNftUrl: (tokenID) => {
  //     return `https://gnosisscan.io/nft/0x276086a6987d3b27c3e8b693a6b295ebe4bec843/${tokenID}`;
  //   },
  //   logo: logoGnosis,
  //   logoMonochrome: logoGnosisMonochrome,
  // },
  5: {
    id: 5,
    name: "Goerli",
    explorerURL: "https://goerli.etherscan.io/",
    getNftUrl: (tokenID) => {
      return `https://goerli.etherscan.io/token/0x190D936c25Ea1458A9A021Fb218468e4a5e1f795?a=${tokenID}$#inventory`;
    },
    logo: logoGoerli,
    type: "test",
  },
  137: {
    id: 137,
    name: "Polygon",
    explorerURL: "https://polygonscan.com/",
    openSeaNftViewURL:
      "https://opensea.io/assets/matic/0x276086a6987d3b27c3e8b693a6b295ebe4bec843/",
    getNftUrl: (tokenID) => {
      return `https://polygonscan.com/nft/0x276086a6987d3b27c3e8b693a6b295ebe4bec843/${tokenID}`;
    },
    logo: logoPolygon,
  },
  11155111: {
    id: 11155111,
    name: "Sepolia",
    explorerURL: "https://sepolia.etherscan.io/",
    getNftUrl: (tokenID) => {
      return `https://sepolia.etherscan.io/token/0x190D936c25Ea1458A9A021Fb218468e4a5e1f795?a=${tokenID}$#inventory`;
    },
    logo: logoSepolia,
    // type: "test",
  },
  // 10: {
  //   id: 10,
  //   name: "Optimism",
  //   explorerURL: "https://optimistic.etherscan.io/",
  //   getNftUrl: (tokenID) => {
  //     return `https://optimistic.etherscan.io/token/`;
  //   },
  //   logo: logoOptimism,
  // },
  // 324: {
  //   id: 324,
  //   name: "zkSync",
  //   explorerURL: "https://explorer.zksync.io/",
  //   getNftUrl: (tokenID) => {
  //     return `https://explorer.zksync.io/token/`;
  //   },
  //   logo: logoZkSync,
  // },
  5000: {
    id: 5000,
    name: "Mantle",
    explorerURL: "https://explorer.mantle.xyz",
    getNftUrl: (tokenID) => {
      return `https://explorer.mantle.xyz/token/`;
    },
    logo: logoMantle,
  },
  5001: {
    id: 5001,
    name: "Mantle Testnet",
    explorerURL: "https://explorer.testnet.mantle.xyz/",
    getNftUrl: (tokenID) => {
      return `https://explorer.testnet.mantle.xyz/token/`;
    },
    logo: logoMantleTestnet,
    type: "test",
  },
};

