import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./StorePage.module.css";
import XLPointsIcon from "../../../public/Icons/Shop/XLPoints.svg";
import Button from "../../Button/Button";
import Link from "next/link";
export const StoreElement = ({ offer }) => {
  return (
    <div className={styles.rowcard + " " + styles.inside} data-shadow="outer">
      <div className={styles.icon}>
        <Image
          src={"/Icons/Shop/" + offer.offerIcon}
          alt=""
          width={160}
          height={137}
        />
        <h2>
          {offer.offerPoints}
          <br />
          <span>points</span>
        </h2>
      </div>
      <p>{offer.offerDesc}</p>
      <div data-shadow="inner" className={styles.result}>
        {offer.offerBestDeal && (
          <div className={styles.highlighter} data-aos="fade-right">
            Best Deal!
          </div>
        )}
        <h3>
          ${offer.offerPrice} <i>USD</i>
        </h3>
        <Link href="/">More details</Link>
        <Button variant="primary">Refill</Button>
      </div>
    </div>
  );
};
