import express from "express";
import { login, register, verifyEmail } from "../controller/authController.js";

const Router = express.Router();

Router.route("/register").post(register);
Router.route("/login").post(login);
Router.route("/verify/:token").get(verifyEmail);

export default Router;
