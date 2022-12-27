import { createContext, useContext, useEffect, useState } from "react";
import { db, auth } from "../firebase/config";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import Sidebar from "../components/DashboardComponents/Sidebar/Sidebar";
import styles from "../components/DashboardComponents/Dashboard.module.css";
import { useAuth } from "./AuthContext";
import { v5 as uuidv5 } from "uuid";

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
  const TaskStruct = [
    "taskId",
    "dateCreated",
    "queryCount",
    "taskRunning",
    "uid",
    "service",
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

  // const localStorageTasks = {
  //   taskId: [],
  //   dateCreated: [],
  //   queryCount: [],
  //   taskRunning: [],
  //   uid: [],
  //   service: [],
  // };
  // TaskStruct.forEach((element) => {
  //   localStorage.getItem(element) != null
  //     ? (localStorageTasks[element] = localStorage.getItem(element))
  //     : null;
  // });
  // console.log("localStorageTasks 1", localStorageTasks);
  //add new task created flag to run if a new task has been created
  // const getUserTasks = async () => {
  //   if (tasks.length == 0 && auth.currentUser) {
  //     setLoading(true);
  //     const q = query(
  //       collection(db, "tasks"),
  //       where("uid", "==", user.uid),
  //       orderBy("dateCreated", "desc"),
  //       limit(5)
  //     );

  //     const querySnapshot = await getDocs(q);
  //     const docs = querySnapshot.docs.map((doc) => {
  //       const data = doc.data();
  //       data.id = doc.id;
  //       const convData = {
  //         dateCreated: data.dateCreated.toDate().toLocaleString(),
  //         queryCount: data.queryCount,
  //         service: data.service,
  //         taskRunning: data.taskRunning,
  //         uid: data.uid,
  //         taskId: data.taskId,
  //         taskIdShort: data.taskIdShort,
  //       };
  //       console.log("convData", convData);
  //       return convData;
  //     });
  //     setTasks(docs);
  //     console.log(docs);
  //     setLoading(false);

  //     //take the docs and put it in localstorage

  //     // docs.forEach((object) => {
  //     //   localStorageTasks.taskId.push(object.taskId);
  //     //   localStorageTasks.dateCreated.push(object.dateCreated);
  //     //   localStorageTasks.queryCount.push(object.queryCount);
  //     //   localStorageTasks.taskRunning.push(object.taskRunning);
  //     //   localStorageTasks.uid.push(object.uid);
  //     //   localStorageTasks.service.push(object.service);
  //     // });
  //     // console.log("localStorageTasks", localStorageTasks);
  //     // docs.map((doc) => {
  //     //   // localStorageTasks = Object.values(doc);
  //     // });
  //   }
  // };
  const loadMoreTasks = () => {};
  const setUserTasks = async (task, service, queryCount) => {
    let adder = null;
    const dateId = Date.now();
    const MY_NAMESPACE = process.env.NEXT_PUBLIC_UUID_NAMESPACE;
    const taskId = uuidv5(dateId.toString(), MY_NAMESPACE)
      .replace(/[-]/g, "")
      .slice(0, 20);
    const taskIdShort = taskId.slice(0, 8);

    const data = {
      dateCreated: Timestamp.fromDate(new Date(dateId)),
      queryCount: queryCount,
      service: service,
      taskRunning: true,
      uid: user.uid,
      taskId,
      taskIdShort,
      request: task,
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
