import React, { useEffect, useState } from "react";
import styles from "../../styles/Forms.module.css";
import Button from "../Button/Button";
import Divider from "../Divider/Divider";
import LoaderIcon from "../.../../../public/Icons/Loader.svg";
import Image from "next/image";
import { read, utils } from "xlsx";
import { uniqueKeys } from "../../shared/Functions/uniqueKeys";
import { useUserDb } from "../../contexts/UserDatabaseContext";
import { useRouter } from "next/router";
const PhoneNumberValidator = () => {
  const [textData, setTextData] = useState({ pNumber: "" });
  const [fileData, setFileData] = useState({
    unformattedData: {},
    extractedPNumbers: {},
    fileName: "",
    columnHeader: "",
    readyToSubmit: false,
  });
  const [isPNumber, setIsPNumber] = useState(false);
  const [validationMssg, setValidationMssg] = useState("");
  const [loading, setLoading] = useState(false);
  const [columnHeaders, setColumnHeaders] = useState([]);
  const { setUserTasks } = useUserDb();
  const router = useRouter();
  const handleTextSubmit = (e) => {
    e.preventDefault();
    // convert textData to only domain
    const part = textData.pNumber.split("@");
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
  const handleFileUpload = (file) => {
    const processFile = new Promise((resolve, reject) => {
      setFileData({ ...fileData, fileName: file.name });
      setValidationMssg("Processing file...");
      setLoading(true);
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const workbook = read(bufferArray, { type: "buffer" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const sheetdata = utils.sheet_to_json(worksheet);
        resolve(sheetdata);
      };
      fileReader.onerror = (err) => {
        reject(err);
      };
    });
    processFile
      .then((data) => {
        setLoading(false);
        setValidationMssg(
          "File processed! Select the header for Phone Numbers in your file"
        );
        setFileData((fileData) => ({ ...fileData, unformattedData: data }));
        //get the unique headers that the file contains
        const uniqueHeaders = uniqueKeys(data);
        setColumnHeaders(uniqueHeaders);
      })
      .catch((err) => setValidationMssg(err));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const extract = fileData.unformattedData.map((row) => {
      return row[fileData.columnHeader];
    });
    setUserTasks(extract, "Phone Number Validator", extract.length)
      .then(setLoading(false))
      .then(router.replace("/dashboard"));
    console.log(extract);
  };

  useEffect(() => {
    if (textData.pNumber) {
      const check = textData.pNumber.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
      if (check) {
        setIsPNumber(true);
      } else {
        setIsPNumber(false);
      }
    }
  }, [textData]);
  useEffect(() => {
    console.log(fileData);
  }, [fileData]);
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
          <p
            className={styles.instruction}
            data-aos="fade-right"
            data-aos-delay="800"
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic,
            distinctio.
          </p>
        </div>
        <div className={styles.formcard} data-shadow="outer">
          {/* form if text input */}
          {!fileData.fileName && (
            <form className={styles.form} onSubmit={handleTextSubmit}>
              {console.log(isPNumber)}
              <fieldset>
                <label className={styles.label}>Enter Phone Number</label>
                <input
                  type="email"
                  value={textData.pNumber}
                  placeholder="Enter your Phone Number"
                  onChange={(e) => {
                    setTextData({ ...textData, pNumber: e.target.value });
                  }}
                />
              </fieldset>
              {textData.pNumber && !isPNumber ? (
                <Button variant="primary" disabled>
                  Not a phone
                </Button>
              ) : (
                ""
              )}
              {isPNumber &&
                (validationMssg == "" ? (
                  <fieldset className={styles.submit}>
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={loading}
                      alternate
                    >
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
          {!fileData.fileName && !textData.pNumber ? (
            <div className={styles.divider}>
              <Divider direction="horizontal" colorMode="light" />
            </div>
          ) : (
            ""
          )}

          {/* form to show if file input */}
          {!textData.pNumber && (
            <form className={styles.form} onSubmit={handleFormSubmit}>
              <fieldset className={styles.upload}>
                {/* if no file data then show upload file button */}
                {!fileData.fileName ? (
                  <>
                    <label className={styles.label}>
                      or select a CSV/XLSX/TXT file with at least one column and
                      without a header
                    </label>
                    <label htmlFor="uploadfile" className={styles.uploadbutton}>
                      {loading ? (
                        <Image src={LoaderIcon} alt="" width={25} height={25} />
                      ) : (
                        <>
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
                        </>
                      )}
                    </label>
                  </>
                ) : (
                  //if file data then show validate button with column header input
                  <>
                    <label className={styles.label}>
                      Select the <strong>header</strong> of the column
                      containing the phone numbers in
                      <strong> {fileData.fileName}</strong>.
                    </label>
                    <fieldset>
                      <select
                        name="headers"
                        id="headers"
                        onChange={(e) => {
                          setFileData({
                            ...fileData,
                            columnHeader: e.target.value,
                          });
                        }}
                      >
                        <optgroup label="Select header">
                          {columnHeaders.map((header) => {
                            console.log(header);
                            return (
                              <option key={header} value={header}>
                                {header}
                              </option>
                            );
                          })}
                        </optgroup>
                      </select>
                    </fieldset>
                    <fieldset className={styles.submit}>
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={loading || !fileData.columnHeader}
                        alternate
                      >
                        {loading ? (
                          <Image
                            src={LoaderIcon}
                            alt=""
                            width={35}
                            height={35}
                          />
                        ) : (
                          "Validate"
                        )}
                      </Button>
                      {/* TODO add form processing cancel button here */}
                    </fieldset>
                  </>
                )}
                <input
                  onChange={(e) => {
                    const file = e.target.files[0];
                    handleFileUpload(file);
                  }}
                  id="uploadfile"
                  type="file"
                  accept=".csv,.xls,.xlsx,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                  hidden
                />
              </fieldset>
            </form>
          )}
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
