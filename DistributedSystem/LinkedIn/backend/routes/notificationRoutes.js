import Express from 'express';
import { getNotifications, createNotification, deleteNotification, updateNotification } from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Express.Router();

router.route('/').get(protect, getNotifications).post(protect, createNotification);
router.route('/:id').delete(protect, deleteNotification).put(protect, updateNotification);

export default router;