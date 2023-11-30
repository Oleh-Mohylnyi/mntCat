import React, { useEffect, useCallback, useState } from "react";
import {
  useAccount,
  useNetwork,
  useSendTransaction,
  useWaitForTransaction,
  useSignMessage,
  useSwitchNetwork,
  // chainId,
} from "wagmi";
import { useRouter } from "next/router";
import Image from "next/image";
import { ethers } from "ethers";
import { Oval } from "react-loader-spinner";

import { networksConstants } from "../utils/constants";
import CustomConnectButton from "./CustomConnectButton";
import { requestMint, requestTaskMint } from "../utils/api";
import { getShortAddress } from "../utils/tools";
import logoCheckMark from "../public/images/check-mark-icon.svg";
import styles from "../styles/Home.module.scss";
import stylesAddress from "../styles/Address.module.scss";

class CustomError extends Error {}

const supportedNetworks = [5000];

function getErrorMessage(error) {
  if (error instanceof CustomError) {
    return error.message;
  } else if (error.code === "ACTION_REJECTED") {
    return "User denied transaction signature.";
  } else {
    return "An unknown error occurred.";
    // Check the console for more details.
  }
}

const signMessageText = `I have read and accept Terms of Service, Privacy  Policy and Disclaimer as defined on Knowyourcat.id. \n
    I am lawfully permitted to access this site and use Cheshire under the laws of the jurisdiction on which I reside and am located.\n
    I understand the risks associated with entering and using developing technology of web3, DeFi and Cheshire protocol in particular.\n
    Furthermore, I acknowledge that:\n
    - I am not a US person (as defined in the Securities Act of 1933, as amended), or a citizen or resident of Canada, or a citizen or resident of Japan;\n
    - I do not and will not use VPN software or any other privacy or anonymization tool to circumvent any restrictions that apply to the service and the use of opium.finance;\n
    - (if you are entering into these terms as an individual) I am of legal age, as applicable in the jurisdiction in which I reside;\n
    - I confirm that I have not used Tornado Cash or similar services.`;

function MintStepper({ refreshData, campaign = false }) {
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState();
  const [taskId, setTaskId] = useState(null);
  const [transactionHash, setTransactionHash] = useState(null);
  const [taskStatus, setTaskStatus] = useState(null);
  // const [signVariables, setSignVariables] = useState(null);
  const [signData, setSignData] = useState(null);
  const router = useRouter();
  const { address: mintAddress } = router.query;
  const { address, isConnecting } = useAccount();
  const { chain } = useNetwork();

  // const handleClose = () => {
  //   onClose && onClose();
  //   setError();
  //   setTaskId(null);
  //   setTaskStatus(null);
  //   setTransactionHash(null);
  // };
  const { switchNetworkAsync } = useSwitchNetwork();

  const { signMessage, isLoading: isLoadingSign } = useSignMessage({
    async onSuccess(data, variables) {
      setActiveStep(2);
      setSignData(data);
      //   setSignVariables(variables);
    },
    onError(error) {
      setError(error);
    },
  });

  const { data, status, sendTransaction } = useSendTransaction({
    onError(error) {
      setTaskStatus("error");
      setError(error);
    },
    onSuccess(data) {
      const { hash } = data;
      setTransactionHash(hash);
    },
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    cacheTime: 2_000,
    onError(error) {
      setTaskStatus("error");
      setError(error);
    },
    onSettled(data) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      refreshData(address, specialMintQuery);
    },
  });

  const mint = async (selfMint, chainId) => {
    setTaskStatus("loading");
    const result = await requestMint({
      address: mintAddress,
      data: signData,
      selfMint,
      chainId,
    });
    const { taskId, to } = result;
    if (!!taskId) {
      setTaskId(taskId);
      const waitingTaskState = async () => {
        const response = await requestTaskMint(result.taskId);
        if (!!response?.transactionHash) {
          setTransactionHash(response.transactionHash);
        }
        if (response?.taskState !== "ExecSuccess") {
          setTimeout(waitingTaskState, 5000);
        } else {
          setTaskStatus("success");
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          refreshData(address, specialMintQuery);
        }
      };
      //   setTaskStatus("loading");
      waitingTaskState();
    } else if (!!to && !!result.chainId) {
      if (result.chainId !== chain?.id) {
        try {
          await switchNetworkAsync?.(result.chainId);
        } catch (error) {
          if (error.message === "Chain not configured") {
            throw new CustomError("Chain not configured");
          }
          throw error;
          setTaskStatus("error");
        }
      }
      sendTransaction?.({
        to,
        data: result.data,
      });
    } else {
      setTaskStatus("error");
      setError("Unknown server response. Please try again later.");
    }
  };
  
  useEffect(() => {
    const fetchVerifySyncData = async () => {
      setError();

      if (address && chain?.id) {
        if (supportedNetworks.includes(chain?.id)) {
          setActiveStep(signData ? 2 : 1);
        } else {
          if (!supportedNetworks.includes(chain?.id)) {
            setError(
              new CustomError(
                `You connected the wrong network. Expected network "${supportedNetworks
                  .map((n) => networksConstants[n].name || "another")
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

    fetchVerifySyncData();
  }, [mintAddress, address, chain?.id, signData, isConnecting]);

  useEffect(() => {
    if (chain?.id === 100 && transactionHash) {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://rpc.gnosischain.com"
      );

      const waitTx = async () => {
        let tx = await provider.getTransaction(transactionHash);
        if (tx && tx.blockNumber) {
          setTaskStatus("success");
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          refreshData(address, specialMintQuery);
        } else {
          setTimeout(waitTx, 5000);
        }
      };
      setTaskStatus("loading");
      waitTx();
    }
    // eslint-disable-next-line
  }, [transactionHash, chain?.id]);

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
          {!!error && getErrorMessage(error)}
          {/* {(isLoading || taskStatus === "loading") &&
            taskStatus !== "success" &&
            "Transaction is pending"} */}
          {/* {(isSuccess || taskStatus === "success") && "Success!"} */}
        </div>
      </div>
    );
  }, [error, status, taskStatus, isSuccess, isLoading]);

  const renderSignButton = () => {
    return (
      <button
        onClick={async () => {
          setError(null);
          await signMessage({
            message: signMessageText,
            address,
          });
        }}
        className={styles.button}
        style={{ width: "160px", marginTop: "8px" }}
        disabled={activeStep === 0 || isLoadingSign || signData}
      >
        {isLoadingSign ? (
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
        ) : signData ? (
          "signed"
        ) : (
          "Read and sign"
        )}
      </button>
    );
  };

  const renderMintButton = () => {
    return (
      <button
        onClick={async () => {
          // mint(true, chain.id);
        }}
        className={styles.button}
        style={{ width: "160px", marginTop: "8px" }}
        disabled={
          (activeStep < 2 && !signData) || taskStatus === "loading" || isLoading
        }
      >
        {taskStatus === "loading" || isLoading ? (
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
            // `Mint on ${networksConstants[chain.id].name}`
        "coming soon"
        )}
      </button>
    );
  };

  const renderHashLink = () => {
    return (
      <div className="mint-steps-frame mint-steps-button mint-steps-no-border">
        <a
          href={`${networksConstants[chain?.id].explorerURL}tx/${data?.hash}`}
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
      {activeStep === 3 ? (
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
              <div style={{ marginTop: "8px" }}>
                {activeStep === 0 ? (
                  <CustomConnectButton />
                ) : (
                  <span>{getShortAddress(address, 6, 30)}</span>
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
              {activeStep >= 2 ? (
                <Image src={logoCheckMark} alt="check mark" />
              ) : (
                <span>2</span>
              )}
            </div>
            <div className={stylesAddress.stepper_body}>
              <h2 style={activeStep + 1 < 2 ? { opacity: "50%" } : {}}>
                Acknowledge the terms
              </h2>
              {renderSignButton()}
            </div>
          </div>
          <div className={stylesAddress.stepper_line}></div>

          <div className={styles.flex}>
            <div
              className={stylesAddress.stepper_tick}
              style={activeStep >= 2 ? { backgroundColor: "#FFFFFF50" } : {}}
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
              <h2 style={activeStep < 2 ? { opacity: "50%" } : {}}>
                Mint your Cat
              </h2>
              {renderMintButton()}
            </div>
          </div>

          {renderMessageBlock()}
        </>
      )}
      {transactionHash && renderHashLink()}
    </div>
  );
}

export default MintStepper;
