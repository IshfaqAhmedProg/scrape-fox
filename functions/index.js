/* eslint-disable no-unreachable */
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
    const { service, uid, request } = doc.data();
    switch (service) {
      case "Email Validator":
        {
          const firestoreVals = await validateAllEmails(request);
          return admin.firestore().collection("taskResults").doc(doc.id).set({
            uid: uid,
            results: firestoreVals,
          });
        }
        break;
      case "Phone Number Validator":
        {
          const firestoreVals = await validateAllNumbers(request);
          return admin.firestore().collection("taskResults").doc(doc.id).set({
            uid: uid,
            results: firestoreVals,
          });
        }
        break;
      case "WhatsApp Validator":
        {
          const firestoreVals = await validateAllWhatsapp(request);
          return admin.firestore().collection("taskResults").doc(doc.id).set({
            uid: uid,
            results: firestoreVals,
          });
        }
        break;

      default:
        break;
    }
  });

const validateAllEmails = async (emails) => {
  const allAsyncResults = [];
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": `${process.env.RAPID_API_KEY}`,
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
const validateAllNumbers = async (numbers) => {
  const allAsyncResults = [];
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": `${process.env.RAPID_API_KEY}`,
      "X-RapidAPI-Host": "veriphone.p.rapidapi.com",
    },
  };
  for (const item of numbers) {
    const data = await (
      await fetch(
        `https://veriphone.p.rapidapi.com/verify?phone=%2B${item}`,
        options
      )
    ).json();
    const configdata = { ...data, number: item };
    allAsyncResults.push(configdata);
  }

  return allAsyncResults;
};
const validateAllWhatsapp = async (numbers) => {
  const allAsyncResults = [];
  const detailsOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": `${process.env.RAPID_API_KEY}`,
      "X-RapidAPI-Host": "whatsapp-checker.p.rapidapi.com",
    },
  };
  const photoOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": `${process.env.RAPID_API_KEY}`,
      "X-RapidAPI-Host": "whatsapp-profile-pic.p.rapidapi.com",
    },
  };
  for (const item of numbers) {
    const details = await (
      await fetch(
        `https://whatsapp-checker.p.rapidapi.com/check/?number=${item}`,
        detailsOptions
      )
    ).json();
    const photo = await (
      await fetch(
        `https://whatsapp-profile-pic.p.rapidapi.com/wspic/url?phone=${item}`,
        photoOptions
      )
    ).text();
    const configdata = { ...details, photo: photo, number: item };
    allAsyncResults.push(configdata);
  }
  return allAsyncResults;
};
exports.updateTaskStatus = functions.firestore
  .document("taskResults/{taskResultId}")
  .onCreate(async (doc, ctx) => {
    return admin.firestore().collection("tasks").doc(doc.id).set(
      {
        taskRunning: false,
        dateCompleted: admin.firestore.Timestamp.now(),
      },
      { merge: true }
    );
  });
