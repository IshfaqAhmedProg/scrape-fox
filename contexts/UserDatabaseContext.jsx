import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";
import { db, auth } from "../firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";

const UserDatabaseContext = createContext({});
export const useUserDb = () => useContext(UserDatabaseContext);
export const UserDatabaseContextProvider = ({ children }) => {
  const [userDb, setUserDb] = useState({});
  const [loading, setLoading] = useState();
  // const [tasks, setTasks] = useState([]);
  // const [errorState, setErrorState] = useState();
  const { user } = useAuth();

  function checkEmpty(obj) {
    for (var i in obj) return false;
    return true;
  }

  const getUserInfo = useCallback(async () => {
    setLoading(true);
    const docRef = doc(db, "users", localStorage.getItem("uid"));
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("docSnap", docSnap.data());
      const dbData = docSnap.data();
      setUserDb({ ...user, ...dbData });
      setLoading(false);
    } else {
      console.log("No document");
    }
  }, [user]);

  const setUserInfo = async (data) => {
    let adder = null;
    if (auth.currentUser) {
      adder = await setDoc(doc(db, "users", user.uid), data).then(
        setUserDb(data)
      );
    }
    return adder;
  };

  // const getUserTasks = () => {};
  // const setUserTasks = () => {};

  useEffect(() => {
    if (checkEmpty(userDb)) {
      getUserInfo();
    }
  }, [userDb, getUserInfo]);

  return (
    <UserDatabaseContext.Provider
      value={{
        getUserInfo,
        setUserInfo,
        // getUserTasks,
        // setUserTasks,
        userDb,
      }}
    >
      {loading ? <div className="loading">Loading...</div> : children}
    </UserDatabaseContext.Provider>
  );
};
