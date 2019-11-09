"use strict";
const express = require("express");
const {
  ship,
  addIncomeToArr,
  getDataFromBackup,
  getIncomingData
} = require("./processMethodesModule");

const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//Initiate the log list
var logList = [];
//get the logs from the file to the List - if necissary we will activate it
//logList = getDataFromBackup(logList);
async function processRutine(logList) {
  var dateNow = Date.now();
  while (true) {
    var incomeLogList = await getIncomingData(); //Listen for incoming data (from bos, movile) and returns array of log objects.
    var newLogList = addIncomeToArr(incomeLogList, logList); //Goes over the array received from bos/mobile, validate each log, if it is valid it get inserted to a new and updated logList.
    if (Date.now() >= dateNow || newLogList.length >= 100) {
      ship(newLogList);
      dateNow = Date.now();
    }
  }
}

setTimeout(function() {
  console.log(logList);
}, 5000);
