import Image from "next/image";
import React from "react";
import styles from "./StorePage.module.css";
import PublicRelationsIcon from "../../../public/Icons/PublicRelations.svg";
import Button from "../../Button/Button";
import { StoreElement } from "./StoreElement";

import StoreData from "../../../shared/Data/store.json";
const StorePage = () => {
  return (
    <section id="shopPage" className={styles.container}>
      <h2 data-aos="fade-in">
        Store <span>- Looking to buy more points?</span>
      </h2>
      <div
        className={styles.rowcard + " " + styles.outside}
        data-shadow="outer"
        data-clickable="true"
        data-aos="fade-right"
      >
        <p>
          Click here to contact our public relations team directly, for{" "}
          <strong>bulk scraping</strong> or <strong>validating jobs</strong> and
          to know about even <strong>better offers</strong>.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: "1",
          }}
        >
          <Image src={PublicRelationsIcon} alt="" />
          <Button variant="rightarrow" />
        </div>
      </div>

      <div
        className={styles.content}
        data-shadow="inner"
        data-aos="zoom-in"
        data-aos-delay="300"
      >
        {StoreData.map((offer) => {
          return <StoreElement key={offer.offerId} offer={offer} />;
        })}
      </div>
    </section>
  );
};

export default StorePage;
