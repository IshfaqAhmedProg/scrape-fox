import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "../../../Button/Button";
import styles from "./ServiceCard.module.css";
export const ServiceCard = ({
  serviceIndex,
  serviceImage,
  serviceName,
  serviceDesc,
}) => {
  return (
    <div
      className={styles.container}
      data-aos="zoom-in"
      data-aos-delay={serviceIndex * 100}
      data-aos-anchor-placement="bottom-bottom"
    >
      <div className={styles.bg}></div>
      <div className={styles.image}>
        <Image src={serviceImage} alt={serviceName + "Icon"} />
      </div>
      <div className={styles.title}>{serviceName}</div>
      <div className={styles.desc}>
        <p>{serviceDesc}</p>
      </div>
      <div className={styles.moreinfo}>
        <Link href="/">More Details</Link>
        <Button variant="primary">Try Now</Button>
      </div>
    </div>
  );
};
