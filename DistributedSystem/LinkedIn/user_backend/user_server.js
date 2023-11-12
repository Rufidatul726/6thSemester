import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


dotenv.config();

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const port = process.env.USER_PORT || 5000;

import userRoutes from "./routes/userRoutes.js";
import mongoose from "mongoose";

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser());

mongoose.connect("mongodb://mongo:27017/mydatabase", { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => {
    app.listen(8001, () => {
        console.log("Server is running");
    })
}).catch((err) => {
    console.log(err);
})

app.use('/api/users', userRoutes);


app.get("/", (req, res) => {res.send("User Server is ready");});

app.use(notFound);
app.use(errorHandler);

