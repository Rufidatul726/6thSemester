import asyncHandler from "express-async-handler";
import Notification from "../models/notificationModel.js";

//@desc     Get all notifications
//@route    GET /api/notifications
//@access   Private

export const getNotifications = asyncHandler(async (req, res) => {
    const notifications = await Notification.find({createdBy: {$ne: req.params.id}});
    console.log(notifications);
    res.json(notifications);
    }
);

//@desc     Create a notification
//@route    POST /api/notifications
//@access   Private

export const createNotification = asyncHandler(async (req, res) => {
    const {user, message, read} = req.body;
    const notification = new Notification({
        user,
        message,
        read
    });
    const createdNotification = await notification.save();
    res.status(201).json(createdNotification);
});

//@desc     Delete a notification
//@route    DELETE /api/notifications/:id
//@access   Private

export const deleteNotification = asyncHandler(async (req, res) => {
    const notification = await Notification.findById(req.params.id);
    if(notification){
        await notification.remove();
        res.json({message: 'Notification removed'});
    } else {
        res.status(404);
        throw new Error('Notification not found');
    }
});

//@desc     Update a notification
//@route    PUT /api/notifications/:id
//@access   Private

export const updateNotification = asyncHandler(async (req, res) => {
    const {read} = req.body;
    const notification = await Notification.findById(req.params.id);
    if(notification){
        notification.read = read;
        const updatedNotification = await notification.save();
        res.json(updatedNotification);
    } else {
        res.status(404);
        throw new Error('Notification not found');
    }
});
