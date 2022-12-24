import React, { useEffect, useState } from "react";
import styles from "../../styles/Forms.module.css";
import Button from "../Button/Button";
import Divider from "../Divider/Divider";
const EmailValidator = () => {
  const [textData, setTextData] = useState({ email: "" });
  const [isEmail, setIsEmail] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const handleTextSubmit = (e) => {
    e.preventDefault();
    // convert textData to only domain
    const part = textData.email.split("@");
    const domain = part[1];
    console.log("domain", domain);
    //fetch
    fetch("/api/emailValidator", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        domain: domain,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res, "response from backend");
      });
  };
  useEffect(() => {
    if (textData.email) {
      const check = textData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
      if (check) {
        console.log(check);
        setIsEmail(true);
      } else {
        setIsEmail(false);
      }
    }
  }, [textData]);
  return (
    <section className={styles.formcontainer} id="emailValidator">
      <h2>Email Address Validator</h2>
      <form className={styles.form} onSubmit={handleTextSubmit}>
        {console.log(isEmail)}
        <fieldset>
          <label className={styles.label}>Enter Email Address</label>
          <input
            type="email"
            value={textData.email}
            onChange={(e) => {
              setTextData({ ...textData, email: e.target.value });
            }}
          />
        </fieldset>
        {textData.email && !isEmail ? (
          <Button variant="primary" disabled>
            Not an email
          </Button>
        ) : (
          ""
        )}
        {isEmail && (
          <Button variant="primary" type="submit">
            Validate
          </Button>
        )}
      </form>
      <div className={styles.divider}>
        <Divider direction="horizontal" colorMode="light">
          or
        </Divider>
      </div>
      <form className={styles.form}>
        <fieldset className={styles.upload}>
          <label className={styles.label}>
            Upload a CSV/XLSX file with at least one column and without a header
          </label>
          <label htmlFor="uploadfile" className={styles.uploadbutton}>
            Upload File
            <svg
              width="15"
              height="17"
              viewBox="0 0 15 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.8611 9.75L7.49989 0L0.138672 9.75H6.00001V17H10V9.75H14.8611Z"
                fill="var(--accent)"
              />
            </svg>
          </label>
          <input id="uploadfile" type="file" hidden />
        </fieldset>
        <fieldset className={styles.submit}>
          <Button type="submit" variant="primary" alternate>
            Validate
          </Button>
        </fieldset>
      </form>
    </section>
  );
};

export default EmailValidator;
