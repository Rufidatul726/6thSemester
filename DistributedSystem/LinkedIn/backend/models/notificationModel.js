import mongoose from "mongoose";

const notificationSchema = mongoose.Schema({
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isSeen: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Notification = mongoose.model('Notification', notificationSchema);

