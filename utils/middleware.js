const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
exports.protectorMW = async (req, res, next) => {
  try {
    let token;
    // 1) bech nthabat ken el user 3andou token walé
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        message: "You are not logged in !!!",
      });
    }
    // 2) bech nthabat ken el token ala b3ath'ha el user valid walé
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    // 3) bech nthabat ken el user mizel mawjoud
    const user = await User.findById(decode.id);
    if (!user) {
      return res.status(401).json({
        message: "This user no longer exists !!!",
      });
    }
    // 4) bech nthabat ken el token tsan3et 9bal ma yetbadal el pass
    if (parseInt(user.password_changed_at.getTime() / 1000) > decode.iat) {
      return res.status(401).json({
        message: "This Token is no longer valid !!!",
      });
    }
    req.role = user.role;
    req.userId = user._id.toString();
    next();
  } catch (error) {
    res.status(400).json({
      message: "Error !",
    });
  }
};

exports.checkRoleMW = (...roles) => {
  return async (req, res, next) => {
    try {
      if (!roles.includes(req.role)) {
        return res.status(403).json({
          message: "You dont have the permision !!!",
        });
      }
      next();
    } catch (error) {
      res.status(400).json({
        message: "Error !",
      });
    }
  };
};

exports.isMineMW = (property) => {
  return async (req, res, next) => {
    try {
      if (
        req.role != "admin" &&
        req.userId != req.ressource[property].toString()
      ) {
        return res.status(403).json({
          message: "You are not allowd to do this !!!!",
        });
      }
      next();
    } catch (error) {
      res.status(400).json({
        message: "Error !",
      });
    }
  };
};
