import React from "react";
import styles from "./Home.module.css";

const TaskElement = ({ task, type }) => {
  return (
    <div
      className={styles.item}
      data-aos={type == "card" ? "zoom-in" : ""}
      data-shadow="outer"
    >
      <div className={styles.id}>{task.taskIdShort}</div>
      <div className={styles.date}>{task.dateCreated}</div>
      <div className={styles.service}>{task.service}</div>
      <div className={styles.queries}>{task.queryCount} queries</div>
      <div
        className={styles.status}
        data-taskstatus={task.taskRunning == true ? "Running" : "Complete"}
      >
        {task.taskRunning == true ? "Running" : "Complete"}
      </div>
    </div>
  );
};

export default TaskElement;
