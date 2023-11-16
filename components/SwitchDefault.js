import React from "react";
import styles from "../styles/Address.module.scss";

const SwitchDefault = ({ preview, animation }) => {
  return (
    <div className={styles.switch_container}>
      <div
        className={styles.switch_button}
        style={
          preview
            ? animation
              ? {
                  backgroundColor: "#ffea31",
                  transition: "0.5s ease-in-out 0.5s",
                }
              : {
                  backgroundColor: "#5F4C68",
                  transition: "0.5s ease-in-out",
                }
            : {
                backgroundColor: "transparent",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                fontSize: "9px",
                lineHeight: "1",
                color: "rgba(255, 255, 255, 0.3)",
                transition: "0.5s ease-in-out",
              }
        }
      >
        <div
          className={styles.switch_slider}
          style={
            preview
              ? animation
                ? {
                    backgroundColor: "#FFFFFF",
                    transform: "translate(28px, 0px)",
                    transition: "0.5s ease-in-out 0.5s",
                  }
                : {
                    backgroundColor: "#FFFFFF",
                    transition: "0.2s ease-in-out",
                  }
              : {
                  backgroundColor: "transparent",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  transition: "0.2s ease-in-out",
                }
          }
        ></div>
        <span style={{ marginLeft: "3px" }}>{preview ? "" : "soon"}</span>
      </div>
    </div>
  );
};
export default SwitchDefault;
