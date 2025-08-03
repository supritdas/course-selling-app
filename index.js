require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");

const {userRouter} = require("./routes/user");
const {courseRouter} = require("./routes/course");
const { adminRouter } = require("./routes/admin");

const app = express();
app.use(express.json()); // express.json mmiddleware whenever user wants to post with json data

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main(){
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(3000);
    console.log("Connected to the Database, listening on port 3000")
}

main()

