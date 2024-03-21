const express = require("express");
const router = express.Router();
const verificationController = require("../controller/verificationController");

router.get("/gVerification", async (req, res) => {
  try {
    const result = await verificationController.getCode();
    console.log("Fetching code success");
    res.status(200).json({
      status: "Success",
      code: 200,
      data: result,
    });
  } catch (error) {
    console.log("Error while fetching code:", error);
    res.status(500).json({
      status: "Error",
      code: 500,
      message: error.message,
    });
  }
});

router.post("/cVerification", async (req, res) => {
  try {
    const { code } = req.body;
    const result = await verificationController.createCode(code);
    console.log("Creating code success");
    res.status(201).json({
      status: "Success",
      code: 201,
      message: "Code created successfully",
      data: result,
    });
  } catch (error) {
    console.log("Error while creating code:", error);
    res.status(500).json({
      status: "Error",
      code: 500,
      message: error.message,
    });
  }
});

router.post("/sVerification", async (req, res) => {
  try {
    const { code } = req.body;
    const results = await verificationController.getCode();
    const matchingCode = results.find((result) => result.code === code);
    if (matchingCode) {
      console.log(`Sending code ${code} to the user`);
      res.status(200).json({
        status: "Success",
        code: 200,
        message: "Code sent successfully",
      });
    } else {
      res.status(404).json({
        status: "Error",
        code: 404,
        message: "Invalid code",
      });
    }
  } catch (error) {
    console.log("Error while sending code:", error);
    res.status(500).json({
      status: "Error",
      code: 500,
      message: error.message,
    });
  }
});



module.exports = router;
