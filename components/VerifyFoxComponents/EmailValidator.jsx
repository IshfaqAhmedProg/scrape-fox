import React, { useEffect, useState } from "react";
import styles from "../../styles/Forms.module.css";
import Button from "../Button/Button";
import Divider from "../Divider/Divider";
import LoaderIcon from "../.../../../public/Icons/Loader.svg";
import Image from "next/image";
const EmailValidator = () => {
  const [textData, setTextData] = useState({ email: "" });
  const [fileData, setFileData] = useState();
  const [isEmail, setIsEmail] = useState(false);
  const [validationMssg, setValidationMssg] = useState("");
  const [loading, setLoading] = useState(false);
  const handleTextSubmit = (e) => {
    e.preventDefault();
    // convert textData to only domain
    const part = textData.email.split("@");
    const domain = part[1];
    console.log("domain", domain);
    setLoading(true);
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
        setValidationMssg(
          `${
            res.text +
            `\nReason: ` +
            res.reason +
            `\nRisk: ` +
            res.risk +
            `\nDisposable: ` +
            res.disposable +
            `\nPossible Typo: ` +
            res.possible_typo +
            `\nmx_IP: ` +
            res.mx_ip +
            `\nmx_Info: ` +
            res.mx_info
          }`
        );
        setLoading(false);
      });
  };
  const handleFileUpload = (e) => {
    const newItem = e.target.files;
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
    <div className={styles.formcontainer}>
      <h2>Email Address Validator</h2>
      <div className={styles.main}>
        <div className={styles.videosection}>
          <div className={styles.video} data-aos="zoom-in">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/TF67a-48jlY"
            ></iframe>
          </div>
          <div
            className={styles.instruction}
            data-aos="fade-right"
            data-aos-delay="800"
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic,
            distinctio.
          </div>
        </div>
        <div className={styles.formcard} data-shadow="outer">
          {!fileData && (
            <form className={styles.form} onSubmit={handleTextSubmit}>
              {console.log(isEmail)}
              <fieldset>
                <label className={styles.label}>Enter Email Address</label>
                <input
                  type="email"
                  value={textData.email}
                  placeholder="Enter your email address"
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
              {isEmail &&
                (validationMssg == "" ? (
                  <fieldset className={styles.submit}>
                    <Button type="submit" variant="primary" alternate>
                      {loading ? (
                        <Image src={LoaderIcon} alt="" width={35} height={35} />
                      ) : (
                        "Validate"
                      )}
                    </Button>
                  </fieldset>
                ) : (
                  <fieldset className={styles.submit}>
                    <Button variant="primary" disabled>
                      Results Below &darr;
                    </Button>
                  </fieldset>
                ))}
            </form>
          )}
          <div className={styles.divider}>
            <Divider direction="horizontal" colorMode="light">
              or
            </Divider>
          </div>
          {/* {!textData.email && ( */}
          <form className={styles.form}>
            <fieldset className={styles.upload}>
              <label className={styles.label}>
                Upload a CSV/XLSX file with one column and without a header
              </label>
              {!fileData ? (
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
              ) : (
                <Button type="submit" variant="primary">
                  Validate
                </Button>
              )}
              <input
                onChange={handleFileUpload}
                id="uploadfile"
                type="file"
                accept=".csv,.xls,.xlsx,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                hidden
              />
            </fieldset>
          </form>
          {/* )} */}
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

export default EmailValidator;
