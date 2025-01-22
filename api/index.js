import dotenv from "dotenv";

import express from "express";

const app = express();
dotenv.config();
import cors from "cors";
import { connectDB } from "./db/connectDB.js";
import authRoute from "./routes/authRoute.js";

app.use(cors());

app.use(express.json());

app.use("/api/v1/auth", authRoute);

const PORT = process.env.PORT;

app.listen(PORT, "192.168.8.102", () => {
  connectDB();
  console.log(`server is running on port: ${PORT} with http://192.168.8.102`);
});
