const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");
const bcryptjs = require("bcryptjs");
const userSchema = Schema({
  name: {
    type: String,
    required: [true, "The name is required !"],
    maxlength: 30,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "The email is required !"],
    unique: true,
    validate: [isEmail, "This Email is not valid !"],
    lowercase: true,
    // uppercase: true,
  },
  password: {
    type: String,
    required: [true, "The password is required !"],
    minlength: 8,
    // validate: isStrongPassword,
  },
  confirm_password: {
    type: String,
    required: [true, "The password is required !"],
    minlength: 8,
    validate: {
      validator: function (cPass) {
        return cPass === this.password;
      },
      message: "Pass and cPass does not match !!!",
    },
  },
  role: {
    type: String,
    enum: ["admin", "user", "test"],
    default: "user",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  password_changed_at: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 12);
    this.confirm_password = undefined;
  }
  return next;
});

userSchema.methods.comparePassword = async function (pass, hPass) {
  return await bcryptjs.compare(pass, hPass);
};

const User = model("User", userSchema);
module.exports = User;
