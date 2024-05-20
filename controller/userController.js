const { v4: uuidv4 } = require("uuid");

const User = require("../models/user");
const userModel = {};

userModel.createUser = async (user) => {
  try {
    const newUser = await User.create({
      ...user,
      user_id: uuidv4(), 
    });
    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
};




userModel.updateUser = async (id, update) => {
  try {

    let updateAccount = {
      account_state: update.account_state || "Verified" || "Unverified",
    };

    const users = await User.findOneAndUpdate({ user_id: id }, updateAccount, {
      new: true,
    });
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

userModel.loginUser = async (nik, password) => {
  try {
    const user = await User.findOne({ nik, password });
    return user;
  } catch (error) {
    throw new Error("Error during login: " + error.message);
  }
};

userModel.getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

userModel.getUsersByNIK = async (nik) => {
  try {
    const users = await User.find({ nik });
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

userModel.getUsersByUserId = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = userModel;
