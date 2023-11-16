import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Tooltip from "@material-ui/core/Tooltip";
import SwitchDefault from "./SwitchDefault";
import { providersConstants } from "../utils/constants";
import styles from "../styles/Home.module.scss";
import stylesAddress from "../styles/Address.module.scss";

const CardDefault = ({ provider, index }) => {
  const [animation, setAnimation] = useState(false);

  const handleAnimation = () => {
    setTimeout(() => {
      setAnimation(true);
    }, 1000 + index * 2000);
    setTimeout(() => {
      setAnimation(false);
    }, 3000 + index * 2000);
    setTimeout(() => {
      handleAnimation();
    }, 36000);
  };
  useEffect(() => {
    handleAnimation();
  }, []);

  return (
    <Tooltip
      title={providersConstants[provider.symbol]?.tooltip}
      placement="bottom"
      key={index}
    >
      <div
        key={index}
        className={stylesAddress.card}
        style={
          !animation
            ? { opacity: "20%", transition: "0.5s ease-in-out" }
            : { opacity: "100%", transition: "0.5s ease-in-out" }
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
            <SwitchDefault preview={true} animation={animation} />
          </div>
        </div>
      </div>
    </Tooltip>
  );
};

export default CardDefault;
