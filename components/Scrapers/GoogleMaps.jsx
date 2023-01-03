import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useUserDb } from "../../contexts/UserDatabaseContext";
import styles from "../../styles/Forms.module.css";
import Button from "../Button/Button";
import useSWR from "swr";
import hostLanguages from "../../shared/Data/hostLanguages.json";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const options = {
  dedupingInterval: 10000,
};
const GoogleMaps = () => {
  const router = useRouter();
  const { setUserTasks } = useUserDb();
  const [countryStates, setCountryStates] = useState([]);
  const [statesCity, setStateCity] = useState([]);
  const [formData, setFormData] = useState({
    keywords: "",
    country: "",
    state: "",
    city: "",
    language: "",
    countryCode: "",
    stateCode: "",
  });
  const [loading, setLoading] = useState(false);
  const { data: country, error } = useSWR(
    "/api/getCountryDetails",
    fetcher,
    options
  );
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const gpscoordsres = await fetch("/api/getGeoCoordinates", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loc: `${formData.country} ${formData.state} ${formData.city}`,
      }),
    });
    await gpscoordsres
      .json()
      .then((res) => {
        setUserTasks(
          {
            ...formData,
            coords: `@${res[0].latitude},${res[0].longitude},12z`,
          },
          "Google Maps Scraper"
        );
      })
      .then(setLoading(false))
      .then(router.replace("/dashboard"));
  };
  //autocomplete for keywords

  //fetch states from country
  useEffect(() => {
    if (formData.countryCode != "") {
      fetch("/api/getStateFromCountry", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          iso: formData.countryCode,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setCountryStates(res);
        });
    }
  }, [formData.countryCode]);
  //fetch city from states and country
  useEffect(() => {
    if (formData.stateCode != "") {
      fetch("/api/getCityFromState", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isoC: formData.countryCode,
          isoS: formData.stateCode,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setStateCity(res);
        });
    }
  }, [formData.stateCode]);
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
              <label className={styles.label}>
                Enter keywords as you would type in the google maps search box
              </label>
              <input
                required
                type="text"
                placeholder="Enter keywords"
                value={formData.keywords}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    keywords: e.target.value,
                  });
                }}
              />
            </fieldset>
            <fieldset>
              <label className={styles.label}>
                Select Location of your search
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    country: e.target.value,
                    state: "",
                    city: "",
                  });
                }}
              >
                <option disabled value="" defaultValue hidden>
                  Select country
                </option>
                <optgroup label="Countries">
                  {country?.map((country) => (
                    <option
                      value={country.name}
                      key={country.id}
                      onClick={() => {
                        setFormData({
                          ...formData,
                          countryCode: country.iso2,
                          stateCode: "",
                        });
                      }}
                    >
                      {country.name}
                    </option>
                  ))}
                </optgroup>
              </select>
              {formData.country && countryStates.length != 0 && (
                <select
                  required
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      state: e.target.value,
                      city: "",
                    });
                  }}
                >
                  <option disabled value="" defaultValue hidden>
                    Select state
                  </option>
                  <optgroup label="Select state">
                    {countryStates?.map((states) => (
                      <option
                        key={states.id}
                        value={states.name}
                        onClick={() => {
                          setFormData({ ...formData, stateCode: states.iso2 });
                        }}
                      >
                        {states.name}
                      </option>
                    ))}
                  </optgroup>
                </select>
              )}
              {formData.state && statesCity.length != 0 && (
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      city: e.target.value,
                    });
                  }}
                >
                  <option disabled value="" defaultValue hidden>
                    Select city
                  </option>
                  <optgroup label="Select city">
                    {statesCity?.map((city) => (
                      <option key={city.id} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </optgroup>
                </select>
              )}
            </fieldset>
            <fieldset className={styles.halfnhalf}>
              <label className={styles.label}>
                Select the language you want the results to be in
              </label>
              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    language: e.target.value,
                  });
                }}
              >
                <optgroup label="Select language">
                  {hostLanguages?.map((language) => (
                    <option key={language.subtag} value={language.subtag}>
                      {language.name}
                    </option>
                  ))}
                </optgroup>
              </select>
            </fieldset>
            <fieldset>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? "Submitting" : "Scrape Data"}
              </Button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GoogleMaps;
