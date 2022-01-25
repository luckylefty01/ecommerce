// dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
// server connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB connected!"))
.catch((err) => {
    console.log(error);
})

// middleware

app.listen(3000, () => {
    console.log("server is live");
});