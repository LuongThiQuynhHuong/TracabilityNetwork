require('dotenv').config()
const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes/routes");

app.use(
  cors({ 
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
  })
);

app.use(express.json());

app.use("/", routes);

const PORT = process.env.PORT || 5001;
const HOST_NAME = process.env.HOST_NAME || "localhost";

app.listen(PORT, HOST_NAME, () => {
  console.log(`Server is running on port ${PORT}`);
});