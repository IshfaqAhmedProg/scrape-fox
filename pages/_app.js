import { useRouter } from "next/router";
import { useEffect } from "react";
import { ProtectedRoute } from "../shared/Hooks/protectedRoute";
import "../styles/globals.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/700.css";

import Navbar from "../components/Navbar/Navbar";

import AOS from "aos";
import "aos/dist/aos.css";
import { AuthContextProvider } from "../contexts/AuthContext";
import { UserDatabaseContextProvider } from "../contexts/UserDatabaseContext";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const noAuthRequired = [
  "/",
  "/auth/login",
  "/auth/signup",
  "/auth/resetpass",
  "/verifyfox",
];
const dashboardLayout = [
  "/dashboard",
  "/dashboard/profile",
  "/dashboard/store",
  "/dashboard/validators/emailvalidator",
  "/dashboard/validators/phonenumbervalidator",
  "/dashboard/validators/whatsappvalidator",
  "/dashboard/tasks/[task]",
  "/dashboard/scrapers/googlemaps",
];
const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

// const theme=createTheme({
//   theme:{
//     fonts: {}
//   }
// })
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
        <GoogleReCaptchaProvider
          reCaptchaKey={siteKey}
          scriptProps={{
            async: false,
            defer: false,
            appendTo: "head",
            nonce: undefined,
          }}
        >
          <Component {...pageProps} />
        </GoogleReCaptchaProvider>
      ) : (
        <ProtectedRoute>
          {dashboardLayout.includes(router.pathname) ? (
            <UserDatabaseContextProvider>
              <Component {...pageProps} />
            </UserDatabaseContextProvider>
          ) : (
            <Component {...pageProps} />
          )}
        </ProtectedRoute>
      )}
    </AuthContextProvider>
  );
}

export default MyApp;
