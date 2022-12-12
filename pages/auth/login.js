import Image from "next/image";
import React from "react";
import styles from "../../styles/Forms.module.css";
import AuthBg from "../../public/Images/AuthBg.png";
import Link from "next/link";
import Button from "../../components/Button/Button";
import Divider from "../../components/Divider/Divider";
import google from "../../public/Icons/Google.svg";
const login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content} data-shadow="outer">
        <h2>Log In</h2>
        <form className={styles.form}>
          <fieldset>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
          </fieldset>
          <fieldset>
            <p className={styles.label}>
              Forgot your password?&nbsp;<Link href="/">Reset Password</Link>
            </p>
          </fieldset>
          <fieldset>
            <Button variant="primary" alternate type="submit">
              Log In
            </Button>
          </fieldset>
          <fieldset className={styles.divider}>
            <Divider direction="horizontal">or</Divider>
          </fieldset>
          <fieldset>
            <Button variant="plain" type="submit">
              Sign in with Google&nbsp; <Image src={google} alt="google logo" />
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
    </div>
  );
};

export default login;
