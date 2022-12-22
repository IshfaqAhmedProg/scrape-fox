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
  //try to move firestore code to userdbcontext
  const [data, setData] = useState([]);
  const [lastData, setLastData] = useState(null);
  const [queryCall, setQueryCall] = useState(null);
  const [docs, loading, error] = useCollectionDataOnce(queryCall);
  const loadMoreTasks = () => {
    if (lastData == "nomoredata") return;
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
    //useeffect to sync querycall
    console.log("lastData", lastData);
    if (!lastData && lastData != "nomoredata") {
      const q = query(
        collection(db, "tasks"),
        where("uid", "==", localStorage.getItem("uid")),
        orderBy("dateCreated", "desc"),
        limit(5)
      );
      setQueryCall(q);
    }
  }, [lastData]);
  function arrayUnique(array) {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
      for (var j = i + 1; j < a.length; ++j) {
        if (a[i] === a[j]) a.splice(j--, 1);
      }
    }

    return a;
  }
  useEffect(() => {
    //useeffect to sync data
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
      setLastData(docs[docs.length - 1] ? docs[docs.length - 1] : "nomoredata");
      setData((prev) => arrayUnique(prev.concat(convDocs)));
    }
  }, [docs]);
  return (
    <>
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
          {error && <div className={styles.empty}>No ongoing tasks</div>}
          {lastData != "nomoredata" && (
            <div
              className={styles.loadmore}
              data-shadow="outer"
              onClick={loadMoreTasks}
            >
              <Image src={LoadMoreIcon} alt="" />
            </div>
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
          {error && <div className={styles.empty}>No ongoing tasks</div>}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
