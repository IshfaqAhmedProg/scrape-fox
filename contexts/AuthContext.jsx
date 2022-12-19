import { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";

import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useUserDb } from "./UserDatabaseContext";

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState();
  const { userDb } = useUserDb();

  //AuthState Change Use Effect
  useEffect(() => {
    setLoading(true);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      //TODOAdd db here and setUser(db values)
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [userDb]);

  //Sign Up Auth function
  const signup = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      async (cred) => {
        await setDoc(doc(db, "users", cred.user.uid), {
          uid: cred.user.uid,
          email: cred.user.email,
          emailVerified: cred.user.emailVerified,
        });
      }
    );
  };
  //login Auth function
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  //Googlelogin Auth function
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  //Google signup Auth function
  const googleSignup = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider).then(async (result) => {
      const docRef = doc(db, "users", result.user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", result.user.uid), {
          uid: result.user.uid,
          email: result.user.email,
        });
      }
    });
  };
  //logout Auth function
  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };
  //Password Reset Auth function
  const resetPass = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  //Send Email Verification Auth Function
  const sendEV = () => {
    let sender = null;
    if (auth.currentUser != null) {
      sender = sendEmailVerification(auth.currentUser).then(() => {
        console.log("email sent");
      });
    }
    return sender;
  };
  const addUserInfo = async (data) => {
    //TODO add firebase update profile
    let adder = null;
    if (auth.currentUser) {
      adder = await setDoc(doc(db, "users", user.uid), data).then(
        setUser(data)
      );
    }
    return adder;
  };
  return (
    <AuthContext.Provider
      value={{
        login,
        signup,
        googleLogin,
        googleSignup,
        sendEV,
        logout,
        resetPass,
        addUserInfo,
        user,
      }}
    >
      {loading ? (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            translate: "-50% -50%",
            fontSize: "20px",
            fontWeight: "500",
            color: "var(--primary)",
          }}
        >
          Loading...
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
