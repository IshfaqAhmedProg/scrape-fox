import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import { useAuth } from "../../contexts/AuthContext";
import { GetRefinedFirebaseError } from "../../shared/Functions/errorHandler";

import Button from "../../components/Button/Button";
import Divider from "../../components/Divider/Divider";

import AuthBg from "../../public/Images/AuthBg.png";
import google from "../../public/Icons/Google.svg";
import loader from "../../public/Icons/Loader.svg";

import styles from "../../styles/Forms.module.css";
import ReCAPTCHA from "../../components/ReCAPTCHA/ReCAPTCHA";

const Signup = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const { sendEV, googleSignup, signup } = useAuth();
  const [errorMsg, setErrorMsg] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function handleError(error) {
    setErrorMsg(GetRefinedFirebaseError(error));
    console.log([error]);
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    signup(data.email, data.password)
      .then(() => {
        router.replace("/dashboard");
        sendEV();
      })
      .catch((error) => handleError(error))
      .finally(() => setLoading(false));
  };

  const handleGoogleSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      googleSignup().then(() => router.replace("/dashboard"));
    } catch {
      (error) => handleError(error);
    } finally {
      () => {
        setLoading(false);
      };
    }
  };

  return (
    <>
      <Head>
        <title>ScrapeFox-Create an Account</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.content} data-shadow="outer">
          <h2>Create a new account</h2>
          <form className={styles.form} onSubmit={handleGoogleSignup}>
            {errorMsg && (
              <fieldset>
                <div className={styles.error}>{errorMsg}</div>
              </fieldset>
            )}
            <fieldset>
              <Button variant="plain" tabIndex="1">
                Sign up with Google&nbsp;
                <Image src={google} alt="google logo" />
              </Button>
            </fieldset>
          </form>
          <div className={styles.divider}>
            <Divider direction="horizontal">or</Divider>
          </div>
          <form className={styles.form} onSubmit={handleSignup}>
            <fieldset>
              <input
                onChange={(e) =>
                  setData({
                    ...data,
                    email: e.target.value,
                  })
                }
                tabIndex="2"
                type="email"
                placeholder="Enter email"
                value={data.email}
                id="email"
                required
              />
              <input
                onChange={(e) =>
                  setData({
                    ...data,
                    password: e.target.value,
                  })
                }
                tabIndex="3"
                type="password"
                placeholder="Your Password"
                value={data.password}
                minLength="8"
                maxLength="24"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              />
            </fieldset>
            <fieldset>
              <GoogleReCaptchaProvider
                reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              >
                <ReCAPTCHA />
              </GoogleReCaptchaProvider>
            </fieldset>
            <fieldset>
              <span className={styles.label}>
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  value="terms"
                  tabIndex="4"
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
              <Button
                type="submit"
                variant="primary"
                tabIndex="5"
                disabled={loading}
              >
                {loading ? (
                  <Image
                    src={loader}
                    alt="loading icon"
                    width={35}
                    height={35}
                  />
                ) : (
                  "Create account"
                )}
              </Button>
            </fieldset>

            <fieldset>
              <p className={styles.label}>
                Already have an account?&nbsp;
                <Link href="/auth/login" passHref tabIndex="6">
                  <b>Log In</b>
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
        <div className={styles.background}>
          <Image src={AuthBg} alt="login background image" />
        </div>
      </div>
    </>
  );
};

export default Signup;
