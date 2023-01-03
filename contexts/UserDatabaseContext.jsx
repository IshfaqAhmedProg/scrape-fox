import { createContext, useContext, useEffect, useState } from "react";
import { db, auth } from "../firebase/config";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import Sidebar from "../components/DashboardComponents/Sidebar/Sidebar";
import styles from "../components/DashboardComponents/Dashboard.module.css";
import { useAuth } from "./AuthContext";
import { v5 as uuidv5 } from "uuid";
import { estimatedTTC } from "../shared/Functions/estimatedTTC";

const UserDatabaseContext = createContext({});
export const useUserDb = () => useContext(UserDatabaseContext);
export const UserDatabaseContextProvider = ({ children }) => {
  const UserStruct = [
    "email", //from user
    "displayName",
    "photoURL", //from user
    "firstName",
    "lastName",
    "companyEmail",
    "phoneNumber",
    "vatin",
    "address",
    "city",
    "state",
    "zipCode",
    "countryOrigin",
  ];

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

  const loadMoreTasks = () => {};
  const setUserTasks = async (task, service, queryCount = 0) => {
    let adder = null;
    const dateId = Date.now();
    const MY_NAMESPACE = process.env.NEXT_PUBLIC_UUID_NAMESPACE;
    const taskId = uuidv5(dateId.toString(), MY_NAMESPACE)
      .replace(/[-]/g, "")
      .slice(0, 20);
    const taskIdShort = taskId.slice(0, 8);
    const estTTC = estimatedTTC(queryCount, service);
    const data = {
      dateCreated: Timestamp.fromDate(new Date(dateId)),
      queryCount: queryCount,
      service: service,
      taskRunning: true,
      uid: user.uid,
      taskId,
      taskIdShort,
      request: task,
      estimatedTTC: estTTC,
    };
    if (auth.currentUser) {
      adder = await setDoc(doc(db, "tasks", taskId), data);
    }
    return adder;
  };

  return (
    <UserDatabaseContext.Provider
      value={{
        getUserInfo,
        setUserInfo,
        // getUserTasks,
        setUserTasks,
        // loading,
        user,
        userDb,
        tasks,
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
