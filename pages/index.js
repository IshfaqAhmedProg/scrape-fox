import Head from "next/head";
import Image from "next/image";
import FAQ from "../components/IndexComponents/FAQ/FAQ";
import Footer from "../components/IndexComponents/Footer/Footer";
import Hero from "../components/IndexComponents/Hero/Hero";
import OurServices from "../components/IndexComponents/OurServices/OurServices";
import { GetInTouch } from "../components/IndexComponents/GetInTouch/GetInTouch";
import WorkedWith from "../components/IndexComponents/WorkedWith/WorkedWith";

export default function Home() {
  return (
    <div className="mainBody">
      <Head>
        <title>ScrapeFox</title>
        <meta
          name="description"
          content="ScrapeFox is a Web Scraping website and Credential Validator"
        />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>

      <main>
        <Hero />
        <OurServices />
        <WorkedWith />
        <FAQ />
        <GetInTouch />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
