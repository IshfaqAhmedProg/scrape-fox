import React from "react";
import styles from "./Home.module.css";
const Home = () => {
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
  return (
    <>
      <div className={styles.cards}>
        <h2 data-aos="fade" data-aos-easing="ease-in-out">
          Ongoing Tasks
        </h2>
        <div className={styles.content}>
          {tasks ? (
            tasks.map((task) => {
              if (task.Status == 0)
                return (
                  <div
                    key={task.Id}
                    className={styles.item}
                    data-aos="zoom-in"
                    data-aos-delay="100"
                  >
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
            })
          ) : (
            <p>No tasks</p>
          )}
        </div>
      </div>
      <div className={styles.list}>
        <h2 data-aos="fade" data-aos-delay="200" data-aos-easing="ease-in-out">
          Task History
        </h2>
        <div
          className={styles.content}
          data-shadow="inner"
          data-aos="fade-down"
          data-aos-delay="300"
        >
          {tasks.map((task) => {
            return (
              <div key={task.Id} className={styles.item} data-shadow="outer">
                <div className={styles.id}>{task.Id}</div>
                <div className={styles.date}>{task.CreatedAt}</div>
                <div className={styles.service}>{task.Service}</div>
                <div className={styles.queries}>{task.QueryCount} queries</div>
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
    </>
  );
};

export default Home;
