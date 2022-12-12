import React from "react";
import styles from "../../styles/Forms.module.css";
import Button from "../Button/Button";
import Divider from "../Divider/Divider";
const WhatsAppValidator = () => {
  return (
    <div className={styles.formcontainer}>
      <h2>WhatsApp Validator</h2>
      <form className={styles.form}>
        <fieldset>
          <label className={styles.label}>Enter Phone Numbers</label>
          <textarea />
        </fieldset>
        <fieldset className={styles.divider}>
          <Divider direction="horizontal">or</Divider>
        </fieldset>
        <fieldset className={styles.upload}>
          <label className={styles.label}>
            Upload a CSV/XLSX file with at least one column and without a header
          </label>
          <label htmlFor="uploadfile" className={styles.uploadbutton}>
            Upload File{" "}
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
        <fieldset className={styles.submit} style={{ marginTop: "5rem" }}>
          <Button type="submit" variant="primary">
            Verify
          </Button>
        </fieldset>
      </form>
    </div>
  );
};

export default WhatsAppValidator;
