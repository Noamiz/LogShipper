const express = require("express");
const path = require("path");
const router = express.Router();
const moment = require("moment");
const uuid = require("uuid");
const fs = require("fs");
const lineReader = require("line-reader");
const processMethodesModule = require("./processMethodesModule");
const validate = processMethodesModule.validate;
const ship = processMethodesModule.ship;
const addIncomeToArr = processMethodesModule.addIncomeToArr;
const save = processMethodesModule.save;
const getDataFromBackup = processMethodesModule.getDataFromBackup;

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
getDataFromBackup(logList);

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

setTimeout(function() {
  console.log(logList);
}, 5000);

module.exports = router;
