/* eslint-disable no-trailing-spaces */
/* eslint-disable prefer-const */
/* eslint-disable comma-dangle */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
/* eslint-disable max-len */
const functions = require("firebase-functions");
const fetch = require("node-fetch");
const admin = require("firebase-admin");
admin.initializeApp();
exports.executeTask = functions.firestore
  .document("tasks/{taskId}")
  .onCreate(async (doc, ctx) => {
    const { service, request } = doc.data();
    if (service == "Email Validator") {
      const firestoreVals = await validateAllEmails(request);
      return admin.firestore().collection("taskResults").doc(doc.id).set({
        results: firestoreVals,
      });
    }
  });
exports.updateTaskStatus = functions.firestore
  .document("taskResults/{taskResultId}")
  .onCreate(async (doc, ctx) => {
    return admin
      .firestore()
      .collection("tasks")
      .doc(doc.id)
      .update({ taskRunning: false });
  });
const validateAllEmails = async (emails) => {
  const allAsyncResults = [];
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "bb619020c8msh0e24b40e791c34dp1b6430jsnb4541194a915",
      "X-RapidAPI-Host": "mailcheck.p.rapidapi.com",
    },
  };
  for (const item of emails) {
    const data = await (
      await fetch(`https://mailcheck.p.rapidapi.com/?domain=${item}`, options)
    ).json();
    const configdata = { ...data, email: item };
    allAsyncResults.push(configdata);
  }

  return allAsyncResults;
};
