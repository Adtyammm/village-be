const Verification = require("../models/verification"); 

const verificationModel = {};


verificationModel.getCode = async () => {
  try {
    const codes = await Verification.find();
    return codes;
  } catch (error) {
    throw new Error(error.message);
  }
};

verificationModel.createCode = async (code) => {
  try {
    const newCode = await Verification.create({ code });
    return newCode;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = verificationModel;
