import Link from "next/link";
import React from "react";
import styles from "./Home.module.css";
import Modal from "react-modal";
import Button from "../../Button/Button";
import { useRouter } from "next/router";
import TaskPage from "./TaskPage";
Modal.setAppElement("#__next");
const TaskElement = ({ task, type }) => {
  const customStyles = {
    content: {
      marginBlock: "auto",
      marginInline: "auto",
      paddingInline: "0",
      paddingBlock: "0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      border: "none",
      isolation: "isolate",
      width: "fit-content",
      height: "fit-content",
    },
  };
  const router = useRouter();

  return (
    <>
      <Link
        href={`/dashboard/?task=${task.taskId}`}
        as={`/dashboard/tasks/${task.taskId}`}
      >
        <div data-aos={type == "card" ? "zoom-in" : ""}>
          <div className={styles.item} data-shadow="outer">
            <div className={styles.id}>{task.taskIdShort}</div>
            <div className={styles.date}>{task.dateCreated}</div>
            <div className={styles.service}>{task.service}</div>
            <div className={styles.queries}>{task.queryCount} queries</div>
            <div
              className={styles.status}
              data-taskstatus={
                task.taskRunning == true ? "Running" : "Complete"
              }
            >
              {task.taskRunning == true ? "Running" : "Complete"}
            </div>
          </div>
        </div>
      </Link>
      <Modal
        isOpen={!!router.query.task}
        onRequestClose={() => router.push("/dashboard")}
        style={customStyles}
        contentLabel="Task Modal"
      >
        <TaskPage task={router.query.task} />
      </Modal>
    </>
  );
};

export default TaskElement;
