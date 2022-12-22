import React, { useEffect, useRef, useState } from "react";
import { useUserDb } from "../../../contexts/UserDatabaseContext";
import styles from "./Home.module.css";
import TaskElement from "./TaskElement";
import { useAuth } from "../../../contexts/AuthContext";

import {
  query,
  collection,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../firebase/config";
const Home = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [showLoadMore, setShowLoadMore] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      //get tasks from firebase from here fuck my life aaaaaaa/a//
      if (dataLoading == true && (await user.uid) && data.length == 0) {
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
        if (docs.length != 0) {
          setDataLoading(false);
        }
        setData(docs);
        console.log("docs", docs);
      }
      console.log("dataLoadingend", dataLoading);
    })();
  }, [loading, user]);
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
                setShowLoadMore(true);
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

export default Home;
