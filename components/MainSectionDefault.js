import React, { useState } from "react";
import Image from "next/image";
import InputForm from "./InputForm";
import CardDefault from "./CardDefault";
import { skeletonProvidersData } from "../utils/skeleton";
import defaultCat from "../public/images/defaultCat.png";
import styles from "../styles/Home.module.scss";
import stylesAddress from "../styles/Address.module.scss";

const MainSectionDefault = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <h1 className={styles.title}>Bridge your identity into Mantle</h1>

      <InputForm loading={loading} setLoading={setLoading} />

      <div className={styles.section}>
        <h2 className={stylesAddress.title}>
          Bridge attestation proofs from other from other chain with you
        </h2>
        <div className={stylesAddress.block}>
          <div className={stylesAddress.block_left}>
            <div className={stylesAddress.grid}>
              {skeletonProvidersData.map((provider, index) => (
                <CardDefault provider={provider} index={index} key={index} />
              ))}
            </div>
          </div>

          <div className={stylesAddress.block_right}>
            <div className={stylesAddress.thumb}>
              <Image
                src={defaultCat}
                alt="kyCat image"
                priority={true}
                width={1000}
                height={1000}
              />
              <div className={stylesAddress.gradient}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainSectionDefault;
