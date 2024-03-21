const express = require("express");
const cors = require("cors");



const dbConfig = require("./dbmongose");

const employeeRoute = require("./routes/employeeRoute");
const reportingRoute = require("./routes/reportingRoute");
const userRoute = require("./routes/userRoute");
const verificationRoute = require("./routes/verificationRoute");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", async (req, res, next) => {
  return res.status(200).json({
    title: "Server Jalan",
    message: "Server siap digunakan!",
  });
});

app.use("/emp", employeeRoute);
app.use("/rep", reportingRoute);
app.use("/u", userRoute);
app.use("/v", verificationRoute);



const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log("Server Kosar Village is running on port", port)
);
