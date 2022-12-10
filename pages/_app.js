import "../styles/globals.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/700.css";
import Navbar from "../components/Navbar/Navbar";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
