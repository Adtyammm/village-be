const User = require("../models/user");
const userModel = {};

let lastUserId = 0;

userModel.createUser = async (user) => {
  try {
    lastUserId++;
    user.user_id = lastUserId;

    const newUser = await User.create(user);
    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

userModel.updateUser = async (id, update) => {
  try {
    const updatedUser = await User.findOneAndUpdate({ user_id: id }, update, {
      new: true,
    });
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser;
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
