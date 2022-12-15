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

import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState();

  //AuthState Change Use Effect
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          verified: user.emailVerified,
        });
      } else {
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
          UID: cred.user.uid,
          Email: cred.user.email,
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
  //TODO database entry when authenticating with google
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

  return (
    <AuthContext.Provider
      value={{
        login,
        googleLogin,
        user,
        signup,
        sendEV,
        logout,
        resetPass,
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
