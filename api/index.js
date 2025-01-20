import dotenv from "dotenv";

import express from "express";

const app = express();
dotenv.config();
import cors from "cors";
import { connectDB } from "./db/connectDB.js";

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT;

app.listen(PORT, () => {
  connectDB();
  console.log(`server is running on port: ${PORT}`);
});
