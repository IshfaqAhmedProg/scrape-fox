import React, { useEffect, useState } from "react";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { writeFile, utils } from "xlsx";
import { db } from "../../../firebase/config";
import { useRouter } from "next/router";
import Image from "next/image";
import Button from "../../Button/Button";
import LoaderIcon from "../../../public/Icons/Loader.svg";
import xlsxIcon from "../../../public/Icons/xlsx.svg";
import csvIcon from "../../../public/Icons/csv.svg";
import styles from "./TaskPage.module.css";

const TaskPage = ({ task }) => {
  const tasksRef = doc(db, "tasks", `${task}`);
  const [taskResultsRef, setTaskResultsRef] = useState(null);
  const router = useRouter();

  const [taskvalue, loading, error, snapshot] = useDocumentData(tasksRef);
  useEffect(() => {
    if (taskvalue?.taskRunning == false) {
      const ref = doc(db, "taskResults", `${task}`);
      setTaskResultsRef(ref);
    }
  }, [taskvalue?.taskRunning, task]);
  const [taskResultsvalue, resultsloading, resultserror, resultssnapshot] =
    useDocumentData(taskResultsRef);
  const downloadFile = (filetype) => {
    if (taskResultsvalue != undefined) {
      const worksheet = utils.json_to_sheet(taskResultsvalue.results);
      const workbook = utils.book_new();
      utils.book_append_sheet(workbook, worksheet);
      writeFile(workbook, `Task no. ${task}.${filetype}`);
    }
  };
  return (
    <div data-shadow="outer" className={styles.container}>
      {loading ? (
        <Image src={LoaderIcon} alt="" height={90} width={90} />
      ) : (
        <>
          <Button variant="close" onClick={() => router.push("/dashboard")} />
          <div className={styles.title}>
            <h2>
              Task #{taskvalue.taskIdShort}{" "}
              <span> - {taskvalue.service} - </span>
              <span>
                <strong>{taskvalue.queryCount}</strong>{" "}
                {taskvalue.queryCount ? "queries" : ""}
              </span>
            </h2>
          </div>
          {taskvalue.taskRunning ? (
            <div className={styles.progressbar}>
              Estimated time remaining: {taskvalue.estimatedTTC}
            </div>
          ) : (
            ""
          )}
          <div className={styles.result}>
            <div className={styles.stats}>
              <div className={styles.label}>
                Status:
                <span
                  data-taskstatus={
                    taskvalue.taskRunning == true ? "Running" : "Complete"
                  }
                >
                  {taskvalue.taskRunning == true ? "Running" : "Complete"}
                </span>
              </div>
              {taskvalue.taskRunning == true ? (
                <div className={styles.label}>
                  Created at:
                  <span>{taskvalue.dateCreated.toDate().toLocaleString()}</span>
                </div>
              ) : (
                <div className={styles.label}>
                  Completed at:
                  <span>
                    {taskvalue.dateCompleted.toDate().toLocaleString()}
                  </span>
                </div>
              )}
            </div>
            <div
              className={styles.download}
              data-shadow={taskvalue.taskRunning ? "inner" : "outer"}
              data-clickable={taskvalue.taskRunning ? "false" : "true"}
              onClick={() => downloadFile("xlsx")}
            >
              <Image src={xlsxIcon} alt="download excel file" />
              Download .xlsx file
            </div>
            <div
              className={styles.download}
              data-shadow={taskvalue.taskRunning ? "inner" : "outer"}
              data-clickable={taskvalue.taskRunning ? "false" : "true"}
              onClick={() => downloadFile("csv")}
            >
              <Image src={csvIcon} alt="download csv file" />
              Download .csv file
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskPage;
