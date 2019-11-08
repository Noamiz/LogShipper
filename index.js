const express = require("express");
const path = require("path");
const router = express.Router();
const moment = require("moment");
const uuid = require("uuid");
const fs = require("fs");
const lineReader = require("line-reader");
const processMethodesModule = require("./processMethodesModule");
var validate = processMethodesModule.validate;
var ship = processMethodesModule.ship;
var addIncomeToArr = processMethodesModule.addIncomeToArr;
var save = processMethodesModule.save;
var getDataFromBackup = processMethodesModule.getDataFromBackup;
var getIncomingData = processMethodesModule.getIncomingData;

const app = express();

//Body Parser Middlewre
app.use(express.json());
//Hnadling url encoded data
app.use(express.urlencoded({ extended: false }));
//Logs API Routes
app.use("/api/logs", require("./routes/api/logs"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//Initiate the log list
var logList = [];
//get the logs from the file to the List - if necissary we will activate it
//logList = getDataFromBackup(logList);
async function processRutine(logList) {
  var incomeLogList = await getIncomingData();
  var newLogList = await addIncomeToArr(incomeLogList);
}

//Create and insert new log
router.post("/api/logs", (req, res) => {
  const timeFrame = moment().format();
  const newLog = {
    id: uuid.v4(),
    time: timeFrame,
    name: req.body.name
  };
  if (!newLog.name) {
    res.status(400).json({ msg: "please include name of log!" });
  } else {
    logList.push(newLog);
    save(newLog);
    res.json(logList);
  }
});

//Testing that the logList is updated
setTimeout(function() {
  console.log(logList);
}, 5000);
