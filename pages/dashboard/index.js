import React, { useEffect, useState } from "react";
import TaskElement from "../../components/DashboardComponents/Home/TaskElement";
import {
  collection,
  query,
  where,
  limit,
  orderBy,
  startAfter,
} from "firebase/firestore";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import styles from "../../components/DashboardComponents/Home/Home.module.css";
import { db } from "../../firebase/config";
import LoaderIcon from "../../public/Icons/Loader.svg";
import LoadMoreIcon from "../../public/Icons/LoadMore.svg";
import Image from "next/image";
const Dashboard = () => {
  const [data, setData] = useState([]);
  const [lastData, setLastData] = useState(null);
  const [queryCall, setQueryCall] = useState(null);
  const [dataReq, setDataReq] = useState(true);
  const [docs, loading, error] = useCollectionDataOnce(queryCall);
  const loadMoreTasks = () => {
    console.log("lastDataloadmore", lastData);

    const q = query(
      collection(db, "tasks"),
      where("uid", "==", localStorage.getItem("uid")),
      orderBy("dateCreated", "desc"),
      startAfter(lastData.dateCreated),
      limit(5)
    );
    setQueryCall(q);
  };
  useEffect(() => {
    console.log("lastData", lastData);
    if (!lastData) {
      const q = query(
        collection(db, "tasks"),
        where("uid", "==", localStorage.getItem("uid")),
        orderBy("dateCreated", "desc"),
        limit(5)
      );
      setQueryCall(q);
    }
  }, [lastData]);

  useEffect(() => {
    if (docs) {
      const convDocs = docs.map((doc) => {
        const data = doc;
        const convData = {
          dateCreated: data.dateCreated.toDate().toLocaleString(),
          queryCount: data.queryCount,
          service: data.service,
          taskRunning: data.taskRunning,
          uid: data.uid,
          taskId: data.taskId,
          taskIdShort: data.taskIdShort,
        };
        return convData;
      });
      setLastData(docs[docs.length - 1]);
      setData((prev) => [...prev, ...convDocs]);
    }
  }, [docs]);
  return (
    <section id="homePage">
      {console.log("data", data, "=>docs", docs)}
      <div className={styles.cards}>
        <h2 data-aos="fade" data-aos-easing="ease-in-out">
          Ongoing Tasks
        </h2>
        <div className={styles.content}>
          {loading && (
            <div className={styles.loader}>
              <Image src={LoaderIcon} alt="" />
            </div>
          )}
          {data?.map((task) => {
            if (task.taskRunning == true) {
              return (
                <TaskElement key={task.taskIdShort} task={task} type="card" />
              );
            }
          })}
          {error && <div>{error}</div>}
          <div
            className={styles.loadmore}
            data-shadow="outer"
            onClick={loadMoreTasks}
          >
            <Image src={LoadMoreIcon} alt="" />
          </div>
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
          {loading && (
            <div className={styles.loader}>
              <Image src={LoaderIcon} alt="" />
            </div>
          )}
          {data?.map((task) => {
            return (
              <TaskElement key={task.taskIdShort} task={task} type="list" />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
