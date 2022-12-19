import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import styles from "./DashboardPages.module.css";
import UserAccountDefaultIcon from "../../../public/Icons/UserAccountDefault.svg";
import Button from "../../Button/Button";
import { addDate, convertToYMD } from "../../../shared/Functions/dateHandler";
import { useUserDb } from "../../../contexts/UserDatabaseContext";
const AccountPage = () => {
  const { logout } = useAuth();
  const { setUserInfo, userDb } = useUserDb();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(userDb);
  const [defaults, setDefaults] = useState({});
  const changeUserInfo = (e) => {
    e.preventDefault();
    setLoading(true);
    setUserInfo(data);
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
    // console.log("userDb", userDb);
    // console.log("data", data);
  }, []);
  return (
    <section id="accountPage" className={styles.container}>
      <h2>My Account</h2>
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
            {data.displayName ? (
              <h3>{data.displayName}</h3>
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
            <p>{data.email}</p>
          </fieldset>
        </div>
        <div className={styles.details} data-shadow="inner">
          <fieldset>
            <label htmlFor="phoneNumber">Phone Number</label>

            <input
              id="phoneNumber"
              type="tel"
              name="phoneNumber"
              pattern="^\+[1-9]\d{1,14}$"
              value={data.phoneNumber}
              onChange={(e) => {
                setData({ ...data, phoneNumber: e.target.value });
              }}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="dob">Date of birth</label>

            <input
              id="dob"
              type="date"
              name="dob"
              value={data.dob}
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
              <option
                value="male"
                selected={data.gender == "male" ? true : false}
              >
                Male
              </option>
              <option
                value="female"
                selected={data.gender == "female" ? true : false}
              >
                Female
              </option>
              <option
                value="other"
                selected={data.gender == "other" ? true : false}
              >
                Other
              </option>
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
              <option
                value="Gondor"
                selected={data.countryOrigin == "Gondor" ? true : false}
              >
                Gondor
              </option>
              <option
                value="Lothric"
                selected={data.countryOrigin == "Lothric" ? true : false}
              >
                Lothric
              </option>
            </select>
          </fieldset>
        </div>
        <div className={styles.submit}>
          {data === userDb ? (
            ""
          ) : (
            <Button
              variant="primary"
              type="submit"
              disabled={data === userDb ? true : false}
            >
              Save
            </Button>
          )}

          <Button variant="secondary">Logout&#xe163;</Button>
        </div>
      </form>
    </section>
  );
};

export default AccountPage;
