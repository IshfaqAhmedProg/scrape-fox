import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import Button from "../../components/Button/Button";
import { useAuth } from "../../contexts/AuthContext";
import AuthBg from "../../public/Images/AuthBg.png";
import styles from "../../styles/Forms.module.css";

const ResetPass = () => {
  const [data, setData] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const { resetPass } = useAuth();
  const handleResetPassword = (e) => {
    e.preventDefault();
    resetPass(data.email).then(
      setStatus("Password Reset mail sent. Please check your inbox.")
    );
  };
  return (
    <>
      <Head>
        <title>ScrapeFox-Reset your Password</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.content} data-shadow="outer">
          <h2>Reset Your Password</h2>
          <form className={styles.form} onSubmit={handleResetPassword}>
            {status && (
              <fieldset>
                <div className={styles.error}>{status}</div>
              </fieldset>
            )}
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
                value={data.email}
                placeholder="Enter email"
                id="email"
                required
              />
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
                  "Send Link"
                )}
              </Button>
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

export default ResetPass;
