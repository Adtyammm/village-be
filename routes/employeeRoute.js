const express = require("express");
const router = express.Router();
const employeeController = require("../controller/employeeController");

router.get("/gEmployee", async (req, res) => {
  try {
    const data = await employeeController.getAllEmployees();
    console.log(new Date() + " : Request GET Employees success code 200");
    res.status(200).json({
      status: "Success",
      code: 200,
      data: data,
    });
  } catch (error) {
    console.log(new Date() + " : Request GET Employees failed code 500", error);
    res.status(500).json({
      status: "Error",
      code: 500,
      message: error.message,
    });
  }
});

router.get("/gEmployee/:nip", async (req, res) => {
  try {
    const nip = req.params.nip;
    const data = await employeeController.getEmployeeByNIP(nip);
    console.log(new Date() + " : Request GET Employee by NIP success code 200");
    res.status(200).json({
      status: "Success",
      code: 200,
      data: data,
    });
  } catch (error) {
    console.log(
      new Date() + " : Request GET Employee by NIP failed code 500",
      error
    );
    res.status(500).json({
      status: "Error",
      code: 500,
      message: error.message,
    });
  }
});


router.post("/cEmployee", async (req, res) => {
  try {
    const employee = req.body;
    const result = await employeeController.createEmployee(employee);
    console.log(new Date() + " : Request POST Employee success code 201");
    res.status(200).json({
      status: "Success",
      code: 200,
      data: result,
    });
  } catch (error) {
    console.log(new Date() + " : Request POST Employee failed code 500", error);
    res.status(500).json({
      status: "Error",
      code: 500,
      message: error.message,
    });
  }
});

router.put("/uEmployee", async (req, res) => {
  try {
    const { nip } = req.query;
    const update = req.body;
    const result = await employeeController.updateEmployee(nip, update);
    console.log(new Date() + " : Request PUT Employee success code 201");
    res.status(201).json({
      status: "Success",
      code: 201,
      data: result,
    });
  } catch (error) {
    console.log(new Date() + " : Request PUT Employee failed code 500", error);
    res.status(500).json({
      status: "Error",
      code: 500,
      message: error.message,
    });
  }
});

router.delete("/dEmployees", async (req, res) => {
  try {
    const { nip } = req.query;
    const result = await employeeController.deleteEmployee(nip);
    console.log(new Date() + " : Request DELETE Employee success code 201");
    res.status(201).json({
      status: "Success",
      code: 201,
      data: result,
    });
  } catch (error) {
    console.log(
      new Date() + " : Request DELETE Employee failed code 500",
      error
    );
    res.status(500).json({
      status: "Error",
      code: 500,
      message: error.message,
    });
  }
});

router.post("/eLogin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await employeeController.loginEmployee(username, password);
    if (result) {
      console.log(
        new Date() + " : Request POST Login Employee success code 200"
      );
      res.status(200).json({
        status: "Success",
        code: 200,
        message: "Login successful",
        position: result.position, 
      });
    } else {
      console.log(
        new Date() + " : Request POST Login Employee failed code 401"
      );
      res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Invalid username or password",
      });
    }
  } catch (error) {
    console.log(
      new Date() + " : Request POST Login Employee failed code 500",
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
