/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-var */
/* eslint-disable linebreak-style */
/* eslint-disable no-unreachable */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prefer-const */
/* eslint-disable comma-dangle */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
/* eslint-disable max-len */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const withPuppeteer = require("./withPuppeteer");

exports.executeScraping = functions
  .runWith({ memory: "1GB", timeoutSeconds: 540 })
  .firestore.document("tasks/{taskId}")
  .onCreate(async (doc, ctx) => {
    const { service } = doc.data();
    if (service == "Google Maps Scraper") {
      const firestoreVals = await withPuppeteer.getLocalPlacesInfo();
      return admin.firestore().collection("taskResults").doc(doc.id).set({
        uid: uid,
        results: firestoreVals,
      });
    }
  });
