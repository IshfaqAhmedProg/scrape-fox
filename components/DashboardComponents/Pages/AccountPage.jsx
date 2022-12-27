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
  const changeUserInfo = (e) => {
    e.preventDefault();
    console.log(data);
    setUserInfo(data);
  };
  useEffect(() => {
    setData(userDb);
  }, [userDb]);
  return (
    <section id="accountPage" className={styles.container} onLoad={getUserInfo}>
      <h2>
        Profile <span>- for invoice purposes</span>
      </h2>
      <div className={styles.content}>
        <div className={styles.avatarform}>
          <label htmlFor="avatarupload" className={styles.avatar}>
            <Image
              src={data.photoURL ? data.photoURL : UserAccountDefaultIcon}
              alt=""
              width={150}
              height={150}
            />
          </label>
          <input
            type="file"
            accept="image/png,image/jpeg"
            id="avatarupload"
            hidden
          />
          <span>
            {userDb.displayName ? (
              <h3>{data.displayName}</h3>
            ) : (
              <input
                type="text"
                name="displayName"
                placeholder="Display Name"
                onChange={(e) =>
                  setData({ ...data, displayName: e.target.value })
                }
              />
            )}
            <p>{data.email}</p>
          </span>
        </div>
        <div className={styles.detailform}>
          <h4>Your account details </h4>
          <form className={styles.form} onSubmit={changeUserInfo}>
            <fieldset>
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                onChange={(e) =>
                  setData({ ...data, firstName: e.target.value })
                }
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                onChange={(e) => setData({ ...data, lastName: e.target.value })}
              />
            </fieldset>
            <fieldset>
              <input
                type="email"
                name="companyemail"
                placeholder="Company Email"
                onChange={(e) =>
                  setData({ ...data, companyEmail: e.target.value })
                }
              />
            </fieldset>
            <fieldset>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Contact no."
                onChange={(e) =>
                  setData({ ...data, phoneNumber: e.target.value })
                }
              />
              <input
                type="text"
                name="vatin"
                placeholder="VAT(IN) or similar"
                onChange={(e) => setData({ ...data, vatin: e.target.value })}
              />
            </fieldset>
            <fieldset>
              <input
                type="text"
                name="address"
                placeholder="Address"
                onChange={(e) => setData({ ...data, address: e.target.value })}
              />
            </fieldset>
            <fieldset>
              <input
                type="text"
                name="city"
                placeholder="City"
                onChange={(e) => setData({ ...data, city: e.target.value })}
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                onChange={(e) => setData({ ...data, state: e.target.value })}
              />
            </fieldset>
            <fieldset>
              <input
                type="text"
                name="zipcode"
                placeholder="Zip-code"
                onChange={(e) => setData({ ...data, zipCode: e.target.value })}
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                onChange={(e) =>
                  setData({ ...data, countryOrigin: e.target.value })
                }
              />
            </fieldset>
            <fieldset>
              {data !== userDb ? (
                <Button variant="primary" type="submit" alternate>
                  Save
                </Button>
              ) : (
                ""
              )}
            </fieldset>
          </form>
        </div>
      </div>
      <div className={styles.content}>
        <Button variant="primary" alternate onClick={logout}>
          Logout&nbsp;
          <svg
            width="15"
            height="19"
            viewBox="0 0 15 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 9.5C0 9.75196 0.0987722 9.99359 0.274588 10.1718C0.450403 10.3499 0.68886 10.45 0.9375 10.45H8.05313L5.89687 12.6255C5.809 12.7138 5.73926 12.8189 5.69166 12.9347C5.64407 13.0504 5.61956 13.1746 5.61956 13.3C5.61956 13.4254 5.64407 13.5496 5.69166 13.6653C5.73926 13.7811 5.809 13.8862 5.89687 13.9745C5.98403 14.0635 6.08772 14.1342 6.20196 14.1824C6.3162 14.2307 6.43874 14.2555 6.5625 14.2555C6.68626 14.2555 6.8088 14.2307 6.92304 14.1824C7.03728 14.1342 7.14097 14.0635 7.22813 13.9745L10.9781 10.1745C11.0635 10.0842 11.1304 9.97761 11.175 9.861C11.2688 9.62971 11.2688 9.37029 11.175 9.139C11.1304 9.02239 11.0635 8.91585 10.9781 8.8255L7.22813 5.0255C7.14071 4.93692 7.03694 4.86666 6.92273 4.81872C6.80853 4.77079 6.68612 4.74611 6.5625 4.74611C6.43888 4.74611 6.31647 4.77079 6.20227 4.81872C6.08806 4.86666 5.98429 4.93692 5.89687 5.0255C5.80946 5.11408 5.74013 5.21923 5.69282 5.33496C5.64551 5.45069 5.62116 5.57473 5.62116 5.7C5.62116 5.82527 5.64551 5.94931 5.69282 6.06504C5.74013 6.18077 5.80946 6.28592 5.89687 6.3745L8.05313 8.55H0.9375C0.68886 8.55 0.450403 8.65009 0.274588 8.82825C0.0987722 9.00641 0 9.24804 0 9.5V9.5ZM12.1875 0H2.8125C2.06658 0 1.35121 0.300267 0.823762 0.834746C0.296316 1.36922 0 2.09413 0 2.85V5.7C0 5.95196 0.0987722 6.19359 0.274588 6.37175C0.450403 6.54991 0.68886 6.65 0.9375 6.65C1.18614 6.65 1.4246 6.54991 1.60041 6.37175C1.77623 6.19359 1.875 5.95196 1.875 5.7V2.85C1.875 2.59804 1.97377 2.35641 2.14959 2.17825C2.3254 2.00009 2.56386 1.9 2.8125 1.9H12.1875C12.4361 1.9 12.6746 2.00009 12.8504 2.17825C13.0262 2.35641 13.125 2.59804 13.125 2.85V16.15C13.125 16.402 13.0262 16.6436 12.8504 16.8218C12.6746 16.9999 12.4361 17.1 12.1875 17.1H2.8125C2.56386 17.1 2.3254 16.9999 2.14959 16.8218C1.97377 16.6436 1.875 16.402 1.875 16.15V13.3C1.875 13.048 1.77623 12.8064 1.60041 12.6282C1.4246 12.4501 1.18614 12.35 0.9375 12.35C0.68886 12.35 0.450403 12.4501 0.274588 12.6282C0.0987722 12.8064 0 13.048 0 13.3V16.15C0 16.9059 0.296316 17.6308 0.823762 18.1653C1.35121 18.6997 2.06658 19 2.8125 19H12.1875C12.9334 19 13.6488 18.6997 14.1762 18.1653C14.7037 17.6308 15 16.9059 15 16.15V2.85C15 2.09413 14.7037 1.36922 14.1762 0.834746C13.6488 0.300267 12.9334 0 12.1875 0Z"
              fill="white"
            />
          </svg>
        </Button>
        <Button variant="secondary">Reset Password</Button>
      </div>
    </section>
  );
};

export default AccountPage;
