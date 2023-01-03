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
const withPuppeteer = require("./mapsScraper");

exports.executeScraping = functions
  .runWith({ memory: "1GB", timeoutSeconds: 540 })
  .firestore.document("tasks/{taskId}")
  .onCreate(async (doc, ctx) => {
    const { service, uid, request } = doc.data();
    console.log(request);
    if (service == "Google Maps Scraper") {
      try {
        const firestoreVals = await withPuppeteer.getLocalPlacesInfo(request.keywords, request.coords, request.language);
        // var businesses = await firestoreVals.reduce((obj, item) => (obj[item.title] = item, obj), {});
        return admin.firestore().collection("taskResults").doc(doc.id).set({
          results: firestoreVals,
          uid: uid,
          resultsCount: firestoreVals.length
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  });
