const lineReader = require("line-reader");

module.exports = {
  validate: function(log) {
    var isLogValid = true;
    /*
        this methode gets a log, validate that it is in the correct format, and returnes true/ false.
        */
    return isLogValid;
  },
  addIncomeToArr: function(logArr, logList) {
    /*
            this methode goes over the logs in the arr received from KAFKA one by one, validate each log, and if it is valid insets it to the logList. 
            */
    return "New income was added to the logList.";
  },
  ship: function(logArr) {
    /*
            this methode send the logArr as a bulk to logz.io, if sending was unsuccessful it retries to send. 
            If sending was successful the logArr is being empty. 
            */
    return "Shipping is done, logList is empty.";
  },
  save: function(newLog) {
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
  }
};
