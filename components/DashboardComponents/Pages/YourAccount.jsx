import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import styles from "./DashboardPages.module.css";
import UserAccountDefaultIcon from "../../../public/Icons/UserAccountDefault.svg";
import Button from "../../Button/Button";
import { addDate, convertToYMD } from "../../../shared/Functions/dateHandler";

const YourAccount = () => {
  const { user } = useAuth();
  const [data, setData] = useState(user);
  const [defaults, setDefaults] = useState({});
  useEffect(() => {
    let maxdate = new Date();
    maxdate = addDate(maxdate, -18, "years");
    let mindate = new Date();
    mindate = addDate(mindate, -98, "years");
    setDefaults({
      dobMax: convertToYMD(maxdate).toString(),
      dobMin: convertToYMD(mindate).toString(),
    });
  }, []);
  return (
    <section id="accountPage" className={styles.container}>
      <h2>Your Account</h2>
      <form className={styles.content}>
        <div className={styles.display}>
          <div className={styles.avatar}>
            <Image
              src={data.photoURL ? data.photoURL : UserAccountDefaultIcon}
              alt="user avatar"
              width={150}
              height={150}
            />
            <label htmlFor="uploadImage" className={styles.avataroverlay}>
              Change
              <br />
              your
              <br />
              image
            </label>
            <input type="file" hidden id="uploadImage" name="uploadImage" />
          </div>
          <fieldset>
            {data.displayName ? (
              <h3>{data.displayName}</h3>
            ) : (
              <input
                type="text"
                maxLength="12"
                placeholder="Enter your display name"
                onChange={(e) => {
                  setData({ ...data, displayName: e.target.value });
                }}
              />
            )}
          </fieldset>
        </div>
        <div className={styles.details} data-shadow="inner">
          <fieldset>
            <label>Email Address</label>
            <p>{user.email}</p>
          </fieldset>
          <fieldset>
            <label htmlFor="dob">Date of birth</label>
            <input
              id="dob"
              type="date"
              name="dob"
              min={defaults.dobMin}
              max={defaults.dobMax}
              onChange={(e) => {
                setData({ ...data, dob: e.target.value });
              }}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              onChange={(e) => {
                setData({ ...data, gender: e.target.value });
              }}
            >
              <option>--Your Gender--</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </fieldset>
          <fieldset>
            <label htmlFor="country">Country</label>
            <select
              id="country"
              name="country"
              onChange={(e) => {
                setData({ ...data, countryOrigin: e.target.value });
              }}
            >
              <option>--Your Country--</option>
              <option value="male">Gondor</option>
              <option value="female">Lothric</option>
              <option value="other">Firelink Shrine</option>
            </select>
          </fieldset>
        </div>
        <div className={styles.submit}>
          {data === user ? null : (
            <Button variant="primary" type="submit">
              Save
            </Button>
          )}
          <Button variant="primary" alternate>
            Logout
          </Button>
        </div>
      </form>
    </section>
  );
};

export default YourAccount;
