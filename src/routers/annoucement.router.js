import announcementController from '../controllers/announcement.controller';
import express from 'express';
const router = express.Router();

router.route('/getAll').get(announcementController.getAll);
router.route('/getById/:id').get(announcementController.getById);
router.route('/add').post(announcementController.add);
router.route('/update/:id').put(announcementController.update);
router.route('/delete/:id').delete(announcementController.delete);

export default router;