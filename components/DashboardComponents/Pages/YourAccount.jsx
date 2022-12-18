import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import styles from "./DashboardPages.module.css";
import UserAccountDefaultIcon from "../../../public/Icons/UserAccountDefault.svg";
import Button from "../../Button/Button";
import { addDate, convertToYMD } from "../../../shared/Functions/dateHandler";
const YourAccount = () => {
  const { user, addUserInfo } = useAuth();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(user);
  const [defaults, setDefaults] = useState({});
  const changeUserInfo = (e) => {
    e.preventDefault();
    setLoading(true);
    addUserInfo(data).then(setLoading(false));
  };
  useEffect(() => {
    let maxdate = new Date();
    maxdate = addDate(maxdate, -18, "years");
    let mindate = new Date();
    mindate = addDate(mindate, -98, "years");
    setDefaults({
      dobMax: convertToYMD(maxdate).toString(),
      dobMin: convertToYMD(mindate).toString(),
    });
    console.log("user", user);
    console.log("data", data);
  }, [user, data]);
  return (
    <section id="accountPage" className={styles.container}>
      <h2>Your Account</h2>
      <form className={styles.content} onSubmit={changeUserInfo}>
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
            <input
              type="file"
              hidden
              id="uploadImage"
              name="uploadImage"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setData({
                    ...data,
                    photoURL: URL.createObjectURL(e.target.files[0]),
                  });
                }
              }}
            />
          </div>
          <fieldset>
            {user.displayName ? (
              <h3>{user.displayName}</h3>
            ) : (
              <input
                type="text"
                maxLength="12"
                placeholder="Enter your display name"
                value={data.displayName}
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
              <option value="Gondor">Gondor</option>
              <option value="Lothric">Lothric</option>
              <option value="Firelink Shrine">Firelink Shrine</option>
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
