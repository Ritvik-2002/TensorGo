const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const connectDB = require('./config/dbConnection');
const cors = require('cors');
connectDB();
app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));
app.use("/user", require("./Routes/UserRoute"));
app.use("/feedback", require("./Routes/FeedbackRoute"));
app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));