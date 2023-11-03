import React, { useState, useEffect, useCallback } from "react";
import {
  useAccount,
  useNetwork,
  useSendTransaction,
  useWaitForTransaction,
} from "wagmi";
// import classNames from "classnames";
import { Oval } from "react-loader-spinner";
import Image from "next/image";
import styles from "../styles/Home.module.scss";

import { networksConstants } from "../utils/constants";
import CustomConnectButton from "../components/CustomConnectButton";
import { requestSyncData } from "../utils/api";
import { getShortAddress } from "../utils/tools";
import logoCheckMark from "../public/images/check-mark-icon.svg";

class CustomError extends Error {}

// const screenWidth = window.screen.width;
const screenWidth = 600;

function SyncStepper({ syncRequestData, afterSyncAction }) {
  // eslint-disable-next-line
  const [taskStatus, setTaskStatus] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState();
  const [transactionHash, setTransactionHash] = useState(null);
  const [syncData, setSyncData] = useState(null);

  const { isConnecting } = useAccount();
  const { chain } = useNetwork();

  console.log(syncRequestData);
  console.log("activeStep", activeStep);

  const { data, status, sendTransaction } = useSendTransaction({
    chainId: syncRequestData.chainId,
    onError(error) {
      console.log("useSendTransaction error:", error);
      setError(error);
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
    },
    onSuccess() {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setTimeout(() => afterSyncAction(), 3000);
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

  const tickClasses = (step) => "";
  //   const tickClasses = (step) =>
  //     classNames("mint-tick-box", activeStep + 1 >= step && "mint-tick-active");

  const messageClasses = "";
  //   const messageClasses = classNames(
  //     "mint-message",
  //     !!error && "mint-message-error",
  //     status === "loading" && "mint-message-loading",
  //     (isLoading || taskStatus === "loading") &&
  //       taskStatus !== "success" &&
  //       "mint-message-loading",
  //     (isSuccess || taskStatus === "success") && "mint-message-success"
  //   );

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
      <div>
        {!!error && getErrorMessage()}
        {status === "loading" && "Please, confirm to sync"}
        {(isLoading || taskStatus === "loading") &&
          taskStatus !== "success" &&
          "Transaction is pending"}
        {(isSuccess || taskStatus === "success") && "Success! Activity synced."}
      </div>
    );
  }, [error, status, taskStatus, isSuccess, isLoading, getErrorMessage]);

  const renderSyncButton = () => {
    return (
      <div className="mint-steps-frame mint-steps-button mint-steps-header-button">
        <button
          onClick={() => {
            setError(null);
            sendTransaction?.({
              ...syncData,
            });
          }}
          className={styles.button}
          disabled={
            activeStep === 0 ||
            status === "loading" ||
            status === "success" ||
            !syncData
          }
        >
          {syncData ? (
            "Sync activity"
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
      </div>
    );
  };
  const renderHashLink = () => {
    return (
      <>
        {transactionHash && (
          <div className="mint-steps-frame mint-steps-button mint-steps-no-border">
            <a
              href={`${
                networksConstants[chain?.id].explorerURL
              }tx/${transactionHash}`}
              rel="noopener noreferrer"
              target="_blank"
              className="mint-link"
            >
              <span>View in explorer&nbsp;</span>
            </a>
          </div>
        )}
      </>
    );
  };

  return (
    <div>
      <div className="mint-steps-block">
        <div className="mint-steps-header">
          <div className={tickClasses(1)}>
            {activeStep >= 1 ? (
              <Image src={logoCheckMark} alt="check mark" />
            ) : (
              <span className="mint-steps-number">1</span>
            )}
          </div>
          <div className="mint-steps-frame mint-steps-input">
            {activeStep === 0 ? (
              <CustomConnectButton
              // className={"mint-button"}
              // chainId={syncRequestData.chainId}
              />
            ) : (
              <span>
                {screenWidth < 768
                  ? getShortAddress(syncRequestData.address, 6, 30)
                  : syncRequestData.address}
              </span>
            )}
          </div>
        </div>
        <div className="mint-steps-body">
          <div className="mint-steps-line"></div>
        </div>

        <div className="mint-steps-header">
          <div className={tickClasses(2)}>
            {activeStep > 1 ? (
              <Image src={logoCheckMark} alt="check mark" />
            ) : (
              <span className="mint-steps-number">2</span>
            )}
          </div>
          {renderSyncButton()}
        </div>

        <div className="mint-steps-body">
          <div className="mint-steps-line mint-invisible-line"></div>
          <div className="mint-steps-content">{renderHashLink()}</div>
        </div>

        <div className="mint-message-block">
          <div className={messageClasses}>
            {(isLoading || taskStatus === "loading") &&
              taskStatus !== "success" &&
              !error && (
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
            {renderMessageBlock()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SyncStepper;
