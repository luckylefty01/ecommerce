// dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user")

// server connection
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB connected!"))
.catch((err) => {
    console.log(error);
})

// middleware
app.use(express.json());
app.use("/api/users", userRoute);

app.listen(3000, () => {
    console.log("server is live");
});