import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import * as minio from "minio";
import { Server } from "socket.io";
import { createServer } from "http";

dotenv.config();

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

const port = process.env.PORT || 5000;

import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

connectDB();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { 
    cors: {
        origin: "http://localhost:3000",
    }
 });

io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
    // socket.on("join", (room) => {
    //     console.log("joined room", room);
    //     socket.join(room);
    // });
    // socket.on("leave", (room) => {
    //     console.log("left room", room);
    //     socket.leave(room);
    // });
    // socket.on("notification", (notification) => {
    //     console.log("notification", notification);
    //     socket.to(notification.user).emit("notification", notification);
    // });
    // socket.on("message", (message) => {
    //     console.log("message", message);
    //     socket.to(message.room).emit("message", message);
    // });
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser());

export const minioClient = new minio.Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY
});

minioClient.bucketExists(process.env.MINIO_BUCKET_NAME, function(err, exists) {
    if (err) {
        return console.log(err);
    }
    if (!exists) {
        minioClient.makeBucket(process.env.MINIO_BUCKET_NAME, "us-east-1", function(err) {
            if (err) {
                return console.log(err);
            }
            console.log("Bucket created successfully in 'us-east-1'.");
        });
    }
    else{
        console.log("Bucket already exists.");
    }
});

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);


app.get("/", (req, res) => {res.send("Server is ready");});

app.use(notFound);
app.use(errorHandler);

httpServer.listen(port, () => {console.log(`Serve at http://localhost:${port}`);});
