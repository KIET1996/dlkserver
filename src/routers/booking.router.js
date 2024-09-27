import bookingController from '../controllers/booking.controller';
import express from 'express';

const router = express.Router();

router.route('/getAll').get(bookingController.getAll);
router.route('/add').post(bookingController.add);
router.route('/update').put(bookingController.update);
router.route('/delete').delete(bookingController.delete);

export default router;