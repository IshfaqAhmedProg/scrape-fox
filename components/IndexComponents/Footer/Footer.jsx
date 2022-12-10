import React from "react";
import styles from "./Footer.module.css";
import CombinedLogo from "../../../public/Logos/CombinedLogo.svg";
import Image from "next/image";
import Link from "next/link";
const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logos}>
        <Image src={CombinedLogo} alt="ScrapeFox and VerifyFox" />
      </div>
      <div className={styles.menu}>
        <ul>
          <li>
            <Link href="/">Services</Link>
          </li>
          <li>
            <Link href="/">Contact Us</Link>
          </li>
          <li>
            <Link href="/">FAQ</Link>
          </li>
        </ul>
      </div>
      <div className={styles.services}>
        <h2>Services we provide</h2>
        <ul>
          <li>
            <Link href="/">Email Verifier</Link>
          </li>
          <li>
            <Link href="/">Google Maps Scraper</Link>
          </li>
          <li>
            <Link href="/">WhatsApp Validator</Link>
          </li>
          <li>
            <Link href="/">Phone Number Validator</Link>
          </li>
        </ul>
      </div>
      <div className={styles.contact}></div>
    </div>
  );
};

export default Footer;
