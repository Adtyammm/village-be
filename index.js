const express = require("express");
const cors = require("cors");
const axios = require("axios");
const Sentiment = require("./models/sentiment");
const dbConfig = require("./dbmongose");
const reportingModel = require("./models/reporting");

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

// app.get("/sentimen", async (req, res) => {
//   try {
//     const sentiments = await Sentiment.find();
//     res.status(200).json(sentiments);
//   } catch (error) {
//     console.error("Error fetching sentiments:", error);
//     res.status(500).send("Failed to fetch sentiments");
//   }
// });

// app.get("/sentimen/latest", async (req, res) => {
//   try {
//     const latestSentiment = await Sentiment.findOne()
//       .sort({ createdAt: -1 })
//       .exec();

//     if (!latestSentiment) {
//       return res.status(404).send("No sentiment found");
//     }

//     res.status(200).json(latestSentiment);
//   } catch (error) {
//     console.error("Error fetching latest sentiment:", error);
//     res.status(500).send("Failed to fetch latest sentiment");
//   }
// });

app.use("/emp", employeeRoute);
app.use("/rep", reportingRoute);
app.use("/u", userRoute);
app.use("/v", verificationRoute);

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log("Server Kosar Village is running on port", port)
);
