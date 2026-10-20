const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createJWT = (id, email, role, name) => {
  return jwt.sign({ id, email, role, name }, process.env.JWT_SECRET, {
    expiresIn: "180d",
  });
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "Email and password are required !!!",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        message: "Email or password are incorrect !!!",
      });
    }
    if (!(await user.comparePassword(password, user.password))) {
      res.status(400).json({
        message: "Email or password are incorrect !!!",
      });
    }
    const token = createJWT(user._id, user.email, user.role, user.name);
    res.status(200).json({
      message: "Logged in !!!!",
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error !",
    });
  }
};

exports.SignUp = async (req, res) => {
  // const {name,email,password,confirm_password}= req.body
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirm_password: req.body.confirm_password,
    });
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
