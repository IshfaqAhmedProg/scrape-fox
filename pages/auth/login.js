import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { useAuth } from "../../contexts/AuthContext";

import styles from "../../styles/Forms.module.css";

import Button from "../../components/Button/Button";
import Divider from "../../components/Divider/Divider";

import AuthBg from "../../public/Images/AuthBg.png";
import google from "../../public/Icons/Google.svg";
import loader from "../../public/Icons/Loader.svg";
const Login = () => {
  const GetRefinedFirebaseError = import("../../shared/Functions/errorHandler");
  const router = useRouter();
  const { user, login, googleLogin } = useAuth();
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
  if (user) {
    router.replace("/dashboard");
    return null;
  }
  return (
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
            <Button variant="plain" type="submit">
              Sign in with Google&nbsp; <Image src={google} alt="google logo" />
            </Button>
          </fieldset>
        </form>
        <div className={styles.divider}>
          <Divider direction="horizontal">or</Divider>
        </div>
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
            <Button type="submit" variant="primary">
              {loading ? (
                <Image src={loader} alt="loading icon" width={35} height={35} />
              ) : (
                "Log In"
              )}
            </Button>
          </fieldset>

          <fieldset>
            <p className={styles.label}>
              Don&apos;t have an account?&nbsp;
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

export default Login;
