// server.js

const express = require("express");

const cors = require("cors");

require("dotenv").config();

const connectDB = require("./config/db");

const employeeRoutes = require("./routes/employeeRoutes");

const authRoutes = require("./routes/authRoutes");

const aiRoutes = require("./routes/aiRoutes");

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use("/api/employees", employeeRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("Server Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});