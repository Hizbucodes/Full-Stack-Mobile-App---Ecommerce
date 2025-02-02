import dotenv from "dotenv";

import express from "express";

const app = express();
dotenv.config();
import cors from "cors";
import { connectDB } from "./db/connectDB.js";
import authRoute from "./routes/authRoute.js";
import addressRoute from "./routes/addressRoute.js";
import orderRoute from "./routes/orderRoute.js";
import userProfileRoute from "./routes/userProfileRoute.js";

app.use(cors());

app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/address", addressRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/userProfile", userProfileRoute);

const PORT = process.env.PORT;

app.listen(PORT, "192.168.8.102", () => {
  connectDB();
  console.log(`server is running on port: ${PORT} with http://192.168.8.102`);
});
