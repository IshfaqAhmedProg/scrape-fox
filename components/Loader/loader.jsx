import React from "react";
import styles from "./loader.module.css";
export default function Loader({ visible }) {
  return (
    <div
      className={styles.loaderwrapper}
      style={visible ? { display: "flex" } : { display: "none" }}
    >
      <svg
        className={styles.loader}
        id="Loader"
        width="100%"
        height="100%"
        viewBox="0 0 170 170"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M162 85C162 127.526 127.526 162 85 162C42.4741 162 8 127.526 8 85C8 42.4741 42.4741 8 85 8C127.526 8 162 42.4741 162 85Z"
          stroke="#AEAEAE"
          strokeWidth="11"
        >
          <animate
            attributeName="stroke"
            values="#AEAEAE;#e6e3e3;#AEAEAE"
            dur="2s"
            repeatCount="indefinite"
          ></animate>
        </path>
        <path
          d="M162 85C162 127.526 127.526 162 85 162C42.4741 162 8 127.526 8 85C8 42.4741 42.4741 8 85 8C127.526 8 162 42.4741 162 85Z"
          strokeWidth="15"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke"
            values="#7400B8; #518ee9; #51d7e9;#7400B8"
            dur="4s"
            repeatCount="indefinite"
          ></animate>
        </path>
      </svg>
    </div>
  );
}
