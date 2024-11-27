const mongoose = require("mongoose");
const User = require("../models/User");
const Profile = require('../models/Profile');

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required to fill",
      });
    }

    const doesUserExist = await User.findOne({ email: email });
    if (doesUserExist) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    //  DB mein entry
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (err) {
    console.log("error in registering user", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required to fill",
      });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not exist",
      });
    }

    // generate JWT, after password matching
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "24h",
      });

      user.token = token;
      user.password = undefined;
      // console.log(user,'-user');

      return res.status(200).json({
        success: true,
        message: "User login successfully",
        data: user,
        token: token,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is Incorrect",
      });
    }
  } catch (err) {
    console.log("error in login user", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { registerUser, loginUser };
