import React from "react";
import styles from "./Divider.module.css";
export default function Divider({ children, direction, colorMode = null }) {
  return children ? (
    <div
      id="divider"
      className={
        styles.container + " " + styles[direction] + " " + styles[colorMode]
      }
    >
      <span className={styles.divider}></span>
      {children}
      <span className={styles.divider}></span>
    </div>
  ) : (
    <div
      id="divider"
      className={
        styles.container + " " + styles[direction] + " " + styles[colorMode]
      }
    >
      <span className={styles["single"] + " " + styles.divider}></span>
    </div>
  );
}
