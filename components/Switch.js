import React from "react";
import styles from "../styles/Address.module.scss";

const Switch = ({ result, synced, required, handleSwitch }) => {

  return (
    <div className={styles.switch_container}>
      <button
        className={styles.switch_button}
        type="button"
        style={
          !required
            ? { backgroundColor: "#ffea31" }
            : synced
            ? { backgroundColor: "#ffea3160" }
            : { backgroundColor: "#5F4C68" }
        }
        onClick={() => {
          if (required === true) {
            handleSwitch();
          }
        }}
        disabled={!result || !required}
      >
        <div
          className={styles.switch_slider}
          style={
            !required
              ? { transform: "translate(28px, 0px)" }
              : { transform: "translate(0px, 0px)" }
          }
        ></div>
      </button>
      {/* <div style={{ visibility: "hidden" }}>
          {!required ? <div>No</div> : <div>Yes</div>}
        </div> */}
    </div>
  );
};
export default Switch;
