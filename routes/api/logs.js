const express = require("express");
const router = express.Router();
//const logs = require("../../Logs");
const moment = require("moment");
const uuid = require("uuid");
const fs = require("fs");
const processMethodesModule = require("../../processMethodesModule");
const validate = processMethodesModule.validate;
const ship = processMethodesModule.ship;
const addIncomeToArr = processMethodesModule.addIncomeToArr;
const save = processMethodesModule.save;

let logs = [];
//Get updated array of logs from backup.txt file - Synchronous:
logs = fs
  .readFileSync("./backup.txt")
  .toString()
  .split("\n");

// get all logs
router.get("/", (req, res) => {
  res.json(logs);
});

// get a single log
router.get("/:id", (req, res) => {
  const found = logs.some(log => log.id === parseInt(req.params.id)); //True/False
  if (found) {
    res.json(logs.filter(log => log.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `no log with the id of ${req.params.id}` });
  }
});

//Create and insert new log
router.post("/", (req, res) => {
  const timeFrame = moment().format();
  const newLog = {
    id: uuid.v4(),
    time: timeFrame,
    name: req.body.name
  };
  if (!newLog.name) {
    res.status(400).json({ msg: "please include name of log!" });
  } else {
    logs.push(newLog);
    save(newLog);
    res.json(logs);
  }
});

setTimeout(function() {
  console.log(logList);
}, 5000);

module.exports = router;
