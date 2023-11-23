import React from "react";
import Image from "next/image";
import Link from "next/link";
import Tooltip from "@material-ui/core/Tooltip";
import Switch from "./Switch";
import SwitchDefault from "./SwitchDefault";
import { providersConstants } from "../utils/constants";
import styles from "../styles/Home.module.scss";
import stylesAddress from "../styles/Address.module.scss";

const Card = ({
  provider,
  index,
  address,
  setOpenModalSync,
  setSyncRequestData,
}) => {
  return (
    <Tooltip
      title={
        <>
          {(provider.sync || provider.issuer) && (
            <p>
              {provider.result &&
              provider.status !== "pending" &&
              provider.status !== "error"
                ? providersConstants[provider.symbol]?.positiveResponse
                : providersConstants[provider.symbol]?.negativeResponse}
            </p>
          )}
          <p> {providersConstants[provider.symbol]?.tooltip}</p>
        </>
      }
      placement="bottom"
      key={index}
    >
      <div
        key={index}
        className={stylesAddress.card}
        style={
          !provider.result ||
          provider.status === "pending" ||
          provider.status === "error"
            ? {
                opacity: "20%",
              }
            : {}
        }
      >
        <div className={stylesAddress.card_flex}>
          <Link
            href={providersConstants[provider.symbol]?.baseURL}
            rel="loosener noreferrer"
            target="_blank"
            className={stylesAddress.card_link}
          >
            <div className={styles.flex}>
              {providersConstants[provider.symbol]?.logo && (
                <Image
                  src={providersConstants[provider.symbol]?.logo}
                  alt={`logo ${provider.name}`}
                  height={36}
                  width={36}
                />
              )}
              <h2 style={{ margin: "0 6px" }}>
                {providersConstants[provider.symbol].title}
              </h2>
            </div>
          </Link>

          <div>
            {provider.sync?.enabled ? (
              provider.sync.byChainIds?.map((byChainId, index) => {
                if (byChainId.chainId !== 5000) {
                  return null;
                }
                return (
                  <div key={index} className={stylesAddress.switch}>
                    <Switch
                      result={provider.result}
                      synced={byChainId.timestamp !== 0}
                      required={byChainId.required}
                      handleSwitch={() => {
                        if (byChainId.required) {
                          setSyncRequestData({
                            sourceId: provider.sync.sourceId,
                            chainId: byChainId.chainId,
                            address,
                            providerSymbol: provider.symbol,
                          });
                          setOpenModalSync(true);
                        }
                      }}
                    />
                  </div>
                );
              })
            ) : provider.status ? (
              <SwitchDefault preview={false} animation={false} />
            ) : null}
          </div>
        </div>
      </div>
    </Tooltip>
  );
};

export default Card;
