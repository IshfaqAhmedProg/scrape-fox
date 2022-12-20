import { createContext, useContext, useState } from "react";
import { db, auth } from "../firebase/config";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  limit,
  orderBy,
  startAfter,
} from "firebase/firestore";
import Sidebar from "../components/DashboardComponents/Sidebar/Sidebar";
import styles from "../components/DashboardComponents/Dashboard.module.css";
import { useAuth } from "./AuthContext";

const UserDatabaseContext = createContext({});
export const useUserDb = () => useContext(UserDatabaseContext);
export const UserDatabaseContextProvider = ({ children }) => {
  const UserStruct = [
    "uid",
    "email",
    "displayName",
    "photoURL",
    "phoneNumber",
    "gender",
    "dob",
    "countryOrigin",
  ];
  let lastTaskFetched = null;
  const [userDb, setUserDb] = useState({});
  const [loading, setLoading] = useState();
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  // const [errorState, setErrorState] = useState();
  function checkObjEmpty(obj) {
    for (var i in obj) return false;
    return true;
  }
  function setLocalStorage(obj) {
    for (var i in obj) {
      localStorage.setItem(i, obj[i]);
    }
  }
  const getUserInfo = async () => {
    //check if userDb has the data
    if (checkObjEmpty(userDb)) {
      setLoading(true);
      //check if data is present in local storage- can be changed with session
      const localInfo = {};
      UserStruct.forEach((element) => {
        localStorage.getItem(element) != null
          ? (localInfo[element] = localStorage.getItem(element))
          : null;
      });
      console.log("localInfo", localInfo);
      if (checkObjEmpty(localInfo)) {
        //execute fetch from database
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const dbData = docSnap.data();
          console.log("docSnap", dbData);
          setUserDb({ ...user, ...dbData });
          //set updated data to local storage
          setLocalStorage({ ...user, ...dbData });
          setLoading(false);
        } else {
          console.log("No document");
        }
      } else {
        setUserDb(localInfo);
        setLoading(false);
      }
    }
  };

  const setUserInfo = async (data) => {
    let adder = null;
    if (auth.currentUser) {
      adder = await setDoc(doc(db, "users", user.uid), data)
        .then(() => {
          setUserDb(data);
          setLocalStorage({ ...user, ...data });
        })
        .finally();
    }
    return adder;
  };

  const getUserTasks = async () => {
    const q = query(
      collection(db, "tasks"),
      where("uid", "==", user.uid),
      orderBy("DateCreated"),
      startAfter(lastTaskFetched || 0),
      limit(5)
    );
  };
  // const setUserTasks = () => {};

  return (
    <UserDatabaseContext.Provider
      value={{
        getUserInfo,
        setUserInfo,
        loading,
        // getUserTasks,
        // setUserTasks,
        userDb,
      }}
    >
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.main}>
          {loading ? <div className="loading">Loading...</div> : children}
        </div>
      </div>
    </UserDatabaseContext.Provider>
  );
};
