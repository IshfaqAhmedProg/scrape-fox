import { useRouter } from "next/router";
import { useEffect } from "react";
import { AuthContextProvider } from "../contexts/AuthContext";
import { ProtectedRoute } from "../shared/Hooks/protectedRoute";

import "../styles/globals.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/700.css";

import Navbar from "../components/Navbar/Navbar";

import AOS from "aos";
import "aos/dist/aos.css";
import { PublicRoute } from "../shared/Hooks/publicRoute";

const noAuthRequired = [
  "/",
  "/auth/login",
  "/auth/signup",
  "/auth/resetPass",
  "/verifyfox",
];

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    AOS.init({
      startEvent: "DOMContentLoaded",
      initClassName: "aos-init",
      animatedClassName: "aos-animate",
      disable: "mobile",
    });
  }, []);
  return (
    <AuthContextProvider>
      <Navbar></Navbar>
      {noAuthRequired.includes(router.pathname) ? (
        <PublicRoute>
          <Component {...pageProps} />
        </PublicRoute>
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
    </AuthContextProvider>
  );
}

export default MyApp;
