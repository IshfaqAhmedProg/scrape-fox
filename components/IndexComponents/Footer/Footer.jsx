import React from "react";
import styles from "./Footer.module.css";
import CombinedLogo from "../../../public/Logos/CombinedLogo.svg";
import Image from "next/image";
import Link from "next/link";
import FacebookLogo from "../../../public/Logos/Socials/Facebook.svg";
import PinterestLogo from "../../../public/Logos/Socials/Pinterest.svg";
import LinkedInLogo from "../../../public/Logos/Socials/LinkedIn.svg";
const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logos}>
        <Image src={CombinedLogo} alt="ScrapeFox and VerifyFox" />
      </div>
      <div className={styles.menu}>
        <ul>
          <li>
            <Link href="#Services" scroll={false}>Services</Link>
          </li>
          <li>
            <Link href="#ContactUs" scroll={false}>Contact Us</Link>
          </li>
          <li>
            <Link href="#FAQ" scroll={false}>FAQ</Link>
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
      <div className={styles.contact}>
        <h2>Contact Us</h2>
        <p>
          <span>Email us at:</span>
          <br />
          support@scrapefox.com
          <br />
          <span>Phone Number</span>
          <br />xxxxxxx
        </p>
        <div className={styles.socials}>
          <Link href="/" passHref={true}>
            <Image src={FacebookLogo} alt="contact us on facebook" />
          </Link>
          <Link href="/" passHref={true}>
            <Image src={LinkedInLogo} alt="contact us on Linked In" />
          </Link>
          <Link href="/" passHref={true}>
            <Image src={PinterestLogo} alt="contact us on Pinterest" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
