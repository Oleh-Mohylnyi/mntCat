import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  mantle,
  mantleTestnet
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    mantle,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [mantleTestnet] : []),
  ],
  [publicProvider()]
);
const mantleChain = chains.filter(chain => chain.id === 5000);
const { connectors } = getDefaultWallets({
  appName: 'mntCat App',
  projectId: 'dff8619ce6a2f8eeaa978332420e7794',
  chains: mantleChain,
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
