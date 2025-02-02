import express from "express";
import { storeAllOrders } from "../controller/orderController.js";

const Router = express.Router();

Router.route("/orders").post(storeAllOrders);

export default Router;
