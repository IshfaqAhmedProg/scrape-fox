import React, { useEffect, useState } from "react";
import styles from "../../styles/Forms.module.css";
import Button from "../Button/Button";
import Divider from "../Divider/Divider";
import LoaderIcon from "../.../../../public/Icons/Loader.svg";
import Image from "next/image";
const PhoneNumberValidator = () => {
  const [textData, setTextData] = useState({ PNumber: "" });
  const [isPNumber, setIsPNumber] = useState(false);
  const [validationMssg, setValidationMssg] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <div className={styles.formcontainer}>
      <h2>Phone Number Validator</h2>
      <div className={styles.main}>
        <div className={styles.videosection}>
          <div className={styles.video} data-aos="zoom-in">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/ieg5DLDNLUQ"
            ></iframe>
          </div>
          <div className={styles.instruction} data-aos="fade-right">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic,
            distinctio.
          </div>
        </div>
        <div className={styles.formcard} data-shadow="outer">
          <form className={styles.form}>
            {console.log(isPNumber)}
            <fieldset>
              <label className={styles.label}>Enter Phone Number</label>
              <input
                type="tel"
                value={textData.PNumber}
                placeholder="Enter your Phone Number"
                onChange={(e) => {
                  setTextData({ ...textData, PNumber: e.target.value });
                }}
              />
            </fieldset>
            {textData.PNumber && !isPNumber ? (
              <Button variant="primary" disabled>
                Not a phone number
              </Button>
            ) : (
              ""
            )}
            {isPNumber && (
              <fieldset className={styles.submit}>
                <Button type="submit" variant="primary" alternate>
                  {loading ? (
                    <Image src={LoaderIcon} alt="" width={35} height={35} />
                  ) : (
                    "Validate"
                  )}
                </Button>
              </fieldset>
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
                Upload a CSV/XLSX file with one column and without a header
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
              <input
                id="uploadfile"
                type="file"
                accept=".csv,.xls,.xlsx,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                hidden
              />
            </fieldset>
          </form>
          <textarea
            className={styles.result}
            placeholder="Validation Result"
            value={validationMssg}
            disabled={!validationMssg}
          />
        </div>
      </div>
    </div>
  );
};

export default PhoneNumberValidator;
