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
    <div className={styles.formcontainer}>
      <h2>Email Address Validator</h2>
      <div className={styles.main}>
        <div className={styles.videosection}>
          <div className={styles.video}>
            <video
              controls
              src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
              poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
            >
              Sorry, your browser doesn{"'"}t support embedded videos, but don
              {"'"}t worry, you can
              <a href="https://archive.org/details/BigBuckBunny_124">
                download it
              </a>
              and watch it with your favorite video player!
            </video>
          </div>
          <div className={styles.instruction}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic,
            distinctio.
          </div>
        </div>
        <div className={styles.formcard} data-shadow="outer">
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
              <fieldset className={styles.submit}>
                <Button type="submit" variant="primary" alternate>
                  Validate
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
              <input id="uploadfile" type="file" hidden />
            </fieldset>
          </form>
          <textarea className={styles.result} />
        </div>
      </div>
    </div>
  );
};

export default EmailValidator;
