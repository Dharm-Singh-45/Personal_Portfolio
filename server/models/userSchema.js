import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Name Required"],
  },
  email: {
    type: String,
    required: [true, "email Required"],
  },
  phone: {
    type: String,
    required: [true, "Phone Number Required"],
  },
  aboutMe: {
    type: String,
    required: [true, "About Me Field Is Required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "password Must Contain at least 8 character"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
    },
  },
  resume: {
    public_id: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
    },
  },
  portfolioUrl: {
    type: String,
    required: [true, "Portfolio URl is required "],
  },
  githubURL: String,
  instagramURL: String,
  linkedinURL: String,
  twitterURL: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// for hashing password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// for comparing password with hashed password

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// generating json web token

userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

userSchema.methods.getResetPasswordToken = function(){
  const resetToken = crypto.randomBytes(20).toString('hex')
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
  this.resetPasswordExpire = Date.now() + 15*60*1000;
  return resetToken
}

export const User = mongoose.model("User", userSchema);
