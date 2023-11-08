import React, { useState, useEffect, useCallback } from "react";
import {
  useAccount,
  useNetwork,
  useSendTransaction,
  useWaitForTransaction,
} from "wagmi";
import Image from "next/image";
import { Oval } from "react-loader-spinner";

import { networksConstants } from "../utils/constants";
import { requestSyncData } from "../utils/api";
import { getShortAddress } from "../utils/tools";
import CustomConnectButton from "../components/CustomConnectButton";
import logoCheckMark from "../public/images/check-mark-icon.svg";
import styles from "../styles/Home.module.scss";
import stylesAddress from "../styles/Address.module.scss";

class CustomError extends Error {}

function SyncStepper({ syncRequestData, afterSyncAction }) {
  const [taskStatus, setTaskStatus] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState();
  const [transactionHash, setTransactionHash] = useState(null);
  const [syncData, setSyncData] = useState(null);

  const { isConnecting } = useAccount();
  const { chain } = useNetwork();

  const { data, status, sendTransaction } = useSendTransaction({
    chainId: syncRequestData.chainId,
    onError(error) {
      console.log("useSendTransaction error:", error);
      setError(error);
      setActiveStep(2);
    },
    onSuccess(data) {
      setTransactionHash(data.hash);
    },
  });
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    cacheTime: 2_000,
    onError(error) {
      console.log("useWaitForTransaction error:", error);
      setError(error);
      setActiveStep(2);
    },
    onSuccess() {
      setActiveStep(4);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      afterSyncAction(syncRequestData.providerSymbol, syncRequestData.chainId);
      // setTimeout(() => afterSyncAction(), 3000);
      setTransactionHash(data.hash);
    },
  });

  useEffect(() => {
    const fetchVerifyData = async () => {
      setError(null);
      if (syncRequestData.address && chain?.id) {
        if ([syncRequestData.chainId].includes(chain?.id)) {
          setActiveStep(1);
        } else {
          if (![syncRequestData.chainId].includes(chain?.id)) {
            setError(
              new CustomError(
                `You connected the wrong network. Expected network "${[
                  syncRequestData.chainId,
                ]
                  .map((n) => networksConstants[n].name)
                  .join(", ")}"`
              )
            );
          }
          setActiveStep(0);
        }
      } else {
        setActiveStep(0);
      }
    };
    fetchVerifyData();
  }, [
    chain?.id,
    isConnecting,
    syncRequestData.chainId,
    syncRequestData.address,
  ]);

  useEffect(() => {
    (async () => {
      try {
        const { address, sourceId, chainId } = syncRequestData;
        const syncData = await requestSyncData(address, sourceId, chainId);
        setSyncData(syncData);
      } catch {
        setError(
          new CustomError("Unknown server response. Please try again later.")
        );
      }
    })();
  }, [syncRequestData]);

  useEffect(() => {
    if (status === "loading") {
      setActiveStep(3);
    }
  }, [status]);

  const getErrorMessage = useCallback(() => {
    if (error instanceof CustomError) {
      return error.message;
    } else if (error.code === "ACTION_REJECTED") {
      return "User denied transaction signature.";
    } else {
      return "An unknown error occurred.";
      // Check the console for more details.
    }
  }, [error]);

  const renderMessageBlock = useCallback(() => {
    return (
      <div className={stylesAddress.stepper_message}>
        <div
          className={
            !!error
              ? stylesAddress.stepper_message_error
              : status === "loading" ||
                ((isLoading || taskStatus === "loading") &&
                  taskStatus !== "success")
              ? stylesAddress.stepper_message_loading
              : isSuccess || taskStatus === "success"
              ? stylesAddress.stepper_message_success
              : {}
          }
        >
          {!!error && getErrorMessage()}
          {(isLoading || taskStatus === "loading") &&
            taskStatus !== "success" &&
            "Transaction is pending"}
          {(isSuccess || taskStatus === "success") && "Success!"}
        </div>
      </div>
    );
  }, [error, status, taskStatus, isSuccess, isLoading, getErrorMessage]);

  const renderSyncButton = () => {
    return (
      <button
        onClick={() => {
          setError(null);
          setActiveStep(2);
          sendTransaction?.({
            ...syncData,
          });
        }}
        className={styles.button}
        style={{ width: "160px", marginTop: "16px" }}
        disabled={
          activeStep === 0 ||
          status === "loading" ||
          status === "success" ||
          !syncData
        }
      >
        {syncData ? (
          "Create attestation"
        ) : (
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
        )}
      </button>
    );
  };
  const renderHashLink = () => {
    return (
      <div className={stylesAddress.stepper_link}>
        <a
          href={`${
            networksConstants[chain?.id | 5000].explorerURL
          }/tx/${transactionHash}`}
          rel="noopener noreferrer"
          target="_blank"
          className="mint-link"
        >
          <span>View in explorer&nbsp;</span>
        </a>
      </div>
    );
  };

  return (
    <div>
      {activeStep === 4 ? (
        <div className={styles.flex} style={{ gap: "12px", color: "#00872E" }}>
          <Image src={logoCheckMark} alt="check mark" />
          <h2>Success!</h2>
        </div>
      ) : (
        <>
          <div className={styles.flex}>
            <div
              className={stylesAddress.stepper_tick}
              style={
                activeStep + 1 >= 1 ? { backgroundColor: "#FFFFFF50" } : {}
              }
            >
              {activeStep >= 1 ? (
                <Image src={logoCheckMark} alt="check mark" />
              ) : (
                <span>1</span>
              )}
            </div>
            <div className={stylesAddress.stepper_body}>
              <h2>Connect Wallet</h2>
              <div style={{ marginTop: "16px" }}>
                {activeStep === 0 ? (
                  <CustomConnectButton />
                ) : (
                  <span>{getShortAddress(syncRequestData.address, 6, 30)}</span>
                )}
              </div>
            </div>
          </div>
          <div className={stylesAddress.stepper_line}></div>

          <div className={styles.flex}>
            <div
              className={stylesAddress.stepper_tick}
              style={
                activeStep + 1 >= 2 ? { backgroundColor: "#FFFFFF50" } : {}
              }
            >
              {activeStep > 2 ? (
                <Image src={logoCheckMark} alt="check mark" />
              ) : (
                <span>2</span>
              )}
            </div>
            <div className={stylesAddress.stepper_body}>
              <h2 style={activeStep + 1 < 2 ? { opacity: "50%" } : {}}>
                Create attestation
              </h2>
              {renderSyncButton()}
            </div>
          </div>
          <div className={stylesAddress.stepper_line}></div>

          <div className={styles.flex}>
            <div
              className={stylesAddress.stepper_tick}
              style={activeStep >= 3 ? { backgroundColor: "#FFFFFF50" } : {}}
            >
              {activeStep > 3 ? (
                <Image src={logoCheckMark} alt="check mark" />
              ) : (
                <span>3</span>
              )}
            </div>
            <div
              className={stylesAddress.stepper_body}
              style={{ height: "52px" }}
            >
              <h2 style={activeStep < 3 ? { opacity: "50%" } : {}}>
                Confirm attestation
              </h2>
              <div style={{ margin: "6px" }}>
                {activeStep === 3 && (
                  <Oval
                    height={30}
                    width={30}
                    color="#4fa94d"
                    wrapperStyle={{}}
                    wrapperClass="mint-spinner"
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#4fa94d"
                    strokeWidth={4}
                    strokeWidthSecondary={5}
                  />
                )}
              </div>
            </div>
          </div>

          {renderMessageBlock()}
        </>
      )}
      {transactionHash && renderHashLink()}
    </div>
  );
}

export default SyncStepper;
