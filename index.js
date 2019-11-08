const express = require("express");

const app = express();

//Body Parser Middlewre
app.use(express.json());
//Hnadling url encoded data
app.use(express.urlencoded({ extended: false }));
//Logs API Routes
app.use("/api/logs", require("./routes/api/logs"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
