import React, { useState } from "react";
import styles from "../styles/Address.module.scss";

const Switch = ({ synced, required, handleSwitch }) => {
  const [isActive, setIsActive] = useState(!required);

  return (
    <div className={styles.switch_container}>
      <button
        className={styles.switch_button}
        type="button"
        style={
          isActive
            ? { backgroundColor: "#ffea31" }
            : synced
            ? { backgroundColor: "#ffea3160" }
            : { backgroundColor: "#5F4C68" }
        }
        onClick={() => {
          if (isActive === false) {
            setIsActive(true);
            handleSwitch();
          }
        }}
      >
        <div
          className={styles.switch_slider}
          style={
            isActive
              ? { transform: "translate(28px, 0px)" }
              : { transform: "translate(0px, 0px)" }
          }
        ></div>
      </button>
      {/* <div style={{ visibility: "hidden" }}>
          {isActive ? <div>No</div> : <div>Yes</div>}
        </div> */}
    </div>
  );
};
export default Switch;
