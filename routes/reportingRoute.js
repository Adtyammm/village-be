const express = require("express");
const router = express.Router();
const reportingController = require("../controller/reportingController");
const Sentiment = require("../models/sentiment");
const axios = require("axios");

const flaskURL = "http://localhost:8080/predict";

router.post("/prediksiSentimen", async (req, res) => {
  try {
    const { text, reportId } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ error: "Teks tidak boleh kosong" });
    }

    console.log("Received request with reportId:", reportId, "and text:", text);

    // Memanggil Flask API untuk prediksi sentimen
    const response = await axios.post(flaskURL, { text });
    const sentiment_label = response.data.sentimen;

    // Membuat objek Sentiment baru
    const newSentiment = new Sentiment({ text, sentiment_label });
    await newSentiment.save();

    const sentimentId = newSentiment._id;

    console.log(
      "Updating sentiment for reportId:",
      reportId,
      "with sentimentId:",
      sentimentId
    );

    const updatedReporting = await reportingController.updateSentiment(
      reportId,
      sentimentId
    );

    console.log("Updated reporting:", updatedReporting);

    console.log("Data berhasil disimpan ke MongoDB:", newSentiment);
    res.json({
      message: "Sentimen berhasil diprediksi dan tersimpan.",
      sentiment: newSentiment,
      updatedReporting: updatedReporting,
    });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat memproses permintaan" });
  }
});

router.get("/gReporting", async (req, res) => {
  try {
    const data = await reportingController.getAllReporting();
    console.log(new Date() + " : Request GET All Reporting success code 200");
    res.status(200).json({
      status: "Success",
      code: 200,
      data: data,
    });
  } catch (error) {
    console.log(
      new Date() + " : Request GET All Reporting failed code 500",
      error
    );
    res.status(500).json({
      status: "Error",
      code: 500,
      message: error.message,
    });
  }
});

router.get("/gReportingByID/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await reportingController.getReportingByID(id);
    console.log(new Date() + " : Request GET Reporting by ID success code 200");
    res.status(200).json({
      status: "Success",
      code: 200,
      data: data,
    });
  } catch (error) {
    console.log(
      new Date() + " : Request GET Reporting by ID failed code 500",
      error
    );
    res.status(500).json({
      status: "Error",
      code: 500,
      message: error.message,
    });
  }
});

router.post("/cReporting", async (req, res) => {
  try {
    const detail = req.body;
    const result = await reportingController.createReporting(detail);
    console.log(new Date() + " : Request POST Reporting success code 200");
    res.status(200).json({
      status: "Success",
      code: 200,
      data: result,
    });
  } catch (error) {
    console.log(
      new Date() + " : Request POST Reporting failed code 500",
      error
    );
    res.status(500).json({
      status: "Error",
      code: 500,
      message: error.message,
    });
  }
});

router.put("/uReporting/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const result = await reportingController.updateReporting(id, update);
    console.log(new Date() + " : Request PUT Reporting success code 200");
    res.status(200).json({
      status: "Success",
      code: 200,
      data: result,
    });
  } catch (error) {
    console.log(new Date() + " : Request PUT Reporting failed code 500", error);
    res.status(500).json({
      status: "Error",
      code: 500,
      message: error.message,
    });
  }
});

router.delete("/dReporting/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await reportingController.deleteReporting(id);
    console.log(new Date() + " : Request DELETE Reporting success code 200");
    res.status(200).json({
      status: "Success",
      code: 200,
      data: result,
    });
  } catch (error) {
    console.log(
      new Date() + " : Request DELETE Reporting failed code 500",
      error
    );
    res.status(500).json({
      status: "Error",
      code: 500,
      message: error.message,
    });
  }
});

router.put("/uReporting/:id/reason", async (req, res) => {
  try {
    const id = req.params.id;
    const { reason } = req.body;
    const result = await reportingController.updateReportingReason(id, reason);
    console.log(
      new Date() + " : Request PUT Reporting Reason success code 200"
    );
    res.status(200).json({
      status: "Success",
      code: 200,
      data: result,
    });
  } catch (error) {
    console.log(
      new Date() + " : Request PUT Reporting Reason failed code 500",
      error
    );
    res.status(500).json({
      status: "Error",
      code: 500,
      message: error.message,
    });
  }
});

router.get("/gReporting/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await reportingController.getReportingByUserId(userId);
    console.log(
      new Date() + " : Request GET Reporting by user_id success code 200"
    );
    res.status(200).json({
      status: "Success",
      code: 200,
      data: result,
    });
  } catch (error) {
    console.log(
      new Date() + " : Request GET Reporting by user_id failed code 500",
      error
    );
    res.status(500).json({
      status: "Error",
      code: 500,
      message: error.message,
    });
  }
});

router.put("/vReporting/vote/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { vote } = req.body;
    const result = await reportingController.vote(id, vote);
    console.log(new Date() + " : Request PUT Reporting vote success code 200");
    res.status(200).json({
      status: "Success",
      code: 200,
      data: result,
    });
  } catch (error) {
    console.log(
      new Date() + " : Request PUT Reporting vote failed code 500",
      error
    );
    res.status(500).json({
      status: "Error",
      code: 500,
      message: error.message,
    });
  }
});

module.exports = router;
