import React, { useEffect, useState } from "react";
import TaskElement from "../../components/DashboardComponents/Home/TaskElement";
import {
  collection,
  query,
  where,
  getDocs,
  limit,
  orderBy,
  getCountFromServer,
  startAfter,
  Timestamp,
} from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import styles from "../../components/DashboardComponents/Home/Home.module.css";
import { db } from "../../firebase/config";

const Dashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataExists, setDataExists] = useState();
  let lastTask = null;

  useEffect(() => {
    (async () => {
      if (dataLoading == true && (await user.uid)) {
        const q = query(
          collection(db, "tasks"),
          where("uid", "==", user.uid),
          orderBy("dateCreated", "desc"),
          limit(5)
        );

        console.log("user.uid 1", user.uid);
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          data.id = doc.id;
          const convData = {
            dateCreated: data.dateCreated.toDate().toLocaleString(),
            queryCount: data.queryCount,
            service: data.service,
            taskRunning: data.taskRunning,
            uid: data.uid,
            taskId: data.taskId,
            taskIdShort: data.taskIdShort,
          };
          console.log("convData", convData);
          return convData;
        });
        setData(docs);
        lastTask = docs[docs.length - 1];
        console.log("docs", docs);
        console.log("lastTask", lastTask);
      }
      setDataLoading(false);
      console.log("dataLoading", dataLoading);
    })();
  }, []);
  return (
    <section id="homePage">
      <div className={styles.cards}>
        <h2 data-aos="fade" data-aos-easing="ease-in-out">
          Ongoing Tasks
        </h2>
        <div className={styles.content}>
          {data.length != 0 ? (
            data.map((task) => {
              if (task.taskRunning == true) {
                return (
                  <TaskElement key={task.taskIdShort} task={task} type="card" />
                );
              }
            })
          ) : (
            <div className={styles.empty}>No ongoing tasks</div>
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
            <div className={styles.empty}>No tasks available</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
