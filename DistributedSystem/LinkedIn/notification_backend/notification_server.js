import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


dotenv.config();

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

const port = process.env.NOTIFICATION_PORT || 5002;

import notificationRoutes from "./routes/notificationRoutes.js";

connectDB();

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser());

app.use('/api/notifications', notificationRoutes);


app.get("/", (req, res) => {res.send("Notification Server is ready");});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {console.log(`Serve at http://localhost:${port}`);});

