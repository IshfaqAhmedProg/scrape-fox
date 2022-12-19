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

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState();

  //AuthState Change Use Effect
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("uid", user.uid);
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
        });
      } else {
        localStorage.removeItem("uid");
        setUser(null);
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

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
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          emailVerified: result.user.emailVerified,
        });
      }
    });
  };

  //logout Auth function
  const logout = async () => {
    await signOut(auth).then(setUser(null));
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
        user,
      }}
    >
      {loading ? <div className="loading">Loading...</div> : children}
    </AuthContext.Provider>
  );
};
