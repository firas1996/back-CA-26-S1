const User = require("../models/userModel.js");

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      message: "User created !",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error !",
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "Users Fetched !",
      nbr: users.length,
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error !",
    });
  }
};

exports.getUserByid = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({
        message: "this user does not exist !!!!",
      });
    }
    res.status(200).json({
      message: "User Fetched !",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error !",
    });
  }
};

exports.updateUserByid = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      res.status(404).json({
        message: "this user does not exist !!!!",
      });
    }
    res.status(200).json({
      message: "User Updated !",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error !",
    });
  }
};

exports.deleteUserByid = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
      message: "User Deleted !",
    });
  } catch (error) {
    res.status(400).json({
      message: "Error !",
    });
  }
};
