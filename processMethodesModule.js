const lineReader = require("line-reader");

module.exports = {
  getIncomingData: function() {
    //This function gets the incoming log list from kafka, and returns it.
    return new Promise(resolve => {
      //code
      //Listen for incoming data, when delivered, we return array of log objects.
      resolve(incomeLogList);
    });
  },
  validate: function(log) {
    //This methode gets a log, validate that it is in the correct format, and returnes true/ false.
    var isLogValid = false;
    if (
      log.timestamp != null &&
      (log.environment == "development" || "test" || "production") &&
      (log.module == "BOS" || "MobileSDK" || "LogService") &&
      (log.category == "SDR" || "events" || "DB" || "Connection") &&
      log.message != null
    ) {
      isLogValid = true;
    }
    return isLogValid;
  },
  addIncomeToArr: function(incomeLogList, logList) {
    //This methode goes over the logs in the arr received from KAFKA one by one, validate each log, and if it is valid insets it to the newlogList. Last, it returnes it.
    var newLogList = logList;
    incomeLogList.forEach(log => {
      var isLogValid = this.validate(log);
      if (isLogValid) {
        newLogList.push(log);
        this.saveLogToBackup(log);
      }
    });
    return newLogList;
  },
  ship: function(logList) {
    //This methode send the logList as a bulk to logz.io, if sending was unsuccessful it retries to send.
    //If sending was successful the logList is being empty.

    return "Shipping is done, logList is empty.";
  },
  saveLogToBackup: function(newLog) {
    //Done
    fs.appendFile("./backup.txt", JSON.stringify(newLog), err => {
      if (err) {
        return console.log(err);
      }
    });
  },
  getDataFromBackup: function(logList) {
    //Done
    lineReader.eachLine("./backup.txt", line => {
      logList.push(JSON.parse(line));
    });
    return logList;
  }
};
