import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { providers, utils } from "ethers";
import { fetchEnsAddress } from "@wagmi/core";
import Image from "next/image";
import { useAccount } from "wagmi";
import styles from "../styles/Home.module.scss";
import { Oval } from "react-loader-spinner";

const PLACEHOLDER = "enter the address or ENS";
const SUBMIT_BUTTON_TITLE = (
  <>
    <span>Generate WEB</span>
    <span className="input-text-sub">3</span>
    <span>&nbsp;ID</span>
  </>
);

const InputForm = ({ loading, setLoading }) => {
  const [invalidAddress, setInvalidAddress] = useState(false);
  const [value, setValue] = useState("");
  const { address: account } = useAccount();
  const router = useRouter();
  const { address: addressRoute } = router.query;
  const [placeholder, setPlaceholder] = useState(addressRoute || PLACEHOLDER);
  //   const specialMintQuery = useMemo(() => {
  //     const queryString = location.search;
  //     const urlParams = new URLSearchParams(queryString);
  //     const specialMintName = urlParams.get("specialmint");
  //     return specialMintName ? `?specialmint=${specialMintName}` : "";
  //   }, [location]);

  const inputClasses = styles.input;
  //   `input-${typeStyle}_input`,
  // ${ "input-warning_invalid": invalidAddress }
  // ${ "input-loader": loading }`;

  const handleChange = (e) => {
    setInvalidAddress(false);
    setLoading(false);
    setValue(e.target.value.trim());
  };

  const handleVerify = useCallback(
    async (inputValue) => {
      try {
        setLoading(true);
        let value = inputValue.toLowerCase();
        //   if (value === store.address) {
        //     setTimeout(() => setLoading(false), 600);
        //     setAddress("");
        //     return getAddressData(value, specialMintQuery);
        //   }
        //   if (
        //     !value.endsWith(".eth") &&
        //     !value.endsWith(".co") &&
        //     !value.endsWith(".lens") &&
        //     !value.endsWith(".xyz") &&
        //     value.length < 21
        //   ) {
        //     value = value + ".eth";
        //   }
        //   if (
        //     value.endsWith(".eth") ||
        //     value.endsWith(".co") ||
        //     value.endsWith(".lens") ||
        //     value.endsWith(".xyz")
        //   ) {
        //     value = await fetchEnsAddress({
        //       name: value,
        //       chainId: 1,
        //     });
        // const provider = new providers.JsonRpcProvider(
        //   "https://mainnet.infura.io/v3/723fae493ef5485381f4974be919da80"
        // );
        // const addr = address.endsWith(".lens") ? `${value}.xyz` : value;
        // value = await provider.resolveName(addr);
        //   }
        //   if (!utils.isAddress(value)) {
        //     setLoading(false);
        //     return setInvalidAddress(true);
        //   }
        //   if (value === store.address) {
        //     setTimeout(() => setLoading(false), 600);
        //     setAddress("");
        //     return getAddressData(value, specialMintQuery);
        //   }

        //   setLoading(false);
        //   setAddress("");
        //   store.setProviders([]);
        //   store.setCategories([]);
        setPlaceholder(value);
        router.push(`/address/${value}`);
        //   if (value !== store.address) {
        //     store.deleteCheshireImage();
        //   }
        // store.setAddress(value);
        //   if (pageRoute === "address" || pageRoute === "home") {
        //     return history.replace(`/address/${value}${specialMintQuery}`);
        //   }
        //   if (pageRoute === "activities") {
        //     return history.replace(`/activities/${value}${specialMintQuery}`);
        //   }

        setLoading(false);
      } catch {
        setLoading(false);
      }
    },
    // eslint-disable-next-line
    [value]
  );

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Enter" && e.target.nodeName === "INPUT") {
        setValue(e.target.value);
        handleVerify(e.target.value);
      }
    },
    [handleVerify]
  );

  useEffect(() => {
    // setPlaceholder(address);
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

    useEffect(() => {
      setPlaceholder(addressRoute);
    }, [addressRoute]);

  return (
    <div className={styles.section}>
      {invalidAddress && (
        <div>Something is wrong, please control the information</div>
      )}
      <div className={styles.form}>
        <input
          type="text"
          // label="Verify"
          // labelHidden
          placeholder={placeholder}
          value={value.trim()}
          onChange={handleChange}
          disabled={loading}
          className={styles.input}
          autoFocus
          inputMode="text"
        ></input>
        <button
          type="submit"
          wideMobile
          onClick={() => {
            handleVerify(value);
          }}
          disabled={!value || loading}
          className={styles.button}
          style={{ width: "60px" }}
        >
          {loading ? (
            <Oval
              height={18}
              width={18}
              color="#000"
              wrapperStyle={{ marginLeft: "auto", marginRight: "auto" }}
              wrapperClass={styles.flex}
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="rgb(35, 35, 35)"
              strokeWidth={3}
              strokeWidthSecondary={5}
            />
          ) : (
            "OK"
          )}
        </button>
      </div>
    </div>
  );
};

export default InputForm;
