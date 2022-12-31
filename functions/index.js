/* eslint-disable no-unreachable */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prefer-const */
/* eslint-disable comma-dangle */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
/* eslint-disable max-len */
const validateAll = require("./validateAll");
const scrapeAll = require("./scrapeAll");
exports.executeTask = validateAll.executeTask;
exports.updateTaskStatus = validateAll.updateTaskStatus;
exports.executeScraping = scrapeAll.executeScraping;
