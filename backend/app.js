const express = require('express');
const cors = require("cors");
const app = express();
const errorMiddleware = require("./middlewares/error");
const cookieParser = require('cookie-parser');


//cors
//app.use(cors());

const allowedOrigins = process.env.FRONTEND_URL.split(",");

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
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