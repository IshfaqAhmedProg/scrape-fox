import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../../components/Button/Button";
import Divider from "../../components/Divider/Divider";
import AuthBg from "../../public/Images/AuthBg.png";
import google from "../../public/Icons/Google.svg";
import styles from "../../styles/Forms.module.css";

const signup = () => {
  return (
    <>
      <div className={styles.content} data-shadow="outer">
        <h2>Create a new account</h2>
        <form className={styles.form}>
          <fieldset>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
          </fieldset>
          <fieldset>
            <span className={styles.label}>
              <input
                type="checkbox"
                id="terms"
                name="terms"
                value="terms"
                tabIndex="3"
                required
              />
              I Accept the&nbsp;
              <Link href="/">
                <b>Terms Of Service</b>
              </Link>
              &nbsp;and&nbsp;
              <Link href="/">
                <b>Privacy Policy</b>
              </Link>
            </span>
          </fieldset>
          <fieldset>
            <Button variant="primary" alternate type="submit">
              Sign Up
            </Button>
          </fieldset>
          <fieldset className={styles.divider}>
            <Divider direction="horizontal">or</Divider>
          </fieldset>
          <fieldset>
            <Button variant="plain">
              Sign up with Google&nbsp;
              <Image src={google} alt="google logo" />
            </Button>
          </fieldset>
          <fieldset>
            <p className={styles.label}>
              Don't have an account?&nbsp;
              <Link href="/signup" passHref>
                <b>Register Now</b>
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
      <div className={styles.background}>
        <Image src={AuthBg} alt="login background image" />
      </div>
    </>
  );
};

export default signup;
