const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.get("/gUsers", async (req, res) => {
  try {
    const data = await userController.getAllUsers();
    console.log(new Date() + " : Request GET All Users success code 200");
    res.status(200).json({
      status: "Success",
      code: 200,
      data: data,
    });
  } catch (error) {
    console.log(new Date() + " : Request GET All Users failed code 500", error);
    res.status(500).json({
      status: "Error",
      code: 500,
      message: error.message,
    });
  }
});

router.get("/gUsersByNIK", async (req, res) => {
  try {
    const { nik } = req.query;
    if (!nik) {
      throw new Error("NIK is required");
    }
    const data = await userController.getUsersByNIK(nik);
    console.log(new Date() + " : Request GET Users by NIK success code 200");
    res.status(200).json({
      status: "Success",
      code: 200,
      data: data,
    });
  } catch (error) {
    console.log(
      new Date() + " : Request GET Users by NIK failed code 500",
      error
    );
    res.status(500).json({
      status: "Error",
      code: 500,
      message: error.message,
    });
  }
});

router.get("/gUsers/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await userController.getUsersByUserId(userId);
    console.log(
      new Date() + " : Request GET Users by user_id success code 200"
    );
    res.status(200).json({
      status: "Success",
      code: 200,
      data: result,
    });
  } catch (error) {
    console.log(
      new Date() + " : Request GET Users by user_id failed code 500",
      error
    );
    res.status(500).json({
      status: "Error",
      code: 500,
      message: error.message,
    });
  }
});

router.post("/cUsers", async (req, res) => {
  try {
    const user = req.body;
    const result = await userController.createUser(user);
    console.log(new Date() + " : Request POST User success code 200");
    res.status(200).json({
      status: "Success",
      code: 200,
      data: result,
    });
  } catch (error) {
    console.log(new Date() + " : Request POST User failed code 500", error);
    res.status(500).json({
      status: "Error",
      code: 500,
      message: error.message,
    });
  }
});

router.post("/uLogin", async (req, res) => {
  try {
    const { nik, password } = req.body;
    console.log("Received login request with nik:", nik);
    console.log("Received login request with password:", password);
    const result = await userController.loginUser(nik, password);
    if (result) {
      if (result) {
        console.log(new Date() + " : Request POST Login User success code 200");
        const { user_id, email, name, account_state } = result;
        res.status(200).json({
          status: "Success",
          code: 200,
          message: "Login successful",
          user_id,
          email,
          name,
          account_state,
        });
      } else {
        console.log(new Date() + " : Request POST Login User failed code 404");
        res.status(404).json({
          status: "Not Found",
          code: 404,
          message: "Invalid nik or password",
        });
      }
    } else {
      console.log(new Date() + " : Request POST Login User failed code 404");
      res.status(404).json({
        status: "Not Found",
        code: 404,
        message: "Invalid nik or password",
      });
    }
  } catch (error) {
    console.log(
      new Date() + " : Request POST Login User failed code 500",
      error
    );
    res.status(500).json({
      status: "Error",
      code: 500,
      message: "Error during login: " + error.message,
    });
  }
});

router.put("/uUsers/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const result = await userController.updateUser(id, update);
    if (!result) {
      console.log(new Date() + " : Request PUT User failed code 404");
      res.status(404).json({
        status: "Not Found",
        code: 404,
        message: "User not found",
      });
      return;
    }
    console.log(new Date() + " : Request PUT User success code 200");
    res.status(200).json({
      status: "Success",
      code: 200,
      data: result,
    });
  } catch (error) {
    console.log(new Date() + " : Request PUT User failed code 500", error);
    res.status(500).json({
      status: "Error",
      code: 500,
      message: error.message,
    });
  }
});

module.exports = router;
