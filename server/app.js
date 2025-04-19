require('dotenv').config()
const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes/routes");

const FRONTEND_ORIGINS = [
  `${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}`,
  `http://localhost:${process.env.FRONTEND_PORT}`
];

app.use(
  cors({ 
    origin: function(origin, callback){
      if(!origin) return callback(null, true);
      if(FRONTEND_ORIGINS.includes(origin)){
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    }
  })
);

app.use(express.json());

app.use("/", routes);

const PORT = process.env.PORT || 5001;
const HOST_NAME = process.env.HOST_NAME || "localhost";

app.listen(PORT, HOST_NAME, () => {
  console.log(`Server is running on port ${PORT}`);
});