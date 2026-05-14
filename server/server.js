import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import faceRoutes from "./routes/faceRoutes.js";
import startCameras from './cctvService.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", faceRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/facedemo")
  .then(() => console.log("MongoDB connected"));

app.listen(5000, () =>
  console.log("Server running on port 5000")
);



startCameras();