class Task {
  constructor(
    taskId,
    taskIdShort,
    taskRunning,
    service,
    dateCreated,
    queryCount,
    uid
  ) {
    this.taskId = taskId;
    this.taskIdShort = taskIdShort;
    this.taskRunning = taskRunning;
    this.service = service;
    this.dateCreated = dateCreated;
    this.queryCount = queryCount;
    this.uid = uid;
  }
}

// Firestore data converter
export const taskConverter = {
  toFirestore: (task) => {
    return {
      taskId: task.taskId,
      taskIdShort: task.taskIdShort,
      taskRunning: task.taskRunning,
      service: task.service,
      dateCreated: task.dateCreated,
      queryCount: task.queryCount,
      uid: task.uid,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Task(
      data.taskId,
      data.taskIdShort,
      data.taskRunning,
      data.service,
      data.dateCreated,
      data.queryCount,
      data.uid
    );
  },
};
