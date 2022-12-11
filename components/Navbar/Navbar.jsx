import React, { useState } from "react";
import Link from "next/link";
//import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./Navbar.module.css";
import Button from "../Button/Button";
import HamburgerIcon from "./HamburgerIcon/hamburgerIcon";

export default function Navbar() {
  const [toggled, setToggled] = useState(false);
  const user = null;
  //const { user, logout } = useAuth();
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.bg} data-shadow="outer"></div>
      <div className={styles.logo}>
        <Link href="/" passHref>
          <Image
            src="/Logos/ScrapeFoxLogo.svg"
            alt="Logo"
            width={235}
            height={58}
            priority
          />
        </Link>
      </div>
      <HamburgerIcon onClick={() => setToggled(!toggled)} toggle={toggled} />
      <div
        className={
          toggled ? styles.menubg : styles.menubg + " " + styles.hidden
        }
        onClick={() => setToggled(!toggled)}
      ></div>

      <ul className={toggled ? styles.menu + " " + styles.open : styles.menu}>
        <li className={styles.menuItem} onClick={() => setToggled(!toggled)}>
          <Link href="#Services">Services</Link>
        </li>

        <li className={styles.menuItem} onClick={() => setToggled(!toggled)}>
          <Link href="#ContactUs">Contact Us</Link>
        </li>
        <li className={styles.menuItem} onClick={() => setToggled(!toggled)}>
          <Link href="#FAQ">FAQ</Link>
        </li>
        {user && router.pathname != "/dashboard" ? (
          <li className={styles.menuItem} onClick={() => setToggled(!toggled)}>
            <Link href="/dashboard">Dashboard</Link>
          </li>
        ) : (
          ""
        )}
        <li className={styles.menuItem} onClick={() => setToggled(!toggled)}>
          {user ? ( //to show logout button
            <Button
              onClick={() => {
                router.replace("/");
                logout();
              }}
              variant="primary"
              alternate
            >
              Logout
            </Button>
          ) : router.pathname != "/login" ? ( //to show log in button
            <Link href="/login" passHref>
              {router.pathname != "/" ? (
                <Button variant="primary">Log In</Button>
              ) : (
                "Log In"
              )}
            </Link>
          ) : (
            //to show sign up button
            <Link href="/signup" passHref>
              <Button variant="primary">Sign Up</Button>
            </Link>
          )}
        </li>
        {router.pathname == "/" && user == null ? (
          <li className={styles.menuItem} onClick={() => setToggled(!toggled)}>
            <Link href="/signup">
              <Button alternate variant="primary">
                Sign Up
              </Button>
            </Link>
          </li>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
}
