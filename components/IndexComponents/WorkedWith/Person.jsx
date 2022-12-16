import React from "react";
import styles from "./WorkedWith.module.css";
import avatar from "../../../public/Images/JohnDoe.png";
import Image from "next/image";
const Person = ({
  active,
  personId,
  personName,
  personAvatar = null,
  personComment,
}) => {
  return (
    <div
      className={
        styles.person +
        " " +
        (personId == "COMM" + active ? styles["active"] : "")
      }

    >
      <div className={styles.personimage}>
        <Image src={avatar} alt="person avatar" />
      </div>
      <div className={styles.personname}>
        <h2>{personName}</h2>
      </div>
      <div className={styles.personcomment}>
        <p>{personComment}</p>
      </div>
    </div>
  );
};

export default Person;
