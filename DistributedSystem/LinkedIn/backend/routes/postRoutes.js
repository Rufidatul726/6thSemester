import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getPosts, createPost, getPostById, getPostsExceptLoggedInUser} from '../controllers/postController.js';
import multer from 'multer';
const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });


router.get('/', getPosts);
router.post('/', protect, upload.single('image'), createPost);
router.get('/createdby/:id', getPostsExceptLoggedInUser);
router.get('/:id', getPostById);


export default router;