import express from "express";
import {
  getUserOrderedProducts,
  getUserProfile,
} from "../controller/userController.js";

const Router = express.Router();

Router.route("/profile/:userId").get(getUserProfile);

Router.route("/orders/:userId").get(getUserOrderedProducts);

export default Router;
