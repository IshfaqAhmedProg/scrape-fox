import Image from "next/image";
import React from "react";
import styles from "./Hero.module.css";
import LandingPageImage from "../../../public/Images/LandingPage.png";
import Button from "../../Button/Button";
import VerifyFoxLogo from "../../../public/Logos/VerifyFoxLogo.svg";
import { useRouter } from "next/router";
import Link from "next/link";
const Hero = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>
          <h1 data-aos="fade-right" data-aos-delay="300">
            Latest and Best
            <br />
            Technologies for
          </h1>
          <h1 data-aos="fade-right" data-aos-delay="600">
            <span>Lead Generation</span> & <span>Data Scraping</span>
          </h1>
        </div>
        <div className={styles.desc}>
          <p data-aos="fade-in" data-aos-delay="900">
            Are you here to validate <span>Phone Numbers </span>
            or
            <span> Email ID</span>? Then get started today for{" "}
            <strong>Free</strong> by clicking on the VerifyFox button below:
          </p>
          <Link href="/verifyfox" data-aos="zoom-in" data-aos-delay="1200">
            <Button variant="plain">
              <Image
                src={VerifyFoxLogo}
                alt="Visit VerifyFox"
                width={142}
                height={38}
              />
            </Button>
          </Link>
        </div>
      </div>
      <div className={styles.image} data-aos="fade-left">
        <Image src={LandingPageImage} alt="ScrapeFox Landing page image" />
      </div>
    </div>
  );
};

export default Hero;
