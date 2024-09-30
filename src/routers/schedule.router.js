import scheduleController from "../controllers/schedule.controller.js";
import express from "express";
const router = express.Router();

router.route("/getAll").get(scheduleController.getAll);
router.route("/add").post(scheduleController.add);
router.route("/update/:dateSchedule/:timeStart/:timeEnd/:doctorId").put(scheduleController.update);
router.route("/delete/:dateSchedule/:timeStart/:timeEnd/:doctorId").delete(scheduleController.delete);
// router.route("/getByDoctorId/:doctorId").get(scheduleController.getByDoctorId);
router.route("/getByDate/:date").get(scheduleController.getByDate);
router.route("/getByWeek/:date").get(scheduleController.getByWeek);
router.route("/getByDoctorIdDate/:date/:doctorId").get(scheduleController.getByDoctorIdDate);

export default router;
