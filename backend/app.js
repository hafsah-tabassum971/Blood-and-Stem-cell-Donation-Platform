const express = require('express');
const cors = require("cors");
const app = express();
const errorMiddleware = require("./middlewares/error");
const cookieParser = require('cookie-parser');


//cors
//app.use(cors());

// Enable CORS
app.use(cors({
  origin: ["http://localhost:3000","https://blood-and-stem-cell-donation-platfo.vercel.app"], // Frontend's URL (adjust as needed)
  credentials: true, // Allow cookies to be sent with cross-origin requests
}));

// Disable ETag
// app.disable("etag");

//json
app.use(express.json());
app.use(cookieParser());


// // Cache-Control Middleware (Disable Caching)
// app.use((req, res, next) => {
//   res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
//   res.setHeader("Pragma", "no-cache");
//   res.setHeader("Expires", "0");
//   next();
// });


//Route Imports
const user = require("./routes/donorRoutes");
const hospital = require("./routes/hospitalRoutes");
const admin = require("./routes/adminRoutes");
app.use("/api/v1", user);
app.use("/api/v1", hospital);
app.use("/api/v1", admin);

//Middleware for Errors
app.use(errorMiddleware);

module.exports = app;