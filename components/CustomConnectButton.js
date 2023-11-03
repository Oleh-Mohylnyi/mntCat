import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../styles/Home.module.scss";

const CustomConnectButton = ({typeStyle = ""}) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className={
                      typeStyle === "link" ? styles.link : styles.button
                    }
                    style={typeStyle === "link" ? { color: "rgba(255, 255, 255, 0.5)" } : {}}
                  >
                    {typeStyle === "link" ? "connect wallet" : "Connect Wallet"}
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className={styles.button}
                  >
                    Wrong network
                  </button>
                );
              }
              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    onClick={openAccountModal}
                    type="button"
                    className={styles.button}
                  >
                    {account.displayName
                      ? `Disconnect ${account.displayName}`
                      : "Disconnect wallet"}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default CustomConnectButton;
