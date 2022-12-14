import React from "react";
import Link from "next/link";
import Image from "next/image";
import Divider from "../Divider/Divider";
import styles from "./SidebarContent.module.css";
// Icons
import PointsIcon from "../../public/Icons/Points.svg";
import GoogleServicesIcon from "../../public/Icons/GoogleServices.svg";
import ValidatorServicesIcon from "../../public/Icons/ValidatorServices.svg";
import AccountIcon from "../../public/Icons/Account.svg";
import ShopIcon from "../../public/Icons/Shop.svg";
const SidebarContent = () => {
  return (
    <>
      <div className={styles.mainmenu}>
        <div className={styles.points}>
          <Image src={PointsIcon} alt="points icon" />
          <strong>888</strong> points
        </div>
        <div className={styles.menu}>
          <div className={styles.menutitle}>
            <Image src={GoogleServicesIcon} alt="Google services icon" />
            Google Services
          </div>
          <ul className={styles.items}>
            <li>
              <Link href="/">Google Maps Scraper</Link>
            </li>
          </ul>
        </div>
        <div className={styles.menu}>
          <div className={styles.menutitle}>
            <Image src={ValidatorServicesIcon} alt="Validator services icon" />
            Validator Services
          </div>
          <ul className={styles.items}>
            <li>
              <Link href="/">Email Validator</Link>
            </li>
            <li>
              <Link href="/">Phone Number Validator</Link>
            </li>
            <li>
              <Link href="/">WhatsApp Validator</Link>
            </li>
          </ul>
        </div>
        <Divider direction="horizontal" colorMode="dark" />
        <div className={styles.menu}>
          <div className={styles.menutitle}>
            <Image src={AccountIcon} alt="Account icon" />
            Account
          </div>
        </div>
        <div className={styles.menu}>
          <div className={styles.menutitle}>
            <Image src={ShopIcon} alt="Shop icon" />
            Buy More Points
          </div>
        </div>
      </div>
      <div className={styles.contact} data-shadow="inner">
        If you have any questions or queries please
        <span>
          Send us
          <br />a message
        </span>
        <Divider direction="horizontal" colorMode="dark">
          or
        </Divider>
        Send us an email:
        <Link href="/">scrapefox@gmail.com</Link>
      </div>
    </>
  );
};

export default SidebarContent;
