import React, { useState } from "react";
import SidebarContent from "../components/DashboardComponents/SidebarContent";
import styles from "../components/DashboardComponents/Dashboard.module.css";
import Button from "../components/Button/Button";

const dashboard = () => {
  const tasks = [
    {
      Id: "dsaw231d",
      QueryCount: 250,
      Service: "Google Maps Scraper",
      CreatedAt: "Nov 25, 2022 10:35am",
      Status: 1,
    },
    {
      Id: "saw2d31d",
      QueryCount: 250,
      Service: "WhatsApp Validator",
      CreatedAt: "Nov 25, 2022 10:35am",
      Status: 1,
    },
    {
      Id: "w231dsad",
      QueryCount: 250,
      Service: "Phone Number Validator",
      CreatedAt: "Nov 25, 2022 10:35am",
      Status: 0,
    },
    {
      Id: "1dsw23ad",
      QueryCount: 250,
      Service: "Phone Number Validator",
      CreatedAt: "Nov 25, 2022 10:35am",
      Status: 1,
    },
    {
      Id: "31dw2sad",
      QueryCount: 250,
      Service: "Phone Number Validator",
      CreatedAt: "Nov 25, 2022 10:35am",
      Status: 1,
    },
    {
      Id: "231dwsad",
      QueryCount: 250,
      Service: "Phone Number Validator",
      CreatedAt: "Nov 25, 2022 10:35am",
      Status: 1,
    },
    {
      Id: "sadw231d",
      QueryCount: 250,
      Service: "Phone Number Validator",
      CreatedAt: "Nov 25, 2022 10:35am",
      Status: 0,
    },
  ];
  const [dataLoading, setDataLoading] = useState();
  const [sbToggle, setSbToggle] = useState(false);
  return (
    <div className={styles.container + " " + (sbToggle ? styles["open"] : "")}>
      <div className={styles.overlay}></div>
      <div className={styles.sidebar}>
        <div className={styles.content}>
          <SidebarContent />
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
        <div className={styles.cards}>
          <h2>Ongoing Tasks</h2>
          <div className={styles.content}>
            {tasks.map((task) => {
              if (task.Status == 0)
                return (
                  <div key={task.Id} className={styles.item}>
                    <div className={styles.id}>{task.Id}</div>
                    <div className={styles.date}>{task.CreatedAt}</div>
                    <div className={styles.service}>{task.Service}</div>
                    <div className={styles.queries}>
                      {task.QueryCount} queries
                    </div>
                    <div
                      className={styles.status}
                      data-taskstatus={
                        task.Status == 0 ? "Running" : "Complete"
                      }
                    >
                      {task.Status == 0 ? "Running" : "Complete"}
                    </div>
                  </div>
                );
            })}
          </div>
        </div>
        <div className={styles.list}>
          <h2>Task History</h2>
          <div className={styles.content} data-shadow="inner">
            {tasks.map((task) => {
              return (
                <div key={task.Id} className={styles.item} data-shadow="outer">
                  <div className={styles.id}>{task.Id}</div>
                  <div className={styles.date}>{task.CreatedAt}</div>
                  <div className={styles.service}>{task.Service}</div>
                  <div className={styles.queries}>
                    {task.QueryCount} queries
                  </div>
                  <div
                    className={styles.status}
                    data-taskstatus={task.Status == 0 ? "Running" : "Complete"}
                  >
                    {task.Status == 0 ? "Running" : "Complete"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default dashboard;
