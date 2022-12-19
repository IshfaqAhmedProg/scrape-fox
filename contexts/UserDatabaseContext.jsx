import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const UserDatabaseContext = createContext({});
export const useUserDb = () => useContext(UserDatabaseContext);
export const UserDatabaseContextProvider = ({ children }) => {
  const [userDb, setUserDb] = useState({});
  const [tasks, setTasks] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    setUserDb(user, { ...userDb, ...user });
    console.log("userdbcontext", userDb);
  }, [userDb, user]);

  const getUserInfo = () => {};
  const setUserInfo = (data) => {
    setUserDb(data);
  };

  const getUserTasks = () => {};
  const setUserTasks = () => {};

  return (
    <UserDatabaseContext.Provider
      value={{
        getUserInfo,
        setUserInfo,
        getUserTasks,
        setUserTasks,
        userDb,
        tasks,
      }}
    >
      {children}
    </UserDatabaseContext.Provider>
  );
};
