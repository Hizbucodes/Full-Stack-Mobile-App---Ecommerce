import express from "express";
import { authentication } from "../controller/authController.js";
import { addAddress, getAllAddress } from "../controller/addressController.js";

const Router = express.Router();

Router.route("/addAddress").post(addAddress);
Router.route("/getAllAddresses/:userId").get(getAllAddress);

export default Router;
