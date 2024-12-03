import express from "express";
import mongoose from "mongoose";
import grades from "./routes/grades.mjs";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT||5050;

mongoose.connect(process.env.ATLAS_URI);

const app = express();
app.use(express.json());