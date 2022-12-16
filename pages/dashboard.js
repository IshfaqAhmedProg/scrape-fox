import React, { useState } from "react";
import Sidebar from "../components/DashboardComponents/Sidebar/Sidebar";
import styles from "../components/DashboardComponents/Dashboard.module.css";
import Button from "../components/Button/Button";
import DashboardModal from "../components/DashboardComponents/DashboardModal";
import Head from "next/head";

const Dashboard = () => {
  const [dataLoading, setDataLoading] = useState();
  const [sbToggle, setSbToggle] = useState(false);
  const [activePage, setActivePage] = useState("");
  return (
    <>
      <Head>
        <title>ScrapeFox-Dashboard</title>
      </Head>
      <div
        className={styles.container + " " + (sbToggle ? styles["open"] : "")}
      >
        <div className={styles.overlay}></div>
        <div className={styles.sidebar} data-aos="fade-right">
          <div className={styles.content}>
            <Sidebar setActivePage={setActivePage} />
          </div>
          <div
            className={styles.sidebartoggle}
            onClick={() => setSbToggle(!sbToggle)}
            data-shadow="outer"
          >
            <Button variant="rightarrow" />
          </div>
        </div>
        <div className={styles.main}>
          <DashboardModal page={activePage} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
