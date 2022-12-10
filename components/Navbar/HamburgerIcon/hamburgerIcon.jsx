import React, { useState } from "react";
import styles from "./hamburgerIcon.module.css";

function HamburgerIcon({onClick,toggle}) {
  return (
    <div
      id="Hamburger_icon"
      className={toggle ? (styles.hamburger+" "+styles.open) : (styles.hamburger)}
      onClick={onClick}
    >
      <div className={styles.icon}></div>
    </div>
  );
}

export default HamburgerIcon;
