import { useRouter } from "next/router";
import React, { useState } from "react";
import { useUserDb } from "../../contexts/UserDatabaseContext";
import styles from "../../styles/Forms.module.css";
import Button from "../Button/Button";

const GoogleMaps = () => {
  const router = useRouter();
  const [data, setData] = useState({
    categories: "",
    country: "",
    state: "",
    totalResults: 0,
    placesPerQuery: 0,
    dropDuplicates: false,
  });
  const { setUserTasks } = useUserDb();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setUserTasks(data, "Google Maps Scraper", data.totalResults).then(
      router.replace("/dashboard")
    );
  };
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
          <form className={styles.form} onSubmit={handleFormSubmit}>
            <fieldset>
              <label className={styles.label}>Select Categories</label>
              <input
                type="tel"
                placeholder="Enter Categories"
                value={data.categories}
                onChange={(e) => {
                  setData({
                    ...data,
                    categories: e.target.value,
                  });
                }}
              />
            </fieldset>
            <fieldset>
              <label className={styles.label}>Select Location</label>
              <input
                type="text"
                placeholder="Country"
                value={data.country}
                onChange={(e) => {
                  setData({
                    ...data,
                    country: e.target.value,
                  });
                }}
              />
              <input
                type="text"
                placeholder="State"
                value={data.state}
                onChange={(e) => {
                  setData({
                    ...data,
                    state: e.target.value,
                  });
                }}
              />
            </fieldset>
            <fieldset className={styles.halfnhalf}>
              <label className={styles.label}>
                Total Results Limit{"("}0 - infinite{")"}
              </label>
              <input
                type="number"
                value={data.totalResults}
                onChange={(e) => {
                  setData({
                    ...data,
                    totalResults: e.target.valueAsNumber,
                  });
                }}
              />
            </fieldset>
            <fieldset className={styles.halfnhalf}>
              <label className={styles.label}>Places per query</label>
              <input
                type="number"
                value={data.placesPerQuery}
                onChange={(e) => {
                  setData({
                    ...data,
                    placesPerQuery: e.target.valueAsNumber,
                  });
                }}
              />
            </fieldset>
            <fieldset>
              <div className={styles.label}>
                <input
                  type="checkbox"
                  value={data.dropDuplicates}
                  onChange={(e) => {
                    setData({
                      ...data,
                      dropDuplicates: e.target.checked,
                    });
                  }}
                />
                Drop Duplicates
              </div>
            </fieldset>
            <fieldset>
              <Button variant="primary" type="submit">
                Scrape Data
              </Button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GoogleMaps;
