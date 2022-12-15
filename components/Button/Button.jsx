import React, { useEffect, useRef } from "react";
import styles from "./Button.module.css";
export default function Button({ children, variant, alternate, ...others }) {
  const altPrimary = useRef();
  const variantBlue = [
    ["--text", "var(--white)"],
    ["--hover-text", "var(--accent)"],
    ["--active-text", "var(--white)"],
    ["--bg-color-before", "var(--accent)"],
    ["--bg-color-after", "var(--accentlight)"],
    ["--hover-bg-before", "var(--accentdark)"],
    ["--active-bg-before", "var(--accentdark)"],
  ];
  useEffect(() => {
    if (alternate != null) {
      variantBlue.forEach((element) => {
        altPrimary.current.style.setProperty(element[0], element[1]);
      });
    }
  });

  return (
    <>
      {variant == "leftarrow" || variant == "rightarrow" ? (
        <button {...others} className={styles.arrow + " " + styles[variant]}>
          <svg
            //Change this svg for changing arrow icon
            width="25px"
            height="25px"
            viewBox="0 0 32 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27 42.9998L8 23.9998L27 4.99976"
              stroke="#828282"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      ) : variant == "close" ? (
        <button {...others} className={styles.arrow + " " + styles[variant]}>
          <svg
            id="Layer_1"
            viewBox="0 0 512 512"
            width="25px"
            height="25px"
            xmlns="http://www.w3.org/2000/svg"
            fill="#828282"
          >
            <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
          </svg>
        </button>
      ) : (
        <button
          ref={alternate != null ? altPrimary : null}
          {...others}
          className={styles.buttonContainer + " " + styles[variant]}
        >
          {children}
        </button>
      )}
    </>
  );
}
