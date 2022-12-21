import React, { useEffect, useState } from "react";
import { useUserDb } from "../../../contexts/UserDatabaseContext";
import styles from "./Home.module.css";
import TaskElement from "./TaskElement";
const Home = () => {
  // const tasks = [
  //   {
  //     taskIdShort: "dsaw231d",
  //     queryCount: 250,
  //     service: "Google Maps Scraper",
  //     dateCreated: "Nov 25, 2022 10:35am",
  //     taskRunning: false,
  //   },
  //   {
  //     taskIdShort: "saw2d31d",
  //     queryCount: 250,
  //     service: "WhatsApp Validator",
  //     dateCreated: "Nov 25, 2022 10:35am",
  //     taskRunning: false,
  //   },
  //   {
  //     taskIdShort: "w231dsad",
  //     queryCount: 250,
  //     service: "Phone Number Validator",
  //     dateCreated: "Nov 25, 2022 10:35am",
  //     taskRunning: true,
  //   },
  //   {
  //     taskIdShort: "1dsw23ad",
  //     queryCount: 250,
  //     service: "Phone Number Validator",
  //     dateCreated: "Nov 25, 2022 10:35am",
  //     taskRunning: false,
  //   },
  //   {
  //     taskIdShort: "31dw2sad",
  //     queryCount: 250,
  //     service: "Phone Number Validator",
  //     dateCreated: "Nov 25, 2022 10:35am",
  //     taskRunning: false,
  //   },
  //   {
  //     taskIdShort: "31ddw2sa",
  //     queryCount: 250,
  //     service: "Phone Number Validator",
  //     dateCreated: "Nov 25, 2022 10:35am",
  //     taskRunning: true,
  //   },
  // ];
  const { getUserTasks, tasks } = useUserDb();
  const [data, setData] = useState(tasks);

  useEffect(() => {
    getUserTasks();
  }, [getUserTasks]);
  return (
    <section id="homePage">
      <div className={styles.cards}>
        <h2 data-aos="fade" data-aos-easing="ease-in-out">
          Ongoing Tasks
        </h2>
        <div className={styles.content}>
          {data.length != 0 ? (
            data.map((task) => {
              if (task.taskRunning == true)
                return (
                  <TaskElement key={task.taskIdShort} task={task} type="card" />
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
          {data.length != 0 ? (
            data.map((task) => {
              return (
                <TaskElement key={task.taskIdShort} task={task} type="list" />
              );
            })
          ) : (
            <p>No tasks</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
