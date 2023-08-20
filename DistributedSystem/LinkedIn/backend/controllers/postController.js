import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";
import Notification from "../models/notificationModel.js";
import { minioClient } from "../server.js";

//@desc     Get all posts
//@route    GET /api/posts
//@access   Public

const getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find({});
    res.json(posts);
    }
);

//@desc     Get all posts except loggedin user
//@route    GET /api/posts/createdby/:id
//@access   Private

const getPostsExceptLoggedInUser = asyncHandler(async (req, res) => {
    const posts = await Post.find({createdBy: {$ne: req.params.id}});
    res.json(posts);
    }
);

//@desc     Create a post
//@route    POST /api/posts
//@access   Private

const createPost = asyncHandler(async (req, res) => {
    const {content } = req.body;
    const user = req.user._id;
    const author = req.user.name;
    let image = null;
    console.log(req.file);
    if(req.file){
        minioClient.fPutObject(process.env.MINIO_BUCKET_NAME, req.file.originalname, req.file.path, function(err, etag) {
            if (err) return console.log(err)
            console.log('File uploaded successfully.')
        });

        image = `${req.file.originalname}`;
    }
    if(!content && !image){
        res.status(400).json({message : "Please fill all fields"});
    }
    const post = await Post.create({
        content,
        image, 
        createdBy: user,
        authorName: author
    });
    console.log(post);
    if(post){
        await Notification.create({
            postId: post._id,
            createdBy: user,
            type: "post",
            message: `${author} created a post `
        });
        res.status(201).json({
            _id: post._id,
            content: post.content,
            postImage: post.image,
            user: post.user,
            authorName: post.authorName
        });
    }else{
        res.status(400).json({message : "Invalid post data"});
    }

});

//@desc     Get post by id
//@route    GET /api/posts/:id
//@access   Public

const getPostById = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if(post){
        res.json(post);
    }else{
        res.status(404).json({message : "Post not found"});
    }
}
);

export { getPosts, createPost, getPostById , getPostsExceptLoggedInUser};