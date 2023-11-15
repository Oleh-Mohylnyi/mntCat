import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import {
  mainnet,
  mantle,
  mantleTestnet,
  polygon,
  arbitrum,
  bsc,
} from 'wagmi/chains';
// import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    mantle,
    polygon,
    arbitrum,
    bsc,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [mantleTestnet] : []),
  ],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://${chain.id === 56 ? "bsc" : chain.name.replace(/\s+/g, "-")}.publicnode.com`,
      }),
    }),
  ],
  // [publicProvider()]
);
// const mantleChain = chains.filter(chain => chain.id === 5000);
const { connectors } = getDefaultWallets({
  appName: 'mntCat App',
  projectId: 'dff8619ce6a2f8eeaa978332420e7794',
  // chains: mantleChain,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
