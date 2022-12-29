import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Divider from "../../Divider/Divider";
import Button from "../../Button/Button";

import styles from "./Sidebar.module.css";
// Icons
import PointsIcon from "../../../public/Icons/Points.svg";
import GoogleServicesIcon from "../../../public/Icons/GoogleServices.svg";
import ValidatorServicesIcon from "../../../public/Icons/ValidatorServices.svg";
import HomeIcon from "../../../public/Icons/Home.svg";
import AccountIcon from "../../../public/Icons/Account.svg";
import ShopIcon from "../../../public/Icons/Shop.svg";
import { useUserDb } from "../../../contexts/UserDatabaseContext";
import { useRouter } from "next/router";
const Sidebar = () => {
  const [sbToggle, setSbToggle] = useState(false);
  const { getUserTasks, setUserTasks } = useUserDb();
  const router = useRouter();
  useEffect(() => {});
  return (
    <>
      <div
        className={styles.overlay + " " + (sbToggle ? styles["open"] : "")}
        onClick={() => setSbToggle(false)}
      ></div>

      <div
        onClick={() => setSbToggle(!sbToggle)}
        className={styles.sidebar + " " + (sbToggle ? styles["open"] : "")}
      >
        <div data-aos="slide-right" className={styles.content}>
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
                <li>Google Maps Scraper</li>
              </ul>
            </div>
            <div className={styles.menu}>
              <div className={styles.menutitle}>
                <Image
                  src={ValidatorServicesIcon}
                  alt="Validator services icon"
                />
                Validator Services
              </div>
              <ul className={styles.items}>
                <li>
                  <Link href="/dashboard/validators/emailvalidator">
                    Email Validator
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/validators/phonenumbervalidator">
                    Phone Number Validator
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/validators/whatsappvalidator">
                    WhatsApp Validator
                  </Link>
                </li>
              </ul>
            </div>
            <Divider direction="horizontal" colorMode="dark" />
            <div className={styles.menu}>
              <Link href="/dashboard">
                <div className={styles.menutitle}>
                  <Image src={HomeIcon} alt="Home icon" />
                  Home
                </div>
              </Link>
            </div>
            <div className={styles.menu}>
              <Link href="/dashboard/profile">
                <div className={styles.menutitle}>
                  <Image src={AccountIcon} alt="Account icon" />
                  Profile
                </div>
              </Link>
            </div>
            <div className={styles.menu}>
              <Link href="/dashboard/store">
                <div className={styles.menutitle}>
                  <Image src={ShopIcon} alt="Shop icon" />
                  Buy More Points
                </div>
              </Link>
            </div>
          </div>
          <div className={styles.contact} data-shadow="inner">
            If you have any questions or queries please
            <Button variant="plain" onClick={setUserTasks}>
              <svg
                width="34"
                height="33"
                viewBox="0 0 34 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.7207 17.8354C17.6144 17.8354 18.3389 17.1109 18.3389 16.2172C18.3389 15.3235 17.6144 14.5991 16.7207 14.5991C15.827 14.5991 15.1025 15.3235 15.1025 16.2172C15.1025 17.1109 15.827 17.8354 16.7207 17.8354Z"
                  fill="#5781FF"
                />
                <path
                  d="M23.1929 17.8354C24.0866 17.8354 24.811 17.1109 24.811 16.2172C24.811 15.3235 24.0866 14.5991 23.1929 14.5991C22.2992 14.5991 21.5747 15.3235 21.5747 16.2172C21.5747 17.1109 22.2992 17.8354 23.1929 17.8354Z"
                  fill="#5781FF"
                />
                <path
                  d="M10.248 17.8354C11.1417 17.8354 11.8662 17.1109 11.8662 16.2172C11.8662 15.3235 11.1417 14.5991 10.248 14.5991C9.35436 14.5991 8.62988 15.3235 8.62988 16.2172C8.62988 17.1109 9.35436 17.8354 10.248 17.8354Z"
                  fill="#5781FF"
                />
                <path
                  d="M28.1609 4.7768C25.5058 2.10441 22.0016 0.442094 18.2523 0.0764366C14.503 -0.289221 10.7436 0.664696 7.62222 2.77373C4.50085 4.88276 2.21311 8.01475 1.15343 11.6297C0.0937393 15.2447 0.328506 19.1161 1.81725 22.5766C1.97242 22.8982 2.02333 23.2602 1.96289 23.6122L0.538907 30.457C0.484045 30.7194 0.495248 30.9914 0.571509 31.2484C0.64777 31.5054 0.786699 31.7395 0.97581 31.9295C1.13084 32.0834 1.31542 32.2043 1.51843 32.285C1.72145 32.3656 1.93869 32.4044 2.15707 32.3988H2.4807L9.40642 31.0072C9.75842 30.9649 10.1154 31.015 10.442 31.1528C13.9025 32.6416 17.7739 32.8763 21.3889 31.8166C25.0039 30.7569 28.1358 28.4692 30.2449 25.3478C32.3539 22.2265 33.3078 18.4671 32.9422 14.7178C32.5765 10.9685 30.9142 7.46422 28.2418 4.80916L28.1609 4.7768ZM29.504 18.3046C29.1876 20.2367 28.4371 22.0718 27.309 23.6719C26.1809 25.272 24.7046 26.5954 22.9911 27.5425C21.2777 28.4895 19.3717 29.0356 17.4167 29.1397C15.4617 29.2437 13.5085 28.9029 11.7042 28.143C11.0643 27.8708 10.3769 27.7279 9.68151 27.7223C9.37775 27.7244 9.07467 27.7515 8.77534 27.8032L4.21213 28.7256L5.13448 24.1624C5.31818 23.1741 5.19976 22.1534 4.79467 21.2335C4.03477 19.4292 3.69401 17.476 3.79803 15.521C3.90206 13.566 4.44816 11.66 5.39524 9.94658C6.34232 8.23311 7.6657 6.75678 9.2658 5.62868C10.8659 4.50058 12.701 3.7501 14.6331 3.43373C16.6611 3.1009 18.7392 3.25569 20.6955 3.88529C22.6518 4.5149 24.4301 5.60123 25.8833 7.05442C27.3365 8.50761 28.4228 10.2859 29.0524 12.2422C29.682 14.1985 29.8368 16.2766 29.504 18.3046Z"
                  fill="#5781FF"
                />
              </svg>
              Create a test
              <br />
              Task
            </Button>
            <Divider direction="horizontal" colorMode="dark">
              or
            </Divider>
            Send us an email:
            <Link href="/">scrapefox@gmail.com</Link>
          </div>
        </div>
        <div
          className={styles.sidebartoggle}
          onClick={() => setSbToggle(!sbToggle)}
          data-shadow="outer"
        >
          <Button variant="rightarrow" />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
