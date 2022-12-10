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
      <p>{children}</p>
      <span className={styles.divider} style={{rotate:"180deg",scale:"1 0.9"}}></span>
    </div>
  ) : (
    <div
      id="divider"
      className={styles.container + " " + styles[direction]}
    >
      <span className={styles["single"] + " " + styles.divider}></span>
    </div>
  );
}
