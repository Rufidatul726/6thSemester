import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    content:{
        type: String,
    },
    image : {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    authorName: {
        type: mongoose.Schema.Types.String,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

export default Post;