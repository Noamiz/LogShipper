const express = require("express");
const router = express.Router();
//const logs = require("../../Logs");
const moment = require("moment");
const uuid = require("uuid");
const fs = require("fs");
const save = require("../../saveToFileModule");
const readline = require("readline");

let logs = [];
//Get updated array of logs from backup.txt file - Synchronous:
logs = fs
  .readFileSync("./backup.txt")
  .toString()
  .split("\n");
//Get updated array of logs from backup.txt file - Asynchronous:
// fs.readFile('./backup.txt', function(err, data) {
//     if(err) throw err;
//     logs = data.toString().split("\n");
// });

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
    save.save(newLog);
    res.json(logs);
  }
});

console.log(logs);

module.exports = router;
