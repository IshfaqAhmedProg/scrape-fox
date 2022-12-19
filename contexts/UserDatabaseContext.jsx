import { createContext, useContext, useEffect, useState } from "react";

const UserDatabaseContext = createContext({});
export const useUserDb = () => useContext(UserDatabaseContext);
export const UserDatabaseContextProvider = ({ children }) => {
  const [userDb, setUserDb] = useState({});
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    console.log("userdbcontext", userDb);
  }, [userDb]);

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
