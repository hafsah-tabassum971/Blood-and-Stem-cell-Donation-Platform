const app = require("./app");
const dotenv = require("dotenv");
const dbConnection = require("./config/db");

dotenv.config({ path: './config/config.env' });

// Import cron jobs
require("./jobs/cronJobs");

//PORT
const PORT = process.env.PORT;

// //Server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`)
//     dbConnection();
// })   
// DB Connect First, Then Start Server
dbConnection().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.log("Failed to connect DB. Server NOT started.");
    console.error(err);
});