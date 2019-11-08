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
  var incomeLogList = await getIncomingData();
  var newLogList = await addIncomeToArr(incomeLogList, logList);
  ship(newLogList);
}

setTimeout(function() {
  console.log(logList);
}, 5000);
