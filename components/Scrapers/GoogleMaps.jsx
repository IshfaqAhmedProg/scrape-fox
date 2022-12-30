import React from "react";
import styles from "../../styles/Forms.module.css";
import Button from "../Button/Button";

const GoogleMaps = () => {
  return (
    <div className={styles.formcontainer}>
      <h2>Google Maps Scraper</h2>
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
          <form className={styles.form}>
            <fieldset>
              <label className={styles.label}>Select Categories</label>
              <input type="tel" placeholder="Enter Categories" />
            </fieldset>
            <fieldset>
              <label className={styles.label}>Select Location</label>
              <input type="text" placeholder="Country" />
              <input type="text" placeholder="State" />
            </fieldset>
            <fieldset className={styles.halfnhalf}>
              <label className={styles.label}>
                Total Results Limit{"("}0 - infinite{")"}
              </label>
              <input type="number" />
            </fieldset>
            <fieldset className={styles.halfnhalf}>
              <label className={styles.label}>Places per query</label>
              <input type="number" />
            </fieldset>
            <fieldset>
              <div className={styles.label}>
                <input type="checkbox" />
                Drop Duplicates
              </div>
            </fieldset>
            <fieldset>
              <Button variant="primary">Scrape Data</Button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GoogleMaps;
