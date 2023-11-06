import React from "react";
import stylesAddress from "../styles/Address.module.scss";
import styles from "../styles/Home.module.scss";

const Table = ({ data }) => {
  return (
    <div className={styles.section}>
      <h2 className={stylesAddress.title}>Mantle Journey Miles</h2>
      <div className={stylesAddress.table}>
        <div
          className={stylesAddress.table_header}
          style={{ borderTopLeftRadius: "16px" }}
        >
          Your Contributions
        </div>
        <div
          className={stylesAddress.table_header}
          style={{ borderTopRightRadius: "16px" }}
        >
          Your MJ Miles
        </div>
        {Object.values(data.miles.milesGroups).map((group, index) => (
          <>
            <div
              className={stylesAddress.table_cell}
              style={
                index % 2 === 0
                  ? {}
                  : { backgroundColor: "rgba(255, 255, 255, 0.02)" }
              }
            >
              {group.desc}
            </div>
            <div
              className={stylesAddress.table_cell}
              style={
                index % 2 === 0
                  ? {}
                  : { backgroundColor: "rgba(255, 255, 255, 0.02)" }
              }
            >{`${group.miles} / ${
              group.cap > 10000 ? group.cap / 1000 + " k" : group.cap
            }`}</div>
          </>
        ))}
        <div
          className={stylesAddress.table_footer}
          style={{ borderBottomLeftRadius: "16px" }}
        >
          Total MJ Miles
        </div>
        <div
          className={stylesAddress.table_footer}
          style={{ borderBottomRightRadius: "16px" }}
        >
          {data.miles.miles}
        </div>
      </div>
    </div>
  );
};
export default Table;
