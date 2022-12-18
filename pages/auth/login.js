import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

import { useAuth } from "../../contexts/AuthContext";
import { GetRefinedFirebaseError } from "../../shared/Functions/errorHandler";

import styles from "../../styles/Forms.module.css";

import Button from "../../components/Button/Button";
import Divider from "../../components/Divider/Divider";

import AuthBg from "../../public/Images/AuthBg.png";
import google from "../../public/Icons/Google.svg";
import loader from "../../public/Icons/Loader.svg";

const Login = () => {
  const router = useRouter();
  const { login, googleLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function handleError(err) {
    if (err == null) return;
    console.log(err);
    setErrorMsg(GetRefinedFirebaseError(err));
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    login(data.email, data.password)
      .then(() => {
        router.replace("/dashboard");
      })
      .catch((error) => handleError(error))
      .finally(() => setLoading(false));
  };
  const handleGoogleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    googleLogin()
      .then(() => router.replace("/dashboard"))
      .catch((error) => handleError(error))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Head>
        <title>ScrapeFox-Log In to your account</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.content} data-shadow="outer">
          <h2>Log In</h2>
          <form className={styles.form} onSubmit={handleGoogleLogin}>
            {errorMsg && (
              <fieldset>
                <div className={styles.error}>{errorMsg}</div>
              </fieldset>
            )}
            <fieldset>
              <Button variant="plain" type="submit" tabIndex="1">
                Sign in with Google&nbsp;{" "}
                <Image src={google} alt="google logo" />
              </Button>
            </fieldset>
          </form>
          <div className={styles.divider}>
            <Divider direction="horizontal">or</Divider>
          </div>
          <form className={styles.form} onSubmit={handleLogin}>
            <fieldset>
              <input
                onChange={(e) =>
                  setData({
                    ...data,
                    email: e.target.value,
                  })
                }
                tabIndex="2"
                value={data.email}
                type="email"
                placeholder="Enter email"
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
                value={data.password}
                type="password"
                placeholder="Enter password"
                id="password"
                required
              />
              <div className={styles.showpassword}></div>
            </fieldset>
            <fieldset>
              <p className={styles.label}>
                Forgot your password?&nbsp;
                <Link href="/auth/resetPass" tabIndex="4">
                  Reset Password
                </Link>
              </p>
            </fieldset>
            <fieldset>
              <Button
                type="submit"
                tabIndex="5"
                variant="primary"
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
                  "Log In"
                )}
              </Button>
            </fieldset>

            <fieldset>
              <p className={styles.label}>
                Don&apos;t have an account?&nbsp;
                <Link href="/auth/signup" passHref>
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
    </>
  );
};

export default Login;
