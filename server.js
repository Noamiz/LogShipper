const express = require("express");
const processMethodesModule = require("./processMethodesModule");
var ship = processMethodesModule.ship;
var addIncomeToArr = processMethodesModule.addIncomeToArr;
var getDataFromBackup = processMethodesModule.getDataFromBackup;
var getIncomingData = processMethodesModule.getIncomingData;

const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//Initiate the log list
var logList = [];
//get the logs from the file to the List - if necissary we will activate it
//logList = getDataFromBackup(logList);
async function processRutine(logList) {
  var countSeconds = 0;
  while (true) {
    var incomeLogList = await getIncomingData(); //Listen for incoming data (from bos, movile) and returns array of log objects.
    var newLogList = await addIncomeToArr(incomeLogList, logList); //Goes over the array received from bos/mobile, validate each log, if it is valid it get inserted to a new and updated logList.
    countSeconds++;
    if (countSeconds >= 20 || newLogList.length >= 100) {
      ship(newLogList);
    }
  }
}

setTimeout(function() {
  console.log(logList);
}, 5000);
