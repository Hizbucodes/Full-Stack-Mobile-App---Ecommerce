import { User } from "../model/user.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { generateJsonWebToken } from "../util/jsonwebtoken/generateJsonWebToken.js";
import { secretKey } from "../util/jsonwebtoken/generateJsonWebToken.js";
import jwt from "jsonwebtoken";

const sendverificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "EverStyle.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email: http://192.168.8.101:3000/api/v1/auth/verify/${verificationToken}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log("Error sending verification Email", err);
  }
};

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please Provide Required Inputs",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "Email is Already Registered",
      });
    }

    const newUser = new User({
      username,
      email,
      password,
    });

    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();

    sendverificationEmail(newUser.email, newUser.verificationToken);
    return res.status(200).json({
      status: "success",
      message: "You have been Registered Successfully",
      email,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: `Something Went Wrong: ${err.message}`,
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid verification token",
      });
    }

    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Email Verified Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: `Internal Server Error: ${err.message}`,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide email and password",
      });
    }

    const result = await User.findOne({ email });

    if (!result || !(await bcrypt.compare(password, result.password))) {
      return res.status(404).json({
        status: "fail",
        message: "Incorrect email or password",
      });
    }

    const token = generateJsonWebToken({
      id: result._id,
      email: result.email,
      username: result.username,
    });

    return res.status(200).json({
      status: "success",
      message: "Successfully logged in",
      token,
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: `Internal Server: ${err.message}`,
    });
  }
};

export const authentication = async (req, res, next) => {
  let idToken = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    idToken = req.headers.authorization.split(" ")[1];
  }

  if (!idToken) {
    return next("Please login to get access", 401);
  }

  const tokenDetail = jwt.verify(idToken, secretKey);

  const freshUser = await User.findById(tokenDetail.id);

  if (!freshUser) {
    return next(new AppError("User no longer exists", 400));
  }

  req.user = freshUser;

  return next();
};
