import React from "react";
import styles from "../styles/Address.module.scss";

const SwitchComingSoon = ({ preview }) => {
  return (
    <div className={styles.switch_container}>
      <div
        className={styles.switch_button}
        style={
          preview
            ? { backgroundColor: "rgba(255, 255, 255, 0.3)" }
            : {
                backgroundColor: "transparent",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                fontSize: "9px",
                lineHeight: "1",
                color: "rgba(255, 255, 255, 0.3)",
              }
        }
      >
        <div
          className={styles.switch_slider}
          style={
            preview
              ? { backgroundColor: "#FFFFFF" }
              : {
                  backgroundColor: "transparent",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }
          }
        ></div>
        <span style={{ marginLeft: "3px" }}>{preview ? "" : "soon"}</span>
      </div>
    </div>
  );
};
export default SwitchComingSoon;
