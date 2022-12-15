import { AuthContextProvider } from "../contexts/AuthContext";
import { ProtectedRoute } from "../contexts/ProtectedRoute";

import "../styles/globals.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/700.css";

import Navbar from "../components/Navbar/Navbar";
import { useRouter } from "next/router";

const noAuthRequired = ["/", "/auth/login", "/auth/signup", "/verifyfox"];
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <AuthContextProvider>
      <Navbar></Navbar>
      {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
    </AuthContextProvider>
  );
}

export default MyApp;
