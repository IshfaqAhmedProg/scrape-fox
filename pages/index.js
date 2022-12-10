import Head from "next/head";
import Image from "next/image";
import FAQ from "../components/IndexComponents/FAQ/FAQ";
import Footer from "../components/IndexComponents/Footer/Footer";
import Hero from "../components/IndexComponents/Hero/Hero";
import OurServices from "../components/IndexComponents/OurServices/OurServices";
import { SendMessage } from "../components/IndexComponents/SendMessage/SendMessage";
import WorkedWith from "../components/IndexComponents/WorkedWith/WorkedWith";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>ScrapeFox</title>
        <meta
          name="description"
          content="ScrapeFox is a Web Scraping website and Credential Validator"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Hero />
        <OurServices />
        <WorkedWith />
        <FAQ />
        <SendMessage />
      </main>

      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}
