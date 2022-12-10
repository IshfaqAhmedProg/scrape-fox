import React, { useState } from "react";
import styles from "./FAQ.module.css";
import Plusicon from "../../../public/Icons/Plusicon.svg";
import Image from "next/image";
const FAQelement = ({ question, answer ,active}) => {
  return (
    <>
      <div className={styles.question} onClick={() => setIsActive(!isActive)}>
        <p>{question}</p>
        <Image src={Plusicon} alt="open" width={20} height={20} />
      </div>
      <div className={styles.answer + " " + (isActive ? styles.active : "")}>
        {answer}
      </div>
    </>
  );
};

export default FAQelement;
