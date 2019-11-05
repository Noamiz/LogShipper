/*
save function gets an object (log object of exmaple), and adds it as a string to the file backup.txt
*/

const fs = require("fs");

exports.save = newLog => {
  fs.appendFile("./backup.txt", JSON.stringify(newLog), err => {
    if (err) {
      return console.log(err);
    }
  });
};
