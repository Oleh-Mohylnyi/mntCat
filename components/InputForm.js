import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { isAddress } from "viem";
import { fetchEnsAddress } from "@wagmi/core";
import { useAccount } from "wagmi";
import { Oval } from "react-loader-spinner";
import CustomConnectButton from "../components/CustomConnectButton";
import { getShortAddress } from "../utils/tools";
import styles from "../styles/Home.module.scss";

const PLACEHOLDER = "enter the address or ENS";

const InputForm = ({ loading, setLoading }) => {
  const [invalidAddress, setInvalidAddress] = useState(false);
  const [value, setValue] = useState("");
  const [waitingСonnection, setWaitingСonnection] = useState(false);
  const [connected, setConnected] = useState(false);
  const { address: account, isConnected } = useAccount();
  const router = useRouter();
  const { address: addressRoute } = router.query;
  const [placeholder, setPlaceholder] = useState(
    addressRoute ? addressRoute : PLACEHOLDER
  );

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

        if (
          !value.endsWith(".eth") &&
          !value.endsWith(".co") &&
          !value.endsWith(".lens") &&
          !value.endsWith(".xyz") &&
          value.length < 21
        ) {
          value = value + ".eth";
        }
        if (
          value.endsWith(".eth") ||
          value.endsWith(".co") ||
          value.endsWith(".lens") ||
          value.endsWith(".xyz")
        ) {
          try {
            value = await fetchEnsAddress({
              name: value,
              chainId: 1,
            });
            if (!isAddress(value)) {
              setLoading(false);
              return setInvalidAddress(true);
            }
            setValue("");
            setPlaceholder(value);
          } catch {}
        }

        if (!isAddress(value)) {
          setLoading(false);
          return setInvalidAddress(true);
        }

        setPlaceholder(value);
        router.push(`/address/${value}`);
        setValue("");

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
    setConnected(isConnected);
    if (isConnected && waitingСonnection) {
      router.push(`/address/${account}`);
    }
  }, [isConnected]);

  return (
    <div>
      <div className={styles.inputForm_errorSection}>
        {invalidAddress && "Something is wrong, please control the information"}
      </div>
      <div className={styles.inputForm_inputSection}>
        <div className={styles.inputForm_form}>
          <input
            type="text"
            placeholder={placeholder}
            value={value.trim()}
            onChange={handleChange}
            disabled={loading}
            className={styles.inputForm_input}
            autoFocus
            inputMode="text"
          ></input>
          <button
            type="submit"
            // wideMobile
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
      <div className={styles.inputForm_linkSection}>
        {!addressRoute && (
          <>
            {connected ? (
              <div
                className={styles.link}
                onClick={() => router.push(`/address/${account}`)}
                style={{
                  color: "rgba(255, 255, 255, 0.5)",
                  textAlign: "center",
                }}
              >
                or use your wallet address {getShortAddress(account, 4, 34)}
              </div>
            ) : (
              <>
                <div style={{ color: "rgba(255, 255, 255, 0.5)" }}>or</div>
                <div onClick={() => setWaitingСonnection(true)}>
                  <CustomConnectButton typeStyle="link" />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default InputForm;
