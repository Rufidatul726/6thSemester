import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";
import { minioClient } from "../server.js";

//@desc     Get all posts
//@route    GET /api/posts
//@access   Public

const getPosts = asyncHandler(async (req, res) => {
    console.log(req.body);
    const posts = await Post.find({})
    console.log(posts);
    res.json(posts);
    }
);

//@desc     Create a post
//@route    POST /api/posts
//@access   Private

const createPost = asyncHandler(async (req, res) => {
    const {content } = req.body;
    const postImage = req.file;
    const user = req.user
    minioClient.fPutObject(process.env.MINIO_BUCKET_NAME, req.file.originalname, req.file.path, function(err, etag) {
        if (err) return console.log(err)
        console.log('File uploaded successfully.')
    });

    const image = `${req.file.originalname}`;
    const post = await Post.create({
        content,
        image, 
        createdBy: user
    });
    console.log(user);
    if(post){
        res.status(201).json({
            _id: post._id,
            content: post.content,
            postImage: post.image,
            user: post.user
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

export { getPosts, createPost, getPostById };