import React from "react";
import styles from "../styles/Address.module.scss";

const SwitchComingSoon = ({ synced, required, handleSwitch }) => {

  return (
    <div className={styles.switch_container}>
      <div
        className={styles.switch_button}
        style={{
          backgroundColor: "transparent",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          fontSize: "9px",
          lineHeight: "1",
          color: "rgba(255, 255, 255, 0.3)",
        }}
      >
        <div
          className={styles.switch_slider}
          style={{
            backgroundColor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        ></div>
        &nbsp;soon
      </div>
    </div>
  );
};
export default SwitchComingSoon;
