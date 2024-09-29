import bookingController from '../controllers/booking.controller';
import express from 'express';

const router = express.Router();

router.route('/getAll').get(bookingController.getAll);
router.route('/add').post(bookingController.add);
router.route('/update').put(bookingController.update);
router.route('/delete').delete(bookingController.delete);
router.route("/cancelBooking").put(bookingController.cancelBooking);
router.route("/getBookingCompleted").get(bookingController.getBookingCompleted);
router.route("/getBookingCancel").get(bookingController.getBookingCancel);
router.route("/getBookingWait").get(bookingController.getBookingWait);
router.route("/getBookingComingSoon").get(bookingController.getBookingComingSoon);
router.route("/updateStatus").put(bookingController.updateStatus);

export default router;