import express from "express";
import { addAddress, getAllAddress } from "../controller/addressController.js";

const Router = express.Router();

Router.route("/addAddress").post(addAddress);
Router.route("/getAllAddresses/:userId").get(getAllAddress);

export default Router;
