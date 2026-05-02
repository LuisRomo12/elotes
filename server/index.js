// server/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());

// API
app.use("/api/ventas", require("./routes/ventas"));

// Servir el frontend (producción)
app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("/{*path}", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
