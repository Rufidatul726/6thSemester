import Express from 'express';
import { getNotifications, createNotification, deleteNotification, updateNotification } from "../controllers/notificationController.js";

const router = Express.Router();

router.route('/').get(getNotifications).post(createNotification);
router.route('/:id').delete(deleteNotification).put(updateNotification);

export default router;