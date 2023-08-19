import asyncHandler from "express-async-handler";
import Notification from "../models/notificationModel.js";
import Socket from socket.io;

//@desc     Get all notifications
//@route    GET /api/notifications
//@access   Private

const getNotifications = asyncHandler(async (req, res) => {
    const notifications = await Notification.find({user: req.user._id});
    res.json(notifications);
    }
);

//@desc     Create a notification
//@route    POST /api/notifications
//@access   Private

const createNotification = asyncHandler(async (req, res) => {
    
});