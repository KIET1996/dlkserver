import scheduleController from '../controllers/schedule.controller.js';
import express from 'express';
const router = express.Router();

router.route('/getAll').get(scheduleController.getAll);
router.route('/add').post(scheduleController.add);
router.route('/update/:dateSchedule/:timeStart/:timeEnd/:doctorId').put(scheduleController.update);
router.route('/delete/:dateSchedule/:timeStart/:timeEnd/:doctorId').delete(scheduleController.delete);

export default router;
