import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import styles from "./DashboardPages.module.css";
import UserAccountDefaultIcon from "../../../public/Icons/UserAccountDefault.svg";
import Button from "../../Button/Button";
import { addDate, convertToYMD } from "../../../shared/Functions/dateHandler";
import { useUserDb } from "../../../contexts/UserDatabaseContext";
import { useRouter } from "next/router";
const AccountPage = () => {
  const { logout } = useAuth();
  const { setUserInfo, userDb, getUserInfo } = useUserDb();
  const [data, setData] = useState(userDb);
  const [defaults, setDefaults] = useState({});
  const router = useRouter();
  const changeUserInfo = (e) => {
    e.preventDefault();
    setUserInfo(data);
  };
  const setDOBMinMax = () => {
    let maxdate = new Date();
    maxdate = addDate(maxdate, -18, "years");
    let mindate = new Date();
    mindate = addDate(mindate, -98, "years");
    setDefaults({
      dobMax: convertToYMD(maxdate).toString(),
      dobMin: convertToYMD(mindate).toString(),
    });
  };
  useEffect(() => {
    setDOBMinMax();
    setData(userDb);
  }, [userDb]);
  return (
    <section id="accountPage" className={styles.container} onLoad={getUserInfo}>
      <h2>Profile</h2>

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
              placeholder="Your Phone Number"
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
              value={data.gender}
            >
              <option value="" disabled>
                --Your Gender--
              </option>
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
              value={data.countryOrigin}
            >
              <option value="" disabled>
                --Your Country--
              </option>
              <option value="Gondor">Gondor</option>
              <option value="Lothric">Lothric</option>
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

          <Button
            variant="secondary"
            onClick={() => {
              logout().then(router.push("/"));
            }}
          >
            Logout
          </Button>
          <div
            onClick={() => {
              logout();
            }}
          >
            <strong>
              Reset
              <br />
              Password
            </strong>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AccountPage;
